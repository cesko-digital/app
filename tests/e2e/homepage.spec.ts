import { test, expect } from "@playwright/test";

test("link from home page to projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Skrz jedničky a nuly");
  await page.click("text=Co děláme");
  await expect(page).toHaveURL("/projects");
});

test("link from home page to blog", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Skrz jedničky a nuly");
  await page.click("text=Blog");
  await expect(page).toHaveURL("https://blog.cesko.digital/");
});
