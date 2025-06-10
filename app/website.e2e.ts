import { expect, test } from "@playwright/test";

test("WebFinger works for cesko.digital", async ({ page }) => {
  const response = await page.request.get(
    "https://cesko.digital/.well-known/host-meta",
  );
  await expect(response).toBeOK();
  expect(await response.text()).toEqual(`<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
  <Link rel="lrdd" template="https://mastodon.cesko.digital/.well-known/webfinger?resource={uri}"/>
</XRD>
`);
});
