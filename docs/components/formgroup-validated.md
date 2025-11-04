---
title: FormGroupValidated
---

# FormGroupValidated

An input with inline validation messages.
## Live Demo

<DocsDemo :rows="10" :source="`
<div data-component=\"FormGroupValidated\" data-props='{"name":"username","label":"Username","minLength":3,"maxLength":12,"placeholder":"yourname"}'></div>
<script>
  const p = document.createElement('p'); p.id='fgv-readout'; p.style.marginTop='8px';
  document.currentScript?.parentElement?.appendChild(p);
  const root = document.currentScript?.previousElementSibling;
  root?.addEventListener('form:update', (e)=>{ p.textContent = 'update: '+JSON.stringify(e.detail) })
  root?.addEventListener('form:validate', (e)=>{ p.textContent = 'validate: '+JSON.stringify(e.detail) })
</script>
`" />

## Usage

```html
<div
  data-component="FormGroupValidated"
  data-props='{"name":"username","label":"Username","minLength":3,"maxLength":12,"placeholder":"yourname"}'
></div>
```

## Behavior

- Validates on input and blur; adds aria-invalid and error message with role=alert.
- Emits `form:update` on input and `form:validate` on blur with `{ name, value, valid, error }`.

