import { readFile } from "fs/promises";
import { array, dict, string, undef, union } from "typescript-json-decoder";
import yaml from "js-yaml";

const competencyLevels = ["junior", "medior", "senior", "mentor"] as const;

export type CompetencyLevel = typeof competencyLevels[number];

export type Competency = {
  category: string;
  skill?: string;
  level?: CompetencyLevel;
};

export type CompetencyList = Competency[];

//
// Serialization
//

export function encodeCompetencyList(list: CompetencyList): string {
  return list.map(encodeCompetency).join("; ");
}

export function encodeCompetency(competency: Competency): string {
  const { category, skill, level } = competency;
  return [category, skill, level].filter((x) => !!x).join(" / ");
}

export function decodeCompetencyList(code: string): CompetencyList {
  return code.split(/;\s*/).map(decodeCompetency);
}

export function decodeCompetency(code: string): Competency {
  const decodeLevel = union(...competencyLevels, undef);
  const parts = code.split(/\s*\/\s*/);
  if (parts.length > 3) {
    throw "Invalid number of competency components";
  }
  const [category, skill, level] = parts;
  if (!category) {
    throw "Failed to decode competency category";
  }
  return { category, skill, level: decodeLevel(level) };
}

//
// Default Competency List
//

export async function getDefaultCompetencyList(): Promise<CompetencyList> {
  const decode = dict(array(string));
  const categories = await readFile("content/competencies.yaml", "utf-8")
    .then((str) => yaml.load(str) as any)
    .then(decode);
  let competencies: CompetencyList = [];
  for (const [category, skills] of categories.entries()) {
    for (const skill of skills) {
      competencies.push({ category, skill });
    }
  }
  return competencies;
}
