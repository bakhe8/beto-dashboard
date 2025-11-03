# Loader Component

The `Loader` component provides a simple, CSS-driven spinner to indicate a loading or processing state. It is designed to be accessible and easy to implement.

## Usage

To use the component, add a `div` with the `data-component="Loader"` attribute. The component has no props and renders a spinner with an accessible label for screen readers.

```html
<div data-component="Loader"></div>
```

## Accessibility

The loader includes a `<span>` with the class `visually-hidden` containing the text "Loading...". This ensures that screen reader users are aware that content is being loaded, even though the spinner itself is a purely visual element. The loader element also has `role="status"` to announce its presence to assistive technologies.

```html
<div class="loader" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
```