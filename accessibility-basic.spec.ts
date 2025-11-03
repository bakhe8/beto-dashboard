import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("ModalBasic Accessibility", () => {
  test("basic modal has no detectable issues", async ({ page }) => {
    await page.goto("/src/pages/app.html");

    await page.getByRole("button", { name: "Open Basic Modal" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .analyze();
    expect(results.violations).toEqual([]);
  });
});


