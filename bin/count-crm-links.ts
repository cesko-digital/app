#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { espoGetAccountContacts, espoGetAllAccounts } from "~/src/espocrm/espo";

const apiKey = process.env.CRM_API_KEY ?? "<not set>";

async function main() {
  console.log(`Downloading list of all accounts.`);
  const accounts = await espoGetAllAccounts(apiKey);
  let links = 0;
  for (const account of accounts) {
    const contacts = await espoGetAccountContacts(apiKey, account.id);
    links += contacts.length;
    if (contacts.length > 0) {
      console.log(
        `Account ${account.id} (${account.name}) has ${contacts.length} linked contact(s).`,
      );
    }
  }
  console.log(`Found ${links} links between accounts and contacts.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
