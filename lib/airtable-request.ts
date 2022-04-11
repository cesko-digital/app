import { FieldSet, Record, Table } from "airtable";
import { QueryParams } from "airtable/lib/query_params";

export type SimpleRecord<TFields extends FieldSet> = Pick<
  Record<TFields>,
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
    case "CREATE":
      const createdRecords = await table.create(
        request.recordsData.map((item) => ({ fields: item }))
      );
      return request.decodeResponse(createdRecords);
  }
}

/** This is a simple hack that makes the database ID available in record fields */
export const mergeFields = <TFields extends FieldSet>(
  record: SimpleRecord<TFields>
) => ({
  id: record.id,
  ...record.fields,
});
