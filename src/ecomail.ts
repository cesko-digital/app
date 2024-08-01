import {
  array,
  boolean,
  field,
  nullable,
  number,
  record,
  string,
  union,
  type decodeType,
} from "typescript-json-decoder";

import {
  decodeDictValues,
  decodeObject,
  decodeValidItemsFromArray,
  optionalArray,
  withDefault,
} from "./decoding";

/** The Ecomail ID of our main newsletter list */
export const mainContactListId = 2;

/** The Ecomail ID of our primary preference group */
export const mainPreferenceGroupId = "grp_6299c0823feb1";

/** Our main preference group options */
export const mainPreferenceGroupOptions = [
  "číst.digital",
  "náborový newsletter (č.d+)",
  "neziskový newsletter",
  "jen to nejdůležitější",
] as const;

/** Our main preference group options */
export type MainPreferenceGroupOption =
  (typeof mainPreferenceGroupOptions)[number];

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
    }),
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
  subscribedAt: field("subscribed_at", string),
  groups: withDefault(decodeObject(array(string)), {}),
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
  listId: string,
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
  },
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

/** Get contact list members */
export async function getContactListMembers(
  apiKey: string,
  listId: number,
): Promise<ContactListMember[]> {
  const decodeEnvelope = record({
    last_page: number,
    per_page: number,
    current_page: number,
    next_page_url: nullable(string),
    data: array(decodeContactListMember),
  });

  // Download all pages
  const members: ContactListMember[] = [];
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
      },
    )
      .then((response) => response.json())
      .then(decodeEnvelope);
    members.push(...envelope.data);
    if (page++ == envelope.last_page) {
      break;
    }
  }

  // The API somehow returns duplicate values, let’s filter them out using the ID
  const membersByID: Record<number, ContactListMember> = {};
  members.forEach((m) => (membersByID[m.id] = m));

  return Object.values(membersByID);
}

//
// Simplified Preferences
//

export type NewsletterPreferences = decodeType<
  typeof decodeNewsletterPreferences
>;

export const decodeNewsletterPreferences = record({
  subscribe: boolean,
  subscribedGroups: decodeValidItemsFromArray(
    union(...mainPreferenceGroupOptions),
  ),
});

export async function getNewsletterPreferences(
  apiKey: string,
  email: string,
): Promise<NewsletterPreferences> {
  const notSubscribed: NewsletterPreferences = {
    subscribe: false,
    subscribedGroups: [],
  };

  // Find subscriber with given email. This may be a 404 in case there is no previous
  // subscriber with this e-mail. In that case we catch the error and report the case
  // as unsubscribed.
  const subscriber = await getSubscriber(apiKey, email).catch(() => null);
  if (!subscriber) {
    return notSubscribed;
  }

  // Find subscription state for our main contact list. If there is no state for this
  // contact list, we report the case as unsubscribed.
  const mainContactListState = subscriber.lists.find(
    (list) => list.listId === mainContactListId,
  );

  if (!mainContactListState) {
    return notSubscribed;
  }

  return {
    subscribe: mainContactListState?.state === "subscribed",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    subscribedGroups: mainContactListState.groups[mainPreferenceGroupId] as any,
  };
}

export async function setNewsletterPreferences(
  apiKey: string,
  email: string,
  preferences: NewsletterPreferences,
): Promise<boolean> {
  if (preferences.subscribe) {
    return await subscribeToList(apiKey, {
      email,
      groups: preferences.subscribedGroups,
    });
  } else {
    return await unsubscribeFromList(apiKey, email, mainContactListId);
  }
}

//
// Helpers
//

const jsonHeaders = (apiKey: string) => ({
  "Content-Type": "application/json",
  "key": apiKey,
});
