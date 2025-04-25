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

import { getJson, postJson, putJson } from "./http";
import {
  mergeArrays,
  mergeDelimitedArrays,
  mergeEmailAdddressData,
  type MergeRules,
} from "./merge";

//
// Helpers
//

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const decodeResponseWrapper = <T>(decodeResponse: DecoderFunction<T>) =>
  record({
    total: number,
    list: array(decodeResponse),
  });

const undefinedIfNull =
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

export type Contact = decodeType<typeof decodeContact>;
export type ContactCreate = Optional<
  Omit<Contact, "id">,
  "createdAt" | "emailAddressData" | "cPrivacyFlags"
>;

export type EmailAddressData = decodeType<typeof decodeEmailAddressData>;

const decodeEmailAddressData = record({
  emailAddress: string,
  lower: undefinedIfNull(string),
  primary: undefinedIfNull(boolean),
  optOut: undefinedIfNull(boolean),
  invalid: undefinedIfNull(boolean),
});

const decodeContact = record({
  // Built-ins
  id: string,
  createdAt: date,
  name: string,
  firstName: undefinedIfNull(string),
  lastName: undefinedIfNull(string),
  emailAddress: string,
  emailAddressData: optionalArray(decodeEmailAddressData),
  // Custom Fields
  cLegacyAirtableID: undefinedIfNull(string),
  cSlackUserID: undefinedIfNull(string),
  cDataSource: undefinedIfNull(string),
  // User Profile
  cBio: undefinedIfNull(string),
  cTags: withDefault(string, ""),
  cSeniority: undefinedIfNull(union("junior", "medior", "senior")),
  cOrganizationName: undefinedIfNull(string),
  cPublicContactEmail: undefinedIfNull(string),
  cProfessionalProfileURL: undefinedIfNull(string),
  cOccupation: undefinedIfNull(string),
  cPrivacyFlags: optionalArray(
    union("enablePublicProfile", "hidePublicTeamMembership"),
  ),
  cProfilePictureURL: undefinedIfNull(string),
  cAvailableInDistricts: undefinedIfNull(string),
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

export const contactMergeRules: MergeRules<Contact> = {
  immutableProps: ["id", "cLegacyAirtableID"],
  updatableProps: [
    "cBio",
    "cDataSource",
    "cOrganizationName",
    "cProfessionalProfileURL",
    "cProfilePictureURL",
    "cPublicContactEmail",
    "cSeniority",
    "cSlackUserID",
    "firstName",
    "lastName",
    "name",
  ],
  mergableProps: {
    cPrivacyFlags: mergeArrays,
    cTags: mergeDelimitedArrays(";"),
    cOccupation: mergeDelimitedArrays(";"),
    cAvailableInDistricts: mergeDelimitedArrays(","),
    emailAddressData: mergeEmailAdddressData,
  },
};
