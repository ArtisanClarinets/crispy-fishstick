import { expect, test } from '@playwright/test';

test('homepage has title and links', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Studio/);

  const heading = page.getByRole('heading', { name: /Reliable Systems/i });
  await expect(heading).toBeVisible();

  const cta = page.getByRole('link', { name: /Book a call/i }).first();
  await expect(cta).toBeVisible();
});

test('work page loads and lists projects', async ({ page }) => {
  await page.goto('/work');
  await expect(page.getByRole('heading', { name: /Selected Work/i })).toBeVisible();

  // Check for the flagship project
  await expect(page.getByText('Shopify Admin Sync')).toBeVisible();
});

test('contact form validation', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Check for validation errors
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Invalid email address')).toBeVisible();
});
