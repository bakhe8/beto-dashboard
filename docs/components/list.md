---
title: List
---

# List

A simple selectable list driven by ComponentMorph.
## Live Demo

<DocsDemo :rows="8" :source="`
<div data-component=\"List\" data-props='{"items":["Alpha","Beta","Gamma"]}'>
  <template data-slot=\"empty\"><p>No entries</p></template>
</div>
<script>
  const wrap = document.currentScript?.parentElement;
  const p = document.createElement('p'); p.id='list-readout'; p.style.marginTop='8px';
  wrap?.append(p);
  const root = document.currentScript?.previousElementSibling?.previousElementSibling;
  root?.addEventListener('list:select', (e)=>{ p.textContent = 'select: '+JSON.stringify(e.detail) })
</script>
`" />

## Usage

```html
<div
  data-component="List"
  data-props='{"items":["Alpha","Beta","Gamma"]}'
>
  <template data-slot="empty"><p>No entries</p></template>
  <!-- optional slot -->
</div>
```

## Behavior

- Emits `list:select` with `{ index, label }` when an item is clicked.
- Renders an empty slot when `items` is missing or empty.

