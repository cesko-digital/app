import {
  array,
  decodeType,
  field,
  optional,
  record,
  string,
  union,
} from "typescript-json-decoder";

export type PortalPartner = decodeType<typeof decodePartner>;
export const decodePartner = record({
  id: string,
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
