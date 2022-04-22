import fetch from "node-fetch";
import { splitToChunks } from "./utils";

/**
 * Add multiple e-mail addresses to our default contact list
 *
 * If a contact was previously in the contact list and unsubscribed, the addresss
 * won’t be resubscribed and no data will be changed for the contact.
 *
 * https://ecomailczv2.docs.apiary.io/#reference/lists/subscriber-update/add-bulk-subscribers-to-list
 */
export async function addSubscribers(
  apiKey: string,
  emails: string[]
): Promise<void> {
  const maxBatchSize = 500;
  for (const batch of splitToChunks(emails, maxBatchSize)) {
    await addSingleBatchOfSubscribers(apiKey, batch);
  }
}

async function addSingleBatchOfSubscribers(
  apiKey: string,
  emails: string[]
): Promise<void> {
  const payload = {
    subscriber_data: emails.map((email) => ({ email })),
    update_existing: false,
  };
  await fetch("http://api2.ecomailapp.cz/lists/2/subscribe-bulk", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "key": apiKey,
    },
  });
}
