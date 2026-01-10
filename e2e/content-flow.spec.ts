import { test, expect } from '@playwright/test';

test.describe('Content Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'admin@vantus.systems');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('should create, update and delete content', async ({ page }) => {
    // 1. Navigate to Content
    await page.click('a[href="/admin/content"]');
    await expect(page.getByRole('heading', { name: 'Content Management' })).toBeVisible();

    // 2. Create New Content
    await page.click('button:has-text("New Content")');
    await expect(page.getByRole('heading', { name: 'New Content' })).toBeVisible();

    const timestamp = Date.now();
    const title = `Test Content ${timestamp}`;
    const slug = `test-content-${timestamp}`;

    await page.fill('input[name="title"]', title);
    // Slug should auto-generate, but let's check or fill it
    await expect(page.locator('input[name="slug"]')).toHaveValue(slug);

    // Select Type: Page
    // Default value is "Post", so the button text is "Post"
    await page.click('button:has-text("Post")');
    await page.click('div[role="option"]:has-text("Page")');

    // Select Status: Published
    // Default value is "Draft", so the button text is "Draft"
    await page.click('button:has-text("Draft")');
    await page.click('div[role="option"]:has-text("Published")');

    await page.fill('textarea[name="excerpt"]', 'This is a test excerpt');
    await page.fill('textarea[name="content"]', '# Test Content\n\nThis is the body.');

    await page.click('button:has-text("Create Content")');

    // 3. Verify in List
    await expect(page.getByRole('heading', { name: 'Content Management' })).toBeVisible();
    
    // Find the row for the new content
    const newRow = page.locator('tr').filter({ hasText: title });
    await expect(newRow).toBeVisible();
    await expect(newRow.getByText('Page')).toBeVisible(); // Type
    await expect(newRow.getByText('Published')).toBeVisible(); // Status

    // 4. Edit Content
    // Find the row with the title, click edit button
    const row = page.locator('tr').filter({ hasText: title });
    await row.getByRole('button').first().click(); // Edit icon button

    await expect(page.getByRole('heading', { name: 'Edit Content', level: 1 })).toBeVisible();
    
    const updatedTitle = `${title} Updated`;
    await page.fill('input[name="title"]', updatedTitle);
    await page.click('button:has-text("Update Content")');

    // 5. Verify Update
    await expect(page.getByRole('heading', { name: 'Content Management' })).toBeVisible();
    await expect(page.getByText(updatedTitle)).toBeVisible();

    // 6. Delete Content
    // Find the row with the updated title
    const updatedRow = page.locator('tr').filter({ hasText: updatedTitle });
    
    // Handle confirmation dialog
    page.on('dialog', dialog => dialog.accept());

    // Click delete icon (trash)
    await updatedRow.locator('button').nth(1).click(); // nth(0) is edit, nth(1) is delete

    // 7. Verify Deletion
    await expect(page.getByText('Content deleted')).toBeVisible();
    await expect(page.getByText(updatedTitle)).not.toBeVisible();
  });
});
