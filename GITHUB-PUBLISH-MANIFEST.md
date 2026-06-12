# GitHub Publish Manifest

Generated: 2026-06-12T07:40:31-10:00
Updated: 2026-06-12T12:44:00-10:00
Repository: `larareoj-code/Trade-Repo`
Strategy: GitHub-first control repo for static/local-first product apps.

## Published So Far

- Root portfolio README.
- Verified public URL registry: `PUBLISHED-URLS.md`.
- Root GitHub Pages portfolio launcher: `index.html`, `pages.css`, `pages.js`.
- GitHub Pages deployment workflow: `.github/workflows/pages.yml`.
- Static serving marker: `.nojekyll`.
- Release package inventory with local ZIP hashes: `RELEASE-PACKAGES.md`.
- Storefront upload matrix: `STOREFRONT-UPLOAD-MATRIX.md`.
- Catalog JSON for the app portfolio.
- Full source for `apps/micro-offer-lab`.
- Full source for `apps/shorts-hook-lab`.
- Full source for `apps/client-welcome-kit`.
- Full source for `apps/rainy-day-quest-maker`.
- Full source for `apps/video-prompt-pack-builder`.
- Full source for `apps/passive-app-risk-calculator`.
- Full source for `apps/digital-bundle-builder`.

## Verified Live Apps

| Product | Public URL | Status |
|---|---|---|
| GitHub Pages Portfolio Launcher | https://larareoj-code.github.io/Trade-Repo/ | HTTP 200 verified |
| Micro Offer Lab | https://larareoj-code.github.io/Trade-Repo/apps/micro-offer-lab/index.html | HTTP 200 verified |
| Client Welcome Kit | https://larareoj-code.github.io/Trade-Repo/apps/client-welcome-kit/index.html | HTTP 200 verified |
| Digital Bundle Builder | https://larareoj-code.github.io/Trade-Repo/apps/digital-bundle-builder/index.html | HTTP 200 verified |
| Passive App Risk Calculator | https://larareoj-code.github.io/Trade-Repo/apps/passive-app-risk-calculator/index.html | HTTP 200 verified |
| Rainy Day Quest Maker | https://larareoj-code.github.io/Trade-Repo/apps/rainy-day-quest-maker/index.html | HTTP 200 verified |
| Shorts Hook Lab | https://larareoj-code.github.io/Trade-Repo/apps/shorts-hook-lab/index.html | HTTP 200 verified |
| Video Prompt Pack Builder | https://larareoj-code.github.io/Trade-Repo/apps/video-prompt-pack-builder/index.html | HTTP 200 verified |
| Listing Launch Auditor | https://listing-launch-auditor.vercel.app | HTTP 200 verified |
| Party Quest Maker | https://party-quest-maker.vercel.app | HTTP 200 verified |
| Story Spark Studio | https://story-spark-studio-two.vercel.app | HTTP 200 verified |

## Source Roots

| App | GitHub folder | Local source root | Package artifact | Status |
|---|---|---|---|---|
| Micro Offer Lab | `apps/micro-offer-lab` | `work/micro_offer_lab` | `work/micro_offer_lab/Micro-Offer-Lab.zip` | source published and Pages URL verified |
| Shorts Hook Lab | `apps/shorts-hook-lab` | `work/shorts_hook_lab` | `work/shorts_hook_lab/Shorts-Hook-Lab.zip` | source published and Pages URL verified |
| Client Welcome Kit | `apps/client-welcome-kit` | `work/client_welcome_kit` | `work/client_welcome_kit/Client-Welcome-Kit.zip` | source published and Pages URL verified |
| Rainy Day Quest Maker | `apps/rainy-day-quest-maker` | `work/rainy_day_quest_maker` | `work/rainy_day_quest_maker/Rainy-Day-Quest-Maker.zip` | source published and Pages URL verified |
| Video Prompt Pack Builder | `apps/video-prompt-pack-builder` | `work/deploy_team/next_product` | `work/deploy_team/next_product/Video-Prompt-Pack-Builder.zip` | source published and Pages URL verified |
| Passive App Risk Calculator | `apps/passive-app-risk-calculator` | `work/passive_app_risk_calculator` | `work/passive_app_risk_calculator/Passive-App-Risk-Calculator.zip` | source published and Pages URL verified |
| Digital Bundle Builder | `apps/digital-bundle-builder` | `work/digital_bundle_builder` | `work/digital_bundle_builder/Digital-Bundle-Builder.zip` | source published and Pages URL verified |

## Latest Micro Offer Lab Commits

- `9d6c2ab93b915b3f57899b7ebddb81f1d88511f0` - app index
- `311d0800b5e561690e1ae6f7d3c0b4502886880d` - README
- `1e120f59de63bbba58e366f75ac760480c5d1628` - marketplace listing draft
- `b93df427ac3be716e8f737265948478df51edbab` - license
- `2ec8ae612cc33f3e9e5dd950f8b4bf1158cec3ae` - privacy note
- `94437fe4e2b38286bf5330d500f3b268b2513e0c` - launcher card
- `4dc6b28fa0ebe1182b3c07932f0eddd47d651935` - URL registry
- `45b2e64e70326caa7aee2ab4b7ba47b14a5bf10f` - catalog
- `a0e8404d02bcaa9a3421cf32544c2a4302e2e61f` - release inventory
- `ad5dddcf58ad01dc34531d84ce976d50d47245f7` - storefront queue

## Connector Limitation

The current GitHub connector can create and update UTF-8 files. It does not expose a direct GitHub Releases asset upload flow in this session, so ZIP artifacts remain local or marketplace/release-only.

## Publishing Notes

- GitHub Pages is live and verified.
- `RELEASE-PACKAGES.md` is an inventory only, not a public binary release.
- `STOREFRONT-UPLOAD-MATRIX.md` is a planning/control document only, not a marketplace upload.
- Marketplace listings still require browser/account-state automation or manual upload.
