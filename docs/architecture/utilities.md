---
title: Core Utilities
---

# Core Utilities

This page documents shared utilities introduced to standardize DOM updates, events, and state composition.

## DOM Helpers (`@betodashboard/core/js/dom`)
- `setHTML(el, html)` — Sanitizes and sets `innerHTML`.
- `setText(el, text)` — Sets `textContent`.
- `setAttrs(el, attrs)` — Applies attributes with boolean/null handling.
- `replaceChildren(el, ...nodes)` — Efficient replacement using a `DocumentFragment`.

## Event Delegation (`@betodashboard/core/js/events`)
- `on(root, type, selector, handler)` — Delegated listener with cleanup.
- `onKey(root, key, handler)` — Keydown helper filtered by key without selector.

Example (ThemeSwitcher):

```ts
import { on } from '@betodashboard/core/js/events';
on(root, 'click', 'button[role=radio]', (_ev, target) => {
  const next = (target as HTMLButtonElement).dataset.theme;
  if (next === 'light' || next === 'dark' || next === 'auto') store.set('theme', next);
});
```

## Derived State (`@betodashboard/core/js/derived`)
- `createDerived(keys, compute, cb?)` — Compute values from store keys and subscribe.

Example:

```ts
import { createDerived } from '@betodashboard/core/js/derived';
const themeDir = createDerived(['theme', 'dir'], (s) => `${s.theme}:${s.dir}`);
themeDir.subscribe((value) => {
  document.documentElement.dataset.themeDir = value;
});
```

## Async Action (`@betodashboard/core/js/asyncAction`)
- `createAsyncAction(fn)` — Produces `{ run, get, subscribe }` with status transitions.

## State Slice (`@betodashboard/core/js/slice`)
- `createSlice(key)` — Returns `{ get, set, on }` for a single store key.

## Base Component (`@betodashboard/core/components/BaseComponent`)
- Minimal class to standardize delegated listeners and scoped effects.

## Adoption Status
- Sidebar uses `setHTML`. Other components will adopt these helpers incrementally.
