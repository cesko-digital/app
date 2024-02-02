"use client";

import { type AxisConfig } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";

import { type MetricDefinition, type MetricSample } from "~/src/data/metrics";

const dateFormatter = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "long",
});

const numberFormatter = new Intl.NumberFormat("cs-CZ", {
  notation: "compact",
});

const formatNumber = (value: number) => numberFormatter.format(value);

export const MetricBox = ({
  metric,
  filteredSamples: samples,
}: {
  metric: MetricDefinition;
  filteredSamples: MetricSample[];
}) => {
  type Axis = Omit<AxisConfig, "id">;
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
    <div key={metric.slug} className="rounded-lg bg-pebble p-4">
      <h3 className="typo-subtitle">{metric.name}</h3>
      {metric.description && (
        <p className="typo-caption">{metric.description}</p>
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
  );
};
