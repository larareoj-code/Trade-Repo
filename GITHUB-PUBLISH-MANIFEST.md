# GitHub Publish Manifest

Generated: 2026-06-12T07:40:31-10:00
Updated: 2026-06-12T12:31:00-10:00
Repository: `larareoj-code/Trade-Repo`
Strategy: GitHub-first control repo for static/local-first product apps.

## Published So Far

- Root portfolio README.
- Verified public URL registry: `PUBLISHED-URLS.md`.
- Root GitHub Pages portfolio launcher: `index.html`, `pages.css`, `pages.js`.
- GitHub Pages deployment workflow: `.github/workflows/pages.yml`.
- Static serving marker: `.nojekyll`.
- GitHub Pages setup runbook: `GITHUB-PAGES-SETUP.md`.
- Release package inventory with local ZIP hashes: `RELEASE-PACKAGES.md`.
- Storefront upload matrix: `STOREFRONT-UPLOAD-MATRIX.md`.
- Catalog JSON for the queued app portfolio.
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
| Shorts Hook Lab | `apps/shorts-hook-lab` | `work/shorts_hook_lab` | `work/shorts_hook_lab/Shorts-Hook-Lab.zip` | source published and Pages URL verified |
| Client Welcome Kit | `apps/client-welcome-kit` | `work/client_welcome_kit` | `work/client_welcome_kit/Client-Welcome-Kit.zip` | source published and Pages URL verified |
| Rainy Day Quest Maker | `apps/rainy-day-quest-maker` | `work/rainy_day_quest_maker` | `work/rainy_day_quest_maker/Rainy-Day-Quest-Maker.zip` | source published and Pages URL verified |
| Video Prompt Pack Builder | `apps/video-prompt-pack-builder` | `work/deploy_team/next_product` | `work/deploy_team/next_product/Video-Prompt-Pack-Builder.zip` | source published and Pages URL verified |
| Passive App Risk Calculator | `apps/passive-app-risk-calculator` | `work/passive_app_risk_calculator` | `work/passive_app_risk_calculator/Passive-App-Risk-Calculator.zip` | source published and Pages URL verified |
| Digital Bundle Builder | `apps/digital-bundle-builder` | `work/digital_bundle_builder` | `work/digital_bundle_builder/Digital-Bundle-Builder.zip` | source published and Pages URL verified |

## Portfolio Launcher Commits

- `9cfa1831e0814ef1ba566df404e7831873eb5864` - root `index.html`
- `64f06e73129d62c84c3008c9b177643f83b019d0` - root `pages.css`
- `491aac4594a58ea14a4ec54278b470aea056bda6` - root `pages.js`
- `505ac03f26abe37f5835569f2efc6ed1f6287b97` - `GITHUB-PAGES-SETUP.md`
- `e19eede1bd50db46d8e52c2555213b443304f744` - `RELEASE-PACKAGES.md`
- `f426aef0a85abe21627d138c7bccd19929eda885` - `STOREFRONT-UPLOAD-MATRIX.md`
- `914d349e2d96573ca1ec9f4db885353cbb75f904` - initial `PUBLISHED-URLS.md`
- `d32f8a0c78ebe7b1047cd8cd0b1e2d2feda79dd5` - `.github/workflows/pages.yml`
- `bbbed4caa3e83ac7362f45797bd75ce7a5beea00` - `.nojekyll`
- `3f517856b8a0f34f58bdad3ab527d69bdbb66669` - Pages workflow enablement retry
- `d20b1e9b686289a84752e84b21955e2eb1d19cd2` - trigger after Pages source changed to GitHub Actions
- `a9fc73e08cf6341122c612fc65638f3deffb653d` - registry marked GitHub Pages hub live

## Connector Limitation

The current GitHub connector can create and update UTF-8 files and Git tree objects. It does not expose a direct local-folder upload or GitHub Releases asset upload flow in this session, so source upload proceeded in app-sized commits. ZIP and PNG package artifacts remain local or marketplace/release-only.

## Safety Notes

- No unsupported earnings claims were added.
- No regulated advice functionality was added.
- GitHub Pages source was changed to GitHub Actions to publish the public static hub.
- No marketplace products, payments, emails, or outreach were changed.
- `RELEASE-PACKAGES.md` is an inventory only, not a public binary release.
- `STOREFRONT-UPLOAD-MATRIX.md` is a planning/control document only, not a marketplace upload.
- `PUBLISHED-URLS.md` records verified public URLs and current blockers for unexecuted channels.

## Next Steps

1. Use the verified GitHub Pages hub and three verified Vercel URLs in storefront listings where appropriate.
2. Use GitHub Releases or marketplace upload tools for ZIP/PNG binaries when a release flow is available.
3. Use `STOREFRONT-UPLOAD-MATRIX.md` to prioritize manual Gumroad, Payhip, Ko-fi, Fourthwall, and Buy Me a Coffee uploads.
4. Use the local learning ledger and Obsidian deployment history as the decision log before selecting the next build lane.
