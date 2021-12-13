import {
  PortalEvent,
  PortalOpportunity,
  PortalPartner,
  PortalProject,
  PortalUser,
} from "./portal-types";
import Airtable from "airtable";

// TODO: All the parsing here is VERY simplistic. We should do null checks
// at the very least, but type assertions would be even nicer to make sure
// the type signatures hold.

export type AirtableRecord = Record<string, any>;

export function parsePortalUser(data: AirtableRecord): PortalUser {
  const f = data.fields;
  return {
    id: data.id,
    name: f.name,
    profilePictureUrl: f.profilePictureUrl,
  };
}

export function parsePortalProject(data: AirtableRecord): PortalProject {
  const f = data.fields;
  return {
    id: data.id,
    name: f.csName,
    slug: f.csSlug,
    tagline: f.csTagline || null,
    description: f.csDescription || null,
    url: f.url,
    contributeText: f.csContributeText || null,
    coverImageUrl: f.coverUrl,
    logoUrl: f.logoUrl,
    highlighted: f.highlighted || false,
    finished: f.finished || false,
    draft: f.draft || false,
    silent: f.silent || false,
    tagIds: f.tags || [],
    coordinatorIds: f.coordinators || [],
    slackChannelUrl: f.slackChannelUrl || null,
    slackChannelName: f.slackChannelName || null,
  };
}

export function parsePortalEvent(data: AirtableRecord): PortalEvent {
  const f = data.fields;
  return {
    id: data.id,
    name: f.Name,
    summary: f.Summary,
    description: { source: f.Description },
    startTime: new Date(f["Start Time"]),
    ownerId: f.Owner[0],
    projectId: f.Project[0],
    status: f.Status,
    registrationUrl: f["RSVP URL"],
    registrationTitle: f["RSVP Title"],
    slug: f.Slug || data.id,
    endTime: new Date(f["End Time"]),
    tagIds: f.Tags,
    coverImageUrl: f["Cover URL"],
    locationTitle: f["Location Title"],
    locationUrl: f["Location URL"],
  };
}

export function parsePortalOpportunity(
  data: AirtableRecord
): PortalOpportunity {
  const f = data.fields;
  return {
    id: data.id,
    name: f.Name,
    slug: data.id,
    projectId: f.Project[0],
    summary: { source: f.Summary },
    timeRequirements: f["Time Requirements"],
    ownerId: f.Owner[0],
    contactUrl: f["RSVP URL"],
    coverImageUrl: f["Cover URL"],
    skills: f.Skills,
    juniorFriendly: f["Junior Friendly"] || false,
    status: f.Status,
  };
}

export function parsePortalPartner(data: AirtableRecord): PortalPartner {
  const f = data.fields;
  return {
    id: data.id,
    name: f.name,
    logoUrl: f.logoUrl,
    linkUrl: f.url || null,
    categories: f.category || [],
  };
}

const cache: Record<string, any> = {};

async function getAllRecords<T>(args: {
  apiKey: string;
  baseId: string;
  tableName: string;
  viewName: string;
  parser: (data: AirtableRecord) => T;
}): Promise<T[]> {
  const cacheKey = [
    args.apiKey,
    args.baseId,
    args.tableName,
    args.viewName,
  ].join(":");

  if (cacheKey in cache) {
    return cache[cacheKey];
  }

  const base = new Airtable({ apiKey: args.apiKey }).base(args.baseId);
  const table = base(args.tableName);
  const response = await table
    .select({ view: args.viewName, maxRecords: 100 /* TBD */ })
    .all();
  var parsedRecords: T[] = [];
  console.debug(
    `Successfully loaded ${response.length} rows from table ${args.tableName}.`
  );
  response.forEach((record, index) => {
    try {
      parsedRecords.push(args.parser(record));
    } catch (e) {
      console.error(
        `Parse error for record #${index} in table ${args.tableName}: ${e}`
      );
    }
  });

  cache[cacheKey] = parsedRecords;
  return parsedRecords;
}

export const getAllProjects = async (key: string) =>
  await getAllRecords({
    apiKey: key,
    baseId: "appkn1DkvgVI5jpME",
    tableName: "Projects",
    viewName: "Grid view",
    parser: parsePortalProject,
  });

export const getAllUsers = async (key: string) =>
  await getAllRecords({
    apiKey: key,
    baseId: "appkn1DkvgVI5jpME",
    tableName: "Volunteers",
    viewName: "Grid view",
    parser: parsePortalUser,
  });

export const getAllEvents = async (key: string) =>
  await getAllRecords({
    apiKey: key,
    baseId: "appkn1DkvgVI5jpME",
    tableName: "Events",
    viewName: "All Events",
    parser: parsePortalEvent,
  });

export const getAllOpportunities = async (key: string) =>
  await getAllRecords({
    apiKey: key,
    baseId: "appkn1DkvgVI5jpME",
    tableName: "Opportunities",
    viewName: "Grid view",
    parser: parsePortalOpportunity,
  });

export const getAllPartners = async (key: string) =>
  await getAllRecords({
    apiKey: key,
    baseId: "appkn1DkvgVI5jpME",
    tableName: "Partners",
    viewName: "Grid view",
    parser: parsePortalPartner,
  });
