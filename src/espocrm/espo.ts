import {
  array,
  boolean,
  date,
  intersection,
  number,
  record,
  string,
  union,
  type DecoderFunction,
  type decodeType,
} from "typescript-json-decoder";

import { optionalArray, withDefault } from "~/src/decoding";

//
// HTTP
//

type EspoFetchParams<T> = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  searchParams?: URLSearchParams;
  apiKey: string;
  body?: unknown;
  decodeResponse: DecoderFunction<T>;
  siteUrl?: string;
};

async function espoFetch<T>({
  path,
  apiKey,
  method,
  decodeResponse,
  body = undefined,
  searchParams = new URLSearchParams(),
  siteUrl = "https://crm.cesko.digital",
}: EspoFetchParams<T>): Promise<T> {
  const absoluteUrl = new URL("/api/v1/" + path, siteUrl);

  for (const [key, val] of searchParams.entries()) {
    absoluteUrl.searchParams.set(key, val);
  }

  const headers: HeadersInit = { "X-Api-Key": apiKey };
  const requestParams: RequestInit = { headers, method };

  if (body) {
    headers["Content-Type"] = "application/json";
    requestParams.body = JSON.stringify(body, null, 2);
  }

  const response = await fetch(absoluteUrl, requestParams);

  if (!response.ok) {
    throw new Error(
      `Fetch failed, response code ${response.status} (${response.statusText})`,
    );
  } else {
    return decodeResponse(await response.json());
  }
}

//
// Common Types
//

/** EspoCRM represents missing values as `null`, we prefer `undefined` */
const maybe =
  <T>(decoder: DecoderFunction<T>) =>
  (value: unknown) => {
    if (typeof value === "undefined" || value === null) {
      return undefined;
    } else {
      return decoder(value);
    }
  };

export type EmailAddressData = decodeType<typeof decodeEmailAddressData>;
const decodeEmailAddressData = record({
  emailAddress: string,
  lower: maybe(string),
  primary: maybe(boolean),
  optOut: maybe(boolean),
  invalid: maybe(boolean),
});

export type BaseEntity = decodeType<typeof decodeBaseEntity>;
const decodeBaseEntity = record({
  id: string,
  name: string,
  description: maybe(string),
  createdAt: date,
});

export type PersonEntity = decodeType<typeof decodePersonEntity>;
const decodePersonEntity = intersection(
  decodeBaseEntity,
  record({
    firstName: maybe(string),
    lastName: maybe(string),
    emailAddress: string,
  }),
);

//
// Paging
//

const decodeListWrapper = <T>(decodeItem: DecoderFunction<T>) =>
  record({
    total: number,
    list: array(decodeItem),
  });

const espoFetchOnePage = async <T>({
  path,
  decodeResponse,
  apiKey,
  offset,
}: Pick<EspoFetchParams<T>, "path" | "apiKey" | "decodeResponse"> & {
  offset: number;
}) =>
  espoFetch({
    path,
    apiKey,
    decodeResponse: decodeListWrapper(decodeResponse),
    searchParams: new URLSearchParams({ offset: offset.toString() }),
    method: "GET",
  }).then((wrapper) => wrapper.list as T[]);

const espoFetchAll = async <T>({
  path,
  decodeResponse,
  apiKey,
}: Pick<EspoFetchParams<T>, "path" | "apiKey" | "decodeResponse">) => {
  let items: T[] = [];
  let offset = 0;
  while (1) {
    const page = await espoFetchOnePage({
      path,
      decodeResponse,
      apiKey,
      offset,
    });
    if (page.length > 0) {
      console.debug(`Downloaded ${page.length} items from offset ${offset}.`);
      items = [...items, ...page];
      offset += page.length;
    } else {
      break;
    }
  }
  return items;
};

//
// Convenience Generics
//

type Entity = "Contact" | "Account" | "TargetList";

const createObject =
  <T extends BaseEntity>(entity: Entity, decoder: DecoderFunction<T>) =>
  async (apiKey: string, data: Partial<T>) =>
    espoFetch({
      path: entity,
      decodeResponse: decoder,
      method: "POST",
      body: data,
      apiKey,
    });

const getObjectById =
  <T extends BaseEntity>(entity: Entity, decoder: DecoderFunction<T>) =>
  async (apiKey: string, id: string): Promise<T> =>
    espoFetch({
      path: `${entity}/${id}`,
      decodeResponse: decoder,
      method: "GET",
      apiKey,
    });

