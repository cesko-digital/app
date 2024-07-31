#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getAllUserProfiles, updateUserProfile } from "~/src/data/user-profile";
import { skillsToHashtags } from "~/src/skills/skills";

async function main() {
  const profiles = await getAllUserProfiles("Profiles with Skills");
  const labels: Record<string, string> = {
    "private-sector": "#soukromý-sektor",
    "non-profit": "#nezisk",
    state: "#veřejná-správa",
    freelancing: "#freelance",
    studying: "#studuju",
    "parental-leave": "#rodičovská",
    "looking-for-job": "#hire-me",
  };
  for (const profile of profiles) {
    const isExperienceTag = (t: string) =>
      t === "#junior" || t === "#medior" || t === "#senior" || t === "#mentor";
    const allTags = skillsToHashtags(profile.skills);
    const tags = allTags
      .split(" ")
      .filter((t) => !isExperienceTag(t))
      .join(" ");
    const experience = allTags.split(" ").filter(isExperienceTag).join(" ");
    const background = labels[profile.occupation ?? ""];
    console.log(`${profile.id}: ${profile.skills} -> ${tags}, ${experience}`);
    await updateUserProfile(profile.id, { tags, experience, background });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
