# Table Component

The Table component is a simple, prop-driven component for displaying tabular data. It supports custom column definitions and provides a slot for a user-friendly empty state.

## Usage

To use the Table component, add a `div` with the `data-component="Table"` attribute. The table's structure and data are passed via the `data-props` attribute.

### Example with Data

```html
<div
  data-component="Table"
  data-props='{
    "columns": [
      {"key": "name", "label": "Name"},
      {"key": "role", "label": "Role"}
    ],
    "data": [
      {"name": "John Doe", "role": "Admin"},
      {"name": "Jane Smith", "role": "Editor"}
    ]
  }'
>
</div>
```

### Example with Empty State

When the `data` array in props is empty, the component will render the content provided in the `empty` slot.

```html
<div
  data-component="Table"
  data-props='{
    "columns": [{"key": "name", "label": "Name"}, {"key": "role", "label": "Role"}],
    "data": []
  }'
>
  <template data-slot="empty">
    <p>No users were found for this query.</p>
  </template>
</div>
```

## Props

-   **`columns`**: An array of objects defining the table columns.
    -   Type: `Array<{ key: string; label: string }>`
-   **`data`**: An array of objects representing the rows of the table.
    -   Type: `Array<Record<string, any>>`

## Slots

-   **`empty`**: Content to display when the `data` prop is an empty array.