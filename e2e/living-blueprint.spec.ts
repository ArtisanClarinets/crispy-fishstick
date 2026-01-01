import { test, expect } from "@playwright/test";

test.describe("Living Blueprint Page", () => {
  test("should render the Living Blueprint section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/living-blueprint");

    const section = page.locator("#living-blueprint");
    await expect(section).toBeVisible();

    // Wait for client hydration so scroll-driven state updates are active.
    await expect(section).toHaveAttribute("data-hydrated", "true");

    const heading = section.getByRole("heading", {
      level: 2,
      name: /The Blueprint/,
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
});
