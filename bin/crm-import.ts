#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { aresGetEkonomickySubjekt } from "~/src/ares/ares";
import { getAllUserProfiles, type UserProfile } from "~/src/data/user-profile";
import {
  espoCreateContact,
  espoGetAllAccounts,
  espoGetAllContacts,
  espoGetContactById,
  espoUpdateAccount,
  espoUpdateContact,
  type Contact,
} from "~/src/espocrm/espo";
import { importCRMObjects, normalize } from "~/src/espocrm/import";
import { contactMergeRules } from "~/src/espocrm/merge";
import { isValidIČO } from "~/src/utils";

const apiKey = process.env.CRM_API_KEY ?? "<not set>";

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
  console.log(`*** Importing contacts from Airtable DB “User Profiles”`);
  console.log(`Downloading confirmed user profiles from Airtable.`);
  const userProfiles = await getAllUserProfiles("Confirmed Profiles");
  await importCRMObjects<Contact>({
    existingValues: await espoGetAllContacts(apiKey),
    newValues: userProfiles.map(userProfileToContact),
    // TBD: Or e-mails match? But we’d have to sort out the legacy ID then
    isEqual: (a, b) => a.cLegacyAirtableID === b.cLegacyAirtableID,
    createValue: (v) => espoCreateContact(apiKey, v),
    updateValue: (v) => espoUpdateContact(apiKey, v),
    getValueById: (id) => espoGetContactById(apiKey, id),
    mergeRules: contactMergeRules,
    singularName: "contact",
    pluralName: "contacts",
  });
  console.log("Finished!");
}

//
// ARES Data
//

async function importARESAccountData() {
  const allAccounts = await espoGetAllAccounts(apiKey);
  for (const account of allAccounts) {
    if (account.cIco && !account.cKodPravniFormy) {
      console.log(`Adding ARES data for ${account.name}`);
      if (!isValidIČO(account.cIco)) {
        console.warn(`Skipping, “${account.cIco}” is not a valid IČO.`);
        continue;
      }
      const subject = await aresGetEkonomickySubjekt(account.cIco);
      if (subject) {
        await espoUpdateAccount(apiKey, {
          id: account.id,
          cKodPravniFormy: subject?.pravniForma,
          cPravniForma: subject?.nazevPravniFormy,
        });
      }
    }
  }
}

/**
 * Import CRM-related data from various legacy sources
 *
 * This is meant to run regularly until we can freeze and deprecate the original data sources.
 *
 * New objects are created, existing objects updated according to merge rules.
 */
async function main() {
  await importUserProfilesFromAirtable();
  await importARESAccountData();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
