---
title: Sidebar
---

[Docs Index](../index.md) | [Project README](../../README.md)

# Sidebar

Collapsible app navigation bound to the global `sidebar` state.

## Usage

```html
<aside data-component="Sidebar"></aside>
```

## Behavior
- Toggle button switches `store.sidebar` between "default" and "collapsed".
- Component reflects state via `data-state` for styling.

## Accessibility
- Toggle button has `aria-expanded` and `aria-controls` pointing to the nav.

## Examples

Programmatically collapse/expand via the global store:

```ts
import { store } from "../../src/js/store";

// Collapse
store.set("sidebar", "collapsed");

// Expand
store.set("sidebar", "default");
```

---

Prev: [ThemeSwitcher](./themeswitcher.md) | Next: [Loader](./loader.md)

See also: [Docs Index](../index.md) | [All Components](../index.md#components)
