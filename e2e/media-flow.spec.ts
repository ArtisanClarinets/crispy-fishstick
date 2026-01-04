import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Media Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'admin@vantus.com');
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('should upload and delete media', async ({ page }) => {
    await page.goto('/admin/media');
    await expect(page.getByRole('heading', { name: 'Media Library', exact: true })).toBeVisible();

    // Create a dummy file
    const filename = 'test-image.png';
    const filepath = path.join(__dirname, '..', 'e2e', filename);
    // Create a simple 1x1 png or just text file disguised as png? 
    // Browser might validate mime type. Let's make a text file for simplicity and see if it accepts.
    // Our code checks `file.type` but doesn't validate strictly content.
    fs.writeFileSync(filepath, 'fake image content');

    // Click Upload
    await page.click('button:has-text("Upload Media")');
    
    // Upload file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filepath);

    // Wait for upload to complete (toast appears)
    await expect(page.getByText('File uploaded successfully')).toBeVisible();
    
    // Check if file appears in grid (we look for the filename in the UI)
    // The UI shows `key` which includes timestamp-filename
    // We can search for the original filename part or just "test-image.png"
    // Since we sanitize: "test-image.png" -> "test-image.png"
    await expect(page.getByText('test-image.png')).toBeVisible();

    // Delete
    // Hover over the card to show delete button?
    // My implementation: opacity-0 group-hover:opacity-100
    // Playwright can force click or hover.
    
    // Find the card containing the text
    const card = page.locator('.group').filter({ hasText: 'test-image.png' });
    await card.hover();
    
    // Handle confirmation dialog
    page.on('dialog', dialog => dialog.accept());

    // Click delete trigger (trash icon)
    await card.locator('button').click();

    // Verify deletion
    await expect(page.getByText('File deleted')).toBeVisible();
    await expect(card).not.toBeVisible();

    // Cleanup
    fs.unlinkSync(filepath);
  });
});
