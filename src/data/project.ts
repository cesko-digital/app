import {
  decodeJSONString,
  decodeValidItemsFromArray,
  markdown,
  optionalArray,
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

//
// Decoding
//

export type Project = decodeType<typeof decodeProject>;
export const decodeProject = record({
  id: field("ID", string),
  name: string,
  slug: string,
  tagline: string,
  description: markdown,
  coverImageUrl: string,
  logoUrl: withDefault(
    string,
    "https://data.cesko.digital/web/projects/generic-logo.png",
  ),
  highlighted: withDefault(boolean, false),
  state: withDefault(
    union("draft", "running", "finished", "incubating", "internal"),
    "draft",
  ),
  tagIds: field("tags", optionalArray(string)),
  teamEngagementIds: field("team", optionalArray(string)),
  youTubePlaylistId: optional(string),
  links: field(
    "serializedLinks",
    decodeJSONString(
      array(
        record({
          name: string,
          url: string,
          featured: boolean,
        }),
      ),
    ),
  ),
});

//
// API Calls
//

/** Projects table */
export const projectsTable = webBase("Projects");

/** Get all projects */
export async function getAllProjects(): Promise<Project[]> {
  return await projectsTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeProject, "Projects"));
}

/** Get single project by ID */
export async function getProjectById(id: string): Promise<Project | null> {
  return await projectsTable
    .select({ filterByFormula: `{ID} = "${id}"` })
    .all()
    .then(unwrapRecords)
    .then(takeFirst(decodeValidItemsFromArray(decodeProject, "Projects")))
    .catch((_) => null);
}
