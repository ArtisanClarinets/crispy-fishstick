import { test, expect } from '@playwright/test';

test.describe('Services Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'admin@vantus.com');
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('should create and update a service', async ({ page }) => {
    const timestamp = Date.now();
    const serviceName = `E2E Service ${timestamp}`;

    // Navigate to Services
    await page.goto('/admin/services');
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();

    // Create New
    await page.getByRole('link', { name: 'Register Service' }).click();
    await expect(page.getByRole('heading', { name: 'New Service' })).toBeVisible();

    await page.fill('input[name="name"]', serviceName);
    await page.fill('textarea[name="description"]', 'E2E Description');
    // lifecycle defaults to production

    await page.click('button[type="submit"]');

    // Should redirect to list
    await expect(page).toHaveURL(/\/admin\/services$/);
    
    // Reload to ensure we have the latest data (Next.js cache invalidation)
    await page.reload();
    
    await expect(page.getByText(serviceName)).toBeVisible();

    // Edit
    // Find the row and click View
    // We use .first() just in case, but timestamp should make it unique
    const row = page.getByRole('row', { name: serviceName }).first();
    await row.getByRole('link', { name: 'View' }).click();

    await expect(page.getByRole('heading', { name: 'Edit Service' })).toBeVisible();
    await expect(page.locator('input[name="name"]')).toHaveValue(serviceName);

    // Update
    await page.fill('textarea[name="description"]', 'Updated Description');
    await page.click('button[type="submit"]');
    
    // Should redirect to list
    await expect(page).toHaveURL(/\/admin\/services$/);
    await page.reload();
    
    // Verify update
    // Click View again
    await page.getByRole('row', { name: serviceName }).first().getByRole('link', { name: 'View' }).click();
    await expect(page.locator('textarea[name="description"]')).toHaveValue('Updated Description');
  });
});
