/*
 * Responsive image pipeline. For every raster image under public/assets/images
 * (png / jpg / jpeg / webp - SVG and GIF are left alone), generate downscaled
 * WEBP variants at a set of target widths into public/assets/dist/img/,
 * mirroring the source path. The widths and intrinsic size are recorded in
 * manifest.json under "images", which the server's imgSrcset() helper reads to
 * emit a srcset. Nothing is upscaled, and the original files are never touched.
 *
 * The srcset is purely additive: when this build hasn't run (no manifest entry)
 * templates fall back to the original `src`, so the site always works. Run with:
 *   npm run build:images      (slow; images change rarely)
 *   npm run build:all         (images + css/js)
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public/assets/images');
const DIST_IMG_DIR = path.join(ROOT, 'public/assets/dist/img');
const MANIFEST_PATH = path.join(ROOT, 'public/assets/manifest.json');

const TARGET_WIDTHS = [480, 800, 1200, 1600];
const WEBP_QUALITY = 78;
// Skip images already small enough that variants wouldn't help.
const MIN_SOURCE_WIDTH = 540;

function walk(dir) {
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walk(full));
        else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) out.push(full);
    }
    return out;
}

async function processImage(srcAbs, images) {
    const relFromImages = path.relative(IMAGES_DIR, srcAbs); // e.g. projects/featured/acopon.jpg
    const publicSrc = '/assets/images/' + relFromImages.split(path.sep).join('/');

    let meta;
    try {
        meta = await sharp(srcAbs).metadata();
    } catch (err) {
        console.warn('  skip (unreadable):', relFromImages, err.message);
        return;
    }
    if (!meta.width || meta.width < MIN_SOURCE_WIDTH) return; // already small

    const widths = TARGET_WIDTHS.filter((w) => w < meta.width);
    if (!widths.length) return;

    const relNoExt = relFromImages.replace(/\.[^.]+$/, '');
    const entries = [];
    for (const w of widths) {
        const outRel = `${relNoExt}-${w}.webp`;
        const outAbs = path.join(DIST_IMG_DIR, outRel);
        fs.mkdirSync(path.dirname(outAbs), { recursive: true });
        await sharp(srcAbs).resize({ width: w }).webp({ quality: WEBP_QUALITY }).toFile(outAbs);
        entries.push({ w, url: '/assets/dist/img/' + outRel.split(path.sep).join('/') });
    }

    images[publicSrc] = {
        intrinsic: { width: meta.width, height: meta.height },
        variants: entries,
    };
    console.log(`  ${relFromImages}  (${meta.width}px) -> ${widths.join(',')}w`);
}

async function main() {
    console.log('Building responsive images...');
    const files = walk(IMAGES_DIR);

    let manifest = {};
    try {
        manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch (_) { /* none yet */ }
    const images = {};

    // Process sequentially to keep memory/CPU bounded.
    for (const file of files) {
        await processImage(file, images);
    }

    manifest.images = images;
    fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`Processed ${Object.keys(images).length} images. Manifest updated.`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
