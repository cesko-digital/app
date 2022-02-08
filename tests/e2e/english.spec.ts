import { test, expect } from "@playwright/test";

test("should contain English text", async ({ page }) => {
  await page.goto("/en");
  expect(await page.title()).toBe(
    "Česko.Digital – Skrz jedničky a nuly měníme Česko k lepšímu"
  );
  await expect(page.locator("h1")).toContainText("Changing Czechia");
});
