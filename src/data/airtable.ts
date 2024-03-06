import Airtable, {
  type FieldSet,
  type Record,
  type RecordData,
  type Records,
  type Table,
} from "airtable";

import { splitToChunks } from "~/src/utils";

/** The Users database contains user profiles and Slack user records */
export const usersBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY ?? "<not set>",
}).base("apppZX1QC3fl1RTBM");

/** The App database contains projects, opportunities and other app-related data */
export const appBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY ?? "<not set>",
}).base("appkn1DkvgVI5jpME");

//
// API Helpers
//

/** Maximum number of records we can change with a single API call */
const maxChangeBatchSize = 10;

/** Create a batch of records */
export async function createBatch<Schema extends FieldSet>(
  table: Table<Schema>,
  items: Partial<Schema>[],
): Promise<Records<Schema>> {
  const results = [];
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
  items: Partial<Schema>[],
): Promise<Records<Schema>> {
  const results = [];
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
  object: Partial<TFields>,
): RecordData<Partial<TFields>> {
  const { id, ...fields } = object;
  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
  return {
    id: id as any,
    fields: fields as any,
  };
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
}

/** Unwrap the raw fields object from an Airtable `Record` type */
export const unwrapRecord = <Schema extends FieldSet>(record: Record<Schema>) =>
  record.fields as unknown;

/** Unwrap the raw fields objects from an Airtable `Records` type */
export const unwrapRecords = <Schema extends FieldSet>(
  records: Records<Schema>,
) => records.map(unwrapRecord);
