import { test, expect } from '@playwright/test';

test.describe('Proposals Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'admin@vantus.systems');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('should create, update, and delete a proposal', async ({ page }) => {
    const timestamp = Date.now();
    const title = `E2E Test Proposal ${timestamp}`;

    // Navigate to Proposals
    await page.goto('/admin/proposals');
    await expect(page.getByRole('heading', { name: 'Proposals', exact: true })).toBeVisible();

    // Create New
    await page.getByRole('link', { name: 'New Proposal' }).click();
    await expect(page.getByRole('heading', { name: 'Proposal Details' })).toBeVisible();

    await page.fill('input[name="title"]', title);
    await page.fill('input[name="items.0.description"]', 'E2E Item');
    await page.fill('input[name="items.0.hours"]', '10');
    await page.fill('input[name="items.0.rate"]', '150');

    // Submit
    await page.click('button[type="submit"]');

    // Should redirect to list
    await expect(page).toHaveURL(/\/admin\/proposals$/);
    await expect(page.getByText(title).first()).toBeVisible();

    // View Details - find the row with the title, then click View
    // Since we just created it and it's sorted by desc, it should be first.
    // But safely:
    await page.getByRole('row', { name: title }).getByRole('link', { name: 'View' }).click();
    
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
    
    // Verify values
    await expect(page.getByText('E2E Item')).toBeVisible();
    // Check for formatted currency. 1500 might be formatted as $1,500.00
    // We can just check for 1,500
    await expect(page.getByText('1,500').first()).toBeVisible();

    // Change Status to Sent
    await page.click('button:has-text("Mark as Sent")');
    // Wait for toast or status update
    await expect(page.getByText('sent', { exact: true })).toBeVisible();

    // Change Status to Approved
    await page.click('button:has-text("Approve")');
    await expect(page.getByText('approved', { exact: true }).first()).toBeVisible();

    // Setup dialog handler before clicking delete
    page.on('dialog', dialog => dialog.accept());

    // Delete
    await page.getByRole('button', { name: 'Actions' }).click();
    await page.getByText('Delete Proposal').click();
    
    // Should redirect to list
    await expect(page).toHaveURL(/\/admin\/proposals$/);
    await expect(page.getByText(title)).not.toBeVisible();
  });
});
