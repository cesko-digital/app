import {
  getAllMetricDefinitions,
  getAllMetricSamples,
  type MetricDefinition,
  type MetricSample,
} from "~/src/data/metrics";
import { unique } from "~/src/utils";

import { MetricBox } from "./MetricBox";

export default async function Page() {
  const metrics = await getAllMetricDefinitions();
  const samples = await getAllMetricSamples();
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
}

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
            filteredSamples={samplesForMetric(metric)}
          />
        ))}
      </div>
    </div>
  );
};
