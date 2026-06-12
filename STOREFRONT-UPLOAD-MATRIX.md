# Storefront Upload Matrix

Generated: 2026-06-12T11:08:00-10:00
Updated: 2026-06-12T14:10:00-10:00

Purpose: convert the release package inventory into a practical upload queue for paid storefronts. GitHub Pages is only the free preview layer.

## Verified Storefront Listings

| Product | Platform | Public URL | Price | Verification |
|---|---|---|---:|---|
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
| 1 | Passive App Risk Calculator | Lead magnet / bundle | free-$9 | keep free for now | educational positioning |
| 2 | Story Spark Studio Marketplace Pack | Payhip or Gumroad | $19 | review first | privacy, child safety, license flow |
| 3 | Pulse Pop Arcade Creator Game Kit | Payhip or Fourthwall | $5-$15 | review first | game rights and QA |
| 4 | Threadline Tiles SwiftUI Source Kit | Payhip | $9-$29 | hold | iOS signing/platform policy |
| 5 | Giggle Spark Organic Growth System | Ko-fi or Payhip | $9-$19 | hold | no traffic or monetization claims |

## Platform Fit

### Payhip

Payhip is currently the most reliable upload route in Chrome and successfully published nine ZIP products in this pass.

### Gumroad

Existing Digital Bundle Builder checkout is live. New Gumroad products are blocked because the file chooser did not open for the ZIP upload controls during this pass. A Scope Creep Rescue Kit product shell may exist as an unpublished draft; it was not published because no deliverable was attached.

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
- ZIP artifacts are inventoried but not uploaded as GitHub Release assets.
