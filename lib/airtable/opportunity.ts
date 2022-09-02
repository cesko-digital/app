import { unwrapRecords, webBase } from "./request";
import {
  decodeSkills,
  decodeUrl,
  decodeValidItemsFromArray,
  markdown,
  takeFirst,
  withDefault,
} from "lib/decoding";
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

export type PortalOpportunity = decodeType<typeof decodeOpportunity>;
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
});

//
// API Calls
//

/** Opportunities table */
export const opportunitiesTable = webBase("Opportunities");

/** Get all projects */
export async function getAllOpportunities(): Promise<PortalOpportunity[]> {
  return await opportunitiesTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeOpportunity, "Opportunities"));
}
