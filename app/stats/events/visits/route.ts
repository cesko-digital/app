import { getAllEvents } from "lib/airtable/event";
import { getPageBreakdown } from "lib/data-sources/plausible";

const DEFAULT_THRESHOLD = 5;
export async function GET(request: Request) {
  const pageStats = await getPageBreakdown();
  const events = await getAllEvents();
  const { searchParams } = new URL(request.url);
  const threshold = searchParams.get("threshold") || DEFAULT_THRESHOLD;

  const csv = pageStats
    // Filter out other pages
    .filter((row) => row.page.startsWith("/events/"))
    // Add opportunity names
    .map((row) => {
      const event = events.find((e) => row.page === `/events/${e.slug}`);
      return {
        ...row,
        page: event?.name || "unknown",
      };
    })
    // Filter rows below the threshold
    .filter((row) => row.pageviews >= threshold)
    // Convert to CSV
    .map(({ page, pageviews, visitors }) =>
      [`"${page.trim()}"`, pageviews, visitors].join(",")
    )
    .join("\n");
  const output = ["Page, Pageviews, Visitors", csv].join("\n");

  return new Response(output, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
