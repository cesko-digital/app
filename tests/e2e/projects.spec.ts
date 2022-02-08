import { test, expect } from "@playwright/test";

test("should have section with ongoing projects", async ({ page }) => {
  await page.goto("/projects");
  expect(await page.title()).toBe("Projekty | Česko.Digital");
  const ongoing = page.locator("#projects-ongoing");
  const header2 = ongoing.locator("h2");
  await expect(header2).toContainText("Aktuální projekty");
  const header3 = ongoing.locator("h3");
  await expect(await header3.count()).toBeGreaterThan(0);
});

test("should have section with finished projects", async ({ page }) => {
  await page.goto("/projects");
  expect(await page.title()).toBe("Projekty | Česko.Digital");
  const ongoing = page.locator("#projects-finished");
  const header2 = ongoing.locator("h2");
  await expect(header2).toContainText("Dokončené projekty");
  const header3 = ongoing.locator("h3");
  await expect(await header3.count()).toBeGreaterThan(0);
});
