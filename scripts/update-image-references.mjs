#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const IMAGE_EXT_RE = /\.(jpe?g|png)$/i;
const TARGET_FILE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".md",
  ".mdx",
  ".json",
]);

const DEFAULTS = {
  roots: ["lib", "components", "app", "pages"],
  publicDir: "public",
  backupDir: "public/_orig_assets_backup",
  dryRun: false,
};

function parseArgs(argv) {
  const options = { ...DEFAULTS };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--publicDir") {
      options.publicDir = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg.startsWith("--publicDir=")) {
      options.publicDir = arg.split("=")[1];
      continue;
    }
    if (arg === "--backupDir") {
      options.backupDir = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg.startsWith("--backupDir=")) {
      options.backupDir = arg.split("=")[1];
      continue;
    }
    if (arg === "--roots") {
      options.roots = argv[i + 1].split(",").map((item) => item.trim()).filter(Boolean);
      i += 1;
      continue;
    }
    if (arg.startsWith("--roots=")) {
      options.roots = arg
        .split("=")[1]
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function printHelp() {
  console.log(
    [
      "Update internal image references from JPG/JPEG/PNG to .webp when a matching WebP exists.",
      "",
      "Usage:",
      "  node scripts/update-image-references.mjs [options]",
      "",
      "Options:",
      "  --dry-run                 Show files that would change without writing",
      "  --roots <a,b,c>           Comma-separated roots to scan (default: lib,components,app,pages)",
      "  --publicDir <path>        Public directory path (default: public)",
      "  --backupDir <path>        Backup directory inside public to ignore (default: public/_orig_assets_backup)",
      "  --help, -h                Show this help",
    ].join("\n"),
  );
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(dirPath, onFile) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await walkFiles(fullPath, onFile);
      continue;
    }
    if (entry.isFile()) {
      await onFile(fullPath);
    }
  }
}

function replaceImageExtension(filePath) {
  return filePath.replace(IMAGE_EXT_RE, ".webp");
}

function isExternalReference(value) {
  return /^https?:\/\//i.test(value) || /^\/\//.test(value) || /^data:/i.test(value);
}

