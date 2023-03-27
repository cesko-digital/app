import { test, expect } from "@playwright/test";

/** Often used content types */
const ct = {
  json: "application/json",
  rss: "application/rss+xml",
  html: "text/html",
  txt: "text/plain",
};

/** Endpoints to test */
const endpoints = {
  // Just a dummy testing endpoint
  "/api/hello": ct.txt,
  // Basic data endpoints
  "/api/events": ct.json,
  "/api/opportunities": ct.json,
  "/api/partners": ct.json,
  "/api/projects": ct.json,
  "/api/users": ct.json,
};

// Test that some basic endpoints look right
for (const [endpoint, contentType] of Object.entries(endpoints)) {
  test(`Endpoint works: ${endpoint}`, async ({ page }) => {
    const response = await page.request.get(endpoint);
    expect(response).toBeOK();
    expect(response.headers()["content-type"]).toEqual(contentType);
    if (contentType === "application/json") {
      expect(await response.json()).toBeTruthy();
    }
  });
}
