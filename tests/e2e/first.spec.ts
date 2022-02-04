import { test, expect } from "@playwright/test"

test("should work at all", async ({ page} ) => {
    await page.goto("http://localhost:3000/");
    await expect(page.locator("h1")).toContainText("Skrz jedničky a nuly");
})