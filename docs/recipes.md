[Docs Index](./index.md) | [Project README](../README.md)

# Recipes

This section provides practical examples for common patterns you'll encounter when building applications with BetoDashboard.

## Dynamic Data Table with Loading State

A very common requirement is to fetch data from an API and display it in a table, showing a loading indicator while the request is in progress.

This recipe shows how to use the `Loader` and `Table` components together with the `swr` data fetching utility.

### 1. HTML Structure

First, set up a container element in your HTML. This element will hold either the loader or the table.

```html
<div id="user-table-container">
  <!-- Content will be dynamically rendered here -->
</div>
```

### 2. JavaScript Logic

Next, create a script to manage the fetching and rendering logic.

```typescript
import { z } from "zod";
import { swr } from "../js/api";
import { mount } from "../components/runtime";
import { Loader } from "../components/Loader";
import { Table } from "../components/Table";

const UserSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
}));

async function loadUserTable() {
  const container = document.getElementById("user-table-container");
  if (!container) return;

  // 1. Show the loader immediately
  container.innerHTML = `<div data-component="Loader"></div>`;
  mount(container.firstElementChild as HTMLElement, Loader);

  // 2. Fetch the data
  const users = await swr("users", "/api/users", UserSchema);

  // 3. Once data is fetched, replace the loader with the table
  const tableProps = JSON.stringify({
    columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }],
    data: users,
  });
  container.innerHTML = `<div data-component="Table" data-props='${tableProps}'></div>`;
  mount(container.firstElementChild as HTMLElement, Table);
}

// Kick off the process
loadUserTable();
```

---

Prev: [Toast](./components/toast.md) | Next: [BetoDashboard Handbook](./BetoDashboard_Handbook.md)

See also: [Docs Index](./index.md) | [Project README](../README.md)
