#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getAllUserProfiles } from "~/src/data/user-profile";
import { createContact, getAllContacts } from "~/src/espo";

async function main() {
  const crmApiKey = process.env.CRM_API_KEY ?? "<not set>";
  console.debug("Downloading confirmed user profiles from Airtable.");
  const userProfiles = await getAllUserProfiles("Confirmed Profiles");
  console.debug(`Downloaded ${userProfiles.length} user profiles.`);
  console.debug("Downloading existing contacts from CRM.");
  const contacts = await getAllContacts(crmApiKey);
  console.debug(`Downloaded ${contacts.length} contacts.`);

  for (const userProfile of userProfiles) {
    // Previous contact for this user profile in the CRM
    const previousContact = contacts.find(
      (c) => c.cLegacyAirtableID === userProfile.id,
    );

    // The CRM requires first name and last name fields, so
    // make sure we have them. This is slightly silly, but works
    // for now.
    if (!userProfile.firstName || !userProfile.lastName) {
      console.warn(
        `First name or last name missing for ${userProfile.name} (${userProfile.id}), skipping entirely.`,
      );
      continue;
    }

    // If this is a new user not seen previously, create a new CRM contact
    if (!previousContact) {
      console.info(
        `New user profile without previous contact, creating: ${userProfile.name}`,
      );
      await createContact(crmApiKey, {
        name: userProfile.name,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        emailAddress: userProfile.email,
        cLegacyAirtableID: userProfile.id,
        cSlackUserID: userProfile.slackId,
        cDataSource: "Airtable sync",
      });
      continue;
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
