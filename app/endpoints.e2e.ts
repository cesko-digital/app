import { test, expect } from "@playwright/test";
import { ContentType } from "src/utils";

/** Endpoints to test */
const endpoints = {
  // Calendar feed
  "/events/feed.ical": ContentType.ical,
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
