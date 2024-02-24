import { notFound } from "next/navigation";

import { DetailedChart } from "~/app/stats/DetailedChart";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import {
  getAllMetricDefinitions,
  getAllMetricSamples,
  type MetricSample,
} from "~/src/data/metrics";
import { Route } from "~/src/routing";

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

const Page = async ({ params }: Props) => {
  const metrics = await getAllMetricDefinitions();
  const allSamples = await getAllMetricSamples();
  const metric = metrics.find((m) => m.slug === params.slug);

  const compareSamplesByDate = (a: MetricSample, b: MetricSample) =>
    new Date(a.date).getTime() - new Date(b.date).getTime();

  const samples = allSamples
    .filter((s) => s.metricSlug === params.slug)
    .sort(compareSamplesByDate);

  if (!metric) {
    notFound();
  }

  return (
    <div>
      <main className="m-auto max-w-content px-7 py-20">
        <Breadcrumbs
          path={[
            { label: "Homepage", path: "/" },
            { label: "Statistiky", path: Route.stats },
          ]}
          currentPage={metric.name}
        />
        <h1
          className={`typo-title ${metric.description ? "mb-3" : "mb-10"} mt-7`}
        >
          {metric.service} | {metric.name}
        </h1>
        {metric.description && (
          <h2 className="typo-subtitle mb-10 max-w-prose">
            {metric.description}
          </h2>
        )}
        <DetailedChart metric={metric} filteredSamples={samples} />
      </main>
    </div>
  );
};

/** Force incremental static generation (ISR), see https://github.com/cesko-digital/web/issues/987 */
export async function generateStaticParams() {
  return [];
}

/** Refresh data every 5 minutes */
export const revalidate = 300;

export default Page;
