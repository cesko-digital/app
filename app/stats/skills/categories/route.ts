import { getAllUserProfiles, UserProfile } from "lib/airtable/user-profile";
import { decodeSkillSelection } from "lib/skills";
import { unique } from "lib/utils";

export async function GET() {
  const getCategoriesForUser = (user: UserProfile) =>
    Object.keys(decodeSkillSelection(user.skills));
  const userProfiles = await getAllUserProfiles("Profiles with Skills");
  const userSkills = userProfiles
    .map(getCategoriesForUser)
    .filter((categories) => categories.length > 0);
  const categories = unique(userSkills.flat());

  let response = "";
  for (const category of categories) {
    response += `${category}, ${
      userSkills.filter((s) => s.includes(category)).length
    }\n`;
  }

  return new Response(response, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/csv; charset=utf-8",
    },
  });
}
