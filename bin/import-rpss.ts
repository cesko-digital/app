#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { array, record, string } from "typescript-json-decoder";

import { decodeIČO, optionalArray, undefinedIfNull } from "~/src/decoding";
import {
  espoAddAccountsToTargetList,
  espoCreateAccount,
  espoGetAccountById,
  espoGetAllAccounts,
  espoUpdateAccount,
  type Account,
} from "~/src/espocrm/espo";
import { importCRMObjects } from "~/src/espocrm/import";

const apiKey = process.env.CRM_API_KEY ?? "<not set>";

const decodeItem = record({
  identifikator: string,
  poskytovatel: record({
    ico: decodeIČO,
    nazev: string,
    emaily: optionalArray(
      record({
        email: string,
        poznamka: undefinedIfNull(string),
      }),
    ),
    weby: optionalArray(
      record({
        web: string,
        poznamka: undefinedIfNull(string),
      }),
    ),
  }),
});

const decodeRegistry = record({
  polozky: array(decodeItem),
});

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const json = require("./rpss.json") as unknown;
  const registry = decodeRegistry(json);

  const newAccounts: Partial<Account>[] = registry.polozky.map((item) => ({
    cIco: item.poskytovatel.ico,
    name: item.poskytovatel.nazev,
    website: item.poskytovatel.weby.at(0)?.web,
    emailAddress: item.poskytovatel.emaily.at(0)?.email,
    cDataSource: "Registr poskytovatelů sociálních služeb",
  }));

  const matches = (a: Partial<Account>, b: Partial<Account>) =>
    (!!a.cIco && a.cIco === b.cIco) ||
    (!!a.name && a.name === b.name) ||
    (!!a.website && a.website === b.website) ||
    (!!a.emailAddress && a.emailAddress === b.emailAddress);

  const uniqueAccounts: Partial<Account>[] = [];
  newAccounts.forEach((a) => {
    if (!uniqueAccounts.find((b) => matches(a, b))) {
      uniqueAccounts.push(a);
    }
  });

  console.log(
    `Got ${newAccounts.length} accounts, ${uniqueAccounts.length} unique.`,
  );

  // Update or create accounts
  await importCRMObjects<Account>({
    existingValues: await espoGetAllAccounts(apiKey),
    newValues: uniqueAccounts,
    isEqual: matches,
    createValue: (v) => espoCreateAccount(apiKey, v),
    updateValue: (v) => espoUpdateAccount(apiKey, v),
    getValueById: (id) => espoGetAccountById(apiKey, id),
    singularName: "account",
    pluralName: "accounts",
  });

  // Link accounts to target list
  const accountIds = await espoGetAllAccounts(apiKey)
    .then((accounts) =>
      accounts.filter((a) => !!newAccounts.find((na) => matches(a, na))),
    )
    .then((accounts) => accounts.map((a) => a.id));
  await espoAddAccountsToTargetList(apiKey, "68272c70b835a4e61", accountIds);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
