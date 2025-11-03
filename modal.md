# Modal Component

The Modal component provides a fully accessible, store-driven dialog overlay. It is designed to interrupt the user with important information or actions, trapping focus and providing a clear path for interaction.

## Live Example

<div class="vp-raw">
  <button id="doc-open-modal-btn">Open Modal</button>
</div>

<script>
  import { onMounted } from 'vue';
  import { store } from '../../src/js/store.ts';

  onMounted(() => {
    const button = document.getElementById('doc-open-modal-btn');
    if (button) {
      button.addEventListener('click', () => {
        store.set("modal", { open: true, title: "Documentation Modal" });
      });
    }
  });
</script>

## Usage

To use the Modal component, add the following HTML structure to your page. The component's visibility and content are controlled entirely by the global `store`.

```html
<!-- Trigger Button -->
<button id="open-modal-btn">Open Modal</button>

<!-- Modal Component -->
<div data-component="Modal" data-props='{"size": "sm"}'>
  <template data-slot="default">
    <p>This is the body of the modal.</p>
  </template>
  <template data-slot="footer">
    <button data-close>Cancel</button>
    <button data-close>Confirm</button>
  </template>
</div>
```

## State Management

The Modal's state (its visibility and title) is managed through the global `store`. To open the modal, you must update the `modal` key in the store.

```javascript
import { store } from "./js/store";

document.getElementById("open-modal-btn")?.addEventListener("click", () => {
  store.set("modal", { open: true, title: "Confirm Action" });
});
```

Closing the modal (by clicking the overlay, the '×' button, or any button with a `data-close` attribute) will automatically set `store.modal.open` to `false`.

## Props

Props are passed via the `data-props` attribute as a JSON string.

-   **`size`**: (Optional) Sets the maximum width of the modal.
    -   Type: `"sm" | "md" | "lg"`
    -   Default: `"md"`

## Slots

-   **`default`**: The main content area of the modal body.
-   **`footer`**: The content area for action buttons in the modal footer.