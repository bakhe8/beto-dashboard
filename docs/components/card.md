---
title: Card
---

# Card

Simple content container with a title and default slot.

## Live Demo

<DocsDemo :rows="8" :source="`
<div data-component=\"Card\" data-props='{"title":"Overview"}'>
  <template data-slot=\"default\">
    <p>This is a card body. Use the <code>title</code> prop to set the header.</p>
  </template>
</div>
`" />

## Usage

```html
<div data-component="Card" data-props='{"title":"Section"}'>
  <template data-slot="default">Content here</template>
</div>
```

