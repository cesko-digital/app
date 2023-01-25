import { getAllOpportunities } from "lib/airtable/opportunity";
import { getPageBreakdown } from "lib/data-sources/plausible";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const pageStats = await getPageBreakdown();
  const opportunities = await getAllOpportunities();
  const trim = (s: string) => s.replaceAll(/^\s+/g, "").replaceAll(/\s+$/g, "");
  const csv = pageStats
    // Filter out other pages
    .filter((row) => row.page.startsWith("/opportunities/"))
    // Add opportunity names
    .map((row) => {
      const op = opportunities.find(
        (o) => row.page === `/opportunities/${o.slug}`
      );
      return { ...row, state: op?.status, page: op?.name || row.page };
    })
    // Convert to CSV
    .map(({ page, pageviews, visitors, state }) =>
      [`"${trim(page)}"`, pageviews, visitors, state].join(",")
    )
    .join("\n");
  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=3600, stale-while-revalidate"
  );
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "text/csv");
  response.status(200);
  response.write("Page, Pageviews, Visitors, State\n");
  response.write(csv);
  response.end();
}

export default handler;
