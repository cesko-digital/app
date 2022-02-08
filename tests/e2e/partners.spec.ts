import { test, expect } from "@playwright/test";

test("should show financial partners", async ({page}) => {
    await page.goto("/partners");
    expect(page).toHaveTitle("Partneři | Česko.Digital");
    await page.click("text=Finanční partneři");
    const section = page.locator("#partners-financial");
    const partners = section.locator("ul > li");
    expect(await partners.count()).toBeGreaterThan(0);
})

test("should show expert partners", async ({page}) => {
    await page.goto("/partners");
    expect(page).toHaveTitle("Partneři | Česko.Digital");
    await page.click("text=Expertní partneři");
    const section = page.locator("#partners-experts");
    const submitters = section.locator("#partners-submitters");
    const subPartners = submitters.locator("ul > li");
    expect(await subPartners.count()).toBeGreaterThan(0);
    const supporters = section.locator("#partners-supporters");
    const supPartners = supporters.locator("ul > li");
    expect(await supPartners.count()).toBeGreaterThan(0);
})