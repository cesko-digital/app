import { getAllUserProfiles } from "src/data/user-profile";
import { decodeSkillSelection } from "src/skills";
import { ContentType, notEmpty, unique } from "src/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const userProfiles = await getAllUserProfiles("Profiles with Skills");
  const skills = userProfiles
    .map((userProfile) => userProfile.skills)
    .filter(notEmpty)
    .map(decodeSkillSelection);

  const categories = unique(skills.flatMap(Object.keys));

  let response = "Kategorie,Dovednost,Počet záznamů\n";
  for (const category of categories) {
    const subcategories = unique(
      skills
        .map((selection) => selection[category])
        .filter((value) => !!value)
        .flatMap(Object.keys),
    );
    const genericCount = skills.filter(
      (selection) =>
        selection[category] !== undefined &&
        Object.keys(selection[category]).length === 0,
    ).length;
    response += `"${category}",(bez uvedení detailu),${genericCount}\n`;
    for (const subcategory of subcategories) {
      const count = skills.filter(
        (selection) =>
          selection[category] && selection[category][subcategory] !== undefined,
      ).length;
      response += `"${category}","${subcategory}",${count}\n`;
    }
  }

  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": ContentType.csv,
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
