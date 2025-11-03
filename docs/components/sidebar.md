---
title: Sidebar
---

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
