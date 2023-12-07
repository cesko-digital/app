import { expect, test } from "@playwright/test";

test("Submit button is disabled by default", async ({ page }) => {
  await page.goto("/join");
  const submitButton = page.getByRole("button", {
    name: "Odeslat a přejít na Slack",
  });
  expect(submitButton).not.toBeNull();
  await expect(submitButton).toBeDisabled();
});

test.skip("Validation errors are hidden before the form is touched", async ({
  page,
}) => {
  await page.goto("/join");
  const errorSection = page.getByTestId("form-error");
  await expect(errorSection).toHaveCount(0);
  await page.getByLabel("Jméno a příjmení").fill("Joe Random");
  await expect(errorSection).toHaveCount(1);
});
