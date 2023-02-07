import {
  getAllOpportunities,
  PortalOpportunity,
} from "lib/airtable/opportunity";
import { getAllProjects } from "lib/airtable/project";
import { getPageBreakdown } from "lib/data-sources/plausible";
import { map } from "lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const pageStats = await getPageBreakdown();
  const opportunities = await getAllOpportunities();
  const projects = await getAllProjects();
  const trim = (s: string) => s.replaceAll(/^\s+/g, "").replaceAll(/\s+$/g, "");
  const getProjectName = (o: PortalOpportunity) =>
    projects.find((p) => p.id === o.projectId)?.name;
  const csv = pageStats
    // Filter out other pages
    .filter((row) => row.page.startsWith("/opportunities/"))
    // Add opportunity names
    .map((row) => {
      const op = opportunities.find(
        (o) => row.page === `/opportunities/${o.slug}`
      );
      return {
        ...row,
        state: op?.status,
        page: op?.name || row.page,
        project: map(op, getProjectName),
      };
    })
    // Convert to CSV
    .map(({ page, pageviews, visitors, state, project }) =>
      [`"${trim(page)}"`, pageviews, visitors, state, `"${project}"`].join(",")
    )
    .join("\n");
  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=3600, stale-while-revalidate"
  );
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "text/csv");
  response.status(200);
  response.write("Page, Pageviews, Visitors, State, Project\n");
  response.write(csv);
  response.end();
}

export default handler;
