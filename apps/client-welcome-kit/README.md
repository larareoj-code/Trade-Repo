# Client Welcome Kit

A complete, static, local-first MVP for freelancers and solo service businesses. Structured project inputs generate a polished client welcome packet, kickoff agenda, communication policy, deliverables checklist, timeline, boundaries, FAQ, and copyable email draft.

## What it does

- Generates deterministic welcome materials with no API or account.
- Saves project data in the browser with `localStorage`.
- Provides live packet and email previews.
- Copies the packet or email draft to the clipboard.
- Prints cleanly or saves to PDF through the browser print dialog.
- Exports project data as JSON.
- Works responsively on desktop, tablet, and mobile.
- Keeps all project information on the device unless the user explicitly exports it.

Client Welcome Kit is draft-only. It never sends email or contacts clients.

## Run

Open `index.html` directly in a modern browser. No build step or server is required.

For a local server:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Test

Requires Node.js 18 or newer:

```powershell
node --test tests/generator.test.js
```

## Privacy

Project data is stored only in the current browser's local storage. Clearing browser site data removes saved projects. JSON exports are downloaded only when the user chooses **Export JSON**.

Do not enter information you are not authorized to store on the device. Review generated materials before sharing. The product provides organizational templates, not legal advice.

## Customization

- Visual styling and print rules: `styles.css`
- Deterministic content generation: `generator.js`
- Local project behavior and UI events: `app.js`
- Default example content: `sample` in `app.js`

## Product boundaries

- No autonomous outreach or sending.
- No cloud sync, analytics, tracking, or API calls.
- No legal advice, contract generation, or earnings claims.
- Generated text is a practical starting point and should be reviewed for each engagement.
