"use client";

import { type AxisConfig } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";

import { type MetricDefinition, type MetricSample } from "~/src/data/metrics";

export const DetailedChart = ({
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
  });
  const numberFormatter = new Intl.NumberFormat("cs-CZ", {
    notation: "compact",
  });
  const formatNumber = (value: number) => numberFormatter.format(value);
  console.log("samples", samples);
  const data = samples.map((s) => s.value);
  console.log("data", data);
  const timeAxis: Axis = {
    data: samples.map((s) => new Date(s.date)),
    scaleType: "time",
    valueFormatter: (value) => dateFormatter.format(value as Date),
  };
  const bandAxis: Axis = {
    data: samples.map((s) => s.label),
    scaleType: "band",
  };
  console.log("taxis", timeAxis);

  const createObject = (item: MetricSample) => {
    return { date: item.label ?? item.date, value: item.value };
  };

  const apiData = samples.map(createObject);

  console.log("api", apiData);

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
      <a className="btn-primary text-center" href={`${metric.slug}/csv`}>
        Stáhnout data ve formátu CSV
      </a>
    </div>
  );
};
