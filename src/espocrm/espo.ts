import {
  array,
  boolean,
  date,
  dict,
  field,
  intersection,
  number,
  record,
  string,
  union,
  type DecoderFunction,
  type decodeType,
} from "typescript-json-decoder";

import { decodeObject, optionalArray, withDefault } from "~/src/decoding";

//
// HTTP
//

type EspoFetchParams<T> = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  searchParams?: Record<string, string>;
  apiKey: string;
  body?: unknown;
  decodeResponse: DecoderFunction<T>;
  skipDuplicateChecks?: boolean;
  siteUrl?: string;
};

async function espoFetch<T>({
  path,
  apiKey,
  method,
  decodeResponse,
  skipDuplicateChecks = false,
  body = undefined,
  searchParams = {},
  siteUrl = "https://crm.cesko.digital",
}: EspoFetchParams<T>): Promise<T> {
  const absoluteUrl = new URL("/api/v1/" + path, siteUrl);

  for (const [key, val] of Object.entries(searchParams)) {
    absoluteUrl.searchParams.set(key, val);
  }

  const headers: HeadersInit = { "X-Api-Key": apiKey };
  const requestParams: RequestInit = { headers, method };

  if (body) {
    headers["Content-Type"] = "application/json";
    requestParams.body = JSON.stringify(body, null, 2);
  }

  if (skipDuplicateChecks) {
    headers["X-Skip-Duplicate-Check"] = "true";
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
    emailAddress: maybe(string),
    phoneNumber: maybe(string),
  }),
);

