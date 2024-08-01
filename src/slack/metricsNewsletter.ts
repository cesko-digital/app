import { type Block, type KnownBlock } from "@slack/types";

import {
  calculateTrend,
  getTrendDirection,
  getTrendIcon,
  type Metric,
} from "~/src/data/metrics";
import { bullet, divider, section, type TextElement } from "~/src/slack/blocks";

type SlackBuildingBlock = KnownBlock | Block;

function countMetricsByTrend(metrics: Metric[]): {
  better: number;
  worseOrSame: number;
} {
  return metrics.reduce(
    (acc, metric) => {
      if (!metric.previousSample) {
        return { ...acc, worseOrSame: acc.worseOrSame + 1 };
      }

      const trend = calculateTrend([
        metric.previousSample.value,
        metric.currentSample.value,
      ]);
      const isBetter =
        getTrendDirection(trend, metric.definition.positiveDirection) ===
        "better";
      return {
        better: acc.better + Number(isBetter),
        worseOrSame: acc.worseOrSame + Number(!isBetter),
      };
    },
    { better: 0, worseOrSame: 0 },
  );
}

function formatDate(
  metric: Metric,
  sample: "currentSample" | "previousSample",
): string {
  const date =
    metric.definition.type === "band"
      ? // `label` is in arbitrary format, so we can't really parse it and format it.
        (metric[sample]!.label ?? "Chybějící datum")
      : Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "long" }).format(
          new Date(metric[sample]!.date),
        );
  return date.replace(/ /g, "\u00A0");
}

/**
 * Convert a metric sample to a list of `TextElement` objects.
 * Used in Slack Building Blocks.
 */
function sampleAsElements(
  metric: Metric,
  sample: "currentSample" | "previousSample",
): TextElement[] {
  return [
    { text: `${metric[sample]!.value}`, style: { italic: true } },
    { text: `\u00A0(${formatDate(metric, sample)})` },
  ];
}

function prepareMetricBlock(metric: Metric): SlackBuildingBlock {
  const sectionElements: TextElement[] = [
    { text: metric.definition.qualifiedName, style: { bold: true } },
  ];
  const bulletElements: TextElement[] = [];

  if (metric.previousSample) {
    const trend = calculateTrend([
      metric.previousSample.value,
      metric.currentSample.value,
    ]);
    const isTrendBetter =
      getTrendDirection(trend, metric.definition.positiveDirection) ===
      "better";
    const emoji = isTrendBetter ? "🟢" : "🔴";
    // Section text if there is a previous sample
    sectionElements.push({
      text: ` ${getTrendIcon(trend)}\u00A0${trend}\u00A0%\u00A0${emoji}`,
    });

    // Bullet text if there is a previous sample
    bulletElements.push(...sampleAsElements(metric, "previousSample"), {
      text: " → ",
    });
  }

  bulletElements.push(...sampleAsElements(metric, "currentSample"));
  return {
    type: "rich_text",
    elements: [section(sectionElements), bullet(bulletElements)],
  };
}

/**
 * Return the metrics newsletter header, formatted via Slack's building blocks.
 *
 * For more info about building blocks, see: https://api.slack.com/block-kit/building
 */
export function getMetricsNewsletterHeader(
  metrics: Metric[],
): SlackBuildingBlock[] {
  const { better, worseOrSame } = countMetricsByTrend(metrics);

  const metricsCount =
    metrics.length === 1
      ? "1 metrika"
      : metrics.length <= 4
        ? `${metrics.length} metriky`
        : `${metrics.length} metrik`;
  const gotBetter = better <= 4 ? "zlepšily" : "zlepšilo";
  const notGotBetter =
    worseOrSame <= 4 ? "zhoršily/zůstaly stejné" : "zhoršilo/zůstalo stejných";

  return [
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
        text:
          `Ahojte 👋 Ve vláknu posílám přehled metrik za poslední období. Celkem se tam nachází ${metricsCount}, z ` +
          `toho ${better} se ${gotBetter} a ${worseOrSame} se ${notGotBetter}. Podrobnosti najdete ve vláknu a v ` +
          `<https://app.cesko.digital/stats|datovém dashboardu>.`,
      },
    },
  ];
}

/**
 * Return the metrics newsletter detail, containing all relevant metrics from the previous month,
 * formatted via Slack's building blocks.
 */
export function getMetricsNewsletterDetail(
  metrics: Metric[],
): SlackBuildingBlock[] {
  const blocks: SlackBuildingBlock[] = [];
  const sortedMetrics = metrics.sort((a, b) =>
    a.definition.qualifiedName.localeCompare(b.definition.qualifiedName),
  );
  for (const metric of sortedMetrics) {
    blocks.push(prepareMetricBlock(metric));
    blocks.push(divider);
  }
  blocks.pop(); // remove last divider
  return blocks;
}
