#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getAllUserProfiles, type UserProfile } from "~/src/data/user-profile";
import { type Contact } from "~/src/espocrm/contact";
import { Entities } from "~/src/espocrm/espo";
import { importObjects, normalize } from "~/src/espocrm/import";

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

async function main() {
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

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
