#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import {
  getAllContacts,
  getAllOrganizations,
  type Contact as LegacyContact,
  type Organization,
} from "~/src/data/organization";
import {
  getAllTeamEngagements,
  getPublicTeamEngagements,
} from "~/src/data/team-engagement";
import { getAllUserProfiles, type UserProfile } from "~/src/data/user-profile";
import {
  espoCreateAccount,
  espoCreateContact,
  espoCreateProjectEngagement,
  espoGetAccountById,
  espoGetAllAccounts,
  espoGetAllContacts,
  espoGetAllProjectEngagements,
  espoGetAllProjects,
  espoGetContactById,
  espoGetProjectEngagementById,
  espoUpdateAccount,
  espoUpdateContact,
  espoUpdateProjectEngagement,
  type Account,
  type Contact,
  type ProjectEngagement,
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
  mergeRecords,
  type MergeRules,
} from "~/src/espocrm/merge";
import { notEmpty } from "~/src/utils";

const apiKey = process.env.CRM_API_KEY ?? "<not set>";

//
// Shared
//

/**
 * Merge rules for accounts
 *
 * We intentionally skip all name-related fields here to keep
 * any name customizations and cleanups in CRM from being overwritten
 * by initial Airtable data.
 *
 * We also intentionally skip the `cDataSource` prop because it
 * should only be set when records are created, not updated.
 */
const accountMergeRules: MergeRules<Contact> = {
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
    accountsIds: mergeArrays,
    accountsNames: mergeRecords,
    accountsColumns: mergeRecords,
  },
};

//
// User Profiles -> Contacts
//

