import { LineChart } from "@mui/x-charts/LineChart";

import { type MetricDefinition, type MetricSample } from "~/src/data/metrics";
import { unique } from "~/src/utils";

export type Props = {
  metrics: MetricDefinition[];
  samples: MetricSample[];
};

export const MetricsTab = ({ metrics, samples }: Props) => {
  const services = unique(metrics.map((m) => m.service));
  return (
    <div className="flex flex-col gap-20">
      {services.map((service) => (
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
        {metrics
          .sort(compareMetricsByName)
          .filter((m) => m.service === service)
          .map((metric) => (
            <MetricBox
              key={metric.slug}
              metric={metric}
              filteredSamples={samplesForMetric(metric)}
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
  const xAxis = samples.map((s) => new Date(s.date));
  const data = samples.map((s) => s.value);
  const dateFormatter = new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
  });

  return (
    <div key={metric.slug} className="rounded-lg bg-pebble p-4">
      <h3 className="typo-subtitle">{metric.name}</h3>
      {metric.description && (
        <p className="typo-caption">{metric.description}</p>
      )}
      <LineChart
        colors={["blue"]}
        height={200}
        series={[{ data }]}
        yAxis={[{ min: 0 }]}
        xAxis={[
          {
            data: xAxis,
            scaleType: "time",
            valueFormatter: (value) => dateFormatter.format(value as Date),
          },
        ]}
      />
    </div>
  );
};