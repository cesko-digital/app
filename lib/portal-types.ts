import { markdown, takeFirst, withDefault } from "./decoding";
import {
  array,
  boolean,
  decodeType,
  field,
  fields,
  optional,
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

export type PortalProject = decodeType<typeof decodeProject>;
export type PortalUser = decodeType<typeof decodeUser>;
export type PortalEvent = decodeType<typeof decodeEvent>;
export type PortalOpportunity = decodeType<typeof decodeOpportunity>;
export type PortalPartner = decodeType<typeof decodePartner>;

export const decodeProject = record({
  id: string,
  name: field("csName", string),
  slug: field("csSlug", string),
  tagline: field("csTagline", string),
  description: field("csDescription", markdown),
  url: string,
  contributeText: field("csContributeText", optional(markdown)),
  coverImageUrl: field("coverUrl", string),
  logoUrl: string,
  highlighted: withDefault(boolean, false),
  finished: withDefault(boolean, false),
  draft: withDefault(boolean, false),
  silent: withDefault(boolean, false),
  tagIds: field("tags", withDefault(array(string), [])),
  coordinatorIds: field("coordinators", array(string)),
  trelloUrl: optional(string),
  githubUrl: optional(string),
  slackChannelUrl: optional(string),
  slackChannelName: optional(string),
});

export const decodeUser = record({
  id: string,
  name: string,
  profilePictureUrl: string,
  email: string,
});

export const decodeEvent = record({
  id: string,
  name: field("Name", string),
  slug: fields(
    // Read slug from the `Slug` field and fall
    // back to `id` if the `Slug` field is empty.
    { Slug: optional(string), id: string },
    ({ Slug, id }) => Slug ?? id
  ),
  summary: field("Summary", string),
  description: field("Description", markdown),
  startTime: field("Start Time", string),
  ownerId: field("Owner", takeFirst(array(string))),
  projectId: field("Project", takeFirst(array(string))),
  status: field("Status", union("draft", "live", "unlisted")),
  registrationUrl: field("RSVP URL", optional(string)),
  registrationTitle: field("RSVP Title", optional(string)),
  endTime: field("End Time", optional(string)),
  tagIds: field("Tags", withDefault(array(string), [])),
  coverImageUrl: field("Cover URL", optional(string)),
  locationTitle: field("Location Title", optional(string)),
  locationUrl: field("Location URL", optional(string)),
});

export const decodeOpportunity = record({
  id: string,
  name: field("Name", string),
  slug: field("id", string),
  projectId: field("Project", takeFirst(array(string))),
  summary: field("Summary", markdown),
  timeRequirements: field("Time Requirements", string),
  ownerId: field("Owner", takeFirst(array(string))),
  contactUrl: field("RSVP URL", string),
  coverImageUrl: field("Cover URL", optional(string)),
  skills: field("Skills", array(string)),
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

export function filterPartnersByCategory(
  partners: PortalPartner[],
  category: ArrayElement<PortalPartner["categories"]>
) {
  return partners.filter((p) => p.categories.some((c) => c === category));
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
