import { FieldSet } from "airtable";
import { decodeValidItemsFromArray, markdown, withDefault } from "lib/decoding";
import { unwrapRecords, webBase } from "./request";
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

/** The Airtable schema of the Projects table */
export interface Schema extends FieldSet {
  ID: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  url: string;
  coverImageUrl: string;
  logoUrl: string;
  highlighted: boolean;
  state: string;
  tagIds: ReadonlyArray<string>;
  coordinatorIds: ReadonlyArray<string>;
  trelloUrl: string;
  jiraUrl: string;
  githubUrl: string;
  slackChannelUrl: string;
}

export type PortalProject = decodeType<typeof decodeProject>;
export const decodeProject = record({
  id: field("ID", string),
  name: string,
  slug: string,
  tagline: string,
  description: markdown,
  url: string,
  coverImageUrl: string,
  logoUrl: withDefault(
    string,
    "https://data.cesko.digital/web/projects/generic-logo.png"
  ),
  highlighted: withDefault(boolean, false),
  state: withDefault(
    union("draft", "running", "finished", "incubating", "internal"),
    "draft"
  ),
  tagIds: field("tags", withDefault(array(string), [])),
  coordinatorIds: field("coordinators", array(string)),
  trelloUrl: optional(string),
  jiraUrl: optional(string),
  githubUrl: optional(string),
  slackChannelUrl: optional(string),
});

//
// API Calls
//

/** Projects table */
export const projectsTable = webBase<Schema>("Projects");

/** Get all projects */
export async function getAllProjects(): Promise<PortalProject[]> {
  return await projectsTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeProject, "Projects"));
}
