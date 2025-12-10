#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import {
  espoCreateAccount,
  espoCreateContact,
  espoCreateEventRegistration,
  espoGetAccountById,
  espoGetAllAccounts,
  espoGetAllContacts,
  espoGetAllEventRegistrations,
  espoGetContactById,
  espoGetEventRegistrationById,
  espoUpdateAccount,
  espoUpdateContact,
  espoUpdateEventRegistration,
  type Account,
  type Contact,
  type EventRegistration,
} from "~/src/espocrm/espo";
import { firstName, importCRMObjects, lastName } from "~/src/espocrm/import";
import { contactMergeRules, haveCommonEmailAddress } from "~/src/espocrm/merge";
import { notEmpty, unique } from "~/src/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const apiKey = process.env.CRM_API_KEY ?? "<not set>";

type ImportedRegistration = {
  name: string;
  email: string;
  phone?: string;
  accountName?: string;
  accountRole?: string;
  status: EventRegistration["status"];
};

async function importEventRegistrations(
  eventId: string,
  data: ImportedRegistration[],
) {
  // Import accounts
  console.log("Importing accounts.");
  const accountNames = unique(data.map((row) => row.accountName)).filter(
    notEmpty,
  );

  await importCRMObjects<Account>({
    existingValues: await espoGetAllAccounts(apiKey),
    newValues: accountNames.map((name) => ({ name })),
    isEqual: (a, b) =>
      a.name?.toLocaleLowerCase() === b.name?.toLocaleLowerCase(),
    createValue: (v) => espoCreateAccount(apiKey, v),
    updateValue: (v) => espoUpdateAccount(apiKey, v),
    getValueById: (v) => espoGetAccountById(apiKey, v),
    singularName: "account",
    pluralName: "accounts",
  });

  const accounts = await espoGetAllAccounts(apiKey);
  const findAccountByName = (name: string) =>
    accounts.find(
      (a) => a.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );

  // Import contacts
  console.log("Importing contacts.");
  const newContacts: Partial<Contact>[] = data.map((row) => ({
    firstName: firstName(row.name),
    lastName: lastName(row.name),
    emailAddressData: [{ emailAddress: row.email }],
    phoneNumber: row.phone,
    accountsIds:
      row.accountName && findAccountByName(row.accountName)
        ? [findAccountByName(row.accountName)!.id]
        : undefined,
  }));

  await importCRMObjects<Contact>({
    existingValues: await espoGetAllContacts(apiKey),
    newValues: newContacts,
    isEqual: (a, b) => haveCommonEmailAddress(a, b),
    createValue: (v) => espoCreateContact(apiKey, v, true /* allow dupes */),
    updateValue: (v) => espoUpdateContact(apiKey, v),
    getValueById: (v) => espoGetContactById(apiKey, v),
    mergeRules: contactMergeRules,
    singularName: "contact",
    pluralName: "contacts",
  });

  const allContacts = await espoGetAllContacts(apiKey);
  const findContactByEmail = (emailAddress: string) =>
    allContacts.find((c) =>
      haveCommonEmailAddress(c, {
        emailAddressData: [{ emailAddress }],
      }),
    );

  // Create event registration data
  const registrationData: Partial<EventRegistration>[] = data.map((row) => ({
    contactId: findContactByEmail(row.email)?.id,
    status: row.status,
    eventId,
  }));

  await importCRMObjects<EventRegistration>({
    existingValues: await espoGetAllEventRegistrations(apiKey),
    newValues: registrationData,
    isEqual: (a, b) => a.eventId === b.eventId && a.contactId === b.contactId,
    createValue: (v) => espoCreateEventRegistration(apiKey, v),
    updateValue: (v) => espoUpdateEventRegistration(apiKey, v),
    getValueById: (v) => espoGetEventRegistrationById(apiKey, v),
    singularName: "event registration",
    pluralName: "event registrations",
    mergeRules: {
      immutableProps: [],
      updatableProps: ["status"],
      readOnlyAfterCreatePops: [],
      mergableProps: {},
    },
  });
}

async function main() {
  const data: ImportedRegistration[] = [
    /* your data here */
  ];
  await importEventRegistrations("<event ID here>", data);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
