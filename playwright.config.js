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
  testMatch: /.*\.e2e\.ts/,
});
