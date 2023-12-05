import { expect, test } from "@playwright/test";

/** Endpoints to test */
const endpoints = [
  "/stats/districts",
  "/stats/occupations",
  "/stats/opportunities/sources",
  "/stats/opportunities/visits",
  "/stats/skills/availability",
  "/stats/skills/categories",
  "/stats/skills/subcategories",
  "/stats/trends/new-comers?year=2022&fill=true",
  "/stats/trends/new-comers-engagements?year=2022&fill=true",
  "/stats/trends/new-engagements?year=2022&fill=true",
];

for (const endpoint of endpoints) {
  test(`Stats endpoint works: ${endpoint}`, async ({ page }) => {
    const response = await page.request.get(endpoint);
    await expect(response).toBeOK();
    expect(response.headers()["content-type"]).toEqual(
      "text/csv; charset=utf-8",
    );
  });
}
