import {
  array,
  field,
  nullable,
  number,
  record,
  string,
  type decodeType,
} from "typescript-json-decoder";

import { decodeDictValues, decodeObject, withDefault } from "./decoding";

/** The Ecomail ID of our main newsletter list */
export const mainContactListId = 2;

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
export type SubscriptionState = (typeof subscriptionStates)[number];

/** Decode subscription state from the numeric code used in API responses */
export function decodeSubscriptionStateCode(value: unknown): SubscriptionState {
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
  groups: withDefault(decodeObject(array(string)), {}),
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
  email: string,
): Promise<Subscriber> {
  const decodeWrapper = record({
    subscriber: decodeSubscriber,
  });
  const response = await fetch(
    `https://api2.ecomailapp.cz/subscribers/${email}`,
    {
      headers: { key: apiKey },
      cache: "no-store",
    },
  );
  return await response
    .json()
    .then(decodeWrapper)
    .then((w) => w.subscriber);
}

export type SubscriptionProps = {
  /** Subscriber email */
  email: string;

  /** ID of the contact list to subscribe to, defaults to our main contact list */
  listId?: number;

  /**
   * Tags to set
   *
   * NOTE: The value will overwrite any existing tags.
   */
  tags?: string[];

  /** Should the subscriber be resubscribed if needed? Defaults to `true`. */
  resubscribe?: boolean;

  /** If set, the contact will be immediately subscribed without double opt-in */
  skipConfirmation?: boolean;
};

/**
 * Subscribe contact to given list
 *
 * https://ecomailczv2.docs.apiary.io/#reference/lists/list-subscribe
 */
export async function subscribeToList(
  apiKey: string,
  subscription: SubscriptionProps,
): Promise<boolean> {
  const {
    email,
    listId = mainContactListId,
    tags,
    resubscribe = true,
    skipConfirmation = false,
  } = subscription;
  const payload = {
    subscriber_data: { email, tags },
    skip_confirmation: skipConfirmation,
    update_existing: true,
    resubscribe,
  };
  const response = await fetch(
    `https://api2.ecomailapp.cz/lists/${listId}/subscribe`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: jsonHeaders(apiKey),
      cache: "no-store",
    },
  );
  return response.ok;
}

/** Unsubscribe contact from given list */
export async function unsubscribeFromList(
  apiKey: string,
  email: string,
  listId = mainContactListId,
): Promise<boolean> {
  const response = await fetch(
    `https://api2.ecomailapp.cz/lists/${listId}/unsubscribe`,
    {
      method: "DELETE",
      body: JSON.stringify({ email }),
      headers: jsonHeaders(apiKey),
      cache: "no-store",
    },
  );
  return response.ok;
}

//
// Helpers
//

const jsonHeaders = (apiKey: string) => ({
  "Content-Type": "application/json",
  "key": apiKey,
});
