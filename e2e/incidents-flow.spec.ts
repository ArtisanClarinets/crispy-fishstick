import { test, expect } from '@playwright/test';

test.describe('Incidents Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'admin@vantus.com');
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('should create and update an incident', async ({ page }) => {
    const timestamp = Date.now();
    const incidentTitle = `Test Incident ${timestamp}`;

    // Navigate to Incidents
    await page.goto('/admin/incidents');
    await expect(page.getByRole('heading', { name: 'Incidents', exact: true })).toBeVisible();

    // Create New
    await page.click('a:has-text("New Incident")');
    await expect(page.getByRole('heading', { name: 'Create Incident', exact: true })).toBeVisible();

    // Fill form
    await page.fill('input[name="title"]', incidentTitle);
    
    // Select Severity (defaults to Medium)
    // Let's change to High
    // The trigger might show "Medium" or "Select severity" depending on initial render.
    // Since we provide defaultValue="medium", it should show "Medium".
    // We click the trigger.
    await page.click('button[role="combobox"]:has-text("Medium")');
    await page.click('div[role="option"]:has-text("High")');

    await page.fill('textarea[name="summary"]', 'Integration test incident summary');

    // Submit
    await page.click('button[type="submit"]');

    // Should redirect to list
    await expect(page).toHaveURL(/\/admin\/incidents$/);
    
    // Reload for cache invalidation
    await page.reload();

    // Verify in list
    await expect(page.getByText(incidentTitle)).toBeVisible();

    // Edit
    await page.getByRole('row', { name: incidentTitle }).getByRole('link', { name: 'Edit' }).click();
    
    await expect(page.getByRole('heading', { name: 'Edit Incident', exact: true })).toBeVisible();
    await expect(page.locator('input[name="title"]')).toHaveValue(incidentTitle);
    
    // Update
    const newTitle = `${incidentTitle} Updated`;
    await page.fill('input[name="title"]', newTitle);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/\/admin\/incidents$/);
    await page.reload();
    await expect(page.getByText(newTitle)).toBeVisible();
  });
});
