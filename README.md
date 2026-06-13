# Passive Income App Portfolio

GitHub-first control repo for local-first apps and digital product utilities built in the Codex passive-income studio.

This repository is framed as a portfolio of low-touch product experiments, not guaranteed income. GitHub Pages is the free preview and demo layer. A product is only considered paid when `PUBLISHED-URLS.md` lists a verified storefront checkout or a gated license flow.

## Verified Live Surfaces

These public URLs were verified after publishing:

- [GitHub Pages Portfolio Launcher](https://larareoj-code.github.io/Trade-Repo/)
- [Project Deposit Readiness Kit preview](https://larareoj-code.github.io/Trade-Repo/apps/project-deposit-readiness-kit/index.html)
- [Project Deposit Readiness Kit paid Payhip checkout](https://payhip.com/b/dcWFG)
- [Scope Creep Rescue Kit preview](https://larareoj-code.github.io/Trade-Repo/apps/scope-creep-rescue-kit/index.html)
- [Sales Page Snack Pack preview](https://larareoj-code.github.io/Trade-Repo/apps/sales-page-snack-pack/index.html)
- [Micro Offer Lab preview](https://larareoj-code.github.io/Trade-Repo/apps/micro-offer-lab/index.html)
- [Preview Caption Kit preview](https://larareoj-code.github.io/Trade-Repo/apps/preview-caption-kit/index.html)
- [Digital Bundle Builder preview](https://larareoj-code.github.io/Trade-Repo/apps/digital-bundle-builder/index.html)
- [Digital Bundle Builder paid Gumroad checkout](https://larareoj.gumroad.com/l/digital-bundle-builder)
- [Listing Launch Auditor](https://listing-launch-auditor.vercel.app)
- [Party Quest Maker](https://party-quest-maker.vercel.app)
- [Story Spark Studio](https://story-spark-studio-two.vercel.app)

See `PUBLISHED-URLS.md` for verification notes, checkout status, deployment status, and blockers for remaining channels.

## Payment Model

- Public app pages are free previews unless a paid storefront link is shown.
- Paid ZIP/toolkit access should be handled by Gumroad, Payhip, Ko-fi, Fourthwall, Buy Me a Coffee, or a future server-side checkout/license gate.
- Current verified checkouts: twenty-one Payhip products plus Digital Bundle Builder on Gumroad.
- Next paid listing target: continue original, non-duplicative service-business utility products on Payhip while Gumroad and Ko-fi upload paths remain blocked.

## Portfolio Launcher

The repo root includes a verified GitHub Pages static launcher:

- `index.html`
- `pages.css`
- `pages.js`
- `.github/workflows/pages.yml`
- `.nojekyll`

Live launcher: https://larareoj-code.github.io/Trade-Repo/

The launcher links to each `apps/<slug>/index.html` preview and shows whether the matching paid checkout is live or still upload-ready.

## Release Packages

`RELEASE-PACKAGES.md` inventories local ZIP artifacts, SHA-256 hashes, and manual review status. It is a release-prep document only; ZIPs have not been uploaded to GitHub Releases from this step.

`STOREFRONT-UPLOAD-MATRIX.md` maps the product ZIPs to suggested storefront channels, price bands, review notes, and post-upload verification steps.

## Current GitHub Publication State

| App | Folder | GitHub status | Paid status | Local source root |
|---|---|---|---|---|
| Project Deposit Readiness Kit | `apps/project-deposit-readiness-kit` | Pages URL verified | Payhip checkout verified | `work/project_deposit_readiness_kit` |
| Scope Creep Rescue Kit | `apps/scope-creep-rescue-kit` | Pages URL verified | paid ZIP ready; no checkout yet | `work/scope_creep_rescue_kit` |
| Sales Page Snack Pack | `apps/sales-page-snack-pack` | Pages URL verified | paid ZIP ready; no checkout yet | `work/sales_page_snack_pack` |
| Micro Offer Lab | `apps/micro-offer-lab` | Pages URL verified | paid ZIP ready; no checkout yet | `work/micro_offer_lab` |
| Preview Caption Kit | `apps/preview-caption-kit` | Pages URL verified | paid ZIP ready; no checkout yet | `work/preview_caption_kit` |
| Digital Bundle Builder | `apps/digital-bundle-builder` | Pages URL verified | Gumroad checkout verified | `work/digital_bundle_builder` |
| Client Welcome Kit | `apps/client-welcome-kit` | Pages URL verified | paid ZIP ready; no checkout yet | `work/client_welcome_kit` |
| Shorts Hook Lab | `apps/shorts-hook-lab` | Pages URL verified | paid ZIP ready; no checkout yet | `work/shorts_hook_lab` |
| Rainy Day Quest Maker | `apps/rainy-day-quest-maker` | Pages URL verified | paid ZIP ready; no checkout yet | `work/rainy_day_quest_maker` |
| Video Prompt Pack Builder | `apps/video-prompt-pack-builder` | Pages URL verified | paid ZIP ready; no checkout yet | `work/deploy_team/next_product` |
| Passive App Risk Calculator | `apps/passive-app-risk-calculator` | Pages URL verified | lead magnet first | `work/passive_app_risk_calculator` |

Already-live sibling repositories remain active:

- [Listing Launch Auditor](https://github.com/larareoj-code/listing-launch-auditor)
- [Party Quest Maker](https://github.com/larareoj-code/party-quest-maker)
- [Story Spark Studio](https://github.com/larareoj-code/story-spark-studio)

## Publishing Notes

Each queued app is designed for static hosting. The GitHub Pages launcher is the verified public preview hub for the static app batch.

- Review copy and files before customer delivery.
- Keep product promises specific, original, and easy to verify.
- Do not tell users a product is paid unless a checkout URL or gated license flow exists.
- ZIP packages and PNG screenshots remain local build artifacts unless released through GitHub Releases or a marketplace upload flow.
- Digital Bundle Builder Gumroad page verified live at https://larareoj.gumroad.com/l/digital-bundle-builder on 2026-06-12T13:25:36-10:00.

## Local Source Of Truth

This repo mirrors the control plane for the local Codex workspace. See `GITHUB-PUBLISH-MANIFEST.md` for source mapping, skipped binary artifacts, and next deployment steps.
