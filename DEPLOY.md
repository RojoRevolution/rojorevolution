# Deploying RojoRevolution

The site is an Express + EJS app on cPanel (LiteSpeed/Passenger), deployed via
**cPanel Git Version Control** (the server pulls from GitHub).

There is a lightweight asset build (minified CSS/JS + responsive image variants).
Because the build can't run on the cPanel host (`sharp` is a native module that
isn't available there), **the build output is committed to the repo** so it ships
with a normal git pull. `npm run deploy` rebuilds and commits it for you.

---

## Everyday workflow

1. Make your changes and commit them as usual (your own commit messages):
   ```bash
   git add -p        # or however you normally stage
   git commit -m "Describe your change"
   ```
2. Build + commit the assets + push your branch, in one step:
   ```bash
   npm run deploy
   ```
   This runs `build:all` (esbuild for CSS/JS, sharp for image variants), stages
   everything, adds a `Build assets for deploy` commit **only if the build output
   changed**, and pushes the current branch to GitHub.
3. Open a PR and merge it into `main` on GitHub. The committed `dist/` +
   `manifest.json` travel through the merge, so `main` now has the built assets.
4. In **cPanel → Git Version Control → (repo) → Pull or Deploy**, click **Update
   from Remote** then **Deploy HEAD Commit**. The pull updates the files and
   `.cpanel.yml` restarts the app automatically.

That's the whole loop: `npm run deploy` → merge PR → cPanel deploy.

> **Build before the merge.** The only rule that matters: the branch that gets
> merged into `main` must contain a fresh build. `npm run deploy` guarantees that
> for the current branch, so run it as the last step before opening/updating the
> PR.

---

## What gets built

- `npm run build` → combines + minifies the 5 CSS files into one hashed bundle
  and minifies each JS file into `public/assets/dist/`. ~1s.
- `npm run build:images` → 480/800/1200/1600w WEBP variants for raster images
  into `public/assets/dist/img/`, never upscaling. ~20s.
- `npm run build:all` → both. Writes `public/assets/manifest.json`.
- `npm run deploy` → `build:all` + git add + conditional commit + push.

The server reads `manifest.json` to emit hashed asset URLs and image `srcset`s.
If it's missing (e.g. a deploy without the build), the templates fall back to the
raw source files — the site still works, just unoptimized.

---

## cPanel "Setup Node.js App" settings

- **Node version:** 18+ (match local if offered).
- **Application startup file:** `server.js`.
- **Environment variable:** `NODE_ENV=production`.
- **Port:** nothing to set — `server.js` uses `process.env.PORT`, which Passenger
  injects.
- **Dependencies:** run **"Run NPM Install"** once (installs express + ejs). You
  do **not** need the build tools (esbuild/sharp) on the server — they're
  devDependencies used only when you build locally. Re-run it only when
  `package.json` runtime deps change.

---

## Why the build output is committed (and the trade-off)

`sharp` won't install/run reliably on shared cPanel, and cPanel's "Run NPM
Install" skips `devDependencies` under `NODE_ENV=production` anyway — so building
on the host fails with `Cannot find module 'sharp'`. Committing the prebuilt
output sidesteps all of that and fits the git-pull deploy exactly.

Trade-off: the generated image variants (~21MB) live in the repo. They only
change when you change source images (sharp output is deterministic, so unchanged
images produce no diff). The hashed CSS/JS bundle changes on CSS/JS edits.

If this artifact noise becomes annoying later, the clean alternative is a GitHub
Actions workflow that builds in CI and deploys over SSH/FTP, keeping `main` free
of build output. Not set up today.

---

## Post-deploy sanity check

From the browser console on https://rojorevolution.com:
```js
await fetch('/assets/manifest.json').then(r => r.status);            // 200
[...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.href); // one /assets/dist/app.<hash>.css
document.querySelector('.logos-home-card')?.getAttribute('srcset');  // lists /assets/dist/img/... variants
```
If the CSS is still the 5 raw files and `srcset` is empty, the build didn't make
it into the deployed commit — rebuild (`npm run deploy`), re-merge, redeploy.

---

## Notes

- Changing `server.js` requires an app restart — `.cpanel.yml` handles that on
  every deploy.
- The craft-can thumbnails (`public/assets/images/projects/labels/cans/*.webp`,
  ~250KB at 276px) are below the pipeline's resize threshold, so the build does
  not shrink them; recompress manually if desired.
- `.cpanel.yml` assumes the app root is `/home/adyixrwf/rojorevolution`. If that
  changes, update the path there.
