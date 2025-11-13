#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { espoGetAllAccounts, espoGetAllContacts } from "~/src/espocrm/espo";
import { haveCommonEmailAddress } from "~/src/espocrm/merge";

const apiKey = process.env.CRM_API_KEY ?? "<not set>";

async function main() {
  const forAllPairs = <T>(list: T[], f: (a: T, b: T) => void) => {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        f(a, b);
      }
    }
  };

  console.log("Checking for duplicate contacts:");
  const contacts = await espoGetAllContacts(apiKey);
  forAllPairs(contacts, (a, b) => {
    if (haveCommonEmailAddress(a, b)) {
      console.log(`${a.name} and ${b.name} appear to be the same person:`);
      console.log(`- https://crm.cesko.digital/#Contact/view/${a.id}`);
      console.log(`- https://crm.cesko.digital/#Contact/view/${b.id}`);
    }
  });

  const accounts = await espoGetAllAccounts(apiKey);
  forAllPairs(accounts, (a, b) => {
    if (a.emailAddress && a.emailAddress === b.emailAddress) {
      console.log(
        `${a.name} and ${b.name} may be the same account based on the e-mail address.`,
      );
    } else if (a.website && a.website === b.website) {
      console.log(
        `${a.name} and ${b.name} may be the same account based on the website.`,
      );
    }
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
