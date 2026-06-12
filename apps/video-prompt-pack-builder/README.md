# Video Prompt Pack Builder

Video Prompt Pack Builder is a static, local-first planning tool for creating sellable video production packs without API calls, subscriptions, or generation costs. It is inspired by multi-stage video planning workflows, but it stops at human-reviewable planning text.

## What it creates

- Video brief with audience, outcome, tone, runtime, and hook strategy
- Scene-by-scene plan for 15, 30, 45, or 60 second videos
- Cover, voiceover, caption, production, scene, and negative prompts
- Continuity checklist and safety/rights QA checks
- Copyable markdown export
- TXT and JSON downloads
- Local browser persistence through `localStorage`

## Run

Open `index.html` in any modern browser. No build step or server is required.

Optional local server:

```powershell
python -m http.server 4177
```

Then visit `http://localhost:4177`.

## Product boundaries

- No external APIs.
- No video, image, audio, or voice generation.
- No upload, publishing, account login, analytics, tracking, or network calls.
- No copyrighted assets are included.
- Outputs are planning templates, not guarantees of views, earnings, sales, or platform performance.

## Files

- `index.html` - static app shell
- `styles.css` - responsive product UI and print styles
- `generator.js` - deterministic prompt pack generator
- `app.js` - browser state, rendering, copy, and download behavior
- `MARKETPLACE-LISTING.md` - ready-to-edit listing copy
- `cover.svg` and `video-prompt-pack-builder-cover.png` - original cover art
- `LICENSE.txt` - MIT license

## Suggested use

Sell this as a no-spend creator planning kit, include it in a bundle with other local-first content tools, or use it internally to prepare video briefs before any paid generation or manual editing work begins.