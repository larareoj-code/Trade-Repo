# GitHub Publish Manifest

Generated: 2026-06-12T07:40:31-10:00
Updated: 2026-06-12T09:12:00-10:00
Repository: `larareoj-code/Trade-Repo`
Strategy: GitHub-first control repo for static/local-first product apps.

## Published So Far

- Root portfolio README.
- Catalog JSON for the queued app portfolio.
- Per-app runbooks under `apps/<slug>/README.md`.
- Full source for `apps/shorts-hook-lab`.
- Full source for `apps/client-welcome-kit`.
- Full source for `apps/passive-app-risk-calculator`.
- Full source for `apps/digital-bundle-builder`.

## Queued Source Roots

| App | GitHub folder | Local source root | Package artifact | Status |
|---|---|---|---|---|
| Shorts Hook Lab | `apps/shorts-hook-lab` | `work/shorts_hook_lab` | `work/shorts_hook_lab/Shorts-Hook-Lab.zip` | source published and verified |
| Client Welcome Kit | `apps/client-welcome-kit` | `work/client_welcome_kit` | `work/client_welcome_kit/Client-Welcome-Kit.zip` | source published and verified |
| Rainy Day Quest Maker | `apps/rainy-day-quest-maker` | `work/rainy_day_quest_maker` | `work/rainy_day_quest_maker/Rainy-Day-Quest-Maker.zip` | source queued |
| Video Prompt Pack Builder | `apps/video-prompt-pack-builder` | `work/deploy_team/next_product` | `work/deploy_team/next_product/Video-Prompt-Pack-Builder.zip` | source queued |
| Passive App Risk Calculator | `apps/passive-app-risk-calculator` | `work/passive_app_risk_calculator` | `work/passive_app_risk_calculator/Passive-App-Risk-Calculator.zip` | source published and verified |
| Digital Bundle Builder | `apps/digital-bundle-builder` | `work/digital_bundle_builder` | `work/digital_bundle_builder/Digital-Bundle-Builder.zip` | source published and verified |

## Connector Limitation

The current GitHub connector can create and update UTF-8 files and Git tree objects. It does not expose a direct local-folder upload or GitHub Releases asset upload flow in this session, so source upload is proceeding in app-sized commits. ZIP and PNG package artifacts remain local or marketplace/release-only.

## Safety Notes

- No unsupported earnings claims were added.
- No regulated advice functionality was added.
- No account settings, marketplace products, payments, emails, or outreach were changed.
- GitHub publication is source-control/distribution preparation only; public hosting still requires a host import/deployment step after source files are uploaded.

## Next Steps

1. Continue source upload for the remaining two queued apps.
2. Use GitHub Releases or marketplace upload tools for ZIP/PNG binaries.
3. Import each completed `apps/<slug>` folder into Vercel or another static host when authenticated.
4. Verify public pages after host deployment before adding marketplace links.
