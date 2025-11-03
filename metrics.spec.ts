import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Collect DOM metrics', () => {
  test('gathers basic render metrics during interactions', async ({ page }) => {
    const url = '/src/pages/app.html?metrics=1';
    await page.goto(url);

    // Interact: toggle sidebar
    const toggle = page.locator('.sidebar-toggle');
    await toggle.click();
    await toggle.click();

    // Interact: open and close modal
    await page.getByRole('button', { name: 'Open Modal' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.locator('.modal-close').click();

    // Read exposed metrics
    const metrics = await page.evaluate(() => (window as any).getMetrics?.());
    expect(metrics).toBeTruthy();

    const outDir = path.resolve('test-results');
    const outFile = path.join(outDir, 'dom-metrics.json');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outFile, JSON.stringify(metrics, null, 2));
    console.log('Wrote DOM metrics →', outFile);
  });
});

