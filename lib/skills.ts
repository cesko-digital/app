import Airtable from "airtable";
import {
  array,
  decodeType,
  field,
  Pojo,
  record,
  string,
} from "typescript-json-decoder";
import { unique } from "./utils";

export type Skill = decodeType<typeof decodeSkill>;

export interface Field {
  name: string;
  mentorSkillId?: string;
  seniorSkillId?: string;
  skills: Skill[];
}

export const decodeSkill = record({
  id: string,
  field: field("Field", string),
  name: field("Subfield", string),
});

export function decodeFields(value: Pojo): Field[] {
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

export function flattenSkills(allSkills: Field[]): Skill[] {
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

export async function loadAllSkills(): Promise<Field[]> {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const base = new Airtable({ apiKey }).base("apppZX1QC3fl1RTBM");
  const results = await base("Skills").select({ maxRecords: 200 }).all();
  const recordsWithIDs = results.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
  return decodeFields(recordsWithIDs);
}

const decodeSkills = array(decodeSkill);
