import { notFound } from "next/navigation";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import {
  getAllMetricDefinitions,
  getAllMetricSamples,
} from "~/src/data/metrics";
import { Route } from "~/src/routing";

import { MetricBox } from "../Metrics";

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
  const samples = allSamples.filter((s) => s.metricSlug === params.slug);
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
        <h1 className="typo-title mb-2 mt-7">{metric.qualifiedName}</h1>
        <h2 className="typo-subtitle mb-10 max-w-prose">
          {metric.description && metric.description}
        </h2>
        {/* place for graph, currently used MetricBox but it is not the cleanest solution... */}
        <MetricBox metric={metric} filteredSamples={samples} />
      </main>
    </div>
  );
};

export default Page;
