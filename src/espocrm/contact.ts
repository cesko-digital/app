import {
  boolean,
  date,
  record,
  string,
  union,
  type DecoderFunction,
  type decodeType,
} from "typescript-json-decoder";

import { optionalArray, withDefault } from "~/src/decoding";

import { type Blueprint } from "./espo";
import {
  mergeArrays,
  mergeDelimitedArrays,
  mergeEmailAdddressData,
  type MergeRules,
} from "./merge";

const undefinedIfNull =
  <T>(decoder: DecoderFunction<T>) =>
  (value: unknown) => {
    if (typeof value === "undefined" || value === null) {
      return undefined;
    } else {
      return decoder(value);
    }
  };

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

export const mergeRules: MergeRules<Contact> = {
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

export const blueprint: Blueprint<Contact> = {
  singularName: "contact",
  pluralName: "contacts",
  apiPath: "Contact",
  mergeRules: mergeRules,
  decoder: decodeContact,
};
