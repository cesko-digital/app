import Airtable from "airtable";
import {
  decodeEvent,
  decodeOpportunity,
  decodePartner,
  decodeProject,
  decodeUser,
} from "./portal-types";

type AirtableRecord = Record<string, any>;

const cache: Record<string, any> = {};

async function getAllRecords<T>(args: {
  apiKey: string;
  baseId: string;
  tableName: string;
  viewName: string;
  decoder: (data: AirtableRecord) => T;
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

  // Merge the Airtable record ID with other fields so they can all be parsed together
  const mergeAirtableRecord = (data: AirtableRecord) => ({
    id: data.id,
    ...data.fields,
  });

  const base = new Airtable({ apiKey: args.apiKey }).base(args.baseId);
  const verbose = process.env.VERBOSE_LOG;
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
      parsedRecords.push(args.decoder(mergeAirtableRecord(record)));
    } catch (e) {
      console.warn(
        verbose
          ? `Parse error for record #${index} in table ${args.tableName}: ${e}`
          : `Parse error for record #${index} in table ${args.tableName}, skipping (set VERBOSE_LOG to see more).`
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
    decoder: decodeProject,
  });

export const getAllUsers = async (key: string) =>
  await getAllRecords({
    apiKey: key,
    baseId: "appkn1DkvgVI5jpME",
    tableName: "Volunteers",
    viewName: "Grid view",
    decoder: decodeUser,
  });

export const getAllEvents = async (key: string) =>
  await getAllRecords({
    apiKey: key,
    baseId: "appkn1DkvgVI5jpME",
    tableName: "Events",
    viewName: "All Events",
    decoder: decodeEvent,
  });

export const getAllOpportunities = async (key: string) =>
  await getAllRecords({
    apiKey: key,
    baseId: "appkn1DkvgVI5jpME",
    tableName: "Opportunities",
    viewName: "Grid view",
    decoder: decodeOpportunity,
  });

export const getAllPartners = async (key: string) =>
  await getAllRecords({
    apiKey: key,
    baseId: "appkn1DkvgVI5jpME",
    tableName: "Partners",
    viewName: "Grid view",
    decoder: decodePartner,
  });
