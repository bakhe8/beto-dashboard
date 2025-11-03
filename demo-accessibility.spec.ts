import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Demo Dashboard Accessibility", () => {
  test("should not have critical a11y violations on demo dashboard", async ({ page }) => {
    await page.goto("/src/pages/demo-dashboard.html");
    const results = await new AxeBuilder({ page }).analyze();
    // Allow non-critical warnings but fail on critical
    const critical = results.violations.filter(v => (v.impact || '').toLowerCase() === 'critical');
    expect(critical).toEqual([]);
  });
});

