import { getCsvResponse } from "../trend-response";
import { buildTrendStats } from "../trend-stats";
import { buildTrendOptions } from "../trend-request";
import { generateNewComersTrend } from "../trends";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  return await getCsvResponse(async function (): Promise<string | null> {
    return await buildTrendStats(
      buildTrendOptions(searchParams),
      generateNewComersTrend
    );
  });
}
