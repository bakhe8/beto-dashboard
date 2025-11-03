import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("BetoDashboard Accessibility", () => {
  test("should not have any automatically detectable accessibility issues on the main page", async ({
    page,
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should not have any automatically detectable accessibility issues on the modal", async ({
    page,
  }) => {
    await page.goto("/");

    // Open the modal
    await page.getByRole("button", { name: "Open Modal" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    // Scan only the modal dialog for accessibility issues
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});