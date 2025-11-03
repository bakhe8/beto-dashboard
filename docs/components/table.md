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

## Examples

Dynamically update rows:

```ts
import { mount } from "../../src/components/runtime";
import { Table } from "../../src/components/Table";

const el = document.querySelector('[data-component="Table"]');
const unmount = mount(el as HTMLElement, Table);

// Re-render with new data by updating the element's dataset
el!.dataset.props = JSON.stringify({
  columns: [ { key: 'name', label: 'Name' }, { key: 'role', label: 'Role' } ],
  data: [ { name: 'Alaa', role: 'Owner' } ]
});
// Remount to apply props change
unmount();
mount(el as HTMLElement, Table);
```
