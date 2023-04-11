import { WriteTrendValue } from "./trend-stats";
import { getAllTeamEngagements } from "../../../lib/airtable/team-engagement";
import { getAllUserProfiles } from "../../../lib/airtable/user-profile";

export async function generateNewComersTrend(writeTrendValue: WriteTrendValue): Promise<void> {
  const userProfiles = await getAllUserProfiles("Confirmed Profiles");

  // At the moment of writing there is 5975 rows, we want to avoid doing multiple loops to make this code
  // as fast as possible.
  for (const profile of userProfiles) {
    if (!profile.createdAt) {
      continue;
    }

    writeTrendValue({
      date: new Date(profile.createdAt),
    });
  }
}

export async function generateNewEngagementsTrend(writeTrendValue: WriteTrendValue): Promise<void> {
  const teamEngagements = await getAllTeamEngagements();

  for (const engagement of teamEngagements) {
    if (!engagement.startDate) {
      continue
    }

    writeTrendValue({
      date: new Date(engagement.startDate),
    });
  }
}