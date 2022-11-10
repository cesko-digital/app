#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

import { flattenSkills, getAllSkills } from "lib/airtable/skills";
import { encodeSkillSelection, upgradeLegacySkills } from "lib/skills";
import {
  getAllUserProfiles,
  updateUserProfile,
} from "lib/airtable/user-profile";

async function main() {
  console.log("Downloading all user profiles.");
  const users = await getAllUserProfiles();
  const usersWithSkills = users.filter((user) => user.skills.length > 0);
  const skills = flattenSkills(await getAllSkills());
  const resolveSkill = (id: string) => skills.find((skill) => skill.id === id)!;
  console.log(
    `Downloaded ${users.length} users total, ${usersWithSkills.length} with skills; updating skills…`
  );
  for (const user of usersWithSkills) {
    const skills = encodeSkillSelection(
      upgradeLegacySkills(user.legacySkills.map(resolveSkill))
    );
    console.log(`Upgrading skills for user ${user.id} to: ${skills}`);
    await updateUserProfile(user.id, { skills });
  }
  console.log("Done!");
}

main().catch((error) => console.log(error));
