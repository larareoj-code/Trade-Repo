# Digital Bundle Builder

Digital Bundle Builder is a dependency-free, local-first browser app for digital-product sellers preparing customer ZIP downloads. It turns a bundle title, audience, deliverables list, license label, support text, version, and update notes into customer-facing bundle documents.

## Included

- `index.html` - app shell.
- `styles.css` - responsive styling.
- `app.js` - local generator, draft storage, copy, download, import, and export controls.
- `tests.html` - browser-based tests for the generator.
- `MARKETPLACE-LISTING.md` - marketplace-ready product listing draft.
- `vercel.json` - static deployment config.
- `Digital-Bundle-Builder.zip` - packaged app archive.

## Run Locally

Open `index.html` in a browser. No install, build step, account, server, or external API is required.

The app stores the active draft in `localStorage` on the current browser and device. Use `Export Draft` if you want a portable JSON backup.

## Deliverables Format

Enter one deliverable per line:

```text
filename.ext | Type | Customer-facing note
```

Example:

```text
welcome-guide.pdf | PDF | Main guide
email-template.docx | Template | Editable client email
bonus-checklist.pdf | Checklist | Optional bonus
```

## Generated Files

- `bundle-manifest.json`
- `START-HERE.md`
- `STOREFRONT-CHECKLIST.md`
- `QA-CHECKLIST.md`
- Combined text export for handoff and review

## Tests

Open `tests.html` in a browser. Tests run automatically and report pass or fail in the page.

## Guardrails

- No earnings promises.
- No legal advice.
- No marketplace approval promises.
- No uploading or publishing features.
- No external calls.
- No third-party copied assets.
