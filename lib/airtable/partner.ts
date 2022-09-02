import { decodeValidItemsFromArray } from "lib/decoding";
import { unwrapRecords, webBase } from "./request";
import {
  array,
  decodeType,
  field,
  optional,
  record,
  string,
  union,
} from "typescript-json-decoder";

//
// Decoding
//

export type PortalPartner = decodeType<typeof decodePartner>;
export const decodePartner = record({
  id: field("ID", string),
  name: string,
  logoUrl: string,
  linkUrl: field("url", optional(string)),
  categories: field(
    "category",
    array(
      union(
        "homepage",
        "financial.main",
        "financial.grants",
        "financial.regular",
        "experts.submitters",
        "experts.supporters"
      )
    )
  ),
});

//
// API Calls
//

/** Partners table */
export const partnersTable = webBase("Partners");

/** Get all projects */
export async function getAllPartners(): Promise<PortalPartner[]> {
  return await partnersTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodePartner, "Partners"));
}

//
// Utils
//

export function filterPartnersByCategory(
  partners: readonly PortalPartner[],
  category: ArrayElement<PortalPartner["categories"]>
) {
  return partners.filter((p) => p.categories.some((c) => c === category));
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
