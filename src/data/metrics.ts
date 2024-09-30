import {
  boolean,
  number,
  optional,
  record,
  string,
  union,
  type decodeType,
} from "typescript-json-decoder";

import { appBase, unwrapRecords } from "~/src/data/airtable";
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
  featured: withDefault(boolean, false),
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

const definitionsTable = appBase("Metrics: Definitions");
const samplesTable = appBase("Metrics: Samples");

export const getAllMetricDefinitions = async () =>
  definitionsTable
    .select({ view: "Public Metrics" })
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

export function calculateTrend(data: number[]): number {
  if (data.length < 2) {
    return 0;
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

type MetricWithSamples = MetricDefinition & {
  samples: MetricSample[];
};

export type Metric = {
  definition: MetricDefinition;
  currentSample: MetricSample;
  // If there is a new metric, it won't have a previous sample.
  previousSample?: MetricSample;
};

function sortByDateDescending(a: MetricSample, b: MetricSample): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function groupSamplesByMetric(
  metrics: MetricDefinition[],
  samples: MetricSample[],
): MetricWithSamples[] {
  const groupedSamples: Record<string, MetricSample[]> = {};
  samples.forEach((sample) => {
    const slug = sample.metricSlug;
    if (!slug) {
      return;
    }
    if (!groupedSamples[slug]) {
      groupedSamples[slug] = [];
    }
    groupedSamples[slug].push(sample);
  });
  return metrics.map((metric) => ({
    ...metric,
    samples: groupedSamples[metric.slug],
  }));
}

function isRecent(metric: MetricWithSamples): boolean {
  if (metric.samples.length === 0) {
    return false;
  }
  // We consider a metric recent if it has a sample from the last 28 days.
  const oneMonthAgo = new Date().getTime() - 28 * 24 * 60 * 60 * 1000;
  return new Date(metric.samples[0].date).getTime() >= oneMonthAgo;
}

/**
 * Get all *featured* metrics for the previous month (possibly with
 * values from the month before, so we are able to get the trend).
 */
export async function getMetricsForPreviousMonth(): Promise<Metric[]> {
  const metrics = (await getAllMetricDefinitions()).filter(
    (metric) => metric.featured,
  );
  const samples = (await getAllMetricSamples()).sort(sortByDateDescending);
  return groupSamplesByMetric(metrics, samples)
    .filter(isRecent)
    .map((metric) => {
      const [currentSample, previousSample] = metric.samples;
      return {
        definition: metric,
        currentSample,
        previousSample,
      };
    });
}
