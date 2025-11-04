---
title: Loader
---

[Docs Index](../index.md) | [Project README](../../README.md)

# Loader

Minimal loading indicator with accessible status text.

## Live Demo

<DocsDemo :rows="6" :source="`
<div data-component=\"Loader\"></div>
<script>
  // Toggle spinner variant by setting data-type
  const wrap = document.currentScript?.parentElement;
  const bar = document.createElement('div'); bar.style.marginTop='8px';
  const btn = document.createElement('button'); btn.textContent='Toggle Spinner';
  bar.append(btn); wrap?.append(bar);
  let on=false; btn.onclick=()=>{
    const el = document.querySelector('[data-component="Loader"] .loader');
    if (!el) return;
    if (on) el.removeAttribute('data-type'); else el.setAttribute('data-type','spinner');
    on = !on;
  }
</script>
`" />

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

---

Prev: [Sidebar](./sidebar.md) | Next: [Toast](./toast.md)

See also: [Docs Index](../index.md) | [All Components](../index.md#components)
