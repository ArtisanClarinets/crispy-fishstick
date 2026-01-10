import { test, expect } from '@playwright/test';

test.describe('Invoices Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill('admin@vantus.systems');
    await page.getByLabel('Password').fill('admin123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/admin');
  });

  test('should create a new invoice', async ({ page }) => {
    await page.goto('/admin/invoices');
    
    // Check if we are on the invoices page
    await expect(page.getByRole('heading', { name: 'Invoices', exact: true })).toBeVisible();

    // Navigate to new invoice page
    await page.getByRole('link', { name: 'New Invoice' }).click();
    await expect(page).toHaveURL('/admin/invoices/new');

    // Select tenant
    const tenantSelect = page.getByLabel('Tenant');
    await tenantSelect.selectOption({ index: 1 }); // Select first available tenant

    // Fill dates (defaults are usually fine but let's be explicit if needed, here we keep defaults)
    
    // Fill item details
    await page.getByPlaceholder('Item description').fill('Consulting Services');
    await page.getByLabel('Qty').fill('10');
    await page.getByLabel('Price').fill('150');

    // Verify total calculation
    await expect(page.getByText('Total: $1500.00')).toBeVisible();

    // Submit
    await page.getByRole('button', { name: 'Create Invoice' }).click();

    // Verify redirection and success message
    await expect(page).toHaveURL('/admin/invoices');
    await expect(page.getByText('Success', { exact: true })).toBeVisible();
    await expect(page.getByText('Invoice created successfully', { exact: true })).toBeVisible();

    // Verify invoice appears in the list (checking for amount or status)
    await expect(page.getByText('$1,500.00')).toBeVisible();
  });
});
