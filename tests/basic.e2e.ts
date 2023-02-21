import { test, expect } from "@playwright/test";

test("Sanity check", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Česko.Digital/);
});

test("Not found page", async ({ page }) => {
  const response = await page.request.get("/does_not_exist");
  expect(response.status()).toBe(404);
});
