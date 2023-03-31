import { test, expect } from "@playwright/test";

/** Endpoints to test */
const endpoints = [
  "/api/stats/opportunities/sources",
  "/api/stats/opportunities/visits",
  "/api/stats/skills/availability",
  "/api/stats/skills/categories",
  "/api/stats/skills/subcategories",
  "/api/stats/occupations",
  "/stats/trends/new-comers?year=2022&fill=true",
  "/stats/trends/new-comers-engagements?year=2022&fill=true",
  "/stats/trends/new-engagements?year=2022&fill=true",
];

for (const endpoint of endpoints) {
  test(`Stats endpoint works: ${endpoint}`, async ({ page }) => {
    const response = await page.request.get(endpoint);
    expect(response).toBeOK();
    expect(response.headers()["content-type"]).toEqual(
      "text/csv; charset=utf-8"
    );
  });
}
