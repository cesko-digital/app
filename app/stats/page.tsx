import { type Metadata } from "next";

import { Breadcrumbs } from "~/components/Breadcrumbs";

import { StatsTabBar } from "./StatsTabBar";

export const metadata: Metadata = {
  title: "Statistiky | Česko.Digital",
};

const Page = async () => {
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Statistiky"
      />
      <h1 className="typo-title mb-10 mt-7">Statistiky</h1>
      <StatsTabBar />
    </main>
  );
};

export default Page;
