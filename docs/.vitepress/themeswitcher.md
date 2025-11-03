# Theme Switcher

The `ThemeSwitcher` component provides a simple UI for changing the application's color scheme between light, dark, and auto-detect modes. It is fully reactive and persists the user's choice.

## Usage

To use the component, add a `div` with the `data-component="ThemeSwitcher"` attribute to your HTML. The component has no props and renders a set of buttons to control the theme.

```html
<div data-component="ThemeSwitcher"></div>
```

## State Management

The component's state is managed through the `theme` key in the global `store`.

-   **Reading State**: The component reads `store.get("theme")` to determine which button should have `aria-checked="true"`.
-   **Writing State**: Clicking a theme button calls `store.set("theme", "...")` with the selected value (`light`, `dark`, or `auto`).

The application listens for changes to this store value and applies the corresponding `data-theme` attribute to the `<html>` element, which activates the styles defined in `_tokens.css`.

## Theme Modes

-   **`light`**: Forces the light theme.
-   **`dark`**: Forces the dark theme.
-   **`auto`**: Automatically selects the light or dark theme based on the user's operating system preference (`prefers-color-scheme`). This mode is also reactive to real-time system theme changes.