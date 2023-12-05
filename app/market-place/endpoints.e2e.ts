import { expect, test } from "@playwright/test";

import { ContentType } from "~/src/utils";

test("URL verification", async ({ page }) => {
  const payload = {
    token: "Jhj5dZrVaK7ZwHHjRyZWjbDl",
    challenge: "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
    type: "url_verification",
  };
  const response = await page.request.post("/marketplace/new_message", {
    data: JSON.stringify(payload, null, 2),
    headers: {
      "Content-Type": ContentType.json,
    },
  });
  await expect(response).toBeOK();
});
