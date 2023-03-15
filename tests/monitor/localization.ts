import { test, expect } from "@playwright/test";

/**
 * Test if the localized website looks right
 *
 * The localized website is kind of hard to test, because it’s
 * localized automatically by Weglot from the production site.
 */
test("Localization looks right", async ({ page }) => {
  await page.goto("https://en.cesko.digital");
  await expect(page.locator("h1")).toHaveText(/Changing Czechia/);
  await expect(page.getByRole("link", { name: "Česky" })).toHaveAttribute(
    "href",
    "https://cesko.digital/"
  );
});
