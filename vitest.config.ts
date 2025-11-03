import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    clearMocks: true,
    mockReset: true,
    include: ["**/*.test.ts"],
    exclude: ["**/*.spec.ts", "node_modules", "dist"],
  },
});
