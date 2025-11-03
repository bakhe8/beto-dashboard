[Docs Index](./index.md) | [Project README](../README.md)

# API Fetching

This project includes a lightweight, built-in data fetching utility that implements a **stale-while-revalidate (SWR)** caching strategy. This utility, exported from `src/js/api.ts`, provides a simple way to fetch, cache, and validate data from your backend.

## The `swr` Function

The `swr` function is designed to serve cached (stale) data immediately for a fast user experience, while simultaneously sending a request to revalidate and update the cache in the background.

### Usage

The function is strongly typed and integrates with Zod for runtime validation.

```typescript
import { z } from "zod";
import { swr } from "../js/api";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

type User = z.infer<typeof UserSchema>;

async function fetchUser(userId: string) {
  try {
    const user = await swr<User>(
      `user-${userId}`, // A unique cache key
      `/api/users/${userId}`, // The API endpoint
      UserSchema // The Zod schema for validation
    );
    console.log("User data:", user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}
```

### Parameters

-   **`key`** (`string`): A unique string to identify the request in the cache.
-   **`url`** (`string`): The URL of the API endpoint to fetch.
-   **`schema`** (`z.ZodTypeAny`): A Zod schema to validate the structure of the JSON response. If validation fails, the function will throw an error.
-   **`ttl`** (`number`, optional): The "time-to-live" for the cache in milliseconds. If a cached entry is older than the TTL, the function will still return the stale data but will wait for the revalidation to complete. Defaults to `60000` (60 seconds).

---

Prev: [Architecture](./architecture.md) | Next: [Security](./security.md)

See also: [Docs Index](./index.md) | [Project README](../README.md)
