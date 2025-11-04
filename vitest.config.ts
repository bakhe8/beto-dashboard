import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    clearMocks: true,
    mockReset: true,
    include: ["**/*.test.ts"],
    exclude: ["**/*.spec.ts", "node_modules", "dist"],
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 90,
        functions: 90,
        statements: 90,
        branches: 80,
      }
    }
  },
});
