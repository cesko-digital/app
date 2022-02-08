import { test, expect } from "@playwright/test";

test("link from home page to projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Skrz jedničky a nuly");
  await page.click("text=Co děláme");
  await expect(page).toHaveURL("/projects");
});

test("link from home page to join site", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Skrz jedničky a nuly");
  const link = page.locator("text=Chci se zapojit");
  await expect(link).toHaveAttribute("href", "https://join.cesko.digital/");
});
