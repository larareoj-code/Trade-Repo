# GitHub Publish Manifest

Generated: 2026-06-12T07:40:31-10:00
Updated: 2026-06-12T11:09:00-10:00
Repository: `larareoj-code/Trade-Repo`
Strategy: GitHub-first control repo for static/local-first product apps.

## Published So Far

- Root portfolio README.
- Root GitHub Pages-ready portfolio launcher: `index.html`, `pages.css`, `pages.js`.
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

## Source Roots

| App | GitHub folder | Local source root | Package artifact | Status |
|---|---|---|---|---|
| Shorts Hook Lab | `apps/shorts-hook-lab` | `work/shorts_hook_lab` | `work/shorts_hook_lab/Shorts-Hook-Lab.zip` | source published and verified |
| Client Welcome Kit | `apps/client-welcome-kit` | `work/client_welcome_kit` | `work/client_welcome_kit/Client-Welcome-Kit.zip` | source published and verified |
| Rainy Day Quest Maker | `apps/rainy-day-quest-maker` | `work/rainy_day_quest_maker` | `work/rainy_day_quest_maker/Rainy-Day-Quest-Maker.zip` | source published and verified |
| Video Prompt Pack Builder | `apps/video-prompt-pack-builder` | `work/deploy_team/next_product` | `work/deploy_team/next_product/Video-Prompt-Pack-Builder.zip` | source published and verified |
| Passive App Risk Calculator | `apps/passive-app-risk-calculator` | `work/passive_app_risk_calculator` | `work/passive_app_risk_calculator/Passive-App-Risk-Calculator.zip` | source published and verified |
| Digital Bundle Builder | `apps/digital-bundle-builder` | `work/digital_bundle_builder` | `work/digital_bundle_builder/Digital-Bundle-Builder.zip` | source published and verified |

## Portfolio Launcher Commits

- `9cfa1831e0814ef1ba566df404e7831873eb5864` - root `index.html`
- `64f06e73129d62c84c3008c9b177643f83b019d0` - root `pages.css`
- `491aac4594a58ea14a4ec54278b470aea056bda6` - root `pages.js`
- `505ac03f26abe37f5835569f2efc6ed1f6287b97` - `GITHUB-PAGES-SETUP.md`
- `e19eede1bd50db46d8e52c2555213b443304f744` - `RELEASE-PACKAGES.md`
- `f426aef0a85abe21627d138c7bccd19929eda885` - `STOREFRONT-UPLOAD-MATRIX.md`

## Connector Limitation

The current GitHub connector can create and update UTF-8 files and Git tree objects. It does not expose a direct local-folder upload or GitHub Releases asset upload flow in this session, so source upload proceeded in app-sized commits. ZIP and PNG package artifacts remain local or marketplace/release-only.

## Safety Notes

- No unsupported earnings claims were added.
- No regulated advice functionality was added.
- No account settings, marketplace products, payments, emails, or outreach were changed.
- GitHub publication is source-control/distribution preparation only; public hosting still requires GitHub Pages enablement or another host import/deployment step.
- `RELEASE-PACKAGES.md` is an inventory only, not a public binary release.
- `STOREFRONT-UPLOAD-MATRIX.md` is a planning/control document only, not a marketplace upload.

## Next Steps

1. Enable GitHub Pages from the default branch root when ready.
2. Verify the launcher and each app card after Pages builds.
3. Use GitHub Releases or marketplace upload tools for ZIP/PNG binaries when a release flow is available.
4. Use `STOREFRONT-UPLOAD-MATRIX.md` to prioritize manual Gumroad, Payhip, Ko-fi, Fourthwall, and Buy Me a Coffee uploads.
5. Use the local learning ledger and Obsidian deployment history as the decision log before selecting the next build lane.
