# Rainy Day Quest Maker

A complete static MVP for parents to create safe, printable indoor family quests. No server, account, API key, build step, tracking, or network connection is required.

## Run

Open `index.html` in a modern browser. For the focused test suite, open `tests.html`; the page title becomes `All tests passed` when successful.

## Product features

- Original indoor quest themes with age and difficulty controls.
- 3-10 deterministic clue cards from the same settings.
- Room/location exclusions.
- Parent setup brief, supply list, route placement notes, and safety review.
- Letter-sized print layout with cut-apart clue cards.
- Local JSON export.
- Mobile-first responsive UI and keyboard-visible focus states.
- Offline privacy model with no analytics, accounts, ads, or child data collection.

## Deterministic generation

`app.js` hashes the normalized settings with FNV-1a and feeds the result into a small seeded PRNG. The same settings produce the same seed, location order, tasks, and clue text. Generation uses a curated set of reachable indoor locations and age-banded tasks; it does not call a model or external content service.

## Safety boundaries

The content library excludes climbing, running, hiding in enclosed spaces, leaving home, heat, water challenges, tools, sharp objects, medicines, food/health advice, purchases, branded characters, and dares. A grown-up is always instructed to place and walk the route before play.

## Files

- `index.html` - product UI
- `styles.css` - responsive and print styling
- `app.js` - deterministic engine, rendering, local history, export
- `tests.html` - zero-dependency browser tests
- `privacy.html` - plain-language privacy note
- `marketplace-listing.md` - sellable listing copy

## Commercialization notes

Before selling, replace any seller/contact placeholders in marketplace copy, add your license terms, test printing on your supported browsers, and package the directory as a ZIP. The app is intentionally dependency-free for easy marketplace delivery.

## Image asset note

Large generated PNG assets are retained locally as release artifacts and are not included in this source-control commit.
