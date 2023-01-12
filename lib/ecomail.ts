import { splitToChunks } from "./utils";
import { decodeDictValues, decodeObject, optionalArray } from "./decoding";
import {
  array,
  decodeType,
  field,
  nullable,
  number,
  optional,
  Pojo,
  record,
  string,
} from "typescript-json-decoder";

/** The Ecomail ID of our main newsletter list */
export const mainContactListId = 2;

/** The Ecomail ID of our primary preference group */
export const mainPreferenceGroupId = "grp_6299c0823feb1";

/** Our main preference group options */
export const mainPreferenceGroupOptions = [
  "číst.digital",
  "náborový newsletter",
  "neziskový newsletter",
  "jen to nejdůležitější",
] as const;

/** Our main preference group options */
export type MainPreferenceGroupOption =
  typeof mainPreferenceGroupOptions[number];

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

/**
 * A preference group used for segmenting a contact list
 *
 * https://support.ecomail.cz/cs/articles/2413441-preference-a-preferencni-skupiny
 */
export type Group = decodeType<typeof decodeGroup>;

/** Decode preference group from API response */
export const decodeGroup = record({
  name: string,
  category: array(
    record({
      name: string,
      id: string,
    })
  ),
});

/** Contact list info */
export type ListInfo = decodeType<typeof decodeListInfo>;

/** Decode contact list info from API response */
export const decodeListInfo = record({
  id: number,
  name: string,
  groups: decodeObject(decodeGroup),
});

/** Contact list member as returned by `lists/:id/subscribers`, for example */
export type ContactListMember = decodeType<typeof decodeContactListMember>;

/** Decode contact list member from API response */
export const decodeContactListMember = record({
  id: number,
  listId: field("list_id", number),
  email: string,
  state: field("status", decodeSubscriptionStateCode),
  subscribedAt: optional(field("subscribed_at", string)),
  subscriber: record({
    tags: optionalArray(string),
  }),
});

//
// API Calls
//

/** Get contact list info */
export async function getListInfo(
  apiKey: string,
  listId: string
): Promise<ListInfo> {
  const decodeWrapper = record({
    list: decodeListInfo,
  });
  return await fetch(`https://api2.ecomailapp.cz/lists/${listId}`, {
    headers: { key: apiKey },
  })
    .then((response) => response.json())
    .then(decodeWrapper)
    .then((response) => response.list);
}

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

/** Subscribe contact to given list */
export async function subscribeToList(
  apiKey: string,
  subscription: {
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
    /**
     * Preference groups to set
     *
     * NOTE: The value will overwrite any existing groups.
     */
    groups?: MainPreferenceGroupOption[];
    /** Should the subscriber be resubscribed if needed? Defaults to `true`. */
    resubscribe?: boolean;
  }
): Promise<boolean> {
  const {
    email,
    listId = mainContactListId,
    tags,
    groups,
    resubscribe = true,
  } = subscription;
  const payload = {
    subscriber_data: {
      email,
      tags,
      groups: groups ? { [mainPreferenceGroupId]: groups } : undefined,
    },
    resubscribe,
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
  listId = mainContactListId
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
  listId = mainContactListId
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

/** Get contact list members */
export async function getContactListMembers(
  apiKey: string,
  listId: number
): Promise<ContactListMember[]> {
  const decodeEnvelope = record({
    last_page: number,
    per_page: number,
    current_page: number,
    next_page_url: nullable(string),
    data: array(decodeContactListMember),
  });

  // Download all pages
  let members: ContactListMember[] = [];
  let page = 0;
  while (1) {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: "1000",
    });
    const envelope = await fetch(
      `http://api2.ecomailapp.cz/lists/${listId}/subscribers?${params}`,
      {
        headers: { key: apiKey },
      }
    )
      .then((response) => response.json())
      .then(decodeEnvelope);
    members.push(...envelope.data);
    if (page++ == envelope.last_page) {
      break;
    }
  }

  // The API somehow returns duplicate values, let’s filter them out using the ID
  let membersByID: Record<number, ContactListMember> = {};
  members.forEach((m) => (membersByID[m.id] = m));

  return Object.values(membersByID);
}

//
// Helpers
//

const jsonHeaders = (apiKey: string) => ({
  "Content-Type": "application/json",
  "key": apiKey,
});
