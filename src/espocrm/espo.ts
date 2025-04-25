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
import { mergeArrays, mergeDelimitedArrays, type MergeRules } from "./merge";

//
// Helpers
//

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

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

export type Contact = decodeType<typeof decodeContact>;
export type ContactCreate = Optional<
  Omit<Contact, "id">,
  "createdAt" | "emailAddressData" | "cPrivacyFlags"
>;

const decodeContact = record({
  // Built-ins
  id: string,
  createdAt: date,
  name: string,
  firstName: nullable(string),
  lastName: nullable(string),
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
  // Custom Fields
  cLegacyAirtableID: nullable(string),
  cSlackUserID: nullable(string),
  cDataSource: nullable(string),
  // User Profile
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

function mergeEmails(
  a: Partial<Contact>,
  b: Partial<Contact>,
  merged: Partial<Contact>,
) {
  if (!a.emailAddress || !b.emailAddress) {
    merged.emailAddress = a.emailAddress ?? b.emailAddress;
    return;
  }

  type AddressData = NonNullable<typeof a.emailAddressData>[number];
  const toVector = (email: string, isPrimary: boolean) =>
    ({
      emailAddress: email,
      lower: email.toLocaleLowerCase(),
      primary: isPrimary,
      invalid: false,
      optOut: false,
    }) as AddressData;

  const vectorA = a.emailAddressData ?? [toVector(a.emailAddress, true)];
  const vectorB = b.emailAddressData ?? [toVector(b.emailAddress, false)];
  const addressData = [...vectorA, ...vectorB];

  addressData.forEach((a) => {
    a.primary = a.emailAddress === vectorA[0].emailAddress;
  });

  merged.emailAddress = vectorA[0].emailAddress;
  merged.emailAddressData = addressData;
}

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
  },
  magicProps: {
    emailAddress: mergeEmails,
  },
};
