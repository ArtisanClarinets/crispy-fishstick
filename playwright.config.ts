import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3002",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // Force using an explicit port to avoid accidentally hitting an unrelated server
    command: "npm run build && npm run start -- -p 3002",
    url: "http://localhost:3002",
    // Always start a fresh server locally for deterministic test runs
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
