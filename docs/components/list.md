---
title: List
---

# List

A simple selectable list driven by `ComponentMorph`.

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

