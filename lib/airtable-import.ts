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

/**
 * Airtable API key read from the `AIRTABLE_API_KEY` env variable
 *
 * It’s not the best idea to read from env here, it would be better
 * for callers to supply the key from wherever they want. But let’s
 * start with this and change it later if we run into problems.
 */
const apiKey = process.env.AIRTABLE_API_KEY;

/** ID of the Airtable database to read data from */
const airtableBaseId = "appkn1DkvgVI5jpME";

/** Is the Airtable data source available? */
export const isAvailable = apiKey != null;

async function getAllRecords<T>(args: {
  baseId: string;
  tableName: string;
  viewName: string;
  decoder: (data: AirtableRecord) => T;
}): Promise<T[]> {
  const cacheKey = [apiKey, args.baseId, args.tableName, args.viewName].join(
    ":"
  );

  if (cacheKey in cache) {
    return cache[cacheKey];
  }

  // Merge the Airtable record ID with other fields so they can all be parsed together
  const mergeAirtableRecord = (data: AirtableRecord) => ({
    id: data.id,
    ...data.fields,
  });

  if (!apiKey) {
    console.warn(
      "Airtable API key not found in env, things will probably break."
    );
  }

  const base = new Airtable({ apiKey }).base(args.baseId);
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

export const getAllProjects = async () =>
  await getAllRecords({
    baseId: airtableBaseId,
    tableName: "Projects",
    viewName: "Grid view",
    decoder: decodeProject,
  });

export const getAllUsers = async () =>
  await getAllRecords({
    baseId: airtableBaseId,
    tableName: "Volunteers",
    viewName: "Grid view",
    decoder: decodeUser,
  });

export const getAllEvents = async () =>
  await getAllRecords({
    baseId: airtableBaseId,
    tableName: "Events",
    viewName: "All Events",
    decoder: decodeEvent,
  });

export const getAllOpportunities = async () =>
  await getAllRecords({
    baseId: airtableBaseId,
    tableName: "Opportunities",
    viewName: "Grid view",
    decoder: decodeOpportunity,
  });

export const getAllPartners = async () =>
  await getAllRecords({
    baseId: airtableBaseId,
    tableName: "Partners",
    viewName: "Grid view",
    decoder: decodePartner,
  });
