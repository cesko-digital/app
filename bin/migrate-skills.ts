#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getAllUserProfiles, updateUserProfile } from "~/src/data/user-profile";
import { getMaxSeniority, skillsToHashtags } from "~/src/skills/skills";

async function main() {
  const userProfiles = await getAllUserProfiles("Profiles with Skills");
  for (const profile of userProfiles) {
    const tags = skillsToHashtags(profile.skills);
    const maxSeniority = getMaxSeniority(profile.skills);
    if (tags !== profile.tags || maxSeniority !== profile.maxSeniority) {
      await updateUserProfile(profile.id, { tags, maxSeniority });
      console.log(
        `${profile.id}: ${profile.skills} -> ${tags}, ${maxSeniority}`,
      );
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
