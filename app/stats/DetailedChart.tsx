"use client";

import {
  type AxisConfig,
  type ChartsXAxisProps,
  type ScaleName,
} from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";

import { type MetricDefinition, type MetricSample } from "~/src/data/metrics";

export const DetailedChart = ({
  metric,
  filteredSamples: samples,
}: {
  metric: MetricDefinition;
  filteredSamples: MetricSample[];
}) => {
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

  return (
    <div>
      <div className="mb-6 bg-pebble p-4">
        <LineChart
          colors={["blue"]}
          height={300}
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
    </div>
  );
};
