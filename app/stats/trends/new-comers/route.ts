import { getAllUserProfiles } from "lib/airtable/user-profile";
import { getCsvResponse } from "../trend-response";
import { buildTrendStats, WriteTrendValue } from "../../../../lib/trend-stats";
import { buildTrendOptions } from "../trend-request";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  return await getCsvResponse(async function (): Promise<string | null> {
    const userProfiles = await getAllUserProfiles("Confirmed Profiles");

    return buildTrendStats(
      buildTrendOptions(searchParams),
      function (writeTrendValue: WriteTrendValue): void {
        // At the moment of writing there is 5975 rows, we want to avoid doing multiple loops to make this code
        // as fast as possible.
        for (const profile of userProfiles) {
          writeTrendValue({
            date: new Date(profile.createdAt!),
          });
        }
      }
    );
  });
}
