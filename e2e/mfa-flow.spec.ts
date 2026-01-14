import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test.describe('MFA Flow', () => {
  test('should enable, enforce, and disable MFA', async ({ page }) => {
    // 1. Login
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill('admin@vantus.systems');
    await page.getByLabel('Password').fill('admin123!');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/admin');

    // 2. Navigate to Security Settings
    await page.goto('/admin/settings/security');
    
    // Check if already enabled and disable it if so (cleanup from previous runs)
    if (await page.getByRole('button', { name: 'Disable MFA' }).isVisible()) {
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'Disable MFA' }).click();
        await expect(page.getByText('MFA Disabled', { exact: true })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Setup MFA' })).toBeVisible();
    }

    // 3. Setup MFA
    // Listen for the generate response to get the secret
    const generatePromise = page.waitForResponse(response => 
      response.url().includes('/api/admin/auth/mfa/generate') && response.status() === 200
    );

    await page.getByRole('button', { name: 'Setup MFA' }).click();
    
    const response = await generatePromise;
    const { secret } = await response.json();
    
    expect(secret).toBeTruthy();

    // 4. Verify with valid code
    const token = authenticator.generate(secret);
    await page.getByLabel('Verification Code').fill(token);
    await page.getByRole('button', { name: 'Verify & Enable' }).click();

    // Wait for toast
    await expect(page.getByText('MFA Enabled', { exact: true })).toBeVisible();
    
    // Check status indicator
    await expect(page.getByText('Enabled', { exact: true })).toBeVisible();

    // 5. Logout
    await page.goto('/api/auth/signout');
    // Confirm signout if needed, or just go to login
    await page.goto('/admin/login');

    // 6. Login with MFA
    await page.getByLabel('Email').fill('admin@vantus.systems');
    await page.getByLabel('Password').fill('admin123!');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Should see MFA prompt
    await expect(page.getByText('Enter your 2FA code')).toBeVisible();
    
    // Enter code
    const newToken = authenticator.generate(secret);
    await page.getByLabel('Two-Factor Code').fill(newToken);
    await page.getByRole('button', { name: 'Verify Code' }).click();

    // Should be logged in
    await expect(page).toHaveURL('/admin');

    // 7. Cleanup: Disable MFA
    await page.goto('/admin/settings/security');
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Disable MFA' }).click();
    await expect(page.getByText('MFA Disabled', { exact: true })).toBeVisible();
  });
});
