import {
  decodeSkills,
  decodeUrl,
  decodeValidItemsFromArray,
  markdown,
  takeFirst,
  withDefault,
} from "src/decoding";
import {
  array,
  boolean,
  decodeType,
  field,
  optional,
  record,
  string,
  union,
} from "typescript-json-decoder";

import { unwrapRecords, webBase } from "./airtable";

/** Table views you can use when querying the opportunities table */
export type TableView =
  | "All Opportunities"
  | "Show to Users"
  | "Notifications for Today";

export type Opportunity = decodeType<typeof decodeOpportunity>;
export const decodeOpportunity = record({
  id: field("ID", string),
  name: field("Name", string),
  slug: field("ID", string),
  projectId: field("Project", takeFirst(array(string))),
  summary: field("Summary", markdown),
  timeRequirements: field("Time Requirements", string),
  ownerId: field("Owner", takeFirst(array(string))),
  contactUrl: field("RSVP URL", decodeUrl),
  coverImageUrl: field("Cover URL", optional(string)),
  skills: field("Skills", decodeSkills),
  juniorFriendly: field("Junior Friendly", withDefault(boolean, false)),
  status: field("Status", union("draft", "live", "unlisted")),
  creationTime: field("Created Time", string),
});

//
// API Calls
//

/** Opportunities table */
export const opportunitiesTable = webBase("Opportunities");

/** Get all opportunities */
export async function getAllOpportunities(
  view: TableView = "All Opportunities",
): Promise<Opportunity[]> {
  return await opportunitiesTable
    .select({ view })
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeOpportunity, "Opportunities"));
}

/** Get opportunities for project */
export async function getOpportunitiesForProject(
  projectSlug: string,
): Promise<Opportunity[]> {
  return await opportunitiesTable
    .select({ filterByFormula: `{project} = "${projectSlug}"` })
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeOpportunity, "Opportunities"));
}

//
// Helpers
//

export const compareOpportunitiesByTime = (a: Opportunity, b: Opportunity) =>
  Date.parse(b.creationTime) - Date.parse(a.creationTime);
