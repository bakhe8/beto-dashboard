---
title: Loader
---

[Docs Index](../index.md) | [Project README](../../README.md)

# Loader

Minimal loading indicator with accessible status text.

## Usage

```html
<div data-component="Loader"></div>
```

## Accessibility
- Renders a `role="status"` container with visually hidden text.

## Examples

Apply the spinner style variant via a data attribute:

```html
<div data-component="Loader"></div>

<style>
  /* Optional: spinner variant from base CSS */
  .loader[data-type="spinner"] {
    width: 24px; height: 24px;
    border: 2px solid var(--color-primary);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    animation: rotation 1s linear infinite;
  }
  @keyframes rotation { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
  /* Set variant */
  [data-component="Loader"] .loader { display: inline-block; }
  [data-component="Loader"] .loader { /* default */ }
  [data-component="Loader"] .loader[data-type="spinner"] { /* variant */ }
}</style>
```
