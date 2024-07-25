#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getAllUserProfiles, updateUserProfile } from "~/src/data/user-profile";
import { skillsToHashtags } from "~/src/skills/skills";

async function main() {
  const profiles = await getAllUserProfiles("Profiles with Skills");
  for (const profile of profiles) {
    const tags = skillsToHashtags(profile.skills);
    console.log(`${profile.id}: ${profile.skills} -> ${tags}`);
    await updateUserProfile(profile.id, { tags });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