export type EventEntity = decodeType<typeof decodeEventEntity>;
const decodeEventEntity = intersection(
  decodeBaseEntity,
  record({
    status: union("Planned", "Held", "Not Held"),
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
  searchParams = {},
  apiKey,
  offset,
}: Omit<EspoFetchParams<T>, "method"> & {
  offset: number;
}) =>
  espoFetch({
    path,
    apiKey,
    decodeResponse: decodeListWrapper(decodeResponse),
    searchParams: {
      ...searchParams,
      offset: offset.toString(),
    },
    method: "GET",
  }).then((wrapper) => wrapper.list as T[]);

const espoFetchAll = async <T>({
  path,
  decodeResponse,
  searchParams,
  apiKey,
}: Omit<EspoFetchParams<T>, "method">) => {
  let items: T[] = [];
  let offset = 0;
  while (1) {
    const page = await espoFetchOnePage({
      path,
      decodeResponse,
      searchParams,
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

type Entity =
  | "Contact"
  | "Account"
  | "TargetList"
  | "Meeting"
  | "CProject"
  | "CTeamEngagement"
  | "CEvent"
  | "CEventRegistration";

const createObject =
  <T extends BaseEntity>(entity: Entity, decoder: DecoderFunction<T>) =>
  async (apiKey: string, data: Partial<T>, skipDuplicateChecks = false) =>
    espoFetch({
      path: entity,
      decodeResponse: decoder,
      skipDuplicateChecks,
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
  async (apiKey: string, query: string | undefined = undefined): Promise<T[]> =>
    espoFetchAll({
      path: entity,
      decodeResponse: decoder,
      searchParams: query
        ? {
            "whereGroup[0][type]": "textFilter",
            "whereGroup[0][value]": query,
          }
        : {},
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

const deleteObject = (entity: Entity) => async (apiKey: string, id: string) =>
  espoFetch({
    path: `${entity}/${id}`,
    decodeResponse: (value: unknown) => value === "true",
    method: "DELETE",
    apiKey,
  });

//
// Contact
//

export type Contact = decodeType<typeof decodeContact>;
export const decodeContact = intersection(
  // Basic built-ins
  decodePersonEntity,
  record({
    // Detailed email address data, should be present everywhere
    emailAddressData: maybe(array(decodeEmailAddressData)),
    // Account links, is only present in detailed endpoints
    accountsIds: maybe(array(string)),
    accountsNames: maybe(decodeObject(string)),
    accountsColumns: maybe(
      decodeObject(
        record({
          role: maybe(string),
          isInactive: maybe(boolean),
        }),
      ),
    ),
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

/**
 * Create new contact
 *
 * Will throw if contact with given name or e-mail already exists.
 */
export const espoCreateContact = createObject("Contact", decodeContact);

/** Get contact by ID */
export const espoGetContactById = getObjectById("Contact", decodeContact);

/** Update contact */
export const espoUpdateContact = updateObject("Contact", decodeContact);

/** Get all contacts */
export const espoGetAllContacts = getAllObjectsOfType("Contact", decodeContact);

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
    emailAddress: maybe(string),
    // Custom fields
    cIco: maybe(string),
    cDataSource: maybe(string),
    cKodPravniFormy: maybe(string),
    cPravniForma: maybe(string),
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

/** Get all contacts linked to an account */
export const espoGetAccountContacts = (apiKey: string, accountId: string) =>
  espoFetchAll({
    path: `Account/${accountId}/contacts`,
    decodeResponse: decodePersonEntity,
    searchParams: {
      // By default the server selects a very bare attribute set that
      // doesn’t even satisfy `BaseEntity`. Could we perhaps generalize
      // the attribute selection to get code completion and type safety?
      attributeSelect:
        "id,name,description,createdAt,firstName,lastName,emailAddress",
    },
    apiKey,
  });

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

/** Add contacts to target list */
export const espoAddAccountsToTargetList = (
  apiKey: string,
  targetListId: string,
  accountIds: string[],
): Promise<boolean> =>
  espoFetch({
    path: `TargetList/${targetListId}/accounts`,
    method: "POST",
    body: { ids: accountIds },
    decodeResponse: boolean,
    apiKey,
  });

//
// Meetings
//

export type Meeting = decodeType<typeof decodeMeeting>;
export const decodeMeeting = decodeBaseEntity;

/** Get meeting by ID */
export const espoGetMeetingById = getObjectById("Meeting", decodeMeeting);

/** Get all meetings */
export const espoGetAllMeetings = getAllObjectsOfType("Meeting", decodeMeeting);

//
// Projects
//

export type Project = decodeType<typeof decodeProject>;
export const decodeProject = intersection(
  decodeBaseEntity,
  record({
    slug: string,
    state: union("running", "finished", "cancelled"),
    projectEngagementsIds: field("teamEngagementsIds", maybe(array(string))),
    projectEngagementsNames: field("teamEngagementsNames", maybe(dict(string))),
  }),
);

/** Get all projects */
export const espoGetAllProjects = getAllObjectsOfType(
  "CProject",
  decodeProject,
);

/** Get project by ID */
export const espoGetProjectById = getObjectById("CProject", decodeProject);

//
// Project Engagements
//

export type ProjectEngagement = decodeType<typeof decodeProjectEngagement>;
export const decodeProjectEngagement = intersection(
  decodeBaseEntity,
  record({
    projectId: string,
    projectName: string,
    contactId: string,
    contactName: string,
    dataSource: maybe(string),
    isPublic: maybe(boolean),
    sections: maybe(string),
  }),
);

/** Get all project engagements */
export const espoGetAllProjectEngagements = getAllObjectsOfType(
  "CTeamEngagement",
  decodeProjectEngagement,
);

/** Get project engagement by ID */
export const espoGetProjectEngagementById = getObjectById(
  "CTeamEngagement",
  decodeProjectEngagement,
);

/** Create a project engagement */
export const espoCreateProjectEngagement = createObject(
  "CTeamEngagement",
  decodeProjectEngagement,
);

/** Update a project engagement */
export const espoUpdateProjectEngagement = updateObject(
  "CTeamEngagement",
  decodeProjectEngagement,
);

/** Delete a project engagement */
export const espoDeleteProjectEngagement = deleteObject("CTeamEngagement");

//
// Events
//

export type Event = decodeType<typeof decodeEvent>;
export const decodeEvent = decodeEventEntity;

/** Get all events */
export const espoGetAllEvents = getAllObjectsOfType("CEvent", decodeEvent);

//
// Event Registrations
//

export type EventRegistration = decodeType<typeof decodeEventRegistration>;
export const decodeEventRegistration = intersection(
  decodeBaseEntity,
  record({
    contactId: string,
    contactName: string,
    eventId: string,
    eventName: string,
    status: union(
      "chceme pozvat",
      "pozvali jsme",
      "potvrdili účast",
      "odmítli účast",
      "dorazili",
    ),
  }),
);

/** Get event registration by ID */
export const espoGetEventRegistrationById = getObjectById(
  "CEventRegistration",
  decodeEventRegistration,
);

/** Get all event registrations */
export const espoGetAllEventRegistrations = getAllObjectsOfType(
  "CEventRegistration",
  decodeEventRegistration,
);

/** Create new event registration */
export const espoCreateEventRegistration = createObject(
  "CEventRegistration",
  decodeEventRegistration,
);

/** Update existing event registration */
export const espoUpdateEventRegistration = updateObject(
  "CEventRegistration",
  decodeEventRegistration,
);
