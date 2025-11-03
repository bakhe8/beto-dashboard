# Proof Mode — Walking Skeleton

We are in a documentation freeze. Progress means code running in a browser.

Primary files
- `core/dom/DOMRenderer.ts` — renders visible HTML and supports `update()`
- `core/state/StateSlice.ts` — minimal reactive state slice
- `examples/demo.html` — uses both to show a live counter

Definition of Working
- [ ] Browser opens `examples/demo.html`
- [ ] DOMRenderer.render shows visible content
- [ ] DOMRenderer.update changes visible text
- [ ] StateSlice.set triggers UI updates without manual DOM work
- [ ] No console errors

Cadence (Daily Standup Format)
- DONE: …
- NEXT: …
- BLOCKED: …

Commit Guideline (next 14 days)
- Each commit must produce a visible change in the demo or main app.
- Prefer small, atomic, “proofable” steps.

