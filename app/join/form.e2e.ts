import { test, expect } from "@playwright/test";

test("Submit button is disabled by default", async ({ page }) => {
  await page.goto("/join/form");
  const submitButton = page.getByRole("button", {
    name: "Odeslat a přejít na Slack",
  });
  expect(submitButton).not.toBeNull();
  await expect(submitButton).toBeDisabled();
});
