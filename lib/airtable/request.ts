import { Pojo } from "typescript-json-decoder";
import { splitToChunks } from "../utils";
import Airtable, {
  FieldSet,
  Record,
  RecordData,
  Records,
  Table,
} from "airtable";

/** The Volunteer Management database */
export const volunteerManagementBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY || "<not set>",
}).base("apppZX1QC3fl1RTBM");

/** The Web database */
export const webBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY || "<not set>",
}).base("appkn1DkvgVI5jpME");

//
// API Helpers
//

/** Maximum number of records we can change with a single API call */
const maxChangeBatchSize = 10;

/** Create a batch of records */
export async function createBatch<Schema extends FieldSet>(
  table: Table<Schema>,
  items: Partial<Schema>[]
): Promise<Records<Schema>> {
  let results = [];
  const batches = splitToChunks(items, maxChangeBatchSize);
  for (const chunk of batches) {
    const fields = chunk.map((item) => ({ fields: item }));
    const records = await table.create(fields);
    results.push(...records);
  }
  return results;
}

/** Update a batch of records */
export async function updateBatch<Schema extends FieldSet>(
  table: Table<Schema>,
  items: Partial<Schema>[]
): Promise<Records<Schema>> {
  let results = [];
  const batches = splitToChunks(items, maxChangeBatchSize);
  for (const chunk of batches) {
    const fields = chunk.map(splitFields);
    const records = await table.update(fields);
    results.push(...records);
  }
  return results;
}

//
// Helpers
//

/** Split record into an ID/fields pair */
function splitFields<TFields extends FieldSet>(
  object: Partial<TFields>
): RecordData<Partial<TFields>> {
  const { id, ...fields } = object;
  return {
    id: id as any,
    fields: fields as any,
  };
}

/** Unwrap the raw fields object from an Airtable `Record` type */
export const unwrapRecord = <Schema extends FieldSet>(record: Record<Schema>) =>
  record.fields as Pojo;

/** Unwrap the raw fields objects from an Airtable `Records` type */
export const unwrapRecords = <Schema extends FieldSet>(
  records: Records<Schema>
) => records.map(unwrapRecord);
