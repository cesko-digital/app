#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import {
  getAllOrganizations,
  type Organization,
} from "~/src/data/organization";
import { getAllUserProfiles, type UserProfile } from "~/src/data/user-profile";
import { type Account } from "~/src/espocrm/account";
import { type Contact } from "~/src/espocrm/contact";
import { Entities } from "~/src/espocrm/espo";
import {
  importObjects,
  map,
  normalize,
  normalizeWebsiteUrl,
} from "~/src/espocrm/import";

const crmApiKey = process.env.CRM_API_KEY ?? "<not set>";

const userProfileToContact = (profile: UserProfile): Partial<Contact> => ({
  name: profile.name,
  firstName: normalize(profile.firstName),
  lastName: normalize(profile.lastName),
  emailAddressData: [
    {
      emailAddress: normalize(profile.email),
    },
  ],
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

const organizationToAccount = (org: Organization): Partial<Account> => ({
  name: normalize(org.name),
  website: map(org.website, normalizeWebsiteUrl),
  cIco: org.governmentId,
  cDataSource: "Airtable sync",
});

async function importUserProfiles() {
  console.info(`*** Importing user profiles`);
  console.debug(`Downloading confirmed user profiles from Airtable.`);
  const userProfiles = await getAllUserProfiles("Confirmed Profiles");
  console.debug(`Downloaded ${userProfiles.length} user profiles.`);

  await importObjects({
    entity: Entities.Contact,
    newValues: userProfiles.map(userProfileToContact),
    isEqual: (a, b) => a.cLegacyAirtableID === b.cLegacyAirtableID,
    apiKey: crmApiKey,
  });

  console.debug("Finished!");
}

async function importOrganizations() {
  console.info(`*** Importing organizations`);
  const organizations = await getAllOrganizations();
  console.debug(`Downloaded ${organizations.length} organizations.`);
  await importObjects({
    entity: Entities.Account,
    newValues: organizations.map(organizationToAccount),
    isEqual: (a, b) => !!a.name && a.name === b.name,
    apiKey: crmApiKey,
  });
}

async function main() {
  await importOrganizations();
  await importUserProfiles();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
