import { expect, test } from "@playwright/test";

import { espoGetContactById } from "~/src/espocrm/espo";

const apiKey = process.env.CRM_API_KEY ?? "";

test("Get testing contact", async () => {
  const contact = await espoGetContactById(apiKey, "67e2aec3194113385");
  expect(contact.name).toBe("Jan Testmatov");
});
