const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---------------------------------------------------------------------------
// Asset manifest (written by `npm run build`): maps a logical asset name to its
// hashed, minified file under /assets/dist. When no build has run the manifest
// is absent and templates fall back to the raw source files, so development
// still works with a plain `node server.js`.
// ---------------------------------------------------------------------------
const MANIFEST_PATH = path.join(__dirname, 'public/assets/manifest.json');

function loadManifest() {
    try {
        return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch (_) {
        return {};
    }
}

let assetManifest = loadManifest();
// In development, reload the manifest per request so a rebuild is picked up
// without restarting the server. In production it's read once at startup.
const isDev = process.env.NODE_ENV !== 'production';

app.use((req, res, next) => {
    if (isDev) assetManifest = loadManifest();
    // asset('css') or asset('js/menus.js') -> hashed path if built, else the
    // raw source path so the page still works without a build.
    res.locals.asset = (name) => {
        if (assetManifest[name]) return assetManifest[name];
        return name === 'css' ? null : '/assets/' + name;
    };
    res.locals.hasBuild = Boolean(assetManifest.css);

    // imgSrcset(originalSrc) -> a srcset string built from the responsive
    // variants in the manifest, or '' when none exist (so the <img> just uses
    // its original src). Purely additive; safe without a build.
    res.locals.imgSrcset = (originalSrc) => {
        const entry = assetManifest.images && assetManifest.images[originalSrc];
        if (!entry || !entry.variants || !entry.variants.length) return '';
        return entry.variants.map((v) => `${v.url} ${v.w}w`).join(', ');
    };
    next();
});

// Static assets with caching. Content-hashed files under /dist (and the
// stable-named self-hosted fonts) are immutable for a year; everything else
// gets a modest TTL so edits still propagate.
app.use(express.static(path.join(__dirname, '/public'), {
    setHeaders: (res, filePath) => {
        const inDist = filePath.includes(`${path.sep}dist${path.sep}`);
        if (inDist || /\.woff2?$/.test(filePath)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (/\.(png|jpe?g|webp|gif|svg|mp4|ico)$/.test(filePath)) {
            res.setHeader('Cache-Control', 'public, max-age=604800'); // 7 days
        } else if (/\.(css|js)$/.test(filePath)) {
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day (raw dev fallback)
        }
    },
}));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// ===================
// REQUIRE ROUTES HERE
require('./routes/html-routes.js')(app);
// ====================

// Server Listener
app.listen(PORT, function () {
    console.log(`App vibing on Port: ${PORT}`);
});
