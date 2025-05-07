#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import {
  getAllOrganizations,
  type Organization,
} from "~/src/data/organization";
import { getAllUserProfiles, type UserProfile } from "~/src/data/user-profile";
import {
  espoCreateAccount,
  espoCreateContact,
  espoGetAccountById,
  espoGetAllAccounts,
  espoGetAllContacts,
  espoGetContactById,
  espoUpdateAccount,
  espoUpdateContact,
  type Account,
  type FullContact,
} from "~/src/espocrm/espo";
import {
  importCRMObjects,
  map,
  normalize,
  normalizeWebsiteUrl,
} from "~/src/espocrm/import";
import {
  mergeArrays,
  mergeDelimitedArrays,
  mergeEmailAdddressData,
  type MergeRules,
} from "~/src/espocrm/merge";

const apiKey = process.env.CRM_API_KEY ?? "<not set>";

//
// User Profiles -> Contacts
//

/** Convert legacy user profile to contact */
export const userProfileToContact = (
  profile: UserProfile,
): Partial<FullContact> => ({
  name: profile.name,
  firstName: normalize(profile.firstName),
  lastName: normalize(profile.lastName),
  emailAddressData: [{ emailAddress: normalize(profile.email) }],
  cLegacyAirtableID: profile.id,
  cSlackUserID: profile.slackId,
  cDataSource: "Airtable sync",
  cBio: profile.bio,
  cTags: profile.tags,
  cSeniority: profile.maxSeniority,
  cOrganizationName: normalize(profile.organizationName),
  cPublicContactEmail: normalize(profile.contactEmail),
  cProfessionalProfileURL: profile.profileUrl,
  cOccupation: profile.occupation,
  cPrivacyFlags: profile.privacyFlags,
  cProfilePictureURL: profile.profilePictureUrl,
  cAvailableInDistricts: profile.availableInDistricts,
});

/**
 * Merge rules for user profiles
 *
 * We intentionally skip all name-related fields here to keep
 * any name customizations and cleanups in CRM from being overwritten
 * by initial Airtable data.
 *
 * We also intentionally skip the `cDataSource` prop because it
 * should only be set when records are created, not updated.
 */
const userProfileMergeRules: MergeRules<FullContact> = {
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

/** Import legacy user profiles from Airtable */
async function importUserProfilesFromAirtable() {
  console.log(`*** Importing contacts from “User Profiles”`);
  console.log(`Downloading confirmed user profiles from Airtable.`);
  const userProfiles = await getAllUserProfiles("Confirmed Profiles");
  await importCRMObjects<FullContact>({
    existingValues: await espoGetAllContacts(apiKey),
    newValues: userProfiles.map(userProfileToContact),
    isEqual: (a, b) => a.cLegacyAirtableID === b.cLegacyAirtableID,
    createValue: (v) => espoCreateContact(apiKey, v),
    updateValue: (v) => espoUpdateContact(apiKey, v),
    getValueById: (id) => espoGetContactById(apiKey, id),
    mergeRules: userProfileMergeRules,
    singularName: "contact",
    pluralName: "contacts",
  });
  console.log("Finished!");
}

//
// Organizations -> Accounts
//

/** Convert organization to account */
const organizationToAccount = (org: Organization): Partial<Account> => ({
  name: normalize(org.name),
  website: map(org.website, normalizeWebsiteUrl),
  cIco: org.governmentId,
  cDataSource: "Airtable sync",
});

/** Import organizations from Airtable */
async function importOrganizationsFromAirtable() {
  console.info(`*** Importing accounts from “CRM Organizací”`);
  console.debug(`Downloading organizations from Airtable.`);
  const organizations = await getAllOrganizations();
  console.debug(`Downloaded ${organizations.length} organizations.`);
  await importCRMObjects<Account>({
    existingValues: await espoGetAllAccounts(apiKey),
    newValues: organizations.map(organizationToAccount),
    isEqual: (a, b) => !!a.name && a.name === b.name,
    createValue: (v) => espoCreateAccount(apiKey, v),
    updateValue: (v) => espoUpdateAccount(apiKey, v),
    getValueById: (id) => espoGetAccountById(apiKey, id),
    mergeRules: {
      immutableProps: ["id"],
      readOnlyAfterCreatePops: ["name", "website"],
      updatableProps: ["cIco"],
      mergableProps: {},
    },
    singularName: "account",
    pluralName: "accounts",
  });
  console.log("Finished!");
}

/**
 * Import CRM-related data from various legacy sources
 *
 * This is meant to run regularly until we can freeze and deprecate the original data sources.
 *
 * New objects are created, existing objects updated according to merge rules.
 */
async function main() {
  await importOrganizationsFromAirtable();
  await importUserProfilesFromAirtable();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
