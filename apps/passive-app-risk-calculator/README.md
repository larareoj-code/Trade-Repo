# Passive App Risk Calculator

A local-first static calculator for evaluating bandwidth-sharing, background rewards, device node, and similar passive-app experiments before installing anything.

## What it does

- Estimates electricity cost from watts, hours, and kWh price.
- Estimates data overage cost from monthly GB use, data cap, and overage price.
- Compares claimed payout against estimated direct costs.
- Scores non-financial risks such as residential proxy traffic, unclear data use, ISP concerns, always-on device use, and limited independent reviews.
- Produces a review-first, avoid/quarantine, or small-test-only decision.
- Exports JSON and CSV.
- Saves the current draft only in browser `localStorage`.

## Run

Open `index.html` directly in a modern browser. No build step, server, account, API key, or network call is required.

Open `tests.html` for the focused browser test suite.

## Boundaries

This is an educational calculator. It does not endorse apps, predict payouts, provide legal advice, provide tax advice, verify privacy claims, or replace reading platform, ISP, device, and privacy terms.

## Files

- `index.html` - app UI
- `calculator.js` - deterministic calculation engine
- `app.js` - rendering, exports, local draft save
- `styles.css` - responsive styling
- `tests.html` - browser tests
- `MARKETPLACE-LISTING.md` - storefront copy
- `cover.svg` - editable product cover
- `LICENSE.txt` - MIT license
