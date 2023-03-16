import { test, expect } from "@playwright/test";
import { hashDigest } from "lib/utils";

/**
 * Slack ID of a testing user account
 *
 * TBD: Add a real testing account we can really unsubscribe.
 */
const slackId = "UJJ3MNA91";

test("Return 401 for invalid token", async ({ page }) => {
  const response = await page.request.get(
    `/profile/notifications/unsubscribe?slackId=${slackId}&token=bar`
  );
  expect(response.status()).toBe(401);
});

test("Return 200 for valid token", async ({ page }) => {
  const token = hashDigest(["unsubscribe", slackId]);
  const response = await page.request.get(
    `/profile/notifications/unsubscribe?slackId=${slackId}&token=${token}`
  );
  expect(response.status()).toBe(200);
});
