import { getAllUserProfiles } from "lib/airtable/user-profile";
import { decodeSkillSelection } from "lib/skills";
import { unique } from "lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const userProfiles = await getAllUserProfiles();
  const skills = userProfiles
    .filter((userProfile) => userProfile.state === "confirmed")
    .map((userProfile) => userProfile.skills)
    .filter((skill) => skill !== "")
    .map(decodeSkillSelection);
  const categories = unique(skills.flatMap(Object.keys));
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "text/csv");
  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=3600, stale-while-revalidate"
  );
  response.write("Kategorie,Dovednost,Počet záznamů\n");
  for (const category of categories) {
    const subcategories = unique(
      skills
        .map((selection) => selection[category])
        .filter((value) => !!value)
        .flatMap(Object.keys)
    );
    const genericCount = skills.filter(
      (selection) =>
        selection[category] !== undefined &&
        Object.keys(selection[category]).length === 0
    ).length;
    response.write(`"${category}",(bez uvedení detailu),${genericCount}\n`);
    for (const subcategory of subcategories) {
      const count = skills.filter(
        (selection) =>
          selection[category] && selection[category][subcategory] !== undefined
      ).length;
      response.write(`"${category}","${subcategory}",${count}\n`);
    }
  }
  response.status(200);
  response.end();
}

export default handler;
