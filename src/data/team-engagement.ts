import {
  array,
  boolean,
  field,
  optional,
  record,
  string,
  type decodeType,
} from "typescript-json-decoder";

import {
  decodeValidItemsFromArray,
  takeFirst,
  withDefault,
} from "~/src/decoding";

import { unwrapRecords, webBase } from "./airtable";

//
// Decoding
//

const relationToOne = takeFirst(array(string));

/** An engagement of a particular user on a particular project */
export type TeamEngagement = decodeType<typeof decodeTeamEngagement>;

/**
 * Decode team engagement from the DB schema
 *
 * We are intentionally skipping e-mails here at the moment for privacy reasons.
 */
export const decodeTeamEngagement = record({
  id: string,
  projectId: field("project", relationToOne),
  userId: field("user", relationToOne),
  userName: relationToOne,
  userAvatarUrl: relationToOne,
  projectRole: optional(string),
  projectName: relationToOne,
  coordinatingRole: withDefault(boolean, false),
  inactive: withDefault(boolean, false),
  startDate: optional(string),
});

//
// API Calls
//

const teamEngagementTable = webBase("Teams");

/** Get all team engagements */
export async function getPublicTeamEngagements(): Promise<TeamEngagement[]> {
  return await teamEngagementTable
    .select({ view: "Public Team Engagements" })
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeTeamEngagement, "Teams"));
}

/** Get all team engagements for given project */
export async function getPublicTeamEngagementsForProject(
  projectSlug: string,
): Promise<TeamEngagement[]> {
  return await teamEngagementTable
    .select({
      view: "Public Team Engagements",
      filterByFormula: `{project} = "${projectSlug}"`,
    })
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeTeamEngagement, "Teams"));
}
