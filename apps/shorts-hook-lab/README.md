# Shorts Hook Lab

A complete static MVP for small creators who want to turn one topic into a shoot-ready short-form content kit.

## What it does

- Generates five hooks and five titles
- Adapts guidance for fast-feed, visual-feed, and search-feed short-form channels
- Builds a timed shot list for 15, 30, 45, or 60 seconds
- Writes a caption, focused hashtags, and channel-specific posting checklist
- Produces deterministic results with no API, account, or network requirement
- Saves up to 20 recent kits in browser `localStorage`
- Supports section copy, full-kit copy, text/JSON download, and print
- Includes honest Free and optional Lifetime edition positioning

## Run

Open `index.html` in a modern browser. No build step or server is required.

For the focused test suite, open `tests.html`. Every test should report `PASS`.

For an optional local HTTP preview on Windows:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Then open `http://localhost:4177`.

## Customize

- Product styling: `styles.css`
- Generator formulas and platform guidance: `generator.js`
- Interactions, storage, and export: `app.js`
- Pricing and upgrade language: the `upgradeDialog` section in `index.html`

## Static deployment

Upload the folder to any static host such as Netlify, Cloudflare Pages, GitHub Pages, or an ordinary web server. No environment variables are needed.

## Commercial notes

The current Free edition is fully usable. The Lifetime modal describes a credible product expansion but does not process payments. Connect the upgrade button to your checkout provider only after you have created the paid deliverables. Do not advertise features that are not actually shipped.

See `MARKETPLACE-LISTING.md` and `PRIVACY.md`.
