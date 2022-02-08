import { test, expect } from "@playwright/test";

test("should have section with ongoing projects", async ({ page }) => {
  await page.goto("/projects");
  expect(page).toHaveTitle("Projekty | Česko.Digital");
  const section = page.locator("#projects-ongoing");
  const header2 = section.locator("h2");
  await expect(header2).toContainText("Aktuální projekty");
  const header3 = section.locator("h3");
  expect(await header3.count()).toBeGreaterThan(0);
});

test("should have section with finished projects", async ({ page }) => {
  await page.goto("/projects");
  expect(page).toHaveTitle("Projekty | Česko.Digital");
  const section = page.locator("#projects-finished");
  const header2 = section.locator("h2");
  await expect(header2).toContainText("Dokončené projekty");
  const header3 = section.locator("h3");
  expect(await header3.count()).toBeGreaterThan(0);
});
