# Storefront Upload Matrix

Generated: 2026-06-12T11:08:00-10:00
Updated: 2026-06-13T07:03:57-10:00

Purpose: convert the release package inventory into a practical upload queue for paid storefronts. GitHub Pages is only the free preview layer.

## Verified Storefront Listings

| Product | Platform | Public URL | Price | Verification |
|---|---|---|---:|---|
| Rush Fee Calculator | Payhip | https://payhip.com/b/2a3io | $19 | HTTP 200; title, price, and boundary language present |
| Invoice Follow-Up Kit | Payhip | https://payhip.com/b/6GLdn | $19 | HTTP 200; title, price, and boundary language present |
| Party Quest Maker - Web App Source Kit | Payhip | https://payhip.com/b/lgdk8 | $19 | HTTP 200; title, price, source-kit language, and no-guarantee language present |
| Circuit Courier - Static HTML5 Puzzle Game | Payhip | https://payhip.com/b/JpDq4 | $19 | HTTP 200; title, price, and no-guarantee language present |
| Signal Stack Arcade - HTML5 Creator Game Kit | Payhip | https://payhip.com/b/jgQRm | $9 | HTTP 200; title, price, and no-promise language present |
| Giggle Spark Organic Growth System | Payhip | https://payhip.com/b/aeArL | $9 | HTTP 200; title, price, no-guarantee note, and no-spam guardrail present |
| Threadline Tiles - SwiftUI iOS Puzzle Game Source Kit | Payhip | https://payhip.com/b/hnFNM | $19 | HTTP 200; title, price, and buyer-note present |
| Story Spark Studio Marketplace Pack | Payhip | https://payhip.com/b/Clfqb | $19 | HTTP 200; title and price present |
| Pulse Pop Arcade Creator Game Kit | Payhip | https://payhip.com/b/PI49k | $9 | HTTP 200; title and price present |
| Passive App Risk Calculator | Payhip | https://payhip.com/b/Zsjke | $9 | HTTP 200; title and price present |
| Scope Creep Rescue Kit | Payhip | https://payhip.com/b/1QTL0 | $19 | HTTP 200; title and price present |
| Sales Page Snack Pack | Payhip | https://payhip.com/b/lWBKA | $9 | HTTP 200; title and price present |
| Micro Offer Lab | Payhip | https://payhip.com/b/cNulr | $9 | HTTP 200; title and price present |
| Preview Caption Kit | Payhip | https://payhip.com/b/15pdM | $9 | HTTP 200; title and price present |
| Client Welcome Kit | Payhip | https://payhip.com/b/z3dep | $19 | HTTP 200; title and price present |
| Video Prompt Pack Builder | Payhip | https://payhip.com/b/1NYvO | $19 | HTTP 200; title and price present |
| Shorts Hook Lab | Payhip | https://payhip.com/b/hsoWn | $9 | HTTP 200; title and price present |
| Listing Launch Auditor | Payhip | https://payhip.com/b/bHoKZ | $19 | HTTP 200; title and price present |
| Rainy Day Quest Maker | Payhip | https://payhip.com/b/1Aezk | $9 | HTTP 200; title and price present |
| Digital Bundle Builder | Gumroad | https://larareoj.gumroad.com/l/digital-bundle-builder | $19 | Public page live; no `not currently for sale` text; checkout button verified in Chrome |

## Remaining Queue

| Priority | Product | Primary platform | Price band | Checkout status | Required review |
|---:|---|---|---:|---|---|
| 1 | New Gumroad duplicates | Gumroad | varies | blocked | file chooser upload path must attach ZIP before publish |
| 2 | Ko-fi listings | Ko-fi | varies | blocked | location confirmation and file chooser upload path |
| 3 | Fourthwall / Buy Me a Coffee | platform-specific | varies | blocked | no verified upload flow completed in this pass |

## Platform Fit

### Payhip

Payhip is currently the most reliable upload route in Chrome and has now published nineteen verified ZIP/source products in this portfolio.

### Gumroad

Existing Digital Bundle Builder checkout is live. New Gumroad products are blocked because the file chooser did not open for the ZIP upload controls during this pass. Do not publish empty shells.

### Ko-fi

Ko-fi shop is accessible and already has a prior shop product, but new product upload was blocked by file chooser timeout. Ko-fi also displays a location-confirmation alert for payment acceptance.

## Post-Upload Verification Checklist

For each public listing:

1. Confirm title, price, ZIP, cover, and preview images are correct.
2. Confirm description matches the included files.
3. Confirm refund/support text is present.
4. Confirm download delivers the expected ZIP.
5. Record public URL, platform, price, upload timestamp, and package hash in the learning ledger.
6. Add the paid URL to the hub card and `catalog.json`.
7. Post a short Slack update with the product URL and any blockers.
8. Add the public URL to Obsidian deployment history.

## Current Blockers

- Gumroad new listing upload is blocked by Chrome file chooser behavior.
- Ko-fi new listing upload is blocked by file chooser behavior and location confirmation.
- Payhip cover uploads need JPG/PNG/GIF; SVG cover assets must be converted before upload.
- ZIP artifacts are inventoried but not uploaded as GitHub Release assets.
