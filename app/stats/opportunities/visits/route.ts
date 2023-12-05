import { getAllOpportunities, type Opportunity } from "~/src/data/opportunity";
import { getAllProjects } from "~/src/data/project";
import { getPageBreakdown } from "~/src/plausible/api";
import { ContentType, map } from "~/src/utils";

export const dynamic = "force-dynamic";

/**
 * Data endpoint for the [opportunity visits chart](https://www.datawrapper.de/_/YTQQr/)
 *
 * TBD: This is now completely static, ie. the data is computed at build time
 * and never refreshed. Do we want to revalidate the data after some time?
 */
export async function GET() {
  const pageStats = await getPageBreakdown();
  const opportunities = await getAllOpportunities();
  const projects = await getAllProjects();
  const trim = (s: string) => s.replaceAll(/^\s+/g, "").replaceAll(/\s+$/g, "");
  const getProjectName = (o: Opportunity) =>
    projects.find((p) => p.id === o.projectId)?.name;
  const csv = pageStats
    // Filter out other pages
    .filter((row) => row.page.startsWith("/opportunities/"))
    // Filter out opportunities with trivial pageview counts
    .filter((row) => row.pageviews >= 5)
    // Add opportunity names
    .map((row) => {
      const op = opportunities.find(
        (o) => row.page === `/opportunities/${o.slug}`,
      );
      return {
        ...row,
        state: op?.status,
        page: op?.name ?? row.page,
        project: map(op, getProjectName),
      };
    })
    // Convert to CSV
    .map(({ page, pageviews, visitors, state, project }) =>
      [`"${trim(page)}"`, pageviews, visitors, state, `"${project}"`].join(","),
    )
    .join("\n");
  const output = ["Page, Pageviews, Visitors, State, Project", csv].join("\n");
  return new Response(output, {
    status: 200,
    headers: {
      "Content-Type": ContentType.csv,
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