/** Convert legacy user profile to contact */
export const userProfileToContact = (
  profile: UserProfile,
): Partial<Contact> => ({
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
 * Import legacy user profiles from Airtable
 *
 * Previous user profiles are deduplicated using Airtable record ID.
 */
async function importUserProfilesFromAirtable() {
  console.log(`*** Importing contacts from “User Profiles”`);
  console.log(`Downloading confirmed user profiles from Airtable.`);
  const userProfiles = await getAllUserProfiles("Confirmed Profiles");
  await importCRMObjects<Contact>({
    existingValues: await espoGetAllContacts(apiKey),
    newValues: userProfiles.map(userProfileToContact),
    isEqual: (a, b) => a.cLegacyAirtableID === b.cLegacyAirtableID,
    createValue: (v) => espoCreateContact(apiKey, v),
    updateValue: (v) => espoUpdateContact(apiKey, v),
    getValueById: (id) => espoGetContactById(apiKey, id),
    mergeRules: accountMergeRules,
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

/**
 * Import organizations from Airtable
 *
 * Previous organizations are deduplicated using the name field.
 */
async function importOrganizationsFromCRM() {
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

//
// Import contacts from “CRM Organizací”
//

const haveCommonEmailAddress = (a: Partial<Contact>, b: Partial<Contact>) => {
  for (const candidateA of a.emailAddressData ?? []) {
    for (const candidateB of b.emailAddressData ?? []) {
      if (
        candidateA.emailAddress.toLocaleLowerCase() ===
        candidateB.emailAddress.toLocaleLowerCase()
      ) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Import contacts from the legacy CRM database
 *
 * Previous contacts are deduplicated by e-mail match only. If there
 * is an existing contact with the same name, we create a new, duplicate
 * one.
 */
async function importContactsFromCRM() {
  console.info(`*** Importing contacts from “CRM Organizací”`);

  const accounts = await espoGetAllAccounts(apiKey);
  const legacyOrganizations = await getAllOrganizations();
  const legacyContacts = await getAllContacts();

  const findAccount = (legacyOrgId: string) => {
    const organization = legacyOrganizations.find((o) => o.id === legacyOrgId)!;
    return accounts.find((a) => a.name === organization.name);
  };

  const convertLegacyContact = (c: LegacyContact): Partial<Contact> => {
    return {
      emailAddressData: [{ emailAddress: normalize(c.email) }],
      firstName: normalize(c.firstName),
      lastName: normalize(c.lastName),
      name: normalize(c.name),
      cDataSource: "CRM Organizací",
      accountsIds: c.relatedOrganizationIds
        .map((legacyOrgId) => findAccount(legacyOrgId)?.id)
        .filter(notEmpty),
      accountsColumns:
        c.relatedOrganizationIds.length === 1 &&
        findAccount(c.relatedOrganizationIds[0]) &&
        c.position
          ? {
              [findAccount(c.relatedOrganizationIds[0])!.id]: {
                role: normalize(c.position),
                isInactive: false,
              },
            }
          : undefined,
    };
  };

  await importCRMObjects<Contact>({
    existingValues: await espoGetAllContacts(apiKey),
    newValues: legacyContacts.map(convertLegacyContact),
    isEqual: haveCommonEmailAddress,
    createValue: (v) => espoCreateContact(apiKey, v, true), // skip duplicate checks
    updateValue: (v) => espoUpdateContact(apiKey, v),
    getValueById: (id) => espoGetContactById(apiKey, id),
    mergeRules: accountMergeRules,
    singularName: "contact",
    pluralName: "contacts",
  });
}

/** Import contacts’ engagement on projects from the legacy CRM database */
async function importLegacyContactEngagements() {
  console.log("*** Importing legacy contact project engagements");
  const legacyContacts = await getAllContacts();
  const projects = await espoGetAllProjects(apiKey);
  const newEngagements: Partial<ProjectEngagement>[] = [];

  const contacts = await espoGetAllContacts(apiKey);
  const getExistingContact = (email: string) =>
    contacts.find(
      (c) => !!c.emailAddressData?.find((data) => data.emailAddress === email),
    );

  for (const legacyContact of legacyContacts) {
    for (const slug of legacyContact.projectLinks) {
      const project = projects.find((p) => p.slug === slug);
      if (!project) {
        continue;
      }
      const existingContact = getExistingContact(
        normalize(legacyContact.email),
      );
      if (existingContact) {
        newEngagements.push({
          name: "zapojil*a se, ale nevíme jak",
          contactId: existingContact.id,
          projectId: project.id,
          dataSource: "CRM Organizací (Airtable)",
        });
      }
    }
  }

  console.log(`Found ${newEngagements.length} engagements.`);

  await importCRMObjects<ProjectEngagement>({
    existingValues: await espoGetAllProjectEngagements(apiKey),
    newValues: newEngagements,
    isEqual: (a, b) =>
      a.contactId === b.contactId &&
      a.projectId === b.projectId &&
      a.name === b.name,
    createValue: (v) => espoCreateProjectEngagement(apiKey, v),
    updateValue: (v) => espoUpdateProjectEngagement(apiKey, v),
    getValueById: (id) => espoGetProjectEngagementById(apiKey, id),
    singularName: "project engagement",
    pluralName: "project engagements",
    dryRun: true,
  });
}

async function importTeamEngagements() {
  const legacyEngagements = await getAllTeamEngagements();
  const contacts = await espoGetAllContacts(apiKey);
  const projects = await espoGetAllProjects(apiKey);

  const newEngagements: Partial<ProjectEngagement>[] = [];

  for (const legacyEngagement of legacyEngagements) {
    const existingContact = contacts.find(
      (c) => c.cLegacyAirtableID === legacyEngagement.userId,
    );
    const project = projects.find(
      (p) => p.slug === legacyEngagement.projectSlug,
    );
    if (!existingContact || !project) {
      continue;
    }
    newEngagements.push({
      name: legacyEngagement.projectRole ?? "zapojil*a se, ale nevíme jak",
      contactId: existingContact.id,
      projectId: project.id,
      dataSource: "Teams (Airtable)",
      isPublic: !legacyEngagement.hideFromPublicView,
      sections: legacyEngagement.fields.join("; "),
    });
  }

  await importCRMObjects({
    existingValues: await espoGetAllProjectEngagements(apiKey),
    newValues: newEngagements,
    isEqual: (a, b) =>
      a.contactId === b.contactId &&
      a.projectId === b.projectId &&
      a.name === b.name,
    createValue: (v) => espoCreateProjectEngagement(apiKey, v),
    updateValue: (v) => espoUpdateProjectEngagement(apiKey, v),
    getValueById: (id) => espoGetProjectEngagementById(apiKey, id),
    singularName: "project engagement",
    pluralName: "project engagements",
  });
}

/**
 * Import CRM-related data from various legacy sources
 *
 * This is meant to run regularly until we can freeze and deprecate the original data sources.
 *
 * New objects are created, existing objects updated according to merge rules.
 */
async function main() {
  await importOrganizationsFromCRM();
  await importUserProfilesFromAirtable();
  await importContactsFromCRM();
  await importLegacyContactEngagements();
  await importTeamEngagements();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
