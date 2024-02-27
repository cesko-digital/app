import {
  number,
  optional,
  record,
  string,
  union,
  type decodeType,
} from "typescript-json-decoder";

import { unwrapRecords, webBase } from "~/src/data/airtable";
import {
  decodeValidItemsFromArray,
  relationToZeroOrOne,
  withDefault,
} from "~/src/decoding";

//
// Decoding
//

export type MetricDefinition = decodeType<typeof decodeMetricDefinition>;
export const decodeMetricDefinition = record({
  qualifiedName: string,
  service: string,
  name: string,
  type: withDefault(union("time", "band"), "time"),
  slug: string,
  datawrapperChartId: optional(string),
  description: optional(string),
  ownerName: relationToZeroOrOne,
  ownerMail: relationToZeroOrOne,
  ownerAvatarUrl: relationToZeroOrOne,
});

export type MetricSample = decodeType<typeof decodeMetricSample>;
export const decodeMetricSample = record({
  date: string,
  metricSlug: relationToZeroOrOne,
  value: number,
  label: optional(string),
});

//
// API Calls
//

const definitionsTable = webBase("Metrics: Definitions");
const samplesTable = webBase("Metrics: Samples");

export const getAllMetricDefinitions = async () =>
  definitionsTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeMetricDefinition));

export const getAllMetricSamples = async () =>
  samplesTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeMetricSample));
