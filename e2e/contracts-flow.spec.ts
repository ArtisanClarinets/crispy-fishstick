import { test, expect } from '@playwright/test';

test.describe('Contracts Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'admin@vantus.systems');
    await page.fill('input[name="password"]', 'admin123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('should create and update a contract', async ({ page }) => {
    const timestamp = Date.now();
    const contractTitle = `Test Contract ${timestamp}`;

    // Navigate to Contracts
    await page.goto('/admin/contracts');
    await expect(page.getByRole('heading', { name: 'Contracts', exact: true })).toBeVisible();

    // Create New
    await page.click('a:has-text("New Contract")');
    await expect(page.getByRole('heading', { name: 'New Contract', exact: true })).toBeVisible();

    // Fill form
    await page.fill('input[name="title"]', contractTitle);
    
    // Select Tenant
    // Assuming "Default Tenant" exists from seed
    await page.click('button[role="combobox"]:has-text("Select tenant")');
    await page.click('div[role="option"]:has-text("Default Tenant")');

    // Status defaults to "Draft", let's keep it
    // Start Date
    await page.fill('input[name="startDate"]', '2024-01-01');

    // Value
    await page.fill('input[name="value"]', '10000');

    // Content
    await page.fill('textarea[name="content"]', 'Test contract content');

    // Submit
    await page.click('button[type="submit"]');

    // Should redirect to list
    await expect(page).toHaveURL(/\/admin\/contracts$/);
    
    // Reload for cache invalidation
    await page.reload();

    // Verify in list
    await expect(page.getByText(contractTitle)).toBeVisible();

    // Edit
    await page.getByRole('row', { name: contractTitle }).getByRole('link', { name: 'Edit' }).click();
    
    await expect(page.getByRole('heading', { name: 'Edit Contract', exact: true })).toBeVisible();
    await expect(page.locator('input[name="title"]')).toHaveValue(contractTitle);
    
    // Update
    const newTitle = `${contractTitle} Updated`;
    await page.fill('input[name="title"]', newTitle);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/\/admin\/contracts$/);
    await page.reload();
    await expect(page.getByText(newTitle)).toBeVisible();
  });
});
