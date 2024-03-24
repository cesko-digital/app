import { type Block, type KnownBlock } from "@slack/types";

import {
  getAllMetricDefinitions,
  getAllMetricSamples,
  type MetricDefinition,
  type MetricSample,
} from "~/src/data/metrics";

type Metric = {
  definition: MetricDefinition;
  currentSample: MetricSample;
  // If there is a new metric, it won't have a previous sample.
  previousSample?: MetricSample;
};

/**
 * Get all *featured* metrics for the previous month (possibly with
 * values from the month before, so we are able to get the trend).
 */
async function getMetricsForPreviousMonth(): Promise<Metric[]> {
  const metrics = await getAllMetricDefinitions();
  const featuredMetricSlugs = metrics
    .filter((metric) => metric.featured)
    .map((metric) => metric.slug);

  // TODO: Return only metrics for previous month.
  const samples = await getAllMetricSamples();

  return [];
}

/**
 * Return the newsletter containing all relevant metrics from the previous month,
 * formatted via Slack's building blocks.
 *
 * For more info about building blocks, see: https://api.slack.com/block-kit/building
 */
export async function getMetricsNewsletter(): Promise<(KnownBlock | Block)[]> {
  const metrics = await getMetricsForPreviousMonth();

  // TODO: Replace with real template with metrics injected.
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "This is sample text for the metrics newsletter.",
      },
    },
  ];

  return blocks;
}
