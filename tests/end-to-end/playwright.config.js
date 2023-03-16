import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "yarn dev",
    url: "http://localhost:3000/",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:3000/",
    browserName: "webkit",
  },
  testDir: "../..",
  testMatch: ["app/**/*.e2e.ts", "tests/end-to-end/*.ts"],
  timeout: 180 * 1000,
});