function splitSuffix(value) {
  const match = /^([^?#]+)(.*)$/.exec(value);
  if (!match) return { base: value, suffix: "" };
  return { base: match[1], suffix: match[2] };
}

async function buildPublicWebpSet(publicDirAbs, backupDirAbs) {
  const webpSet = new Set();
  await walkFiles(publicDirAbs, async (fullPath) => {
    if (!fullPath.toLowerCase().endsWith(".webp")) return;
    if (fullPath.startsWith(`${backupDirAbs}${path.sep}`)) return;
    const rel = toPosix(path.relative(publicDirAbs, fullPath));
    webpSet.add(`/${rel}`);
  });
  return webpSet;
}

function remapRef(value, context) {
  if (isExternalReference(value)) return null;
  const { base, suffix } = splitSuffix(value);
  if (!IMAGE_EXT_RE.test(base)) return null;

  const { filePath, publicDirAbs, publicWebpSet, cwd } = context;

  if (base.startsWith("/")) {
    const target = replaceImageExtension(base);
    if (publicWebpSet.has(target)) {
      return `${target}${suffix}`;
    }
    return null;
  }

  if (base.startsWith("public/")) {
    const slashPath = `/${toPosix(base.slice("public/".length))}`;
    const target = replaceImageExtension(slashPath);
    if (publicWebpSet.has(target)) {
      return `${replaceImageExtension(base)}${suffix}`;
    }
    return null;
  }

  const fileDir = path.dirname(filePath);
  const abs = path.resolve(fileDir, base);
  const targetAbs = replaceImageExtension(abs);
  const relToPublic = path.relative(publicDirAbs, targetAbs);
  const isInsidePublic = relToPublic !== "" && !relToPublic.startsWith("..") && !path.isAbsolute(relToPublic);
  if (isInsidePublic) {
    const slashPath = `/${toPosix(relToPublic)}`;
    if (publicWebpSet.has(slashPath)) {
      return `${replaceImageExtension(base)}${suffix}`;
    }
  }

  if (base.startsWith("./") || base.startsWith("../")) {
    return null;
  }

  const maybeFromRoot = path.resolve(cwd, base);
  const maybeTarget = replaceImageExtension(maybeFromRoot);
  const relMaybe = path.relative(publicDirAbs, maybeTarget);
  const maybeInsidePublic = relMaybe !== "" && !relMaybe.startsWith("..") && !path.isAbsolute(relMaybe);
  if (maybeInsidePublic) {
    const slashPath = `/${toPosix(relMaybe)}`;
    if (publicWebpSet.has(slashPath)) {
      return `${replaceImageExtension(base)}${suffix}`;
    }
  }

  return null;
}

function rewriteContent(content, context) {
  let replacementCount = 0;
  let updated = content;

  updated = updated.replace(/(["'`])([^"'`]*?\.(?:jpe?g|png)(?:[?#][^"'`]*)?)\1/gi, (full, quote, value) => {
    const nextValue = remapRef(value, context);
    if (!nextValue || nextValue === value) return full;
    replacementCount += 1;
    return `${quote}${nextValue}${quote}`;
  });

  updated = updated.replace(/url\(\s*(["']?)([^)"']*?\.(?:jpe?g|png)(?:[?#][^)"']*)?)\1\s*\)/gi, (full, quote, value) => {
    const nextValue = remapRef(value, context);
    if (!nextValue || nextValue === value) return full;
    replacementCount += 1;
    return `url(${quote}${nextValue}${quote})`;
  });

  return { updated, replacementCount };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const cwd = process.cwd();
  const publicDirAbs = path.resolve(cwd, options.publicDir);
  const backupDirAbs = path.resolve(cwd, options.backupDir);
  const publicExists = await exists(publicDirAbs);
  if (!publicExists) {
    throw new Error(`Public directory not found: ${publicDirAbs}`);
  }

  const publicWebpSet = await buildPublicWebpSet(publicDirAbs, backupDirAbs);
  if (publicWebpSet.size === 0) {
    throw new Error("No WebP files found in public/. Run conversion script first.");
  }

  const candidateFiles = [];
  for (const root of options.roots) {
    const absRoot = path.resolve(cwd, root);
    if (!(await exists(absRoot))) continue;
    await walkFiles(absRoot, async (filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      if (!TARGET_FILE_EXTENSIONS.has(ext)) return;
      candidateFiles.push(filePath);
    });
  }

  candidateFiles.sort((a, b) => a.localeCompare(b));

  let totalReplacements = 0;
  let changedFiles = 0;
  const changedFileList = [];

  for (const filePath of candidateFiles) {
    const original = await fs.readFile(filePath, "utf8");
    const { updated, replacementCount } = rewriteContent(original, {
      filePath,
      publicDirAbs,
      publicWebpSet,
      cwd,
    });

    if (replacementCount === 0 || updated === original) continue;

    totalReplacements += replacementCount;
    changedFiles += 1;
    changedFileList.push({
      file: toPosix(path.relative(cwd, filePath)),
      replacements: replacementCount,
    });

    if (!options.dryRun) {
      await fs.writeFile(filePath, updated, "utf8");
    }
  }

  console.log("\n=== Reference Update Report ===");
  console.log(`Mode: ${options.dryRun ? "dry-run" : "write"}`);
  console.log(`Roots scanned: ${options.roots.join(", ")}`);
  console.log(`Files scanned: ${candidateFiles.length}`);
  console.log(`Files changed: ${changedFiles}`);
  console.log(`Total replacements: ${totalReplacements}`);

  if (changedFileList.length > 0) {
    console.log("\nChanged files:");
    for (const item of changedFileList) {
      console.log(`- ${item.file} (${item.replacements} replacements)`);
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
