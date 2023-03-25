import { getAllUserProfiles } from "lib/airtable/user-profile";
import { unique } from "lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const userProfiles = await getAllUserProfiles();
  const allOccupations = userProfiles
    .filter((userProfile) => userProfile.state === "confirmed")
    .map((userProfile) => userProfile.occupation)
    .filter((occupation) => !!occupation && occupation !== "");
  const uniqueOccupations = unique(allOccupations);
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "text/csv; charset=utf-8");
  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=3600, stale-while-revalidate"
  );
  const labels = {
    "freelancing": "na volné noze",
    "state": "státní sektor",
    "studying": "studující",
    "parental-leave": "na rodičovské dovolené",
    "private-sector": "soukromý sektor",
    "non-profit": "neziskový sektor",
    "other": "jiné",
    "looking-for-job": "hledám práci",
  } as Record<string, string>;
  for (const occupation of uniqueOccupations) {
    response.write(
      `${labels[occupation!]}, ${
        allOccupations.filter((o) => o === occupation).length
      }\n`
    );
  }
  response.status(200);
  response.end();
}

export default handler;
