#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const backupSegment = `${path.sep}_orig_assets_backup${path.sep}`;

const codeRoots = ["app", "components", "lib", "pages"]
  .map((dir) => path.join(root, dir))
  .filter((dir) => fs.existsSync(dir));

const codeExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const imageExtRegex = /\.(jpe?g|png)$/i;
const eagerRegex = /loading\s*=\s*["']eager["']/i;
const highFetchPriorityRegex =
  /fetchPriority\s*=\s*(\{?\s*["']high["']\s*\}?|\{\s*`high`\s*\})/i;
const imageTagRegex = /<Image[\s\S]*?>/g;
const priorityAllowlist = new Set([]);

const expectedWeights = {
  cinzel: ["400", "500", "600", "700"],
  archivo: ["300", "400", "500", "600", "700"],
};

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function walkFiles(dir, onFile) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, onFile);
      continue;
    }
    if (entry.isFile()) {
      onFile(fullPath);
    }
  }
}

function parseWeightList(layoutSource, variableName, constructorName) {
  const regex = new RegExp(
    `const\\s+${variableName}\\s*=\\s*${constructorName}\\(\\{[\\s\\S]*?weight:\\s*\\[([^\\]]+)\\]`,
    "m",
  );
  const match = layoutSource.match(regex);
  if (!match) {
    return null;
  }
  return [...match[1].matchAll(/["'](\d+)["']/g)]
    .map((item) => item[1])
    .sort((a, b) => Number(a) - Number(b));
}

function sameStringArray(a, b) {
  if (!a || a.length !== b.length) return false;
  return a.every((item, index) => item === b[index]);
}

const remainingRasterImages = [];
if (fs.existsSync(publicDir)) {
  walkFiles(publicDir, (filePath) => {
    if (!imageExtRegex.test(filePath)) return;
    if (filePath.includes(backupSegment)) return;
    remainingRasterImages.push(toPosix(path.relative(root, filePath)));
  });
}

const eagerUsages = [];
for (const codeRoot of codeRoots) {
  walkFiles(codeRoot, (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (!codeExtensions.has(ext)) return;

    const rel = toPosix(path.relative(root, filePath));
    const source = fs.readFileSync(filePath, "utf8");

    if (eagerRegex.test(source)) {
      eagerUsages.push(`${rel} -> loading="eager"`);
    }
    if (highFetchPriorityRegex.test(source)) {
      eagerUsages.push(`${rel} -> fetchPriority="high"`);
    }

    const imageTags = source.match(imageTagRegex) ?? [];
    for (const tag of imageTags) {
      if (/\bpriority\b/.test(tag) && !priorityAllowlist.has(rel)) {
        eagerUsages.push(`${rel} -> <Image ... priority ...>`);
        break;
      }
    }
  });
}

const layoutPath = path.join(root, "app", "layout.tsx");
const fontFindings = [];
if (!fs.existsSync(layoutPath)) {
  fontFindings.push("Missing app/layout.tsx");
} else {
  const layoutSource = fs.readFileSync(layoutPath, "utf8");
  const cinzelWeights = parseWeightList(layoutSource, "cinzel", "Cinzel");
  const archivoWeights = parseWeightList(layoutSource, "archivo", "Archivo");

  if (!sameStringArray(cinzelWeights, expectedWeights.cinzel)) {
    fontFindings.push(
      `Cinzel weights drifted: found [${(cinzelWeights ?? []).join(", ")}], expected [${expectedWeights.cinzel.join(", ")}]`,
    );
  }
  if (!sameStringArray(archivoWeights, expectedWeights.archivo)) {
    fontFindings.push(
      `Archivo weights drifted: found [${(archivoWeights ?? []).join(", ")}], expected [${expectedWeights.archivo.join(", ")}]`,
    );
  }
}

const hasErrors =
  remainingRasterImages.length > 0 || eagerUsages.length > 0 || fontFindings.length > 0;

if (hasErrors) {
  console.error("\nPerformance guard failed.\n");
  if (remainingRasterImages.length > 0) {
    console.error("Remaining JPG/JPEG/PNG under public/ (excluding backup):");
    for (const file of remainingRasterImages) {
      console.error(`- ${file}`);
    }
    console.error("");
  }
  if (eagerUsages.length > 0) {
    console.error("Disallowed eager/priority usage detected:");
    for (const item of eagerUsages) {
      console.error(`- ${item}`);
    }
    console.error("");
  }
  if (fontFindings.length > 0) {
    console.error("Font weight guard failed:");
    for (const item of fontFindings) {
      console.error(`- ${item}`);
    }
    console.error("");
  }
  process.exit(1);
}

console.log("Performance guard passed.");
