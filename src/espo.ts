import {
  array,
  boolean,
  date,
  number,
  record,
  string,
  union,
  type DecoderFunction,
  type decodeType,
} from "typescript-json-decoder";

import { optionalArray, withDefault } from "~/src/decoding";

//
// Http Client
//

const siteUrl = "https://crm.cesko.digital";
const buildUrl = (path: string) => `${siteUrl}/api/v1/${path}`;
const unwrapJson = (response: Response) => response.json();

const throwErrors = (response: Response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(
      `Fetch failed, response code ${response.status} (${response.statusText})`,
    );
  }
};

type CommonArgs<T> = {
  apiKey: string;
  path: string;
  decodeResponse: DecoderFunction<T>;
};

const getJson = <T>({ apiKey, path, decodeResponse }: CommonArgs<T>) =>
  fetch(buildUrl(path), {
    headers: { "X-Api-Key": apiKey },
  })
    .then(throwErrors)
    .then(unwrapJson)
    .then(decodeResponse);

const postJson = <T>({
  apiKey,
  path,
  decodeResponse,
  body,
}: CommonArgs<T> & { body: unknown }) =>
  fetch(buildUrl(path), {
    method: "POST",
    body: JSON.stringify(body, null, 2),
    headers: {
      "X-Api-Key": apiKey,
      "Content-type": "application/json",
    },
  })
    .then(throwErrors)
    .then(unwrapJson)
    .then(decodeResponse);

const putJson = <T>({
  apiKey,
  path,
  decodeResponse,
  body,
}: CommonArgs<T> & { body: unknown }) =>
  fetch(buildUrl(path), {
    method: "PUT",
    body: JSON.stringify(body, null, 2),
    headers: {
      "X-Api-Key": apiKey,
      "Content-type": "application/json",
    },
  })
    .then(throwErrors)
    .then(unwrapJson)
    .then(decodeResponse);

//
// Helpers
//

const decodeResponseWrapper = <T>(decodeResponse: DecoderFunction<T>) =>
  record({
    total: number,
    list: array(decodeResponse),
  });

const nullable =
  <T>(decoder: DecoderFunction<T>) =>
  (value: unknown) => {
    if (typeof value === "undefined" || value === null) {
      return undefined;
    } else {
      return decoder(value);
    }
  };

//
// Contacts
//

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Contact = decodeType<typeof decodeContact>;
export type ContactCreate = Optional<
  Omit<Contact, "id">,
  "createdAt" | "emailAddressData" | "cPrivacyFlags"
>;

const decodeContact = record({
  id: string,
  name: string,
  emailAddress: string,
  emailAddressData: optionalArray(
    record({
      emailAddress: string,
      lower: string,
      primary: boolean,
      optOut: boolean,
      invalid: boolean,
    }),
  ),
  createdAt: date,
  firstName: nullable(string),
  lastName: nullable(string),
  cLegacyAirtableID: nullable(string),
  cSlackUserID: nullable(string),
  cDataSource: nullable(string),
  cBio: nullable(string),
  cTags: withDefault(string, ""),
  cSeniority: nullable(union("junior", "medior", "senior")),
  cOrganizationName: nullable(string),
  cPublicContactEmail: nullable(string),
  cProfessionalProfileURL: nullable(string),
  cOccupation: nullable(string),
  cPrivacyFlags: optionalArray(
    union("enablePublicProfile", "hidePublicTeamMembership"),
  ),
  cProfilePictureURL: nullable(string),
  cAvailableInDistricts: nullable(string),
});

const getSinglePageContacts = async (apiKey: string, offset: number) =>
  getJson({
    decodeResponse: decodeResponseWrapper(decodeContact),
    path: `Contact?offset=${offset}`,
    apiKey,
  });

export const getAllContacts = async (apiKey: string) => {
  let contacts: Contact[] = [];
  let offset = 0;
  while (1) {
    const batch = await getSinglePageContacts(apiKey, offset);
    if (batch.list.length > 0) {
      console.debug(
        `Downloaded ${batch.list.length} contacts from offset ${offset}.`,
      );
      contacts = [...contacts, ...batch.list];
      offset += batch.list.length;
    } else {
      break;
    }
  }
  return contacts;
};

export const getContactById = async (apiKey: string, id: string) =>
  getJson({
    decodeResponse: decodeContact,
    path: `Contact/${id}`,
    apiKey,
  });

export const createContact = async (apiKey: string, contact: ContactCreate) =>
  postJson({
    decodeResponse: decodeContact,
    body: contact,
    path: "Contact",
    apiKey,
  });

export const updateContact = async (
  apiKey: string,
  contact: Pick<Contact, "id"> & Partial<Contact>,
) =>
  putJson({
    decodeResponse: decodeContact,
    body: contact,
    path: `Contact/${contact.id}`,
    apiKey,
  });
