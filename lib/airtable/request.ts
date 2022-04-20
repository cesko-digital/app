import Airtable, {
  FieldSet,
  Record,
  RecordData,
  Records,
  Table,
} from "airtable";
import { QueryParams } from "airtable/lib/query_params";
import { Pojo } from "typescript-json-decoder";
import { splitToChunks } from "../utils";

const maxChangeBatchSize = 10;

export type SimpleRecord<TFields extends FieldSet> = Pick<
  Record<Partial<TFields>>,
  "id" | "fields"
>;

export type SimpleRecords<TFields extends FieldSet> = ReadonlyArray<
  SimpleRecord<TFields>
>;

export interface BaseRequest<Result> {
  method: string;
  decodeResponse: (args: any) => Result;
}

export interface FindRequest<Result, TFields extends FieldSet>
  extends BaseRequest<Result> {
  method: "FIND";
  recordId: string;
  decodeResponse: (record: SimpleRecord<TFields>) => Result;
}

export interface SelectRequest<Result, TFields extends FieldSet>
  extends BaseRequest<Result> {
  method: "SELECT";
  params: QueryParams<TFields>;
  decodeResponse: (records: SimpleRecords<TFields>) => Result;
}

export interface UpdateRequest<Result, TFields extends FieldSet>
  extends BaseRequest<Result> {
  method: "UPDATE";
  recordId: string;
  recordFields: Partial<TFields>;
  decodeResponse: (record: SimpleRecord<TFields>) => Result;
}

export interface BatchUpdateRequest<Result, TFields extends FieldSet>
  extends BaseRequest<Result> {
  method: "BATCH_UPDATE";
  recordsData: RecordData<Partial<TFields>>[];
  decodeResponse: (records: SimpleRecords<TFields>) => Result;
}

export interface CreateRequest<Result, TFields extends FieldSet>
  extends BaseRequest<Result> {
  method: "CREATE";
  recordsData: Partial<TFields>[];
  decodeResponse: (records: SimpleRecords<TFields>) => Result;
}

export type Request<Result, TFields extends FieldSet = {}> =
  | FindRequest<Result, TFields>
  | SelectRequest<Result, TFields>
  | UpdateRequest<Result, TFields>
  | BatchUpdateRequest<Result, TFields>
  | CreateRequest<Result, TFields>;

export async function send<Result, TFields extends FieldSet>(
  table: Table<TFields>,
  request: Request<Result, TFields>
): Promise<Result> {
  switch (request.method) {
    case "FIND":
      const foundRecord = await table.find(request.recordId);
      return request.decodeResponse(foundRecord);
    case "SELECT":
      const matchingRecords = await table.select(request.params).all();
      return request.decodeResponse(matchingRecords);
    case "UPDATE":
      const updatedRecord = await table.update(
        request.recordId,
        request.recordFields
      );
      return request.decodeResponse(updatedRecord);
    case "BATCH_UPDATE":
      let updateResults = [];
      const updateBatches = splitToChunks(
        request.recordsData,
        maxChangeBatchSize
      );
      for (const chunk of updateBatches) {
        const updatedRecords = await table.update(chunk);
        updateResults.push(...updatedRecords);
      }
      return request.decodeResponse(updateResults);
    case "CREATE":
      let results = [];
      const batches = splitToChunks(request.recordsData, maxChangeBatchSize);
      for (const chunk of batches) {
        const createdRecords = await table.create(
          chunk.map((item) => ({ fields: item }))
        );
        results.push(...createdRecords);
      }
      return request.decodeResponse(results);
  }
}

//
// Databases
//

export const volunteerManagementBase = (apiKey: string) =>
  new Airtable({ apiKey }).base("apppZX1QC3fl1RTBM");

//
// Helpers
//

/** This is a simple hack that makes the database ID available in record fields */
export function mergeFields<TFields extends FieldSet>(
  record: SimpleRecord<TFields>
) {
  return {
    id: record.id,
    ...record.fields,
  };
}

/** The opposite of `mergeFields`, splits database ID to a separate property */
export function splitFields<TFields extends FieldSet>(
  object: Partial<TFields> & { id: string }
): RecordData<Partial<TFields>> {
  const { id, ...fields } = object;
  return {
    id,
    fields: fields as any,
  };
}

/** A helper to make it obvious the request returns no parsed response */
export const noResponse = () => {};

/** Unwrap the raw fields object from an Airtable `Record` type */
export const unwrapRecord = <Schema extends FieldSet>(record: Record<Schema>) =>
  record.fields as Pojo;

/** Unwrap the raw fields objects from an Airtable `Records` type */
export const unwrapRecords = <Schema extends FieldSet>(
  records: Records<Schema>
) => records.map(unwrapRecord);
