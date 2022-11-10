import { undef, union } from "typescript-json-decoder";
import { Skill as LegacySkill } from "./airtable/skills";
import { array, dict, string } from "typescript-json-decoder";
import { readFile } from "fs/promises";
import yaml from "js-yaml";

/** All available skill levels we work with */
export const SKILL_LEVELS = ["junior", "medior", "senior", "mentor"] as const;

/** Skill level such as junior, medior, … */
export type SkillLevel = typeof SKILL_LEVELS[number];

/**
 * A list of skills selected by user
 *
 * Object key contains skill category, object value is skill selection inside that category.
 */
export type SkillSelection = Record<string, SubSkillSelection>;

/**
 * A skill selection inside a single category
 *
 * Object key contains skill name, object value is skill level or `null` (no level selected).
 */
export type SubSkillSelection = Record<string, SkillLevel | null>;

/**
 * The complete menu of skills that the user can select from
 *
 * Object key contains skill category, the value is a list of skills in that category.
 */
export type SkillMenu = Record<string, string[]>;

export type Skill = {
  category: string;
  name?: string;
  level?: SkillLevel;
};

//
// Utils
//

export function getAllSkills(selection: SkillSelection): Skill[] {
  const skills: Skill[] = [];
  for (const [category, items] of Object.entries(selection)) {
    const subSelection = Object.entries(items);
    if (subSelection.length > 0) {
      subSelection.forEach(([name, level]) => {
        skills.push({
          category,
          name,
          level: level === null ? undefined : level,
        });
      });
    } else {
      skills.push({ category });
    }
  }
  return skills;
}

export function addSkill(
  selection: SkillSelection,
  skill: Skill
): SkillSelection {
  let newSelection = { ...selection };
  const { category, name, level = null } = skill;
  if (selection[category]) {
    // Category already exists
    if (name && selection[category][name]) {
      // Previous skill entry already exists
      const prevLevel = selection[category][name];
      newSelection[category][name] = getHigherSkillLevel(prevLevel, level);
    } else if (name) {
      // This is a new skill entry
      newSelection[category][name] = level;
    }
  } else if (name) {
    // Category does not exist, add new skill
    newSelection[category] = { [name]: level };
  } else {
    // New skill is just generic category
    newSelection[category] = {};
  }
  return newSelection;
}

export function getHigherSkillLevel(
  a: SkillLevel | null,
  b: SkillLevel | null
): SkillLevel | null {
  if (a && b) {
    const indexA = SKILL_LEVELS.indexOf(a);
    const indexB = SKILL_LEVELS.indexOf(b);
    return indexA > indexB ? a : b;
  } else if (a) {
    return a;
  } else {
    return b;
  }
}

//
// Serialization
//

export function encodeSkill(skill: Skill): string {
  return [skill.category, skill.name, skill.level]
    .filter((x) => !!x)
    .join(" / ");
}

export function encodeSkillSelection(selection: SkillSelection): string {
  return getAllSkills(selection).map(encodeSkill).join("; ");
}

export function decodeSkill(input: string): Skill {
  const decodeLevel = union(...SKILL_LEVELS, undef);
  const parts = input.split(/\s*\/\s*/);
  if (parts.length > 3) {
    throw "Invalid number of skill components";
  }
  const [category, name, level] = parts;
  if (!category) {
    throw "Failed to decode skill category";
  }
  return { category, name, level: decodeLevel(level) };
}

export function decodeSkillSelection(input: string): SkillSelection {
  return (
    input
      // Split skills by semicolon
      .split(/;\s*/)
      // Skip empty skills
      .filter((str) => str.length > 0)
      // Decode individual skills
      .map(decodeSkill)
      // And add them all into a tree
      .reduce(addSkill, {})
  );
}

//
// Default skills
//

export async function getDefaultSkillMenu(): Promise<SkillMenu> {
  const decode = dict(array(string));
  return await readFile("content/competencies.yaml", "utf-8")
    .then((str) => yaml.load(str) as any)
    .then(decode)
    .then((result) => result.entries())
    .then(Object.fromEntries);
}

//
// Upgrading
//

export function upgradeLegacySkills(
  legacySkills: Omit<LegacySkill, "id">[]
): SkillSelection {
  const categoryRenames = parseTable(categoryReplacementTable);
  const skillRenames = parseTable(skillReplacementTable);

  let newSkills: Skill[] = [];
  let categoryLevels: Record<string, SkillLevel> = {};

  // Import and rename
  for (const { field, name } of legacySkills) {
    // Handle special seniority skills
    if (name === "senior" || name === "mentor") {
      const category = categoryRenames[field] ?? field;
      categoryLevels[category] = name;
      if (categoryRenames[field]) {
        newSkills.push({ category });
      }
      continue;
    }
    // Handle ordinary skills
    const tag = `${field} / ${name}`;
    if (skillRenames[tag]) {
      // Skill has a new name and/or category in the upgrade table, use it
      const [category, newName] = skillRenames[tag]!.split(/\s*\/\s*/);
      newSkills.push({ category, name: newName });
    } else if (categoryRenames[field]) {
      // Skill is not in the upgrade table, so let’s just use the category
      const category = categoryRenames[field]!;
      newSkills.push({ category });
    } else {
      // Just skip
    }
  }

  // Re-add levels
  newSkills.forEach((s) => {
    s.level = categoryLevels[s.category];
  });

  return newSkills.reduce(addSkill, {});
}

const parseTable = (table: string) =>
  Object.fromEntries(
    table
      .split("\n")
      .filter((line) => line.length > 0)
      .map((line) => line.split(/\s*->\s*/))
  ) as Record<string, string | undefined>;

