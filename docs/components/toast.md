[Docs Index](../index.md) | [Project README](../../README.md)

# Toast

The Toast component provides a system for displaying non-blocking, ephemeral notifications to the user.

## Usage

The toast system consists of a single `ToastContainer` component that should be placed once in your main layout (e.g., in `index.html`). This container will automatically render all active toasts from the global store.

```html
<body>
  <!-- Other components -->
  <div data-component="ToastContainer" class="toast-container"></div>
</body>
```

## State Management

Toasts are managed entirely through the `toasts` array in the global `store`. To display a new toast, you add a new toast object to this array.

### Showing a Toast

Here is an example of a helper function to show a success toast:

```typescript
import { store } from "../js/store";

function showToast(message: string, type: "success" | "info" | "warning" | "danger") {
  const newToast = {
    id: Date.now(), // Use a simple unique ID like a timestamp
    message,
    type,
  };

  const currentToasts = store.get("toasts");
  store.set("toasts", [...currentToasts, newToast]);
}

// Example call:
showToast("Your profile has been updated successfully.", "success");
```

### Dismissing a Toast

Toasts can be dismissed by the user by clicking the close button (×). This action automatically removes the corresponding toast object from the `store.toasts` array.

## Accessibility

-   Each toast has `role="status"` and `aria-live="polite"` to ensure that screen readers announce the message as it appears.
-   The close button includes an `aria-label="Close"` for clarity.

---

Prev: [Loader](./loader.md) | Next: [Recipes](../recipes.md)

See also: [Docs Index](../index.md) | [All Components](../index.md#components)