const getAllObjectsOfType =
  <T extends BaseEntity>(entity: Entity, decoder: DecoderFunction<T>) =>
  async (apiKey: string): Promise<T[]> =>
    espoFetchAll({
      path: entity,
      decodeResponse: decoder,
      apiKey,
    });

const updateObject =
  <T extends BaseEntity>(entity: Entity, decoder: DecoderFunction<T>) =>
  async (apiKey: string, data: Partial<T> & Pick<BaseEntity, "id">) =>
    espoFetch({
      path: `${entity}/${data.id}`,
      decodeResponse: decoder,
      body: data,
      method: "PATCH",
      apiKey,
    });

//
// Contact
//

export type BasicContact = decodeType<typeof decodeBasicContact>;
export const decodeBasicContact = intersection(
  // Basic built-ins
  decodePersonEntity,
  record({
    // Custom fields
    cLegacyAirtableID: maybe(string),
    cSlackUserID: maybe(string),
    cDataSource: maybe(string),
    // User profile
    cBio: maybe(string),
    cTags: withDefault(string, ""),
    cSeniority: maybe(union("junior", "medior", "senior")),
    cOrganizationName: maybe(string),
    cPublicContactEmail: maybe(string),
    cProfessionalProfileURL: maybe(string),
    cOccupation: maybe(string),
    cPrivacyFlags: optionalArray(
      union("enablePublicProfile", "hidePublicTeamMembership"),
    ),
    cProfilePictureURL: maybe(string),
    cAvailableInDistricts: maybe(string),
  }),
);

export type FullContact = decodeType<typeof decodeFullContact>;
export const decodeFullContact = intersection(
  decodeBasicContact,
  record({
    emailAddressData: array(decodeEmailAddressData),
  }),
);

/**
 * Create new contact
 *
 * Will throw if contact with given name or e-mail already exists.
 */
export const espoCreateContact = createObject("Contact", decodeFullContact);

/** Get contact by ID */
export const espoGetContactById = getObjectById("Contact", decodeFullContact);

/** Update contact */
export const espoUpdateContact = updateObject("Contact", decodeFullContact);

/** Get all contacts */
export const espoGetAllContacts = getAllObjectsOfType(
  "Contact",
  decodeBasicContact,
);

//
// Account
//

export type Account = decodeType<typeof decodeAccount>;
const decodeAccount = intersection(
  // Basic built-ins
  decodeBaseEntity,
  record({
    // Standard fields
    website: maybe(string),
    // Custom fields
    cIco: maybe(string),
    cDataSource: maybe(string),
  }),
);

/**
 * Create new account
 *
 * Will throw if account with given name already exists.
 */
export const espoCreateAccount = createObject("Account", decodeAccount);

/** Get account by ID */
export const espoGetAccountById = getObjectById("Account", decodeAccount);

/** Update account */
export const espoUpdateAccount = updateObject("Account", decodeAccount);

/** Get all accounts */
export const espoGetAllAccounts = getAllObjectsOfType("Account", decodeAccount);

//
// Target List
//

export type TargetList = decodeType<typeof decodeTargetList>;
const decodeTargetList = intersection(
  decodeBaseEntity,
  record({
    entryCount: maybe(number),
    optedOutCount: maybe(number),
  }),
);

/** Get target list by ID */
export const espoGetTargetListById = getObjectById(
  "TargetList",
  decodeTargetList,
);

/** Get all target lists */
export const espoGetAllTargetLists = getAllObjectsOfType(
  "TargetList",
  decodeTargetList,
);

/** Update target list */
export const espoUpdateTargetList = updateObject(
  "TargetList",
  decodeTargetList,
);

/** Add contacts to target list */
export const espoAddContactsToTargetList = (
  apiKey: string,
  targetListId: string,
  contactIds: string[],
): Promise<boolean> =>
  espoFetch({
    path: `TargetList/${targetListId}/contacts`,
    method: "POST",
    body: { ids: contactIds },
    decodeResponse: boolean,
    apiKey,
  });

/** Unlink contacts from a target list */
export const espoUnlinkContactsFromTargetList = (
  apiKey: string,
  targetListId: string,
  contactIds: string[],
): Promise<boolean> =>
  espoFetch({
    path: `TargetList/${targetListId}/contacts`,
    method: "DELETE",
    body: { ids: contactIds },
    decodeResponse: boolean,
    apiKey,
  });
