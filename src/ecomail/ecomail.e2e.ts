import { expect, test } from "@playwright/test";

import {
  ecomailDeleteSubscriber,
  ecomailGetAllCampaigns,
  ecomailGetSubscriber,
  ecomailSubscribeToList,
  ecomailUnsubscribeFromList,
} from "~/src/ecomail/ecomail";

const apiKey = process.env.ECOMAIL_API_KEY ?? "";
const testEmail = "zoul+testmatov@cesko.digital";

test("Basic subscriber management", async () => {
  await ecomailSubscribeToList({
    apiKey,
    email: testEmail,
    skipConfirmation: true,
  });
  await ecomailUnsubscribeFromList(apiKey, testEmail);
  const subscriber = await ecomailGetSubscriber(apiKey, testEmail);
  expect(subscriber.email).toBe(testEmail);
  await ecomailDeleteSubscriber(apiKey, testEmail);
});

test("Campaigns", async () => {
  const campaigns = await ecomailGetAllCampaigns(apiKey);
  expect(campaigns.length).toBeGreaterThan(0);
});
