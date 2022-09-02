import { decodeUrl, markdown, takeFirst, withDefault } from "./decoding";
import {
  array,
  boolean,
  decodeType,
  field,
  optional,
  Pojo,
  record,
  string,
  union,
} from "typescript-json-decoder";

/*
 * The types in here are not written by hand because we would then need to
 * repeat almost the same code when writing decoders to read the values from
 * Airtable. So we turn the thing around, write the decoders first and infer
 * the types from them. This way there’s no code duplication. Hopefully this
 * is not too smart for our own good :)
 */

export type PortalOpportunity = decodeType<typeof decodeOpportunity>;
export type PortalPartner = decodeType<typeof decodePartner>;

/**
 * Decode skills such as Marketing, Design, …
 *
 * The “Other” skill is special – it doesn’t make much sense in combination with
 * other skills, so we only allow it when it’s the only skill specified. More here:
 * https://cesko-digital.slack.com/archives/CHG9NA23D/p1649168585006699
 */
export const decodeSkills = (value: Pojo) => {
  const skills = array(string)(value);
  if (skills.length > 1) {
    return skills.filter((skill) => skill !== "Other");
  } else {
    return skills;
  }
};

export const decodeOpportunity = record({
  id: string,
  name: field("Name", string),
  slug: field("id", string),
  projectId: field("Project", takeFirst(array(string))),
  summary: field("Summary", markdown),
  timeRequirements: field("Time Requirements", string),
  ownerId: field("Owner", takeFirst(array(string))),
  contactUrl: field("RSVP URL", decodeUrl),
  coverImageUrl: field("Cover URL", optional(string)),
  skills: field("Skills", decodeSkills),
  juniorFriendly: field("Junior Friendly", withDefault(boolean, false)),
  status: field("Status", union("draft", "live", "unlisted")),
});

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
