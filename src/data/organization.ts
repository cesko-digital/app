import {
  field,
  optional,
  record,
  string,
  type decodeType,
} from "typescript-json-decoder";

import { crmBase, unwrapRecords } from "~/src/data/airtable";
import {
  decodeIČO,
  decodeValidItemsFromArray,
  relationToZeroOrMany,
} from "~/src/decoding";

//
// Organizations
//

const organizationsTable = crmBase("Organizace");

export type Organization = decodeType<typeof decodeOrganization>;
export const decodeOrganization = record({
  id: field("ID", string),
  name: field("Název a pobočka", string),
  governmentId: field("IČO", optional(decodeIČO)),
  website: field("Web", optional(string)),
});

export const getAllOrganizations = async () =>
  organizationsTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeOrganization, "Organizations"));

//
// Contacts
//

const contactTable = crmBase("Externí kontakty");

export type Contact = decodeType<typeof decodeContact>;
export const decodeContact = record({
  name: field("Kontaktní osoba", string),
  firstName: field("Jméno", string),
  lastName: field("Příjmení", string),
  email: field("Email", string),
  position: field("Pracovní zařazení/ Job Title", optional(string)),
  relatedOrganizationIds: field("Organizace", relationToZeroOrMany),
});

export const getAllContacts = async () =>
  contactTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeContact, "Contacts"));
