import { getAllEvents } from "~/src/data/event";
import { getPageBreakdown } from "~/src/plausible/api";
import { ContentType } from "~/src/utils";

const DEFAULT_THRESHOLD = 5;
const ALLOWED_PERIODS = ["7d", "30d", "6mo", "12mo"];

async function parseRequest(request: Request): Promise<[number, string]> {
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
  const period = searchParams.get("period") ?? "30d";
  if (!ALLOWED_PERIODS.includes(period)) {
    throw new Error(
      `Invalid time period. Allowed values: ${ALLOWED_PERIODS.join(", ")}`,
    );
  }

  return [threshold, period];
}

async function processData(threshold: number, period: string) {
  const pageStats = await getPageBreakdown(period);
  const events = await getAllEvents();

  const csvRows: string[] = [];

  for (const row of pageStats) {
    // Filter out other pages
    if (!row.page.startsWith("/events/")) continue;

    const event = events.find((e) => row.page === `/events/${e.slug}`);

    // Skip rows where event is undefined or pageviews below the threshold
    if (!event || row.pageviews < threshold) continue;

    // Add to csvRows
    csvRows.push(
      [`"${event.name.trim()}"`, row.pageviews, row.visitors].join(","),
    );
  }

  return ["Page, Pageviews, Visitors", ...csvRows].join("\n");
}

export async function GET(request: Request) {
  try {
    const [threshold, period] = await parseRequest(request);
    const output = await processData(threshold, period);

    return new Response(output, {
      status: 200,
      headers: {
        "Content-Type": ContentType.csv,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "Unknown error";

    return new Response(message, {
      status: 400,
      headers: {
        "Content-Type": ContentType.txt,
      },
    });
  }
}
