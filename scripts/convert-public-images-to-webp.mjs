#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_EXT_RE = /\.(jpe?g|png)$/i;
const DEFAULTS = {
  publicDir: "public",
  backupDir: "public/_orig_assets_backup",
  maxWidth: 1920,
  quality: 82,
  dryRun: false,
  force: false,
};

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "n/a";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(2)} ${units[unitIndex]}`;
}

function parseArgs(argv) {
  const options = { ...DEFAULTS };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--force") {
      options.force = true;
      continue;
    }
    if (arg === "--maxWidth") {
      options.maxWidth = Number(argv[i + 1]);
      i += 1;
      continue;
    }
    if (arg.startsWith("--maxWidth=")) {
      options.maxWidth = Number(arg.split("=")[1]);
      continue;
    }
    if (arg === "--quality") {
      options.quality = Number(argv[i + 1]);
      i += 1;
      continue;
    }
    if (arg.startsWith("--quality=")) {
      options.quality = Number(arg.split("=")[1]);
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
    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!Number.isFinite(options.maxWidth) || options.maxWidth <= 0) {
    throw new Error("--maxWidth must be a positive number.");
  }
  if (!Number.isFinite(options.quality) || options.quality <= 0 || options.quality > 100) {
    throw new Error("--quality must be between 1 and 100.");
  }

  return options;
}

function printHelp() {
  console.log(
    [
      "Convert all JPG/JPEG/PNG files under public/ to WebP with optional resizing.",
      "",
      "Usage:",
      "  node scripts/convert-public-images-to-webp.mjs [options]",
      "",
      "Options:",
      "  --dry-run                 Show what would be converted without writing files",
      "  --force                   Re-generate WebP even when target already exists",
      "  --maxWidth <number>       Resize down when width is greater than this (default: 1920)",
      "  --quality <number>        WebP quality for JPG/JPEG inputs (default: 82)",
      "  --publicDir <path>        Public directory to scan (default: public)",
      "  --backupDir <path>        Backup directory for originals (default: public/_orig_assets_backup)",
      "  --help, -h                Show this help",
      "",
      "Notes:",
      "  - PNG inputs with transparency are converted losslessly to preserve alpha.",
      "  - PNG/JPG/JPEG without transparency use the configured lossy quality (default: 82).",
      "  - Existing .webp files are skipped unless --force is set.",
    ].join("\n"),
  );
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
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

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const cwd = process.cwd();
  const publicDirAbs = path.resolve(cwd, options.publicDir);
  const backupDirAbs = path.resolve(cwd, options.backupDir);

  if (!(await exists(publicDirAbs))) {
    throw new Error(`Public directory not found: ${publicDirAbs}`);
  }

  const imageFiles = [];
  await walkFiles(publicDirAbs, async (filePath) => {
    if (!IMAGE_EXT_RE.test(filePath)) return;
    if (filePath.startsWith(`${backupDirAbs}${path.sep}`)) return;
    imageFiles.push(filePath);
  });

  imageFiles.sort((a, b) => a.localeCompare(b));

  if (!options.dryRun) {
    await fs.mkdir(backupDirAbs, { recursive: true });
  }

  let backupsCreated = 0;
  let backupsSkipped = 0;
  for (const inputPath of imageFiles) {
    const relFromPublic = path.relative(publicDirAbs, inputPath);
    const backupTarget = path.join(backupDirAbs, relFromPublic);
    const backupExists = await exists(backupTarget);

    if (backupExists) {
      backupsSkipped += 1;
      continue;
    }

    backupsCreated += 1;
    if (!options.dryRun) {
      await fs.mkdir(path.dirname(backupTarget), { recursive: true });
      await fs.copyFile(inputPath, backupTarget);
    }
  }

  const results = [];
  let converted = 0;
  let skippedExisting = 0;
  let errors = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for (const inputPath of imageFiles) {
    const relFromPublic = path.relative(publicDirAbs, inputPath);
    const relPosix = toPosix(relFromPublic);
    const outputPath = inputPath.replace(IMAGE_EXT_RE, ".webp");
    const outputRelPosix = toPosix(path.relative(publicDirAbs, outputPath));
    const outputExists = await exists(outputPath);

    const inputStat = await fs.stat(inputPath);
    const originalBytes = inputStat.size;
    totalBefore += originalBytes;

    if (outputExists && !options.force) {
      const outputStat = await fs.stat(outputPath);
      totalAfter += outputStat.size;
      skippedExisting += 1;
      results.push({
        file: relPosix,
        output: outputRelPosix,
        action: "skipped-existing",
        originalBytes,
        webpBytes: outputStat.size,
      });
      continue;
    }

    try {
      const metadata = await sharp(inputPath).metadata();
      const inputExt = path.extname(inputPath).toLowerCase();
      const shouldResize = Number.isFinite(metadata.width) && metadata.width > options.maxWidth;

      const pipeline = sharp(inputPath).rotate();
      if (shouldResize) {
        pipeline.resize({
          width: options.maxWidth,
          fit: "inside",
          withoutEnlargement: true,
        });
      }

      const webpOptions =
        inputExt === ".png" && metadata.hasAlpha
          ? {
              lossless: true,
              effort: 6,
              alphaQuality: 100,
            }
          : {
              quality: options.quality,
              effort: 6,
            };

      const buffer = await pipeline.webp(webpOptions).toBuffer();
      const webpBytes = buffer.byteLength;
      totalAfter += webpBytes;

      if (!options.dryRun) {
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, buffer);
      }

      converted += 1;
      results.push({
        file: relPosix,
        output: outputRelPosix,
        action: options.dryRun ? "dry-run-converted" : "converted",
        originalBytes,
        webpBytes,
      });
    } catch (error) {
      errors += 1;
      results.push({
        file: relPosix,
        output: outputRelPosix,
        action: "error",
        originalBytes,
        webpBytes: 0,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const savings = totalBefore - totalAfter;
  const savingsPct = totalBefore > 0 ? (savings / totalBefore) * 100 : 0;
  const top20 = [...results]
    .filter((item) => item.action !== "error")
    .sort((a, b) => b.originalBytes - a.originalBytes)
    .slice(0, 20);

  console.log("\n=== Conversion Report ===");
  console.log(`Public directory: ${publicDirAbs}`);
  console.log(`Backup directory: ${backupDirAbs}`);
  console.log(`Mode: ${options.dryRun ? "dry-run" : "write"}`);
  console.log(`Files discovered: ${imageFiles.length}`);
  console.log(`Backups created: ${backupsCreated}`);
  console.log(`Backups skipped (already existed): ${backupsSkipped}`);
  console.log(`Converted: ${converted}`);
  console.log(`Skipped (existing WebP): ${skippedExisting}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total bytes before: ${totalBefore} (${formatBytes(totalBefore)})`);
  console.log(`Total bytes after:  ${totalAfter} (${formatBytes(totalAfter)})`);
  console.log(`Estimated savings:  ${savings} (${formatBytes(savings)}, ${savingsPct.toFixed(2)}%)`);

  console.log("\nTop 20 Largest Originals:");
  for (const item of top20) {
    const delta = item.originalBytes - item.webpBytes;
    const deltaPct = item.originalBytes > 0 ? (delta / item.originalBytes) * 100 : 0;
    console.log(
      `- ${item.file} -> ${item.output} | ${formatBytes(item.originalBytes)} -> ${formatBytes(item.webpBytes)} (${deltaPct.toFixed(2)}% smaller) [${item.action}]`,
    );
  }

  const errorItems = results.filter((item) => item.action === "error");
  if (errorItems.length > 0) {
    console.log("\nErrors:");
    for (const item of errorItems) {
      console.log(`- ${item.file}: ${item.error}`);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
