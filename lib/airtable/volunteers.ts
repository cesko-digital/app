import { FieldSet } from "airtable";
import { withDefault } from "lib/decoding";
import { unwrapRecords, volunteerManagementBase } from "./request";
import {
  array,
  decodeType,
  field,
  record,
  string,
} from "typescript-json-decoder";

/** The Airtable schema of the Volunteers table */
export interface Schema extends FieldSet {
  "Slack: E-mail": string;
  "Slack: ID": string;
  "Self-reported skills": ReadonlyArray<string>;
}

/** Volunteers table */
export const volunteersTable = volunteerManagementBase<Schema>("Volunteers");

/** Volunteer */
export type Volunteer = decodeType<typeof decodeVolunteer>;

/** Decode `SlackUser` from DB schema */
export const decodeVolunteer = record({
  email: field("Slack: E-mail", string),
  slackId: field("Slack: ID", string),
  skillIds: field("Self-reported skills", withDefault(array(string), [])),
  createdAt: field("Datum vzniku", string),
});

//
// API Calls
//

export async function getAllVolunteers(): Promise<Volunteer[]> {
  return await volunteersTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(array(decodeVolunteer));
}
