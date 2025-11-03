---
title: FormGroupValidated
---

# FormGroupValidated

An input with inline validation messages.

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

