---
title: FormGroup
---

# FormGroup

An accessible label + input pair, implemented via ComponentMorph.
## Live Demo

<DocsDemo :rows="8" :source="`
<div data-component=\"FormGroup\" data-props='{"name":"email","label":"Email","type":"email","placeholder":"you@example.com","required":true}'></div>
<script>
  const p = document.createElement('p'); p.id='fg-readout'; p.style.marginTop='8px';
  document.currentScript?.parentElement?.appendChild(p);
  const root = document.currentScript?.previousElementSibling;
  root?.addEventListener('form:update', (e)=>{ p.textContent = 'update: '+JSON.stringify(e.detail) })
</script>
`" />

## Usage

```html
<div
  data-component="FormGroup"
  data-props='{"name":"email","label":"Email","type":"email","placeholder":"you@example.com","required":true}'
></div>
```

## Behavior

- Emits `form:update` with `{ name, value }` on input events.
- Accepts props: `name`, `label`, `type`, `value`, `placeholder`, `required`.

