# Published URL Registry

Generated: 2026-06-12T11:19:00-10:00

This registry records public deployment URLs that were verified after the user requested publishing. It does not claim marketplace publication unless a storefront URL is listed and verified.

## Verified Vercel Production URLs

| Product | Public URL | Status | Verification |
|---|---|---|---|
| Listing Launch Auditor | https://listing-launch-auditor.vercel.app | live | Vercel project READY; canonical domain returned HTTP 200 |
| Party Quest Maker | https://party-quest-maker.vercel.app | live | Vercel project READY; canonical domain returned HTTP 200 |
| Story Spark Studio | https://story-spark-studio-two.vercel.app | live | Vercel project READY; canonical domain returned HTTP 200 |

## Source-Ready But Not Publicly Hosted Here

| Surface | Status | Blocker |
|---|---|---|
| Trade-Repo portfolio launcher | Pages workflow installed | GitHub Pages expected URL still returns 404 after workflow publication; Pages settings/build status not confirmed |
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

## Verification Notes

- Chrome is installed and running, and the Codex Chrome Extension/native host checks pass, but the automation connection returned unavailable in this session.
- Vercel connector can inspect and fetch existing deployments, but direct deploy returned CLI instructions instead of creating a new deployment.
- Root workspace has no `.vercel/project.json`; linked Vercel projects exist for Listing Launch Auditor, Party Quest Maker, and Story Spark Studio.

## Guardrails

- No unsupported earnings claims were added.
- No payments, pricing settings, account settings, or marketplace listings were changed.
- No ZIP binaries were uploaded.
- No outreach was sent.