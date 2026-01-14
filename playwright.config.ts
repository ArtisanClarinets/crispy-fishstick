import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./e2e",
  timeout: 60000,
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
    env: {
      NEXTAUTH_URL: "http://localhost:3002",
      NEXTAUTH_SECRET: "e67jcdS2iFcrpNRvcvtgv2/7qMsaFBg2wSVho0wZKAU=",
      DISABLE_RATE_LIMITING: "true",
      NODE_ENV: "production",
    },
    // Always start a fresh server locally for deterministic test runs
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
