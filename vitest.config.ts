import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    // Clear mocks and module cache before each test to ensure a clean slate.
    // This prevents module caching issues that can cause inconsistent test behavior.
    clearMocks: true,
    mockReset: true,
  },
});