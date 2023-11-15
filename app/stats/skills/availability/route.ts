import { getAllUserProfiles } from "src/data/user-profile";
import { ContentType } from "src/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const userProfiles = await getAllUserProfiles("Confirmed Profiles");
  const nonEmptySkills = userProfiles
    .map((userProfile) => userProfile.skills)
    .filter((skill) => skill !== "");

  let response = `Má zadány dovednosti, ${nonEmptySkills.length}\n`;
  response += `Nemá zadané dovednosti, ${
    userProfiles.length - nonEmptySkills.length
  }\n`;

  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": ContentType.csv,
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
