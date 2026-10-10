/*
 * Lightweight asset build: minify (and, for CSS, combine) the hand-written
 * source in public/assets/{css,js} into hashed files under public/assets/dist/,
 * then write a manifest.json the server reads to emit the hashed URLs.
 *
 * No bundler graph: sources stay editable and are served as-is when no build
 * has run (server.js falls back to the raw paths when the manifest is missing),
 * so the edit-and-reload workflow is preserved. Run with:  npm run build
 *
 * esbuild (not clean-css) is used for CSS because the stylesheets use native
 * CSS nesting, which clean-css v5 silently drops. A browser `target` also
 * lowers the nesting to flat selectors, widening support beyond the browsers
 * that understand native nesting.
 *
 * NOTE: dist/ is a sibling of css/ under public/assets/, so every relative
 * url('../images/...') in the CSS resolves identically from the bundle - no
 * URL rebasing required.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const esbuild = require('esbuild');

const ROOT = path.join(__dirname, '..');
const CSS_DIR = path.join(ROOT, 'public/assets/css');
const JS_DIR = path.join(ROOT, 'public/assets/js');
const DIST_DIR = path.join(ROOT, 'public/assets/dist');
const MANIFEST_PATH = path.join(ROOT, 'public/assets/manifest.json');

// CSS files combined in the same order the <head> loaded them.
const CSS_ORDER = ['theme.css', 'components.css', 'main.css', 'utilities.css', 'mediaqueries.css'];
// Browser target: also lowers native CSS nesting to flat selectors.
const TARGET = ['chrome91', 'firefox90', 'safari15', 'edge91'];

const hash = (buf) => crypto.createHash('md5').update(buf).digest('hex').slice(0, 8);

function ensureCleanDist() {
    fs.mkdirSync(DIST_DIR, { recursive: true });
    // Remove only stale top-level CSS/JS outputs; leave subdirs (e.g. dist/img
    // from build-images.js) untouched so the two builds don't clobber each other.
    for (const entry of fs.readdirSync(DIST_DIR, { withFileTypes: true })) {
        if (entry.isFile() && /\.(css|js)$/.test(entry.name)) {
            fs.rmSync(path.join(DIST_DIR, entry.name));
        }
    }
}

async function buildCss(manifest) {
    // Concatenate in load order, then minify as one stylesheet.
    const combined = CSS_ORDER
        .map((file) => fs.readFileSync(path.join(CSS_DIR, file), 'utf8'))
        .join('\n');
    const result = await esbuild.transform(combined, {
        loader: 'css',
        minify: true,
        target: TARGET,
    });
    if (result.warnings.length) {
        result.warnings.forEach((w) => console.warn('  css warning:', w.text));
    }
    const h = hash(result.code);
    const name = `app.${h}.css`;
    fs.writeFileSync(path.join(DIST_DIR, name), result.code);
    manifest['css'] = `/assets/dist/${name}`;
    console.log(`  css  -> ${name} (${(result.code.length / 1024).toFixed(1)} KB)`);
}

async function buildJs(manifest) {
    const files = fs.readdirSync(JS_DIR).filter((f) => f.endsWith('.js'));
    for (const file of files) {
        const code = fs.readFileSync(path.join(JS_DIR, file), 'utf8');
        const result = await esbuild.transform(code, {
            loader: 'js',
            minify: true,
            target: TARGET,
        });
        const h = hash(result.code);
        const name = `${file.replace(/\.js$/, '')}.${h}.js`;
        fs.writeFileSync(path.join(DIST_DIR, name), result.code);
        manifest[`js/${file}`] = `/assets/dist/${name}`;
        console.log(`  js   -> ${name} (${(result.code.length / 1024).toFixed(1)} KB)`);
    }
}

async function main() {
    console.log('Building assets...');
    ensureCleanDist();
    // Preserve image-manifest entries written by build-images.js, if present.
    let manifest = {};
    try {
        manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch (_) { /* no existing manifest */ }

    await buildCss(manifest);
    await buildJs(manifest);

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`Manifest written to ${path.relative(ROOT, MANIFEST_PATH)}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
