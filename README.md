# Passive Income App Portfolio

GitHub-first control repo for local-first apps and digital product utilities built in the Codex passive-income studio.

This repository is framed as a portfolio of low-touch product experiments, not guaranteed income. The apps are static or local-first unless their own README says otherwise.

## Verified Live Apps

These public URLs were verified after publishing:

- [GitHub Pages Portfolio Launcher](https://larareoj-code.github.io/Trade-Repo/)
- [Micro Offer Lab](https://larareoj-code.github.io/Trade-Repo/apps/micro-offer-lab/index.html)
- [Listing Launch Auditor](https://listing-launch-auditor.vercel.app)
- [Party Quest Maker](https://party-quest-maker.vercel.app)
- [Story Spark Studio](https://story-spark-studio-two.vercel.app)
- [Digital Bundle Builder on Gumroad](https://larareoj.gumroad.com/l/digital-bundle-builder)

See `PUBLISHED-URLS.md` for verification notes, deployment status, and blockers for remaining channels.

## Portfolio Launcher

The repo root includes a verified GitHub Pages static launcher:

- `index.html`
- `pages.css`
- `pages.js`
- `.github/workflows/pages.yml`
- `.nojekyll`

Live launcher: https://larareoj-code.github.io/Trade-Repo/

The launcher links to each `apps/<slug>/index.html` surface. Seven app-card URLs were verified with HTTP 200 after Pages deployment.

## Release Packages

`RELEASE-PACKAGES.md` inventories local ZIP artifacts, SHA-256 hashes, and manual review status. It is a release-prep document only; ZIPs have not been uploaded to GitHub Releases or marketplaces from this step.

`STOREFRONT-UPLOAD-MATRIX.md` maps the product ZIPs to suggested storefront channels, price bands, review notes, and post-upload verification steps.

## Current GitHub Publication State

| App | Folder | GitHub status | Local source root |
|---|---|---|---|
| Micro Offer Lab | `apps/micro-offer-lab` | Source published and Pages URL verified | `work/micro_offer_lab` |
| Shorts Hook Lab | `apps/shorts-hook-lab` | Source published and Pages URL verified | `work/shorts_hook_lab` |
| Client Welcome Kit | `apps/client-welcome-kit` | Source published and Pages URL verified | `work/client_welcome_kit` |
| Rainy Day Quest Maker | `apps/rainy-day-quest-maker` | Source published and Pages URL verified | `work/rainy_day_quest_maker` |
| Video Prompt Pack Builder | `apps/video-prompt-pack-builder` | Source published and Pages URL verified | `work/deploy_team/next_product` |
| Passive App Risk Calculator | `apps/passive-app-risk-calculator` | Source published and Pages URL verified | `work/passive_app_risk_calculator` |
| Digital Bundle Builder | `apps/digital-bundle-builder` | Source, Pages URL, and Gumroad product verified | `work/digital_bundle_builder` |

Already-live sibling repositories remain active:

- [Listing Launch Auditor](https://github.com/larareoj-code/listing-launch-auditor)
- [Party Quest Maker](https://github.com/larareoj-code/party-quest-maker)
- [Story Spark Studio](https://github.com/larareoj-code/story-spark-studio)

## Publishing Notes

Each queued app is designed for static hosting. The GitHub Pages launcher is the verified public hub for the static app batch.

- Review copy and files before customer delivery.
- Keep product promises specific, original, and easy to verify.
- ZIP packages and PNG screenshots remain local build artifacts unless released through GitHub Releases or a marketplace upload flow.
- Digital Bundle Builder Gumroad page verified live at https://larareoj.gumroad.com/l/digital-bundle-builder on 2026-06-12T13:25:36-10:00.

## Local Source Of Truth

This repo mirrors the control plane for the local Codex workspace. See `GITHUB-PUBLISH-MANIFEST.md` for source mapping, skipped binary artifacts, and next deployment steps.
