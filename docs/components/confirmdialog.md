---
title: ConfirmDialog
---

# ConfirmDialog

A minimal confirmation dialog using `ComponentMorph`.

## Usage

```html
<div
  data-component="ConfirmDialog"
  data-props='{"title":"Delete","message":"Are you sure?","confirmLabel":"OK","cancelLabel":"Cancel"}'
></div>
```

## Behavior

- Emits `confirm:ok` when the confirm button is pressed (and clears markup).
- Emits `confirm:cancel` when the cancel button is pressed (and clears markup).

