import {
  field,
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
