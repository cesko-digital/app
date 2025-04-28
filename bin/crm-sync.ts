#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getAllUserProfiles, type UserProfile } from "~/src/data/user-profile";
import { type Contact } from "~/src/espocrm/contact";
import { Entities } from "~/src/espocrm/espo";
import { importObjects } from "~/src/espocrm/import";

const crmApiKey = process.env.CRM_API_KEY ?? "<not set>";

const map = <T, U>(value: T | undefined, f: (val: T) => U) =>
  value ? f(value) : undefined;

const stripWhitespace = (s: string) =>
  s.replaceAll(/^\s+/g, "").replaceAll(/\s+$/g, "");

const userProfileToContact = (profile: UserProfile): Partial<Contact> => ({
  name: profile.name,
  firstName: map(profile.firstName, stripWhitespace),
  lastName: map(profile.lastName, stripWhitespace),
  emailAddressData: [
    {
      emailAddress: profile.email,
    },
  ],
  cLegacyAirtableID: profile.id,
  cSlackUserID: profile.slackId,
  cDataSource: "Airtable sync",
  cBio: profile.bio,
  cTags: profile.tags,
  cSeniority: profile.maxSeniority,
  cOrganizationName: map(profile.organizationName, stripWhitespace),
  cPublicContactEmail: profile.contactEmail,
  cProfessionalProfileURL: profile.profileUrl,
  cOccupation: profile.occupation,
  cPrivacyFlags: profile.privacyFlags,
  cProfilePictureURL: profile.profilePictureUrl,
  cAvailableInDistricts: profile.availableInDistricts,
});

async function main() {
  console.debug(`Downloading confirmed user profiles from Airtable.`);
  const userProfiles = await getAllUserProfiles("Confirmed Profiles");
  console.debug(`Downloaded ${userProfiles.length} user profiles.`);

  await importObjects({
    entity: Entities.Contact,
    newValues: userProfiles.map(userProfileToContact),
    isEqual: (a, b) => a.cLegacyAirtableID === b.cLegacyAirtableID,
    apiKey: crmApiKey,
    dryRun: true,
  });

  console.debug("Finished!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
