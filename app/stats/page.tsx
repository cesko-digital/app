import { type Metadata } from "next";

import { OverviewChart } from "~/app/stats/OverviewChart";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import {
  getAllMetricDefinitions,
  getAllMetricSamples,
  type MetricDefinition,
  type MetricSample,
} from "~/src/data/metrics";
import { slugify } from "~/src/markdoc/schema";
import { unique } from "~/src/utils";

/** Refresh data every 10 minutes */
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Statistiky | Česko.Digital",
  description: "Všechna čísla o fungování Česko.Digital na jednom místě",
  openGraph: {
    images: "https://data.cesko.digital/web/controls.jpg",
  },
};

/** How many last samples should we display? */
const historyLength = 10;

const Page = async () => {
  const metrics = await getAllMetricDefinitions();
  const samples = await getAllMetricSamples();
  const services = unique(metrics.map((m) => m.service)).sort((a, b) =>
    a.localeCompare(b),
  );
  const haveSamplesForMetric = (metricSlug: string) =>
    samples.filter((s) => s.metricSlug === metricSlug).length > 0;
  const haveSamplesForService = (service: string) =>
    !!metrics.find(
      (m) => m.service === service && haveSamplesForMetric(m.slug),
    );
  const featuredMetrics = metrics
    .filter((m) => m.featured)
    .sort((a, b) => a.service.localeCompare(b.service));
  const compareMetricsByName = (a: MetricDefinition, b: MetricDefinition) =>
    a.name.localeCompare(b.name);

  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs currentPage="Statistiky" />
      <h1 className="typo-title mb-10 mt-7">Statistiky</h1>
      <div className="flex flex-col gap-20">
        <ServiceSection
          key="featured"
          title="Klíčové metriky"
          filteredMetrics={featuredMetrics}
          allSamples={samples}
          showServiceName
        />
        {services.filter(haveSamplesForService).map((service) => (
          <ServiceSection
            key={service}
            title={service}
            filteredMetrics={metrics
              .filter((m) => m.service === service)
              .sort(compareMetricsByName)}
            allSamples={samples}
          />
        ))}
      </div>
    </main>
  );
};

type ServiceSectionProps = {
  title: string;
  filteredMetrics: MetricDefinition[];
  allSamples: MetricSample[];
  showServiceName?: boolean;
};

const ServiceSection = ({
  title,
  filteredMetrics: metrics,
  allSamples: samples,
  showServiceName = false,
}: ServiceSectionProps) => {
  const compareSamplesByDate = (a: MetricSample, b: MetricSample) =>
    new Date(a.date).getTime() - new Date(b.date).getTime();
  const samplesForMetric = (metric: MetricDefinition) =>
    samples
      .filter((s) => s.metricSlug === metric.slug)
      .sort(compareSamplesByDate);
  return (
    <div>
      <h2 className="typo-title2 mb-4" id={slugify(title)}>
        {title}
        <a
          href={`#${slugify(title)}`}
          className="ml-1 cursor-pointer text-black no-underline opacity-0 hover:opacity-20"
        >
          #
        </a>
      </h2>
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {metrics
          .filter((m) => samplesForMetric(m).length > 0)
          .map((metric) => (
            <OverviewChart
              key={metric.slug}
              showServiceName={showServiceName}
              metric={metric}
              filteredSamples={samplesForMetric(metric).slice(-historyLength)}
            />
          ))}
      </div>
    </div>
  );
};

export default Page;
