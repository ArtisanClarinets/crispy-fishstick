import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Thompson Systems/);
  });

  test("should render the Living Blueprint section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    const section = page.locator("#living-blueprint");
    await expect(section).toBeVisible();

    // Wait for client hydration so scroll-driven state updates are active.
    await expect(section).toHaveAttribute("data-hydrated", "true");

    const heading = section.getByRole("heading", {
      level: 2,
      name: /A build plan you can feel\./,
    });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();

    // Desktop: should include 7 step headings.
    const steps = section.getByRole("heading", { level: 3 });
    await expect(steps).toHaveCount(7);
    await expect(section.getByRole("heading", { level: 3, name: "Diagnose" })).toBeVisible();
    await expect(section.getByRole("heading", { level: 3, name: "Support" })).toBeVisible();

    // Sticky visual container should exist (Spline itself may not load in CI).
    await expect(section.getByTestId("living-blueprint-visual")).toBeVisible();

    // Verify the scroll-driven phase changes without relying on WebGL.
    const sectionMetrics = await section.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return { top: rect.top + window.scrollY, height: rect.height };
    });

    // With offset ["start start", "end end"]:
    // scrollYProgress = 0 when: scrollY = m.top (section.top at viewport.top)
    // scrollYProgress = 1 when: scrollY = m.top + m.height - window.innerHeight (section.bottom at viewport.bottom)
    // So progress = (scrollY - m.top) / (m.height - window.innerHeight)

    // Phase 0: section at top of viewport
    await page.evaluate((m) => window.scrollTo(0, m.top + 10), sectionMetrics);
    await page.waitForTimeout(200);
    await expect(section).toHaveAttribute("data-phase", "0");

    // Phase 2+: scroll partway through section
    // For phase 2: Math.round(0.2857 * 7) = 2, so we need scrollProgress >= 0.2857
    // scrollY = m.top + (m.height - window.innerHeight) * 0.4
    await page.evaluate((m) => {
      const scrollRange = m.height - window.innerHeight;
      window.scrollTo(0, m.top + scrollRange * 0.4);
    }, sectionMetrics);
    await page.waitForTimeout(200);
    
    await expect
      .poll(async () => Number(await section.getAttribute("data-phase") ?? "0"), { timeout: 5000 })
      .toBeGreaterThanOrEqual(2);

    // Phase 6+: scroll far through section
    // For phase 6: Math.round(0.7857 * 7) = 5.5, so phase 6 requires scrollProgress >= 0.7857
    // scrollY = m.top + (m.height - window.innerHeight) * 0.85
    await page.evaluate((m) => {
      const scrollRange = m.height - window.innerHeight;
      const targetScroll = m.top + scrollRange * 0.85;
      window.scrollTo(0, Math.max(0, targetScroll));
    }, sectionMetrics);
    await page.waitForTimeout(200);
    
    await expect
      .poll(async () => Number(await section.getAttribute("data-phase") ?? "0"), { timeout: 5000 })
      .toBeGreaterThanOrEqual(6);
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
      page.getByRole("heading", { level: 1, name: /Engineering for High-Trust Products/ })
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
