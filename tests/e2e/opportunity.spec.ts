import { test, expect } from "@playwright/test";

test("should have email for owner", async ({ page }) => {
  await page.goto("/opportunities/rec8IkvvNuEzsaJ78");
  const owner = page.locator("div.owner h4 a");
  await expect(owner.first()).toContainText("Anežka Müller");
  await expect(owner.first()).toHaveAttribute("href", "mailto:anezka@cesko.digital");
});
