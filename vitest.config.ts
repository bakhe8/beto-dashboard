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
        lines: 85,
        functions: 85,
        statements: 85,
        branches: 75,
      }
    }
  },
});
