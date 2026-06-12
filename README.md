# Passive Income App Portfolio

GitHub-first control repo for the local-first apps and digital product utilities built in the Codex passive-income studio.

This repository is intentionally framed as a portfolio of low-touch product experiments, not guaranteed income. The apps are static or local-first unless their own README says otherwise. They do not make earnings promises, publish externally, send outreach, or provide regulated legal, financial, medical, or tax advice.

## Current GitHub Publication State

| App | Folder | GitHub status | Local source root |
|---|---|---|---|
| Shorts Hook Lab | `apps/shorts-hook-lab` | Runbook published, source batch queued | `work/shorts_hook_lab` |
| Client Welcome Kit | `apps/client-welcome-kit` | Runbook published, source batch queued | `work/client_welcome_kit` |
| Rainy Day Quest Maker | `apps/rainy-day-quest-maker` | Runbook published, source batch queued | `work/rainy_day_quest_maker` |
| Video Prompt Pack Builder | `apps/video-prompt-pack-builder` | Runbook published, source batch queued | `work/deploy_team/next_product` |
| Passive App Risk Calculator | `apps/passive-app-risk-calculator` | Runbook published, source batch queued | `work/passive_app_risk_calculator` |
| Digital Bundle Builder | `apps/digital-bundle-builder` | Runbook published, source batch queued | `work/digital_bundle_builder` |

Already-live sibling repositories remain active:

- [Listing Launch Auditor](https://github.com/larareoj-code/listing-launch-auditor)
- [Party Quest Maker](https://github.com/larareoj-code/party-quest-maker)
- [Story Spark Studio](https://github.com/larareoj-code/story-spark-studio)

## Deployment Notes

Each queued app is designed for static hosting. Most can run by opening `index.html` directly in a browser. To deploy through GitHub-backed hosting after source upload, import this repository and set the host root directory to the specific app folder.

For Vercel, create one project per app and set the project root to the desired `apps/<slug>` folder. For GitHub Pages, publish one app at a time from the selected folder or copy the selected app files into a Pages branch/root.

## Safety Boundaries

- No autonomous spending or account-side publishing logic is included.
- No fake scarcity, fake reviews, unsupported earnings claims, or spam outreach.
- Products are educational/workflow tools and should be reviewed before sale or customer delivery.
- ZIP packages and PNG screenshots remain local build artifacts unless released through GitHub Releases or a marketplace upload flow.

## Local Source Of Truth

This repo mirrors the control plane for the local Codex workspace. See `GITHUB-PUBLISH-MANIFEST.md` for source mapping, skipped binary artifacts, and next deployment steps.
