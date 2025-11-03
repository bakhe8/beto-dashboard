---
title: Table
---

# Table

Simple, declarative table driven by props and an optional empty slot.

## Usage

```html
<div
  data-component="Table"
  data-props='{
    "columns": [{"key": "name", "label": "Name"}, {"key": "role", "label": "Role"}],
    "data": [{"name": "John", "role": "Admin"}]
  }'
>
  <template data-slot="empty">
    <p>No rows.</p>
  </template>
  <!-- Optional: slot shown when data is empty -->
</div>
```

## Props
- columns: Array<{ key: string; label: string }>
- data: Array<Record<string, any>>

## Security
- All HTML output (including the empty slot) is sanitized via DOMPurify.
