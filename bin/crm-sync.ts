#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getAllUserProfiles, type UserProfile } from "~/src/data/user-profile";
import {
  createContact,
  getAllContacts,
  updateContact,
  type Contact,
  type ContactCreate,
} from "~/src/espo";

const crmApiKey = process.env.CRM_API_KEY ?? "<not set>";

const map = <T, U>(value: T | undefined, f: (val: T) => U) =>
  value ? f(value) : undefined;

const stripWhitespace = (s: string) =>
  s.replaceAll(/^\s+/g, "").replaceAll(/\s+$/g, "");

const userProfileToNewContact = (profile: UserProfile): ContactCreate => ({
  name: profile.name,
  firstName: map(profile.firstName, stripWhitespace),
  lastName: map(profile.lastName, stripWhitespace),
  emailAddress: profile.email,
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

const userProfileToContactUpdate = (
  profile: UserProfile,
): Partial<Contact> => ({
  firstName: map(profile.firstName, stripWhitespace),
  lastName: map(profile.lastName, stripWhitespace),
  emailAddress: profile.email,
  cLegacyAirtableID: profile.id,
  cSlackUserID: profile.slackId,
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

  console.debug(`Downloading all previous CRM contacts.`);
  const previousContacts = await getAllContacts(crmApiKey);
  console.debug(`Downloaded ${previousContacts.length} CRM contacts.`);

  const previousContactFor = ({ id }: UserProfile) =>
    previousContacts.find((c) => c.cLegacyAirtableID === id);
  const isExistingUserProfile = (profile: UserProfile) =>
    !!previousContactFor(profile);

  //
  // Insert new contacts
  //

  const newUserProfiles = userProfiles.filter((p) => !isExistingUserProfile(p));
  const newContacts = newUserProfiles
    .filter((profile) => profile.firstName && profile.lastName)
    .map(userProfileToNewContact);
  console.log(`Inserting ${newContacts.length} new contacts.`);
  for (const contact of newContacts) {
    try {
      await createContact(crmApiKey, contact);
    } catch (error) {
      console.error(`Create failed for contact ${contact.name}:`);
      console.error(error);
    }
  }

  //
  // Update existing contacts
  //

  const keys: Array<keyof Contact> = [
    "cSlackUserID",
    "emailAddress",
    "firstName",
    "lastName",
    "cBio",
    "cTags",
    "cSeniority",
    "cOrganizationName",
    "cPublicContactEmail",
    "cProfessionalProfileURL",
    "cOccupation",
    "cPrivacyFlags",
    "cProfilePictureURL",
    "cAvailableInDistricts",
  ];

  console.log("Updating existing contacts.");
  for (const userProfile of userProfiles.filter(isExistingUserProfile)) {
    const updatedContact = userProfileToContactUpdate(userProfile);
    const existingContact = previousContactFor(userProfile)!;
    const dirtyKeys: Array<keyof Contact> = [];
    for (const key of keys) {
      const savedValue = existingContact[key];
      const newValue = updatedContact[key];
      if (JSON.stringify(savedValue) !== JSON.stringify(newValue)) {
        dirtyKeys.push(key);
      }
    }
    if (dirtyKeys.length > 0) {
      console.log(`Contact “${userProfile.name}” needs update:`);
      dirtyKeys.forEach((key) => {
        console.log(
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          `- ${key}: “${existingContact[key]}” => “${updatedContact[key]}”`,
        );
      });
      try {
        await updateContact(crmApiKey, {
          id: existingContact.id,
          ...updatedContact,
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  console.debug("Finished!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
