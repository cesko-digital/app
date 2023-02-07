import { getAllOpportunities } from "lib/airtable/opportunity";
import {
  getPageBreakdown,
  getPageTrafficSources,
} from "lib/data-sources/plausible";
import { unique } from "lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const pageStats = await getPageBreakdown();
  const opportunityStats = pageStats
    .filter((row) => row.visitors >= 5)
    .filter((row) => row.page.startsWith("/opportunities/"));
  const sourceStats = await Promise.all(
    opportunityStats.map(async (row) => ({
      sources: await getPageTrafficSources(row.page),
      ...row,
    }))
  );
  const sourceNames = unique(
    sourceStats.flatMap((row) => row.sources.map((s) => s.source))
  );

  const opportunities = await getAllOpportunities();
  const trim = (s: string) => s.replaceAll(/^\s+/g, "").replaceAll(/\s+$/g, "");
  const name = (path: string) =>
    opportunities.find((o) => path === `/opportunities/${o.slug}`)?.name ||
    path;

  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=3600, stale-while-revalidate"
  );
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "text/csv");
  response.status(200);
  response.write(`Page, Title, ${sourceNames.join(", ")}\n`);
  for (const row of sourceStats) {
    if (row.sources.length === 0) {
      // No traffic source data for this position, can happen
      continue;
    }
    response.write(
      [
        row.page,
        `"${trim(name(row.page))} / ${row.visitors} visitors"`,
        sourceNames.map(
          (source) => row.sources.find((s) => s.source === source)?.visitors
        ),
      ].join(",")
    );
    response.write("\n");
  }
  response.end();
}

export default handler;
