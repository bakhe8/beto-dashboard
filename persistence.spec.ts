import { test, expect } from '@playwright/test';

test.describe('State persistence and focus behavior', () => {
  test('ThemeSwitcher persists selected theme across reloads', async ({ page }) => {
    await page.goto('/src/pages/app.html');
    await page.getByRole('radio', { name: 'Dark' }).click();
    // Verify aria-checked changed
    await expect(page.getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true');
    await page.reload();
    // After reload, dark should still be selected
    await expect(page.getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true');
  });

  test('Opening and closing modals restores focus to the trigger', async ({ page }) => {
    await page.goto('/src/pages/app.html');
    const trigger = page.getByRole('button', { name: 'Open Modal' });
    await trigger.focus();
    await trigger.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.locator('.modal-close').click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    // Focus should return to the trigger
    await expect(trigger).toBeFocused();

    // Now open basic modal via ModalBasic button
    const basic = page.getByRole('button', { name: 'Open Basic Modal' });
    await basic.focus();
    await basic.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    // Close via ESC
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(basic).toBeFocused();
  });
});

