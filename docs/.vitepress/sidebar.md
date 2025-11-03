# Sidebar Component

The `Sidebar` component provides a persistent, collapsible navigation panel for the application. It is fully reactive to the global store and automatically adjusts the main content layout.

## Usage

To use the component, add an `<aside>` element with the `data-component="Sidebar"` attribute. It is designed to be a direct child of the `<body>` element.

```html
<body>
  <aside data-component="Sidebar"></aside>
  <main class="main-content">
    <!-- Your page content here -->
  </main>
</body>
```

## State Management

The sidebar's state is managed through the `sidebar` key in the global `store`.

-   **Reading State**: The component reads `store.get("sidebar")` to determine its current state (`default` or `collapsed`) and applies it to its `data-state` attribute.
-   **Writing State**: Clicking the toggle button (`☰`) updates the store by calling `store.set("sidebar", ...)` with the next state.

## Layout Interaction

The `Sidebar` component works in conjunction with the main layout CSS. When the sidebar's state changes, the `main-content` element's `margin-inline-start` is automatically adjusted via CSS to prevent content from being obscured by the sidebar. This is handled in `base.css` using the `:has()` pseudo-class.

```css
body:has([data-component="Sidebar"][data-state="default"]) .main-content {
  margin-inline-start: var(--sidebar-width, 250px);
}
```