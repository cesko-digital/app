import { defineConfig } from "@playwright/test";

// Read env variables from .env.local if present
require("dotenv-flow").config({ silent: true });

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
  expect: {
    timeout: 180 * 1000,
  },
  testMatch: ["app/**/*.e2e.ts"],
  timeout: 180 * 1000,
});
