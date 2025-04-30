import {
  field,
  optional,
  record,
  string,
  type decodeType,
} from "typescript-json-decoder";

import { crmBase, unwrapRecords } from "~/src/data/airtable";
import { decodeIČO, decodeValidItemsFromArray } from "~/src/decoding";

//
// Data Definitions
//

export type Organization = decodeType<typeof decodeOrganization>;
export const decodeOrganization = record({
  name: field("Název a pobočka", string),
  governmentId: field("IČO", decodeIČO),
  website: field("Web", optional(string)),
});

//
// API Calls
//

const organizationsTable = crmBase("Organizace");

export const getAllOrganizations = async () =>
  organizationsTable
    .select({ view: "Mají IČ" })
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeOrganization, "Organizations"));
