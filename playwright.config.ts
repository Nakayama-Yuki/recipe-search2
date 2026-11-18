import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "node --import ./tests/mock-fetch.mjs node_modules/next/dist/bin/next start",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    env: {
      SPOONACULAR_API_KEY: "e2e-only-key",
    },
  },
});
