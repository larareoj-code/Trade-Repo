# Storefront Upload Matrix

Generated: 2026-06-12T11:08:00-10:00
Updated: 2026-06-12T13:29:36-10:00

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
| Digital Bundle Builder | Gumroad | https://larareoj.gumroad.com/l/digital-bundle-builder | $19 | Public page live; no `not currently for sale` text; checkout button verified in Chrome |

## Priority Queue

| Priority | Product | Primary platform | Secondary platforms | Price band | Checkout status | Required review |
|---:|---|---|---|---:|---|---|
| 1 | Scope Creep Rescue Kit | Gumroad | Payhip, Ko-fi | $19 | not yet checkout-gated | title, ZIP hash, support/refund text |
| 2 | Sales Page Snack Pack | Gumroad | Payhip, Ko-fi | $9 | not yet checkout-gated | listing copy, ZIP hash |
| 3 | Micro Offer Lab | Gumroad | Payhip, Ko-fi | $9-$19 | not yet checkout-gated | listing copy, ZIP hash |
| 4 | Digital Bundle Builder | Gumroad | Payhip, Ko-fi | $19 | Gumroad checkout live | mirror to Payhip/Ko-fi if desired |
| 5 | Preview Caption Kit | Gumroad | Payhip, Ko-fi | $9 | not yet checkout-gated | preview examples, ZIP hash |
| 6 | Client Welcome Kit | Gumroad | Payhip, Ko-fi | $9-$29 | not yet checkout-gated | service-business positioning |
| 7 | Video Prompt Pack Builder | Gumroad | Payhip, Ko-fi | $9-$19 | not yet checkout-gated | listing copy, ZIP hash |
| 8 | Shorts Hook Lab | Gumroad | Payhip, Ko-fi | $9-$19 | not yet checkout-gated | no platform growth claims |
| 9 | Listing Launch Auditor | Gumroad | Payhip | $9-$49 | not yet checkout-gated | software/license notes |
| 10 | Rainy Day Quest Maker | Gumroad | Payhip, Ko-fi | $9-$19 | not yet checkout-gated | family/kid safety |
| 11 | Passive App Risk Calculator | Gumroad | Payhip, Ko-fi | free-$9 | lead magnet first | educational positioning |
| 12 | Story Spark Studio Marketplace Pack | Gumroad | Payhip | $19 | review first | privacy, child safety, license flow |
| 13 | Pulse Pop Arcade Creator Game Kit | Gumroad | Payhip, Fourthwall | $5-$15 | review first | game rights and QA |
| 14 | Threadline Tiles SwiftUI Source Kit | Gumroad | Payhip | $9-$29 | hold | iOS signing/platform policy |
| 15 | Giggle Spark Organic Growth System | Gumroad | Ko-fi | $9-$19 | hold | no traffic or monetization claims |

## Platform Fit

### Gumroad

Best for downloadable ZIP tools, software kits, and creator products. Use it first for Scope Creep Rescue Kit, Sales Page Snack Pack, Micro Offer Lab, and Preview Caption Kit.

### Payhip

Best for mirrored digital download listings and software/license experiments. Use it as the second checkout for the same high-priority ZIPs.

### Ko-fi

Best for lighter creator-support products and simple downloadable resources. Use it for the $9 add-on products and bundle previews.

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

- Most products are live previews, not paid gates.
- Remaining marketplace uploads require manual storefront action or browser/account-state automation.
- ZIP artifacts are inventoried but not uploaded as GitHub Release assets.
- Digital Bundle Builder is live on Gumroad; Payhip/Ko-fi mirrors are not yet executed.
