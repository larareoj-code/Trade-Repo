# Passive Income App Portfolio

GitHub-first control repo for the local-first apps and digital product utilities built in the Codex passive-income studio.

This repository is intentionally framed as a portfolio of low-touch product experiments, not guaranteed income. The apps are static or local-first unless their own README says otherwise. They do not make earnings promises, publish externally, send outreach, or provide regulated legal, financial, medical, or tax advice.

## Portfolio Launcher

The repo root now includes a GitHub Pages-ready static launcher:

- `index.html`
- `pages.css`
- `pages.js`
- `GITHUB-PAGES-SETUP.md`

If GitHub Pages is enabled from the default branch root, the launcher becomes the entry point for the app batch and links to each `apps/<slug>/index.html` surface.

## Release Packages

`RELEASE-PACKAGES.md` inventories local ZIP artifacts, SHA-256 hashes, and manual review status. It is a release-prep document only; ZIPs have not been uploaded to GitHub Releases or marketplaces from this step.

## Current GitHub Publication State

| App | Folder | GitHub status | Local source root |
|---|---|---|---|
| Shorts Hook Lab | `apps/shorts-hook-lab` | Source published and verified | `work/shorts_hook_lab` |
| Client Welcome Kit | `apps/client-welcome-kit` | Source published and verified | `work/client_welcome_kit` |
| Rainy Day Quest Maker | `apps/rainy-day-quest-maker` | Source published and verified | `work/rainy_day_quest_maker` |
| Video Prompt Pack Builder | `apps/video-prompt-pack-builder` | Source published and verified | `work/deploy_team/next_product` |
| Passive App Risk Calculator | `apps/passive-app-risk-calculator` | Source published and verified | `work/passive_app_risk_calculator` |
| Digital Bundle Builder | `apps/digital-bundle-builder` | Source published and verified | `work/digital_bundle_builder` |

Already-live sibling repositories remain active:

- [Listing Launch Auditor](https://github.com/larareoj-code/listing-launch-auditor)
- [Party Quest Maker](https://github.com/larareoj-code/party-quest-maker)
- [Story Spark Studio](https://github.com/larareoj-code/story-spark-studio)

## Deployment Notes

Each queued app is designed for static hosting. Most can run by opening `index.html` directly in a browser. To deploy through GitHub-backed hosting after source upload, import this repository and set the host root directory to the specific app folder.

For GitHub Pages, enable Pages from the default branch root and verify the launcher plus each app card before using the public URL in storefront listings. For Vercel or another host, create one project per app and set the project root to the desired `apps/<slug>` folder.

## Safety Boundaries

- No autonomous spending or account-side publishing logic is included.
- No fake scarcity, fake reviews, unsupported earnings claims, or spam outreach.
- Products are educational/workflow tools and should be reviewed before sale or customer delivery.
- ZIP packages and PNG screenshots remain local build artifacts unless released through GitHub Releases or a marketplace upload flow.

## Local Source Of Truth

This repo mirrors the control plane for the local Codex workspace. See `GITHUB-PUBLISH-MANIFEST.md` for source mapping, skipped binary artifacts, and next deployment steps.
