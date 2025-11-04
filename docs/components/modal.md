---
title: Modal
---

[Docs Index](../index.md) | [Project README](../../README.md)

# Modal

Lightweight, accessible dialog with slots and a global store.

## Live Demo

<DocsDemo :rows="10" :source="`
<div data-component=\"Modal\" data-props='{"size":"sm"}'>
  <template data-slot=\"default\"> 
    <p>Hello from a modal. Click confirm to close.</p>
  </template>
  <template data-slot=\"footer\">
    <button data-close>Cancel</button>
    <button data-close>Confirm</button>
  </template>
</div>
<script>
  const btn = document.createElement('button');
  btn.textContent = 'Open Modal';
  btn.onclick = ()=>{
    const root = document.querySelector('[data-component="Modal"]');
    if (root) root.setAttribute('data-open','1');
    // Best-effort: try global store if available
    try { import('../../../packages/core/src/js/store').then(m=>m.store.set('modal',{open:true,title:'Demo'})) } catch {}
  }
  document.currentScript?.parentElement?.prepend(btn);
</script>
`" />

## Usage

```html
<div
  data-component="Modal"
  data-props='{"size": "sm"}'
>
  <template data-slot="default">
    <p>Are you sure you want to proceed?</p>
  </template>
  <template data-slot="footer">
    <button data-close>Cancel</button>
    <button data-close>Confirm</button>
  </template>
  <!-- Buttons with class .modal-close or [data-close] will close the modal -->
</div>

<button id="open-modal-btn">Open Modal</button>
```

Open programmatically by updating the store:

```ts
import { store } from "../../src/js/store";
store.set("modal", { open: true, title: "Confirm Action" });
```

## Props
- size: "sm" | "md" | "lg" (default: "md")

## Accessibility
- Role `dialog` with `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`.
- Focus trap and Escape key to close.
- Restores focus to the opener after closing.

## Notes
- Content is sanitized via DOMPurify.

## Examples

Close on custom buttons using the `data-close` attribute:

```html
<template data-slot="footer">
  <button data-close>Cancel</button>
  <button data-close>Confirm</button>
  <!-- Any element matching .modal-close or [data-close] will close the modal -->
  <!-- The component also traps focus and closes on Escape. -->
  <!-- Focus returns to the opener after closing. -->
  
</template>
```

---

Prev: [Testing](../testing.md) | Next: [Table](./table.md)

See also: [Docs Index](../index.md) | [All Components](../index.md#components)
