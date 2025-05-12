import { expect, test } from "@playwright/test";

import {
  espoCreateContact,
  espoGetAllContacts,
  espoGetContactById,
} from "~/src/espocrm/espo";

// This is not a regular test file, it’s more like an assumption
// test suite for the EspoCRM API to make sure the API behaves as
// expected (or not expected).

const apiKey = process.env.CRM_API_KEY ?? "";

// Basic test to make sure the API works at all
test("Get testing contact", async () => {
  const contact = await espoGetContactById(apiKey, "67e2aec3194113385");
  expect(contact.name).toBe("Jan Testmatov");
});

// In a vanilla EspoCRM installation the `emailAddressData` is not
// returned in the listing API endpoints, you can only get it by
// querying the `Contact/{id}` endpoint. We have configured our
// CRM server to include the `emailAddressData` field in the listing
// API endpoints, too. See here:
//
// https://forum.espocrm.com/forum/developer-help/116990
//
// This test makes sure the customization works.
test("Load all email address fields", async () => {
  // Get our contact using the batch listing endpoint
  const allContacts = await espoGetAllContacts(apiKey, "Testmatov");
  const contact = allContacts.find(
    (contact) => contact.name === "Jan Testmatov",
  )!;
  expect(contact).toBeDefined();
  expect(contact.emailAddressData).toBeDefined();
  // The `emailAddressData` field should be present
  expect(contact.emailAddressData!.map((a) => a.emailAddress)).toEqual([
    "zoul+testmatov@cesko.digital",
    "zoul+testmatov2@cesko.digital",
  ]);
});

// We know a contact with this precise name already exists,
// so attempting to create it again will fail with a conflict.
test("Insert conflict", async () => {
  await expect(
    espoCreateContact(apiKey, {
      firstName: "Jan",
      lastName: "Testmatov",
      emailAddress: "zoul+testmatov3@cesko.digital",
    }),
  ).rejects.toThrow(/conflict/i);
});
