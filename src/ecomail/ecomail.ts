import {
  array,
  field,
  nullable,
  number,
  record,
  string,
  union,
  type DecoderFunction,
  type decodeType,
} from "typescript-json-decoder";

import { decodeDictValues, decodeObject, withDefault } from "~/src/decoding";

/** The Ecomail ID of our main newsletter list */
export const mainContactListId = 2;

//
// Http
//

type EcomailFetchProps<T> = {
  path: string;
  method: "GET" | "POST" | "DELETE";
  apiKey: string;
  body?: unknown;
  decodeResponse: DecoderFunction<T>;
};

const ecomailFetch = async <T>({
  path,
  apiKey,
  decodeResponse,
  method,
  body,
}: EcomailFetchProps<T>): Promise<T> => {
  const baseUrl = "https://api2.ecomailapp.cz";
  const url = new URL(path, baseUrl);

  const headers: HeadersInit = { cache: "no-store", key: apiKey };
  const requestParams: RequestInit = { headers, method };

  if (body) {
    headers["Content-Type"] = "application/json";
    requestParams.body = JSON.stringify(body, null, 2);
  }

  const response = await fetch(url, requestParams);

  if (!response.ok) {
    throw new Error(
      `Fetch failed, response code ${response.status} (${response.statusText})`,
    );
  } else {
    return decodeResponse(await response.json());
  }
};

//
// Subscriptions
//

/** All possible subscription states */
const subscriptionStates = [
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
  const code = number(value);
  const state = subscriptionStates[code - 1];
  if (!state) {
    throw new Error(`Invalid subscription state code ${code}`);
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

//
// Subscribers
//

/** A subscriber or a “Contact” as called in the Ecomail UI */
export type Subscriber = decodeType<typeof decodeSubscriber>;

/** Decode subscriber from API response */
export const decodeSubscriber = record({
  email: string,
  name: nullable(string),
  surname: nullable(string),
  lists: decodeDictValues(decodeSubscription),
});

/**
 * Get subscriber info for given e-mail address
 *
 * https://ecomailczv2.docs.apiary.io/#reference/subscribers/get-subscriber/get-subscriber-details
 */
export const getSubscriber = (apiKey: string, email: string) =>
  ecomailFetch({
    path: `/subscribers/${email}`,
    decodeResponse: record({
      subscriber: decodeSubscriber,
    }),
    method: "GET",
    apiKey,
  }).then((response) => response.subscriber);

type SubscribeProps = {
  apiKey: string;
  /** Subscriber email */
  email: string;
  /** ID of the contact list to subscribe to, defaults to our main contact list */
  listId?: number;
  /** Tags to set, will overwrite any existing tags */
  tags?: string[];
  /** Should the subscriber be resubscribed if needed? Defaults to `true`. */
  resubscribe?: boolean;
  /** If set, the contact will be immediately subscribed without double opt-in */
  skipConfirmation?: boolean;
};

/**
 * Add subscriber to given list
 *
 * https://ecomailczv2.docs.apiary.io/#reference/lists/list-subscribe
 */
export const subscribeToList = ({
  apiKey,
  email,
  tags,
  listId = mainContactListId,
  resubscribe = true,
  skipConfirmation = false,
}: SubscribeProps) =>
  ecomailFetch({
    path: `lists/${listId}/subscribe`,
    decodeResponse: justIgnore,
    method: "POST",
    body: {
      subscriber_data: { email, tags },
      skip_confirmation: skipConfirmation,
      update_existing: true,
      resubscribe,
    },
    apiKey,
  });

/**
 * Remove subscriber from given list
 *
 * https://ecomailczv2.docs.apiary.io/#reference/lists/list-unsubscribe/unsubscribes-subscriber-from-list
 */
export const unsubscribeFromList = (
  apiKey: string,
  email: string,
  listId = mainContactListId,
) =>
  ecomailFetch({
    path: `lists/${listId}/unsubscribe`,
    method: "DELETE",
    decodeResponse: justIgnore,
    body: { email },
    apiKey,
  });

/**
 * Delete subscriber
 *
 * https://ecomailczv2.docs.apiary.io/#reference/subscribers/delete-subscriber/remove-subscriber-from-db
 */
export const deleteSubscriber = (apiKey: string, email: string) =>
  ecomailFetch({
    path: `/subscribers/${email}/delete`,
    decodeResponse: justIgnore,
    method: "DELETE",
    apiKey,
  });

//
// Campaigns
//

const decodeCampaignTarget = union(
  array(number),
  record({
    segments: array({
      list: number,
      id: string,
    }),
  }),
);

const decodeCampaign = record({
  id: number,
  title: string,
  recipients: nullable(number),
  recepient_lists: decodeCampaignTarget,
  status: number,
});

export const getAllCampaigns = (apiKey: string) =>
  ecomailFetch({
    path: "/campaigns",
    method: "GET",
    decodeResponse: array(decodeCampaign),
    apiKey,
  });

//
// Helpers
//

const justIgnore = () => {};
