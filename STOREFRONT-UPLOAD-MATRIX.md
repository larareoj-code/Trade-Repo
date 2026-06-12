# Storefront Upload Matrix

Generated: 2026-06-12T11:08:00-10:00
Updated: 2026-06-12T13:55:00-10:00

Purpose: convert the release package inventory into a practical upload queue for paid storefronts. This is the checkout control document; GitHub Pages is only the free preview layer.

## Upload Rules

- Use the ZIP path and SHA-256 from `RELEASE-PACKAGES.md` before uploading.
- Create a storefront product page before claiming users can pay for a tool.
- Link the verified storefront URL back into `index.html`, `catalog.json`, and `PUBLISHED-URLS.md`.
- Keep product promises specific, original, and easy to verify.
- After every manual upload, verify the public product page and record URL, price, platform, and package hash in the local learning ledger.

## Verified Storefront Listings

| Product | Platform | Public URL | Price | Verification |
|---|---|---|---:|---|
| Scope Creep Rescue Kit | Payhip | https://payhip.com/b/1QTL0 | $19 | Public page HTTP 200; title and price present |
| Sales Page Snack Pack | Payhip | https://payhip.com/b/lWBKA | $9 | Public page HTTP 200; title and price present |
| Micro Offer Lab | Payhip | https://payhip.com/b/cNulr | $9 | Public page HTTP 200; title and price present |
| Digital Bundle Builder | Gumroad | https://larareoj.gumroad.com/l/digital-bundle-builder | $19 | Public page live; no `not currently for sale` text; checkout button verified in Chrome |

## Priority Queue

| Priority | Product | Primary platform | Secondary platforms | Price band | Checkout status | Required review |
|---:|---|---|---|---:|---|---|
| 1 | Scope Creep Rescue Kit | Payhip | Gumroad, Ko-fi | $19 | Payhip published and verified | optional Gumroad/Ko-fi mirror blocked by upload flow |
| 2 | Sales Page Snack Pack | Payhip | Gumroad, Ko-fi | $9 | Payhip published and verified | optional Gumroad/Ko-fi mirror blocked by upload flow |
| 3 | Micro Offer Lab | Payhip | Gumroad, Ko-fi | $9-$19 | Payhip published and verified | optional Gumroad/Ko-fi mirror blocked by upload flow |
| 4 | Digital Bundle Builder | Gumroad | Payhip, Ko-fi | $19 | Gumroad checkout live | mirror to Payhip/Ko-fi if desired |
| 5 | Preview Caption Kit | Payhip | Gumroad, Ko-fi | $9 | not yet checkout-gated | preview examples, ZIP hash |
| 6 | Client Welcome Kit | Payhip | Gumroad, Ko-fi | $9-$29 | not yet checkout-gated | service-business positioning |
| 7 | Video Prompt Pack Builder | Payhip | Gumroad, Ko-fi | $9-$19 | not yet checkout-gated | listing copy, ZIP hash |
| 8 | Shorts Hook Lab | Payhip | Gumroad, Ko-fi | $9-$19 | not yet checkout-gated | no platform growth claims |
| 9 | Listing Launch Auditor | Payhip | Gumroad | $9-$49 | not yet checkout-gated | software/license notes |
| 10 | Rainy Day Quest Maker | Payhip | Gumroad, Ko-fi | $9-$19 | not yet checkout-gated | family/kid safety |
| 11 | Passive App Risk Calculator | Gumroad | Payhip, Ko-fi | free-$9 | lead magnet first | educational positioning |

## Platform Fit

### Payhip

Payhip is currently the most reliable upload route in Chrome. Use it next for Preview Caption Kit, Client Welcome Kit, Video Prompt Pack Builder, and Shorts Hook Lab.

### Gumroad

Existing Digital Bundle Builder checkout is live. New Gumroad products are blocked because the file chooser did not open for the ZIP upload controls during this pass.

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

- Gumroad new listing upload is blocked by Chrome file chooser behavior; an unverified Scope product shell may exist as a draft but was not published.
- Ko-fi new listing upload is blocked by file chooser behavior and location confirmation.
- ZIP artifacts are inventoried but not uploaded as GitHub Release assets.
