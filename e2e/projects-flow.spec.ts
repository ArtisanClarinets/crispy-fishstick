import { test, expect } from '@playwright/test';

test.describe('Projects Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill('admin@vantus.systems');
    await page.getByLabel('Password').fill('admin123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/admin');
  });

  test('should create a new project', async ({ page }) => {
    await page.goto('/admin/projects');
    
    // Check if we are on the projects page
    await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();

    // Navigate to new project page
    await page.getByRole('link', { name: 'New Project' }).click();
    await expect(page).toHaveURL('/admin/projects/new');

    // Fill the form
    const projectName = `Test Project ${Date.now()}`;
    await page.getByLabel('Project Name').fill(projectName);
    
    // Select tenant (assuming at least one tenant exists from seed data)
    // We select the first available option that is not the placeholder
    const tenantSelect = page.getByLabel('Tenant');
    await tenantSelect.selectOption({ index: 1 }); // Select the first real option

    await page.getByRole('button', { name: 'Create Project' }).click();

    // Verify redirection and success message
    await expect(page).toHaveURL('/admin/projects');
    await expect(page.getByText('Success', { exact: true })).toBeVisible();
    await expect(page.getByText('Project created successfully', { exact: true })).toBeVisible();

    // Verify project appears in the list
    await expect(page.getByText(projectName)).toBeVisible();
  });
});
