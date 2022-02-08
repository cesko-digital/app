import { test, expect } from "@playwright/test";

test("should have distinct sections", async ({ page }) => {
  await page.goto("/projects");
  expect(await page.title()).toBe("Projekty | Česko.Digital");
  const headers2 = page.locator("h2");
  await expect(headers2.nth(0)).toContainText("Aktuální projekty");
  await expect(headers2.nth(1)).toContainText("Dokončené projekty");
});
