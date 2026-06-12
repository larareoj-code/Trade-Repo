# Published URL Registry

Generated: 2026-06-12T11:19:00-10:00

This registry records public deployment URLs that were verified after the user requested publishing. It does not claim marketplace publication unless a storefront URL is listed and verified.

## Verified Vercel Production URLs

| Product | Public URL | Status | Verification |
|---|---|---|---|
| Listing Launch Auditor | https://listing-launch-auditor.vercel.app | live | Vercel project READY; canonical domain returned HTTP 200 |
| Party Quest Maker | https://party-quest-maker.vercel.app | live | Vercel project READY; canonical domain returned HTTP 200 |
| Story Spark Studio | https://story-spark-studio-two.vercel.app | live | Vercel project READY; canonical domain returned HTTP 200 |

## Verified GitHub Pages URLs

| Product | Public URL | Status | Verification |
|---|---|---|---|
| Portfolio Launcher | https://larareoj-code.github.io/Trade-Repo/ | live | GitHub Pages returned HTTP 200; title `Passive Income App Portfolio` |
| Client Welcome Kit | https://larareoj-code.github.io/Trade-Repo/apps/client-welcome-kit/index.html | live | HTTP 200 verified |
| Digital Bundle Builder | https://larareoj-code.github.io/Trade-Repo/apps/digital-bundle-builder/index.html | live | HTTP 200 verified |
| Passive App Risk Calculator | https://larareoj-code.github.io/Trade-Repo/apps/passive-app-risk-calculator/index.html | live | HTTP 200 verified |
| Rainy Day Quest Maker | https://larareoj-code.github.io/Trade-Repo/apps/rainy-day-quest-maker/index.html | live | HTTP 200 verified |
| Shorts Hook Lab | https://larareoj-code.github.io/Trade-Repo/apps/shorts-hook-lab/index.html | live | HTTP 200 verified |
| Video Prompt Pack Builder | https://larareoj-code.github.io/Trade-Repo/apps/video-prompt-pack-builder/index.html | live | HTTP 200 verified |

## Source-Ready But Not Publicly Hosted Here

| Surface | Status | Blocker |
|---|---|---|
| Trade-Repo release ZIPs | inventoried | GitHub connector cannot upload release assets in this session |
| Gumroad listings | not executed in this turn | Marketplace browser upload requires working Chrome/in-app account automation |
| Payhip listings | not executed in this turn | Marketplace browser upload requires working Chrome/in-app account automation |
| Ko-fi/Fourthwall/Buy Me a Coffee listings | not executed in this turn | Marketplace browser upload requires working Chrome/in-app account automation |

## GitHub Pages Publish Attempt

- Added `.github/workflows/pages.yml` with the official Pages Actions flow.
- Added `.nojekyll` so static files are served without Jekyll processing.
- Workflow commit: `d32f8a0c78ebe7b1047cd8cd0b1e2d2feda79dd5`.
- `.nojekyll` commit: `bbbed4caa3e83ac7362f45797bd75ce7a5beea00`.
- Verification after publication: `https://larareoj-code.github.io/Trade-Repo/` still returned HTTP 404.
- Workflow status check: latest run completed with failure at `Configure Pages`; upload and deploy steps were skipped.
- Failed run: `https://github.com/larareoj-code/Trade-Repo/actions/runs/27444597245`.
- Browser settings update: GitHub Pages source was changed from `Deploy from a branch` to `GitHub Actions`.
- Retry workflow commit with `enablement: true`: `3f517856b8a0f34f58bdad3ab527d69bdbb66669`.
- Retry run still failed because the workflow token could not create the Pages site before the browser settings change: `https://github.com/larareoj-code/Trade-Repo/actions/runs/27446620033`.
- Final trigger commit: `d20b1e9b686289a84752e84b21955e2eb1d19cd2`.
- Successful run: `https://github.com/larareoj-code/Trade-Repo/actions/runs/27446711820`.
- Final verification: root launcher and all six linked static app pages returned HTTP 200.

## Verification Notes

- Chrome is installed and running, and the Codex Chrome Extension/native host checks pass, but the automation connection returned unavailable in this session.
- Vercel connector can inspect and fetch existing deployments, but direct deploy returned CLI instructions instead of creating a new deployment.
- Root workspace has no `.vercel/project.json`; linked Vercel projects exist for Listing Launch Auditor, Party Quest Maker, and Story Spark Studio.

## Guardrails

- No unsupported earnings claims were added.
- No payments, pricing settings, account settings, or marketplace listings were changed.
- No ZIP binaries were uploaded.
- No outreach was sent.