import { withDefault } from "lib/decoding";
import { unwrapRecords, volunteerManagementBase } from "./request";
import {
  array,
  decodeType,
  field,
  record,
  string,
} from "typescript-json-decoder";

//
// Decoding
//

/** Volunteer */
export type Volunteer = decodeType<typeof decodeVolunteer>;

/** Decode `Volunteer` from DB schema */
export const decodeVolunteer = record({
  email: field("Slack: E-mail", string),
  slackId: field("Slack: ID", string),
  skillIds: field("Self-reported skills", withDefault(array(string), [])),
  createdAt: field("Datum vzniku", string),
});

//
// API Calls
//

/** Volunteers table */
export const volunteersTable = volunteerManagementBase("Volunteers");

export async function getAllVolunteers(): Promise<Volunteer[]> {
  return await volunteersTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(array(decodeVolunteer));
}
