#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { Entities, getAllObjects, getObjectById } from "~/src/espocrm/espo";

const crmApiKey = process.env.CRM_API_KEY ?? "<not set>";

async function main() {
  const contacts = await getAllObjects(Entities.Contact, crmApiKey);
  const accounts = await getAllObjects(Entities.Account, crmApiKey);
  for (const contact of contacts) {
    const fullContact = await getObjectById(
      Entities.Contact,
      crmApiKey,
      contact.id,
    );
    for (const account of accounts) {
      if (!account.website) {
        continue;
      }
      const host = new URL(`https://${account.website}`).host;
      const matchingEmail = fullContact.emailAddressData.find((a) =>
        a.emailAddress.endsWith("@" + host),
      );
      if (matchingEmail) {
        console.log(
          `Email ${matchingEmail.emailAddress} ties ${contact.name} to account ${account.name}.`,
        );
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
