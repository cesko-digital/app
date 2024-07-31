#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getAllUserProfiles, updateUserProfile } from "~/src/data/user-profile";
import { skillsToHashtags } from "~/src/skills/skills";

async function main() {
  const profiles = await getAllUserProfiles("Profiles with Skills");
  for (const profile of profiles) {
    const isExperienceTag = (t: string) =>
      t === "#junior" || t === "#medior" || t === "#senior" || t === "#mentor";
    const allTags = skillsToHashtags(profile.skills);
    const tags = allTags
      .split(" ")
      .filter((t) => !isExperienceTag(t))
      .join(" ");
    const experience = allTags.split(" ").filter(isExperienceTag).join(" ");
    console.log(`${profile.id}: ${profile.skills} -> ${tags}, ${experience}`);
    await updateUserProfile(profile.id, { tags, experience });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
