import { getAllEvents } from "lib/airtable/event";
import { getPageBreakdown } from "lib/data-sources/plausible";

const DEFAULT_THRESHOLD = 5;
const ALLOWED_PERIODS = ["7d", "30d", "6mo", "12mo", "all"];

async function validateRequest(request: Request): Promise<[number, string]> {
  const { searchParams } = new URL(request.url);

  // Validate the threshold parameter
  const thresholdParam = searchParams.get("threshold");
  const threshold = thresholdParam
    ? parseInt(thresholdParam, 10)
    : DEFAULT_THRESHOLD;

  if (isNaN(threshold) || threshold < 1) {
    throw new Error("Invalid threshold value. Must be a positive integer.");
  }

  // Validate the period parameter
  const period = searchParams.get("period") || "30d";
  if (!ALLOWED_PERIODS.includes(period)) {
    throw new Error(
      `Invalid time period. Allowed values: ${ALLOWED_PERIODS.join(", ")}`
    );
  }

  return [threshold, period];
}

async function processData(threshold: number, period: string) {
  const pageStats = await getPageBreakdown(period);
  const events = await getAllEvents();

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
  return ["Page, Pageviews, Visitors", csv].join("\n");
}

export async function GET(request: Request) {
  try {
    const [threshold, period] = await validateRequest(request);
    const output = await processData(threshold, period);

    return new Response(output, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="report.csv"',
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "Unknown error";

    return new Response(message, {
      status: 400,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