const categoryReplacementTable = `
Analýza -> Vývoj
Architektura -> Vývoj
Business -> Projektové řízení
Design -> Design
Finance -> Projektové řízení
Lidské zdroje -> Personalistika
Management -> Projektové řízení
Marketing -> Marketing
Vývoj -> Vývoj
Odborná veřejnost ->
`;

const skillReplacementTable = `
Analýza / big data -> Vývoj / Analýza
Analýza / business -> Projektové řízení / Business model a development
Analýza / IT -> Vývoj / Analýza
Architektura / business -> Projektové řízení / Business model a development
Architektura / enterprise -> Vývoj / Architektura
Architektura / solution -> Vývoj / Architektura
Architektura / systémová -> Vývoj / Architektura
Business / development -> Projektové řízení / Business model a development
Business / model -> Projektové řízení / Business model a development
Business / plan -> Projektové řízení / Business model a development
Business / startups -> Projektové řízení / Business model a development
Business / strategic partnership -> Projektové řízení / Fundraising
Design / mobilní -> Design / Mobile design
Design / service -> Design / Product design
Design / informační architektura -> Design / Product design
Design / interakční -> Design / UX design
Design / motion ->
Design / přístupnost -> Design / UX design
Design / produktový -> Design / Product design
Design / UI -> Design / UI design
Design / vizuální ->
Design / výzkum a testování -> Design / Research
Design / webu -> Design / Web design
Design / writing ->
Finance / analýza -> Projektové řízení / Finance
Finance / plánování -> Projektové řízení / Finance
Finance / reportování -> Projektové řízení / Finance
Lidské zdroje / administrativa -> Personalistika / Administrace a nástroje
Lidské zdroje / nábor -> Personalistika / Recruitment
Lidské zdroje / vzdělávání -> Personalistika / Vzdělávání
Management / development -> Projektové řízení / Business model a development
Management / leadership ->
Management / marketingový -> Marketing
Management / product owner -> Projektové řízení / Product Owner
Management / produktový -> Projektové řízení / Product Owner
Management / projektový ->
Management / Scrum Master -> Projektové řízení / Scrum Master
Marketing / content planning ->
Marketing / content writing -> Marketing / Copywriting
Marketing / copywriting -> Marketing / Copywriting
Marketing / event management a produkce -> Marketing / Event management
Marketing / fotografování -> Marketing / Audiovizuální produkce
Marketing / korektury -> Marketing / Copywriting
Marketing / management -> Projektové řízení
Marketing / natáčení a zpracování videa -> Marketing / Audiovizuální produkce
Marketing / natáčení a zpracování zvuku -> Marketing / Audiovizuální produkce
Marketing / online marketing (SEO, PPC, …) -> Marketing / Online marketing
Marketing / překlady -> Marketing / Copywriting
Marketing / Public Relations -> Marketing / Public Relations
Marketing / správa sociálních sítí -> Marketing / Online marketing
Odborná veřejnost / ekonom -> Ostatní / Odborná veřejnost
Odborná veřejnost / lékař -> Ostatní / Odborná veřejnost
Odborná veřejnost / novinář -> Ostatní / Odborná veřejnost
Odborná veřejnost / pedagog -> Ostatní / Odborná veřejnost
Odborná veřejnost / právník -> Ostatní / Odborná veřejnost
Odborná veřejnost / psycholog -> Ostatní / Odborná veřejnost
Odborná veřejnost / sociolog -> Ostatní / Odborná veřejnost
Strategie / marketingová -> Marketing / Marketingová strategie
Strategie / produktová -> Projektové řízení / Product Owner
Strategie / projektová -> Projektové řízení
Vývoj / Android -> Vývoj / Mobilní aplikace (Android, iOS, Flutter, …)
Vývoj / Angular -> Vývoj / Frontend
Vývoj / automatizace ->
Vývoj / Azure, AWS, Google Cloud Platform -> Vývoj / Cloud (Azure, AWS, GCP)
Vývoj / C# ->
Vývoj / C++ ->
Vývoj / Clojure -> Vývoj / Java a Kotlin
Vývoj / databáze -> Vývoj / Databáze
Vývoj / DevOps -> Vývoj / DevOps
Vývoj / Docker -> Vývoj / Docker a Kubernetes
Vývoj / Elasticsearch ->
Vývoj / Flutter -> Vývoj / Mobilní aplikace (Android, iOS, Flutter, …)
Vývoj / Gatsby ->
Vývoj / Go -> Vývoj / Backend
Vývoj / HTML & CSS -> Vývoj / HTML & CSS
Vývoj / iOS -> Vývoj / Mobilní aplikace (Android, iOS, Flutter, …)
Vývoj / Java -> Vývoj / Java a Kotlin
Vývoj / JavaScript -> Vývoj / JavaScript + TypeScript
Vývoj / Kotlin -> Vývoj / Java a Kotlin
Vývoj / Kubernetes, Puppet, Vagrant, Terraform, Ansible ->
Vývoj / Linux ->
Vývoj / Node.js -> Vývoj / Node.js
Vývoj / PHP -> Vývoj / PHP
Vývoj / PostgreSQL -> Vývoj / Databáze
Vývoj / Python -> Vývoj / Python
Vývoj / React -> Vývoj / React
Vývoj / Scala ->
Vývoj / tech leading ->
Vývoj / testování -> Vývoj / Testování
Vývoj / TypeScript -> Vývoj / JavaScript + TypeScript
Vývoj / Vue.js -> Vývoj / Frontend
Vývoj / WordPress, Joomla, Drupal -> Vývoj / WordPress
`;
