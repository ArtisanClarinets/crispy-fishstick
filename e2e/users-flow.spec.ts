import { test, expect } from '@playwright/test';

test.describe('Users Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'admin@vantus.com');
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('should create and update a user', async ({ page }) => {
    const timestamp = Date.now();
    const userName = `Test User ${timestamp}`;
    const userEmail = `testuser${timestamp}@vantus.com`;

    // Navigate to Users
    await page.goto('/admin/users');
    await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible();

    // Create New
    await page.click('a:has-text("New User")');
    await expect(page.getByRole('heading', { name: 'New User', exact: true })).toBeVisible();

    // Fill form
    await page.fill('input[name="name"]', userName);
    await page.fill('input[name="email"]', userEmail);
    await page.fill('input[name="password"]', 'password123');

    // Select Role "Editor"
    // Trying to click the label
    await page.locator('label').filter({ hasText: 'Editor' }).click();

    // Submit
    await page.click('button[type="submit"]');

    // Should redirect to list
    await expect(page).toHaveURL(/\/admin\/users$/);
    
    // Reload for cache invalidation
    await page.reload();

    // Verify in list
    await expect(page.getByText(userName)).toBeVisible();
    await expect(page.getByText(userEmail)).toBeVisible();
    // Verify Role badge
    await expect(page.getByText('Editor')).toBeVisible();

    // Edit
    await page.getByRole('row', { name: userName }).getByRole('link', { name: 'Edit' }).click();
    
    await expect(page.getByRole('heading', { name: 'Edit User', exact: true })).toBeVisible();
    await expect(page.locator('input[name="name"]')).toHaveValue(userName);
    
    // Update Name
    const newName = `${userName} Updated`;
    await page.fill('input[name="name"]', newName);
    
    // Add "Admin" role
    await page.locator('label').filter({ hasText: 'Admin' }).click();

    // Submit
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/\/admin\/users$/);
    await page.reload();
    await expect(page.getByText(newName)).toBeVisible();
    
    // Verify both roles (Editor and Admin) might be visible if row shows all.
    // Or at least Admin should be there.
    // Since we filtered by name row, we can check inside that row.
    const row = page.getByRole('row', { name: newName });
    await expect(row).toBeVisible();
    await expect(row).toContainText('Admin');
    await expect(row).toContainText('Editor');
  });
});
