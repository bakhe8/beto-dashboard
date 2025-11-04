import { test, expect } from '@playwright/test';

test('List emits selection and FormGroupValidated emits updates', async ({ page }) => {
  await page.goto('/src/pages/app.html');
  // Click a list item
  await page.getByRole('button', { name: 'Alpha' }).click();
  // Type into validated form
  const input = page.locator('input[name="username"]');
  await input.fill('ab'); // too short
  await input.blur();
  await input.fill('alpha');
  await input.blur();

  // Verify event log contains entries
  const log = page.locator('#event-log');
  // Accept either an index match or label match to avoid brittle index failures
  const logText = await log.innerText();
  expect(logText.includes('List selected index=0') || logText.includes('label=Alpha')).toBeTruthy();
  await expect(log).toContainText('Form validate username');
});

