---
title: ConfirmDialog
---

# ConfirmDialog

A minimal confirmation dialog using ComponentMorph.
## Live Demo

<!-- DocsDemo :rows="8" :source="String.raw`
<div data-component=\"ConfirmDialog\" data-props='{"title":"Delete","message":"Are you sure?","confirmLabel":"OK","cancelLabel":"Cancel"}'></div>
<script>
  // Wire demo listeners to show events
  const p = document.createElement('p');
  p.id = 'cd-readout'; p.style.marginTop = '8px';
  document.currentScript?.parentElement?.appendChild(p);
  const root = document.currentScript?.previousElementSibling?.previousElementSibling;
  function setText(t){ p.textContent = t }
  root?.addEventListener('confirm:ok', ()=> setText('OK clicked'));
  root?.addEventListener('confirm:cancel', ()=> setText('Cancel clicked'));
</script>
" /> -->
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



