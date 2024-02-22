import { type Metadata } from "next";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import {
  getAllMetricDefinitions,
  getAllMetricSamples,
} from "~/src/data/metrics";

import { StatsTabBar } from "./StatsTabBar";

/** Refresh data every 5 minutes */
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Statistiky | Česko.Digital",
};

const Page = async () => {
  const metrics = await getAllMetricDefinitions();
  const samples = await getAllMetricSamples();
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Statistiky"
      />
      <h1 className="typo-title mb-10 mt-7">Statistiky</h1>
      <StatsTabBar metrics={metrics} samples={samples} />
    </main>
  );
};

export default Page;
