import { getAllUserProfiles, UserProfile } from "lib/airtable/user-profile";
import { decodeSkillSelection } from "lib/skills";
import { unique } from "lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const getCategoriesForUser = (user: UserProfile) =>
    Object.keys(decodeSkillSelection(user.skills));
  const userProfiles = await getAllUserProfiles();
  const userSkills = userProfiles
    .filter((userProfile) => userProfile.state === "confirmed")
    .map(getCategoriesForUser)
    .filter((categories) => categories.length > 0);
  const categories = unique(userSkills.flat());
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "text/csv");
  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=3600, stale-while-revalidate"
  );
  response.status(200);
  for (const category of categories) {
    response.write(
      `${category}, ${userSkills.filter((s) => s.includes(category)).length}\n`
    );
  }
  response.end();
}

export default handler;
