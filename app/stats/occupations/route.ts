import { getAllUserProfiles } from "src/data/user-profile";
import { ContentType, notEmpty, unique } from "src/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const userProfiles = await getAllUserProfiles(
    "Profiles with Occupation Data",
  );
  const allOccupations = userProfiles
    // Extract user’s occupation
    .map((userProfile) => userProfile.occupation)
    // Make sure the occupation is not null
    .filter(notEmpty);

  const uniqueOccupations = unique(allOccupations);

  const labels = {
    freelancing: "na volné noze",
    state: "státní sektor",
    studying: "studující",
    "parental-leave": "na rodičovské dovolené",
    "private-sector": "soukromý sektor",
    "non-profit": "neziskový sektor",
    other: "jiné",
    "looking-for-job": "hledám práci",
  } as Record<string, string>;

  let response = "";
  for (const occupation of uniqueOccupations) {
    response += `${labels[occupation!]}, ${
      allOccupations.filter((o) => o === occupation).length
    }\n`;
  }

  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": ContentType.csv,
      "Access-Control-Allow-Origin": "*",
    },
  });
}
