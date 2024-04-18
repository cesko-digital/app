import { type Block, type KnownBlock } from "@slack/types";

import {
  calculateTrend,
  getAllMetricDefinitions,
  getAllMetricSamples,
  getTrendDirection,
  getTrendIcon,
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

type SlackBuildingBlock = KnownBlock | Block;

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
export async function getMetricsNewsletter(): Promise<SlackBuildingBlock[]> {
  const metrics = await getMetricsForPreviousMonth();

  function prepareMetricBlock(metric: Metric): SlackBuildingBlock {
    const trend = metric.previousSample
      ? calculateTrend([
          metric.previousSample.value,
          metric.currentSample.value,
        ])
      : 0;
    const trendDirection = getTrendDirection(
      trend,
      metric.definition.positiveDirection,
    );

    const metricBlock = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "text",
              text: `${metric.definition.qualifiedName}`,
              style: {
                bold: true,
              },
            },
            {
              type: "text",
              text: "\n",
            },
          ],
        },
        {
          type: "rich_text_list",
          style: "bullet",
          indent: 0,
          border: 0,
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: `Poslední měření ${metric.definition.type === "band" ? metric.currentSample.label : metric.currentSample.date}:`,
                },
              ],
            },
          ],
        },
        {
          type: "rich_text_list",
          style: "bullet",
          indent: 1,
          border: 0,
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: `${metric.currentSample.value}`,
                  style: {
                    bold: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    if (metric.previousSample) {
      metricBlock.elements.push(
        {
          type: "rich_text_list",
          style: "bullet",
          indent: 0,
          border: 0,
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: `Předposlední měření ${metric.definition.type === "band" ? metric.previousSample.label : metric.previousSample.date}: `,
                },
              ],
            },
          ],
        },
        {
          type: "rich_text_list",
          style: "bullet",
          indent: 1,
          border: 0,
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: `${metric.previousSample.value}`,
                  style: {
                    bold: true,
                  },
                },
              ],
            },
          ],
        },
        {
          type: "rich_text_list",
          style: "bullet",
          indent: 0,
          border: 0,
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: `${getTrendIcon(trend)} ${trend} % `,
                },
                {
                  type: "emoji",
                  name: `${trendDirection === "better" || trendDirection === "unchanged" ? "cat" : "crying_cat_face"}`,
                  unicode: `${trendDirection === "better" || trendDirection === "unchanged" ? "1f431" : "1f63f"}`,
                },
              ],
            },
          ],
        },
      );
    }

    return metricBlock;
  }

  const blocks: SlackBuildingBlock[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Přehled metrik za poslední období :chart_with_upwards_trend:",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Ahojte 👋 Posílám přehled nejdůležitějších metrik za poslední období:",
      },
    },
  ];

  metrics.forEach((m) => {
    if (m.previousSample) {
      blocks.push(prepareMetricBlock(m));
    }
  });

  const payload = { blocks: blocks };

  return payload;
}
