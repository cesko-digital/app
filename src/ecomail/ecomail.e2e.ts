import { expect, test } from "@playwright/test";

import {
  deleteSubscriber,
  getAllCampaigns,
  getSubscriber,
  subscribeToList,
  unsubscribeFromList,
} from "~/src/ecomail/ecomail";

const apiKey = process.env.ECOMAIL_API_KEY ?? "";
const testEmail = "zoul+testmatov@cesko.digital";

test("Basic subscriber management", async () => {
  await subscribeToList({
    apiKey,
    email: testEmail,
    skipConfirmation: true,
  });
  await unsubscribeFromList(apiKey, testEmail);
  const subscriber = await getSubscriber(apiKey, testEmail);
  expect(subscriber.email).toBe(testEmail);
  await deleteSubscriber(apiKey, testEmail);
});

test("Campaigns", async () => {
  const campaigns = await getAllCampaigns(apiKey);
  expect(campaigns.length).toBeGreaterThan(0);
});
