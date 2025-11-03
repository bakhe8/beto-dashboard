---
title: ThemeSwitcher
---

# ThemeSwitcher

Radio-style UI to switch between light, dark, and auto themes.

## Usage

```html
<div data-component="ThemeSwitcher"></div>
```

## Behavior
- Updates the global store key `theme` with one of: "light" | "dark" | "auto".
- `main.ts` applies the theme to `<html data-theme="...">`, honoring system preference for "auto".

## Accessibility
- Uses `role="radiogroup"` and `role="radio"`.
- Supports keyboard navigation with Arrow keys (roving tabindex).
- `aria-checked` reflects the current selection.

## Examples

Programmatically set the theme:

```ts
import { store } from "../../src/js/store";

store.set("theme", "dark");
// or
store.set("theme", "light");
// or
store.set("theme", "auto");
```
