import Airtable from "airtable";
import { buildEnv } from "./build-env";
import {
  decodeEvent,
  decodeOpportunity,
  decodePartner,
  decodeProject,
  decodeUser,
} from "./portal-types";

type AirtableRecord = Record<string, any>;

/** ID of the Airtable database to read data from */
const airtableBaseId = "appkn1DkvgVI5jpME";

async function getAllRecords<T>(args: {
  baseId: string;
  tableName: string;
  viewName: string;
  decoder: (data: AirtableRecord) => T;
}): Promise<T[]> {
  // Merge the Airtable record ID with other fields so they can all be parsed together
  const mergeAirtableRecord = (data: AirtableRecord) => ({
    id: data.id,
    ...data.fields,
  });

  const apiKey = buildEnv.airtableApiKey;
  if (!apiKey) {
    console.warn(
      "Airtable API key not found in env, things will probably break."
    );
  }

  const base = new Airtable({ apiKey }).base(args.baseId);
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
        buildEnv.verboseLog
          ? `Parse error for record #${index} in table ${args.tableName}: ${e}`
          : `Parse error for record #${index} in table ${args.tableName}, skipping (set VERBOSE_LOG to see more).`
      );
    }
  });

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
