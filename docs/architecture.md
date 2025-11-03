[Docs Index](./index.md) | [Project README](../README.md)

# Architecture

BetoDashboard is built on a few simple, powerful concepts that prioritize performance, type-safety, and developer experience without relying on a heavy framework.

## Core Principles

-   **Zero Dependencies:** The core reactive system and component engine are written in plain TypeScript with no external runtime libraries.
-   **Declarative HTML:** Components are declared directly in your HTML, making the structure easy to understand and server-render.
-   **Centralized State:** A single global store manages application state, providing a predictable data flow.

## Global Store

The global store (`src/js/store.ts`) is the single source of truth for shared application state. It's a lightweight, reactive object that allows components to read state and subscribe to changes.

### Design

-   **Technology:** A custom pub/sub system built on a `Map`.
-   **Reactivity:** When state is updated with `store.set()`, only the listeners subscribed to that specific key are notified.
-   **Persistence:** Certain UI-related keys (like `theme` and `sidebar`) are automatically persisted to `localStorage`.

### API

-   `store.get(key)`: Retrieves the current value for a state key.
-   `store.set(key, value)`: Updates a key's value and notifies all its subscribers.
-   `store.on(key, listener)`: Subscribes a function to changes for a specific key. Returns an `unsubscribe` function.

### Example Usage

```typescript
import { store } from './js/store';

// 1. Subscribe to changes for the 'theme' key
const unsubscribe = store.on('theme', newTheme => {
  console.log(`Theme changed to: ${newTheme}`);
});

// 2. Update the theme
store.set('theme', 'dark'); // "Theme changed to: dark"
```

## Dynamic Component Engine (DCE)

The DCE (`src/components/runtime.ts`) is a tiny runtime that discovers and mounts components declared in your HTML. It allows for a declarative, low-JavaScript approach to building interactive UIs.

### How It Works

1.  **Declaration:** You declare a component in HTML using a `data-component` attribute.
2.  **Props & Slots:** Props are passed as a JSON string in `data-props`, and named slots are defined using `<template data-slot="...">`.
3.  **Mounting:** On page load, `mountAll()` finds all `[data-component]` elements, parses their props and slots, and runs the corresponding component constructor function.

### Example Usage

**HTML:**
```html
<div
  data-component="Table"
  data-props='{"columns": [{"key": "name", "label": "Name"}]}'
>
  <template data-slot="empty"><p>No data available.</p></template>
</div>
```

---

Prev: [Getting Started](./getting-started.md) | Next: [API Fetching](./api.md)

See also: [Docs Index](./index.md) | [Project README](../README.md)
