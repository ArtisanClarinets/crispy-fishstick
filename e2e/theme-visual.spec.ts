import { test, expect } from '@playwright/test';

test.describe('Theme Visual Verification', () => {
  test('should render home hero in light and dark mode', async ({ page }) => {
    // Light Mode
    await page.goto('/');
    
    // next-themes uses local storage and updates the html class
    await page.evaluate(() => window.localStorage.setItem('theme', 'light'));
    // Reload to apply theme from server/hydration if needed, or just trigger the change
    // next-themes listens to storage, but a reload ensures we are in the clean state
    await page.reload();
    
    // Check for light mode
    // Note: next-themes might not add 'light' class explicitly if it's default, 
    // but it definitely adds 'dark' for dark mode.
    // Let's force it.
    
    await expect(page.getByTestId('hero-signal-field')).toBeVisible();
    await page.waitForTimeout(1000); // Allow canvas to render
    await page.screenshot({ path: 'verification/home-light.png', fullPage: false });

    // Dark Mode
    await page.evaluate(() => window.localStorage.setItem('theme', 'dark'));
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'verification/home-dark.png', fullPage: false });
  });

  test('should respect reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForTimeout(1000);
    // We expect the canvas to still be there, but static
    await expect(page.getByTestId('hero-signal-field')).toBeVisible();
    await page.screenshot({ path: 'verification/home-reduced-motion.png' });
  });
});
