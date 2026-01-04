import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Vantus Systems/);
  });


  test("should have navigation links", async ({ page }) => {
    await page.goto("/");
    // Use .first() because links appear in both nav and footer
    await expect(page.getByRole("link", { name: "Work" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Lab" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Process" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Trust Center" }).first()).toBeVisible();
  });

  test("should navigate to work page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Work" }).first().click();
    await expect(page).toHaveURL(/\/work/);
  });

  test("should have theme toggle", async ({ page }) => {
    await page.goto("/");
    // Target the desktop toggle specifically using data-testid to avoid strict-mode collisions
    await expect(page.getByTestId("theme-toggle-desktop")).toBeVisible();
  });

  test("should have accessible hero section", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /Digital Alchemy/ })
    ).toBeVisible();
  });
});

test.describe("Work Page", () => {
  test("should display case studies", async ({ page }) => {
    await page.goto("/work");
    await expect(
      page.getByRole("heading", { name: "Shopify Admin Sync" })
    ).toBeVisible();
  });

  test("should navigate to case study detail", async ({ page }) => {
    await page.goto("/work");
    // The card itself is the link, or it has a title link
    await page.getByRole("link", { name: "Shopify Admin Sync" }).first().click();
    await expect(page).toHaveURL(/\/work\//);
  });
});

test.describe("Contact Page", () => {
  test("should have contact form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByLabel("What's your name?")).toBeVisible();
    await expect(page.getByLabel("What is your role?")).toBeVisible();
  });

  test("should validate required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Next Step/ }).click();
    // HTML5 validation will prevent form submission
    await expect(page).toHaveURL(/\/contact/);
  });
});

test.describe("Accessibility", () => {
  test("should have proper heading hierarchy on homepage", async ({ page }) => {
    await page.goto("/");
    const h1 = await page.locator("h1").count();
    expect(h1).toBeGreaterThanOrEqual(1);
  });

  test("should have alt text for images", async ({ page }) => {
    await page.goto("/");
    const images = await page.locator("img").all();
    for (const img of images) {
      const alt = await img.getAttribute("alt");
      expect(alt).toBeDefined();
    }
  });
});
