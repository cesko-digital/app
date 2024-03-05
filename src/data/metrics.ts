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
  positiveDirection: withDefault(
    union("moreIsBetter", "lessIsBetter"),
    "moreIsBetter",
  ),
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

//
// Helpers
//

export function calculateTrend(data: number[]): number | undefined {
  if (data.length < 2) {
    return undefined;
  }
  const lastValue: number = data[data.length - 1];
  const penultimateValue: number = data[data.length - 2];
  const trend = ((lastValue - penultimateValue) / penultimateValue) * 100;
  return Math.round(trend);
}

export function getTrendDirection(
  trend: number,
  positiveDirection: "moreIsBetter" | "lessIsBetter",
): "better" | "worse" | "unchanged" {
  const directionSign = positiveDirection === "moreIsBetter" ? +1 : -1;
  if (trend !== 0) {
    if (directionSign * trend > 0) {
      return "better";
    } else {
      return "worse";
    }
  } else {
    return "unchanged";
  }
}

export function getTrendIcon(trend: number) {
  if (trend < 0) {
    return "↓";
  } else if (trend > 0) {
    return "↑";
  }
  return "~";
}
