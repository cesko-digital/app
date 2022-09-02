import { unique } from "lib/utils";
import { unwrapRecords, volunteerManagementBase } from "./request";
import {
  array,
  decodeType,
  field,
  Pojo,
  record,
  string,
} from "typescript-json-decoder";

//
// Types
//

export interface Field {
  name: string;
  mentorSkillId?: string;
  seniorSkillId?: string;
  skills: Skill[];
}

//
// Decoding
//

export type Skill = decodeType<typeof decodeSkill>;
export const decodeSkill = record({
  id: string,
  field: field("Field", string),
  name: field("Subfield", string),
});

/** Decode a hierarchical tree of skills from the DB format */
export function decodeFields(value: Pojo): Field[] {
  const decodeSkills = array(decodeSkill);
  const skills = decodeSkills(value);
  const fields = unique(skills.map((s) => s.field));
  return fields.map((field) => ({
    name: field,
    mentorSkillId: skills.find(
      (skill) => skill.field === field && skill.name === "_mentor"
    )?.id,
    seniorSkillId: skills.find(
      (skill) => skill.field === field && skill.name === "_senior"
    )?.id,
    skills: skills.filter(
      (skill) => skill.field === field && !skill.name.startsWith("_")
    ),
  }));
}

//
// API Calls
//

const skillsTable = volunteerManagementBase("Skills");

/** Get a hierarchical tree of skills from the DB */
export async function getAllSkills(): Promise<Field[]> {
  return await skillsTable
    .select({ maxRecords: 200 })
    .all()
    .then(unwrapRecords)
    .then(decodeFields);
}

//
// Helpers
//

/** Flatten the hierarchical tree of skills into a flat list */
export function flattenSkills(allSkills: readonly Field[]): Skill[] {
  let skills: Skill[] = [];
  for (const field of allSkills) {
    if (field.mentorSkillId) {
      skills.push({
        id: field.mentorSkillId,
        field: field.name,
        name: "mentor",
      });
    }
    if (field.seniorSkillId) {
      skills.push({
        id: field.seniorSkillId,
        field: field.name,
        name: "senior",
      });
    }
    skills.push(...field.skills);
  }
  return skills;
}
