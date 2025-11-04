import { test, expect } from "@playwright/test";

test.describe("BetoDashboard Visual Regression", () => {
  // Run setup before each test in the suite
  test.beforeEach(async ({ page }) => {
    // Disable all CSS transitions and animations for stable snapshots
    await page.addStyleTag({
      content: `*, *::before, *::after {
        transition: none !important;
        animation: none !important;
      }`,
    });
  });

  test("Sidebar component should match snapshots", async ({ page }) => {
    await page.goto("/src/pages/app.html");
    const sidebar = page.locator('aside[data-component="Sidebar"]');

    // Wait for sidebar to be stable and visible
    await expect(sidebar).toBeVisible();

    // Snapshot of the expanded sidebar
    if (!process.env.CI) {
      await expect(sidebar).toHaveScreenshot("sidebar-expanded.png");
    }

    // Click the toggle button to collapse the sidebar
    await page.getByRole("button", { name: "Toggle sidebar" }).click();

    // Snapshot of the collapsed sidebar
    if (!process.env.CI) {
      await expect(sidebar).toHaveScreenshot("sidebar-collapsed.png");
    }
  });

  // TODO: This test is temporarily skipped.
  // There is a known reactivity bug where the ThemeSwitcher stops re-rendering
  // after the Modal is opened and closed. This causes the `toBeChecked()` assertion
  // to fail because the UI does not update, even though the underlying store state changes.
  // This needs to be investigated and fixed.
  test("Modal component should match snapshots in light and dark themes", async ({ page }) => {
    await page.goto("/src/pages/app.html");

    // Wait for the initial theme to be applied before starting interactions
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    // --- Light Mode Snapshot ---
    await page.getByRole("button", { name: "Open Modal" }).click();
    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).toBeVisible();
    if (!process.env.CI) {
      await expect(modal).toHaveScreenshot("modal-light.png");
    }

    // Close the modal before changing the theme
    await page.locator('.modal-close').click();
    await expect(modal).not.toBeVisible();

    // --- Dark Mode Snapshot ---
    // Switch to dark mode using the ThemeSwitcher component
    await page.getByRole("radio", { name: "Dark" }).click();
    // Wait for the UI to reflect the change before checking the global attribute
    // Use an expect with a web-first assertion to wait for the DOM to update.
    await expect(page.getByRole("radio", { name: "Dark" })).toBeChecked();

    // Ensure the theme has been applied before re-opening the modal
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: "Open Modal" }).click();
    await expect(modal).toBeVisible();
    if (!process.env.CI) {
      await expect(modal).toHaveScreenshot("modal-dark.png");
    }
  });

  test("Table component should match snapshots for both data and empty states", async ({
    page,
  }) => {
    await page.goto("/src/pages/app.html");

    // Snapshot of the table with data
    const tableWithData = page.locator('div[data-component="Table"]').first();
    if (!process.env.CI) {
      await expect(tableWithData).toHaveScreenshot("table-with-data.png");
    }

    // Snapshot of the table in its empty state
    const emptyTable = page.locator("#empty-table-container");
    if (!process.env.CI) {
      await expect(emptyTable).toHaveScreenshot("table-empty-state.png");
    }
  });
});

