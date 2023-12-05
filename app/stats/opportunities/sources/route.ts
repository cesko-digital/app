import { getAllOpportunities } from "src/data/opportunity";
import { getPageBreakdown, getPageTrafficSources } from "src/plausible/api";
import { ContentType, unique } from "src/utils";

export const dynamic = "force-dynamic";

/**
 * Data endpoint for the [opportunity sources chart](https://www.datawrapper.de/_/5SpWg/)
 *
 * TBD: This is now completely static, ie. the data is computed at build time
 * and never refreshed. Do we want to revalidate the data after some time?
 */
export async function GET() {
  const pageStats = await getPageBreakdown();
  const opportunityStats = pageStats
    .filter((row) => row.visitors >= 5)
    .filter((row) => row.page.startsWith("/opportunities/"));
  const sourceStats = await Promise.all(
    opportunityStats.map(async (row) => ({
      sources: await getPageTrafficSources(row.page),
      ...row,
    })),
  );
  const sourceNames = unique(
    sourceStats.flatMap((row) => row.sources.map((s) => s.source)),
  );

  const opportunities = await getAllOpportunities();
  const trim = (s: string) => s.replaceAll(/^\s+/g, "").replaceAll(/\s+$/g, "");
  const name = (path: string) =>
    opportunities.find((o) => path === `/opportunities/${o.slug}`)?.name ??
    path;

  let output = `Page, Title, ${sourceNames.join(", ")}\n`;
  for (const row of sourceStats) {
    if (row.sources.length === 0) {
      // No traffic source data for this position, can happen
      continue;
    }
    output += [
      row.page,
      `"${trim(name(row.page))} / ${row.visitors} visitors"`,
      sourceNames.map(
        (source) => row.sources.find((s) => s.source === source)?.visitors,
      ),
    ].join(",");
    output += "\n";
  }

  return new Response(output, {
    status: 200,
    headers: {
      "Content-Type": ContentType.csv,
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
