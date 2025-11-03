---
title: FormGroup
---

# FormGroup

An accessible label + input pair, implemented via `ComponentMorph`.

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

