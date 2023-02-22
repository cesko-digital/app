import { test, expect } from "@playwright/test";

/**
 * Test if the Slack onboarding link has expired
 *
 * https://github.com/cesko-digital/web/issues/740
 */
test("Onboarding link works", async ({ page }) => {
  const onboardingUrl = "https://slack.cesko.digital";
  const expiredOnboardingUrl =
    "https://join.slack.com/t/cesko-digital/shared_invite/zt-1fglpgk2t-j_ujDOGCAB5nGeBprCEwFA";
  const hasExpiredHeading = async (url: string) => {
    await page.goto(url);
    const count = await page
      .getByRole("heading")
      .filter({ hasText: "This link is no longer active" })
      .count();
    return count === 1;
  };
  expect(await hasExpiredHeading(expiredOnboardingUrl)).toEqual(true);
  expect(await hasExpiredHeading(onboardingUrl)).toEqual(false);
});
