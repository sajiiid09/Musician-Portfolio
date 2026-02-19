# Phase 1 Assets Optimization (WebP)

## 1) Inspect current state

```bash
node scripts/convert-public-images-to-webp.mjs --dry-run
```

## 2) Convert images and create backups

```bash
node scripts/convert-public-images-to-webp.mjs
```

Optional flags:

```bash
node scripts/convert-public-images-to-webp.mjs --force --maxWidth 1920 --quality 82
```

## 3) Update image references in code

Dry-run:

```bash
node scripts/update-image-references.mjs --dry-run
```

Write changes:

```bash
node scripts/update-image-references.mjs
```

## 4) Verification

Build check:

```bash
npm run build
```

Remaining JPG/JPEG/PNG references in code (excluding backup folder):

```bash
rg -n -i "\.(jpg|jpeg|png)" lib components app pages --glob '!**/_orig_assets_backup/**'
```

Run dev server for manual page checks:

```bash
npm run dev
```

Backup location:

`public/_orig_assets_backup/` (preserves original folder structure).
