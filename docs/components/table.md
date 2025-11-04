---
title: Table
---

[Docs Index](../index.md) | [Project README](../../README.md)

# Table

Simple, declarative table driven by props and an optional empty slot.

## Live Demo

<!-- DocsDemo :rows="12" :source="String.raw`
<div
  data-component=\"Table\"
  data-props='{"columns":[{"key":"name","label":"Name"},{"key":"role","label":"Role"}],"data":[{"name":"John","role":"Admin"},{"name":"Jane","role":"Editor"}]}'
>
  <template data-slot=\"empty\"><p>No rows.</p></template>
</div>
<script>
  // Add a button to toggle between data and empty state
  const btn = document.createElement('button');
  btn.textContent = 'Toggle Empty';
  let empty = false;
  btn.onclick = ()=>{
    const el = document.querySelector('[data-component="Table"]');
    const props = empty
      ? { columns:[{key:'name',label:'Name'},{key:'role',label:'Role'}], data:[{name:'John',role:'Admin'},{name:'Jane',role:'Editor'}] }
      : { columns:[{key:'name',label:'Name'},{key:'role',label:'Role'}], data:[] };
    el?.setAttribute('data-props', JSON.stringify(props));
    // re-mount via exposed runtime
    try { window['__BD_RUNTIME']?.mountAll?.() } catch {}
    empty = !empty;
  };
  document.currentScript?.parentElement?.prepend(btn);
</script>
" /> -->
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

---

Prev: [Modal](./modal.md) | Next: [ThemeSwitcher](./themeswitcher.md)

See also: [Docs Index](../index.md) | [All Components](../index.md#components)


