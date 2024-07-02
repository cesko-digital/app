"use client";

import Link from "next/link";

import {
  LineChart,
  type AxisConfig,
  type ChartsXAxisProps,
  type ScaleName,
} from "@mui/x-charts";
import clsx from "clsx";

import {
  calculateTrend,
  getTrendDirection,
  getTrendIcon,
  type MetricDefinition,
  type MetricSample,
} from "~/src/data/metrics";
import { Route } from "~/src/routing";

type Props = {
  metric: MetricDefinition;
  filteredSamples: MetricSample[];
  showServiceName?: boolean;
};

export const OverviewChart = ({
  metric,
  filteredSamples: samples,
  showServiceName = false,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Axis = Omit<AxisConfig<ScaleName, any, ChartsXAxisProps>, "id">;
  const dateFormatter = new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "2-digit",
  });
  const numberFormatter = new Intl.NumberFormat("cs-CZ", {
    notation: "compact",
  });
  const formatNumber = (value: number | null) =>
    numberFormatter.format(value ?? 0);
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

  const trend = calculateTrend(data);
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
        {!showServiceName && <h3>{metric.name}</h3>}
        {showServiceName && (
          <h3>
            <b className="font-semibold">{metric.service}</b>: {metric.name}
          </h3>
        )}
        {metric.description && (
          <p className="typo-caption">{metric.description}</p>
        )}
      </div>
    </Link>
  );
};
