import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    browserName: "webkit",
  },
  testMatch: /monitor\/.*\.ts/,
  timeout: 120 * 1000,
});
