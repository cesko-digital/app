import { type Block, type KnownBlock } from "@slack/types";

import {
  calculateTrend,
  getAllMetricDefinitions,
  getAllMetricSamples,
  type MetricDefinition,
  type MetricSample,
} from "~/src/data/metrics";

type MetricWithSamples = MetricDefinition & {
  samples: MetricSample[];
};

type Metric = {
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
async function getMetricsForPreviousMonth(): Promise<Metric[]> {
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

/**
 * Return the newsletter containing all relevant metrics from the previous month,
 * formatted via Slack's building blocks.
 *
 * For more info about building blocks, see: https://api.slack.com/block-kit/building
 */
export async function getMetricsNewsletter(): Promise<(KnownBlock | Block)[]> {
  const metrics = await getMetricsForPreviousMonth();
  const metricsWithTrend = metrics.map((metric) => ({
    ...metric,
    trend: metric.previousSample
      ? calculateTrend([
          metric.previousSample.value,
          metric.currentSample.value,
        ])
      : 0,
  }));

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
