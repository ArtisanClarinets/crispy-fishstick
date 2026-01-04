import { test, expect } from '@playwright/test';

test.describe('Admin Flow', () => {
  test('should allow login and view leads', async ({ page }) => {
    // 1. Go to Admin Login
    await page.goto('/admin/login');
    
    // 2. Fill credentials
    await page.fill('input[name="email"]', 'admin@vantus.com');
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');

    // 3. Should redirect to Dashboard
    // Note: The dashboard URL might be /admin
    await expect(page).toHaveURL(/\/admin$/);
    
    // 4. Navigate to Leads
    // Assuming there is a sidebar link
    await page.getByRole('link', { name: 'Leads' }).click();
    await expect(page).toHaveURL(/\/admin\/leads/);
    await expect(page.getByRole('heading', { name: 'Leads', exact: true })).toBeVisible();

    // 5. Check if Leads Table is present
    await expect(page.getByRole('table')).toBeVisible();

    // 6. Verify other modules accessibility
    const modules = [
      { name: 'Projects', url: '/admin/projects', heading: 'Projects' },
      { name: 'Services', url: '/admin/services', heading: 'Services' },
      { name: 'Incidents', url: '/admin/incidents', heading: 'Incidents' },
      { name: 'Proposals', url: '/admin/proposals', heading: 'Proposals' },
      { name: 'Contracts', url: '/admin/contracts', heading: 'Contracts' },
      { name: 'Invoices', url: '/admin/invoices', heading: 'Invoices' },
      { name: 'Media', url: '/admin/media', heading: 'Media Library' },
      { name: 'Content', url: '/admin/content', heading: 'Content Management' },
      { name: 'Audit Logs', url: '/admin/audit', heading: 'Audit Logs' },
      { name: 'Analytics', url: '/admin/analytics', heading: 'Analytics' },
    ];

    for (const module of modules) {
      await page.getByRole('link', { name: module.name }).click();
      await expect(page).toHaveURL(new RegExp(module.url));
      
      const options = 'roleOptions' in module ? module.roleOptions : {};
      const locator = page.getByRole('heading', { 
        name: module.heading, 
        exact: true,
        ...options
      });

      if (await locator.count() > 1) {
        await expect(locator.first()).toBeVisible();
      } else {
        await expect(locator).toBeVisible();
      }

      // Specific check for Analytics dashboard
      if (module.name === 'Analytics') {
        await expect(page.getByText('Total Revenue')).toBeVisible();
        await expect(page.getByText('Leads Pipeline')).toBeVisible();
        await expect(page.getByText('Active Projects')).toBeVisible();
        await expect(page.getByText('System Activity')).toBeVisible();
      }
    }
  });
});
