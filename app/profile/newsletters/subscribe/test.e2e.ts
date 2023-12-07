import { expect, test } from "@playwright/test";

import { ContentType } from "~/src/utils";

test("Newsletter subscribe endpoint", async ({ page }) => {
  const response = await page.request.post("/profile/newsletters/subscribe", {
    headers: { "Content-Type": ContentType.json },
    data: JSON.stringify({ email: "zoul+tests@cesko.digital" }, null, 2),
  });
  await expect(response).toBeOK();
});
