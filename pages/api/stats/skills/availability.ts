import { getAllUserProfiles } from "lib/airtable/user-profile";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const userProfiles = await getAllUserProfiles();
  const nonEmptySkills = userProfiles
    .filter((userProfile) => userProfile.state === "confirmed")
    .map((userProfile) => userProfile.skills)
    .filter((skill) => skill !== "");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "text/csv; charset=utf-8");
  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=3600, stale-while-revalidate"
  );
  response.status(200);
  response.write(`Má zadány dovednosti, ${nonEmptySkills.length}\n`);
  response.write(
    `Nemá zadané dovednosti, ${userProfiles.length - nonEmptySkills.length}\n`
  );
  response.end();
}

export default handler;
