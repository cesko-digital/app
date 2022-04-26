import fetch from "node-fetch";
import { splitToChunks } from "./utils";
import { decodeDictValues } from "./decoding";
import {
  decodeType,
  field,
  nullable,
  number,
  Pojo,
  record,
  string,
} from "typescript-json-decoder";

/** The Ecomail ID of our main newsletter list */
export const newsletterListId = 2;

/** All possible subscription states */
export const subscriptionStates = [
  "subscribed",
  "unsubscribed",
  "soft bounce",
  "hard bounce",
  "spam complaint",
  "unconfirmed",
] as const;

/** Subscription state – is the user subscribed, unsubscribed, bounces, etc. */
export type SubscriptionState = typeof subscriptionStates[number];

/** Decode subscription state from the numeric code used in API responses */
export function decodeSubscriptionStateCode(value: Pojo): SubscriptionState {
  const num = number(value);
  const state = subscriptionStates[num - 1];
  if (!state) {
    throw `Invalid subscription state code ${num}`;
  }
  return state;
}

/** A subscription to a given list */
export type Subscription = decodeType<typeof decodeSubscription>;

/** Decode subscription from API response */
export const decodeSubscription = record({
  listId: field("list_id", number),
  state: field("status", decodeSubscriptionStateCode),
});

/** A subscriber or a “Contact” as called in the Ecomail UI */
export type Subscriber = decodeType<typeof decodeSubscriber>;

/** Decode subscriber from API response */
export const decodeSubscriber = record({
  email: string,
  name: nullable(string),
  surname: nullable(string),
  lists: decodeDictValues(decodeSubscription),
});

//
// API Calls
//

/** Get subscriber info for given e-mail address */
export async function getSubscriber(
  apiKey: string,
  email: string
): Promise<Subscriber> {
  const decodeWrapper = record({
    subscriber: decodeSubscriber,
  });
  const response = await fetch(
    `https://api2.ecomailapp.cz/subscribers/${email}`,
    {
      headers: { key: apiKey },
    }
  );
  return await response
    .json()
    .then(decodeWrapper)
    .then((w) => w.subscriber);
}

/** Subscribe contact to given list, will resubscribe if unsubcribed */
export async function subscribeToList(
  apiKey: string,
  email: string,
  listId = newsletterListId,
  tags: string[] = []
): Promise<boolean> {
  const payload = {
    subscriber_data: { email, tags },
    resubscribe: true,
  };
  const response = await fetch(
    `https://api2.ecomailapp.cz/lists/${listId}/subscribe`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: jsonHeaders(apiKey),
    }
  );
  return response.ok;
}

/** Unsubscribe contact from given list */
export async function unsubscribeFromList(
  apiKey: string,
  email: string,
  listId = newsletterListId
): Promise<boolean> {
  const response = await fetch(
    `https://api2.ecomailapp.cz/lists/${listId}/unsubscribe`,
    {
      method: "DELETE",
      body: JSON.stringify({ email }),
      headers: jsonHeaders(apiKey),
    }
  );
  return response.ok;
}

/**
 * Subscribe multiple e-mail addresses to a list
 *
 * If a contact was previously in the contact list and unsubscribed, the addresss
 * won’t be resubscribed and no data will be changed for the contact.
 *
 * https://ecomailczv2.docs.apiary.io/#reference/lists/subscriber-update/add-bulk-subscribers-to-list
 */
export async function addSubscribers(
  apiKey: string,
  emails: string[],
  listId = newsletterListId
): Promise<void> {
  const maxBatchSize = 500;
  for (const batch of splitToChunks(emails, maxBatchSize)) {
    await addSingleBatchOfSubscribers(apiKey, batch, listId);
  }
}

async function addSingleBatchOfSubscribers(
  apiKey: string,
  emails: string[],
  listId: number
): Promise<void> {
  const payload = {
    subscriber_data: emails.map((email) => ({ email })),
    update_existing: false,
  };
  await fetch(`http://api2.ecomailapp.cz/lists/${listId}/subscribe-bulk`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: jsonHeaders(apiKey),
  });
}

//
// Helpers
//

const jsonHeaders = (apiKey: string) => ({
  "Content-Type": "application/json",
  "key": apiKey,
});
