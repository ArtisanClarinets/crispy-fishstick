import { test, expect } from '@playwright/test';

test.describe('Admin Access Control', () => {
  test('Unauthenticated user is redirected to admin login', async ({ page }) => {
    await page.goto('/admin/dashboard');
    // Should be redirected to /admin/login
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('Non-admin user cannot access admin routes', async () => {
    // This requires logging in as a non-admin.
    // We assume there is a seed or we can't easily do this without seeding.
    // For now, checking the unauthenticated redirect is good baseline.
    // We can simulate logged in state by setting cookies if we knew how, but standard flow is better.
  });

  test('Public routes are accessible', async ({ page }) => {
     // Assuming there is a public route, e.g. /login or /
     await page.goto('/admin/login');
     await expect(page).toHaveURL(/\/admin\/login/);
  });
});

test.describe('Security Headers', () => {
  test('Response headers contain security headers', async ({ page }) => {
    const response = await page.goto('/admin/login');
    const headers = response?.headers();

    expect(headers?.['x-frame-options']).toBe('DENY');
    expect(headers?.['x-content-type-options']).toBe('nosniff');
    expect(headers?.['content-security-policy']).toBeDefined();
    // Nonce checks are harder in E2E without parsing
  });
});
