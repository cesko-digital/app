import {
  boolean,
  date,
  record,
  string,
  union,
  type decodeType,
} from "typescript-json-decoder";

import { optionalArray, undefinedIfNull, withDefault } from "~/src/decoding";

import { type Entity } from "./espo";
import {
  mergeArrays,
  mergeDelimitedArrays,
  mergeEmailAdddressData,
  type MergeRules,
} from "./merge";

export type Contact = decodeType<typeof decodeContact>;
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

/**
 * Merge rules for contacts
 *
 * We intentionally skip all name-related fields here to keep
 * any name customizations and cleanups in CRM from being overwritten
 * by initial Airtable data.
 *
 * We also  intentionally skip the `cDataSource` prop because it
 * should only be set when records are created, not updated.
 */
export const mergeRules: MergeRules<Contact> = {
  immutableProps: ["id", "cLegacyAirtableID"],
  updatableProps: [
    "cBio",
    "cOrganizationName",
    "cProfessionalProfileURL",
    "cProfilePictureURL",
    "cPublicContactEmail",
    "cSeniority",
    "cSlackUserID",
  ],
  readOnlyAfterCreatePops: ["createdAt"],
  mergableProps: {
    cPrivacyFlags: mergeArrays,
    cTags: mergeDelimitedArrays(";"),
    cOccupation: mergeDelimitedArrays(";"),
    cAvailableInDistricts: mergeDelimitedArrays(","),
    emailAddressData: mergeEmailAdddressData,
  },
};

export const entity: Entity<Contact> = {
  singularName: "contact",
  pluralName: "contacts",
  apiPath: "Contact",
  mergeRules: mergeRules,
  decoder: decodeContact,
};
