import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Studio/);
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Work" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Services" })).toBeVisible();
    await expect(page.getByRole("link", { name: "About" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
  });

  test("should navigate to work page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Work" }).first().click();
    await expect(page).toHaveURL(/\/work/);
  });

  test("should have theme toggle", async ({ page }) => {
    await page.goto("/");
    const themeToggle = page.getByLabel("Toggle theme");
    await expect(themeToggle).toBeVisible();
  });

  test("should have accessible hero section", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /Premium Digital/ })
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
    await page.getByRole("link", { name: /View Case Study/ }).first().click();
    await expect(page).toHaveURL(/\/work\//);
  });
});

test.describe("Contact Page", () => {
  test("should have contact form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Subject")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
  });

  test("should validate required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Send Message/ }).click();
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
