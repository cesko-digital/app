import { notFound } from "next/navigation";

import { DetailedChart } from "~/app/stats/DetailedChart";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { ImageLabel } from "~/components/ImageLabel";
import { Sidebar, SidebarCTA, SidebarSection } from "~/components/Sidebar";
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

  if (!metric || samples.length === 0) {
    notFound();
  }

  const sampleLabel =
    samples.length === 1
      ? "vzorek"
      : [2, 3, 4].includes(samples.length)
        ? "vzorky"
        : "vzorků";

  const haveOwnerData =
    metric.ownerName && metric.ownerAvatarUrl && metric.ownerMail;

  const dateFormatter = new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <main className="m-auto max-w-content px-7 py-20">
        <Breadcrumbs
          path={[{ label: "Statistiky", path: Route.stats }]}
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

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <DetailedChart metric={metric} filteredSamples={samples} />
          </section>
          <aside>
            <Sidebar>
              <SidebarSection title="Poslední aktualizace">
                {dateFormatter.format(
                  new Date(samples[samples.length - 1].date),
                )}
              </SidebarSection>
              {haveOwnerData && (
                <SidebarSection title="O data pečuje">
                  <ImageLabel
                    key={metric.ownerName}
                    imageUrl={metric.ownerAvatarUrl!}
                    label={metric.ownerName!}
                    link={`mailto:${metric.ownerMail}`}
                  />
                  <p className="mt-4">
                    Potřebujete zjistit, co přesně data znamenají nebo jak se
                    měří? Jsou neaktuální? Ozvěte se!
                  </p>
                </SidebarSection>
              )}
              <SidebarSection title="Data na doma">
                <p className="mb-4">
                  Datová sada obsahuje celkem {samples.length} {sampleLabel},
                  můžete si je stáhnout ve formátu CSV pro další zpracování nebo
                  vizualizaci.
                </p>
                <SidebarCTA href={`${metric.slug}/csv`} label="Stáhnout CSV" />
              </SidebarSection>
            </Sidebar>
          </aside>
        </div>
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
