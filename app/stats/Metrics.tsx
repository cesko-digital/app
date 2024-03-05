import Link from "next/link";

import { type AxisConfig } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";
import clsx from "clsx";

import {
  calculateTrend,
  getTrendDirection,
  getTrendIcon,
  type MetricDefinition,
  type MetricSample,
} from "~/src/data/metrics";
import { Route } from "~/src/routing";
import { unique } from "~/src/utils";

export type Props = {
  metrics: MetricDefinition[];
  samples: MetricSample[];
};

/** How many last samples should we display? */
const historyLength = 10;

export const MetricsTab = ({ metrics, samples }: Props) => {
  const services = unique(metrics.map((m) => m.service));
  const haveSamplesForMetric = (metricSlug: string) =>
    samples.filter((s) => s.metricSlug === metricSlug).length > 0;
  const haveSamplesForService = (service: string) =>
    metrics.filter((m) => m.service === service && haveSamplesForMetric(m.slug))
      .length > 0;
  return (
    <div className="flex flex-col gap-20">
      {services.filter(haveSamplesForService).map((service) => (
        <ServiceSection
          key={service}
          service={service}
          filteredMetrics={metrics.filter((m) => m.service === service)}
          allSamples={samples}
        />
      ))}
    </div>
  );
};

const ServiceSection = ({
  service,
  filteredMetrics: metrics,
  allSamples: samples,
}: {
  service: string;
  filteredMetrics: MetricDefinition[];
  allSamples: MetricSample[];
}) => {
  const compareSamplesByDate = (a: MetricSample, b: MetricSample) =>
    new Date(a.date).getTime() - new Date(b.date).getTime();
  const compareMetricsByName = (a: MetricDefinition, b: MetricDefinition) =>
    a.name.localeCompare(b.name);
  const samplesForMetric = (metric: MetricDefinition) =>
    samples
      .filter((s) => s.metricSlug === metric.slug)
      .sort(compareSamplesByDate);
  return (
    <div>
      <h2 className="typo-title2 mb-4">{service}</h2>
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {metrics.sort(compareMetricsByName).map((metric) => (
          <MetricBox
            key={metric.slug}
            metric={metric}
            filteredSamples={samplesForMetric(metric).slice(-historyLength)}
          />
        ))}
      </div>
    </div>
  );
};

const MetricBox = ({
  metric,
  filteredSamples: samples,
}: {
  metric: MetricDefinition;
  filteredSamples: MetricSample[];
}) => {
  type Axis = Omit<AxisConfig, "id">;
  const dateFormatter = new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "2-digit",
  });
  const numberFormatter = new Intl.NumberFormat("cs-CZ", {
    notation: "compact",
  });
  const formatNumber = (value: number) => numberFormatter.format(value);
  const data = samples.map((s) => s.value);
  const timeAxis: Axis = {
    data: samples.map((s) => new Date(s.date)),
    scaleType: "time",
    valueFormatter: (value) => dateFormatter.format(value as Date),
  };
  const bandAxis: Axis = {
    data: samples.map((s) => s.label),
    scaleType: "band",
  };

  const trend = calculateTrend(data) ?? 0;
  const direction = getTrendDirection(trend, metric.positiveDirection);
  const trendIcon = getTrendIcon(trend);

  return (
    <Link
      key={metric.slug}
      className="flex flex-col overflow-clip rounded-lg border-2 border-gray bg-pebble hover:border-it hover:shadow-lg"
      href={Route.toMetric(metric)}
    >
      <div className="p-4">
        {data.length > 1 && (
          <h4
            className={clsx(
              "typo-caption",
              direction === "better" && "text-green-600",
              direction === "worse" && "text-red-600",
              direction == "unchanged" && "text-zinc-500",
            )}
          >
            {trendIcon} {trend} %
          </h4>
        )}
        <LineChart
          colors={["blue"]}
          height={200}
          series={[
            {
              data,
              valueFormatter: formatNumber,
            },
          ]}
          yAxis={[
            {
              min: 0,
              valueFormatter: formatNumber,
            },
          ]}
          xAxis={[metric.type === "band" ? bandAxis : timeAxis]}
        />
      </div>

      <div className="flex-grow bg-gray p-4">
        <h3>{metric.name}</h3>
        {metric.description && (
          <p className="typo-caption">{metric.description}</p>
        )}
      </div>
    </Link>
  );
};
