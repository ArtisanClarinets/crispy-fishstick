import { test, expect } from '@playwright/test';

test.describe('Leads Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'admin@vantus.com');
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('should create and update a lead', async ({ page }) => {
    const timestamp = Date.now();
    const leadName = `Test Lead ${timestamp}`;
    const leadEmail = `lead${timestamp}@example.com`;

    // Navigate to Leads
    await page.goto('/admin/leads');
    await expect(page.getByRole('heading', { name: 'Leads', exact: true })).toBeVisible();

    // Create New
    await page.click('a:has-text("New Lead")');
    await expect(page.getByRole('heading', { name: 'New Lead', exact: true })).toBeVisible();

    // Fill form
    await page.fill('input[name="name"]', leadName);
    await page.fill('input[name="email"]', leadEmail);
    
    // Status defaults to "New"
    // Source
    await page.fill('input[name="source"]', 'E2E Test');

    // Submit
    await page.click('button[type="submit"]');

    // Should redirect to list
    await expect(page).toHaveURL(/\/admin\/leads$/);
    
    // Reload for cache invalidation
    await page.reload();

    // Verify in list
    await expect(page.getByText(leadName)).toBeVisible();
    await expect(page.getByText(leadEmail)).toBeVisible();
    await expect(page.getByText('new', { exact: true })).toBeVisible(); // Badge

    // Edit
    await page.getByRole('row', { name: leadName }).getByRole('link', { name: 'Edit' }).click();
    
    await expect(page.getByRole('heading', { name: 'Edit Lead', exact: true })).toBeVisible();
    await expect(page.locator('input[name="name"]')).toHaveValue(leadName);
    
    // Update Status to "Won"
    await page.click('button[role="combobox"]:has-text("New")');
    await page.click('div[role="option"]:has-text("Won")');

    // Submit
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/\/admin\/leads$/);
    await page.reload();
    
    // Verify updated status
    // Since badge text might be capitalized or not depending on implementation, checking exact match might be tricky if Shadcn Select changes case.
    // But our form uses lowercase values "won". The badge usually displays the value or a label.
    // In page.tsx: {lead.status}
    await expect(page.getByText('won', { exact: true })).toBeVisible();
  });
});
