import { defineConfig } from "@playwright/test";

export default defineConfig({
  // Look for test files in the project root, but only match files ending in .spec.ts
  // This prevents Playwright from trying to run Vitest's .test.ts files.
  testDir: ".",
  testMatch: /.*\.spec\.ts/,
  // Run all tests in parallel.
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: "html",

  // Shared settings for all the projects below.
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "http://localhost:5173",
    // Collect trace when retrying the failed test.
    trace: "on-first-retry",
  },

  // Run your local dev server before starting the tests.
  webServer: {
    command: "npm run dev -w examples/betodashboard-demo",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
});
