# Storefront Upload Matrix

Generated: 2026-06-12T11:08:00-10:00
Updated: 2026-06-12T12:43:00-10:00

Purpose: convert the release package inventory into a practical upload queue for the storefronts already used in this project. This is a control document only; it does not publish products, change account settings, or verify live storefront URLs.

## Upload Rules

- Use the ZIP path and SHA-256 from `RELEASE-PACKAGES.md` before uploading.
- Keep product promises specific, original, and easy to verify.
- After every manual upload, verify the public product page and record the URL in the local learning ledger.

## Priority Queue

| Priority | Product | Primary platform | Secondary platforms | Price band | Upload status | Required review |
|---:|---|---|---|---:|---|---|
| 1 | Micro Offer Lab | Gumroad | Payhip, Ko-fi | $9-$19 | ready for manual upload | listing copy, ZIP hash |
| 2 | Video Prompt Pack Builder | Gumroad | Payhip, Ko-fi | $9-$19 | ready for manual upload | listing copy, ZIP hash |
| 3 | Digital Bundle Builder | Gumroad | Payhip, Ko-fi | $9-$19 | ready for manual upload | listing copy, ZIP hash |
| 4 | Client Welcome Kit | Gumroad | Payhip, Ko-fi | $9-$29 | ready for manual upload | service-business positioning |
| 5 | Shorts Hook Lab | Gumroad | Payhip, Ko-fi | $9-$19 | ready for manual upload | no platform growth claims |
| 6 | Listing Launch Auditor | Gumroad | Payhip | $9-$49 | ready for manual upload | software/license notes |
| 7 | Passive App Risk Calculator | Gumroad | Payhip, Ko-fi | free-$9 | review first | educational positioning |
| 8 | Rainy Day Quest Maker | Gumroad | Payhip, Ko-fi | $9-$19 | review first | family/kid safety |
| 9 | Story Spark Studio Marketplace Pack | Gumroad | Payhip | $19 | review first | privacy, child safety, license flow |
| 10 | Pulse Pop Arcade Creator Game Kit | Gumroad | Payhip, Fourthwall | $5-$15 | review first | game rights and QA |
| 11 | Threadline Tiles SwiftUI Source Kit | Gumroad | Payhip | $9-$29 | hold | iOS signing/platform policy |
| 12 | Giggle Spark Organic Growth System | Gumroad | Ko-fi | $9-$19 | hold | no traffic or monetization claims |

## Platform Fit

### Gumroad

Best for downloadable ZIP tools, software kits, and creator products. Use for:

- Micro Offer Lab
- Video Prompt Pack Builder
- Digital Bundle Builder
- Client Welcome Kit
- Shorts Hook Lab
- Listing Launch Auditor
- Story Spark Studio Marketplace Pack after child-safety review

### Payhip

Best for mirrored digital download listings and software/license experiments. Use for:

- Micro Offer Lab
- Video Prompt Pack Builder
- Digital Bundle Builder
- Client Welcome Kit
- Listing Launch Auditor
- Story Spark Studio Marketplace Pack after license-flow review

### Ko-fi

Best for lighter creator-support products and simple downloadable resources. Use for:

- Micro Offer Lab
- Shorts Hook Lab
- Rainy Day Quest Maker after kid-safety review
- Passive App Risk Calculator as a free or low-price educational tool
- Giggle Spark Organic Growth System only after removing/avoiding traffic claims

### Fourthwall

Best fit is limited unless paired with merch, game branding, or creator-community assets. Use cautiously for:

- Pulse Pop Arcade Creator Game Kit after game QA
- Rainy Day Quest Maker only if bundled with printables or themed merch

### Buy Me a Coffee

Use as a lightweight support/download lane after the first marketplace listings are verified. Avoid making it the system of record for license keys or paid software access.

## Listing Copy Boundaries

Use phrases like:

- `planning kit`
- `local-first workflow tool`
- `downloadable template app`
- `review before publishing`
- `no API or account required`

## Post-Upload Verification Checklist

For each public listing:

1. Confirm title, price, ZIP, cover, and preview images are correct.
2. Confirm description matches the included files.
3. Confirm refund/support text is present.
4. Confirm download delivers the expected ZIP.
5. Record public URL, platform, price, upload timestamp, and package hash in the learning ledger.
6. Post a short Slack update with the product URL and any blockers.
7. Add the public URL to Obsidian deployment history.

## Current Blockers

- Public marketplace upload requires manual storefront action or browser/account-state automation.
- ZIP artifacts are inventoried but not uploaded as GitHub Release assets.
- Family/kid products require extra child-safety and privacy review before public listing.
