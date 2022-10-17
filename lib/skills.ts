import { undef, union } from "typescript-json-decoder";
import { Skill as LegacySkill } from "./airtable/skills";

const skillLevels = ["junior", "medior", "senior", "mentor"] as const;

export type SkillLevel = typeof skillLevels[number];

export type Skill = {
  category: string;
  name?: string;
  level?: SkillLevel;
};

export type SkillTree = Record<string, Omit<Skill, "category">[]>;

//
// Tree Utils
//

export function getAllSkills(tree: SkillTree): Skill[] {
  const skills: Skill[] = [];
  for (const [category, items] of Object.entries(tree)) {
    if (items.length > 0) {
      skills.push(
        ...items.map(({ name, level }) => ({ category, name, level }))
      );
    } else {
      skills.push({ category });
    }
  }
  return skills;
}

export function addSkill(tree: SkillTree, skill: Skill): SkillTree {
  let updatedTree = { ...tree };
  const { category, name, level } = skill;
  const entry = { name, level };
  if (tree[category]) {
    // Category already exists
    const prevIndex = tree[category].findIndex((s) => s.name === name);
    if (prevIndex !== -1) {
      // Previous skill entry already exists
      const prevLevel = tree[category][prevIndex].level;
      const newLevel = getHigherSkillLevel(prevLevel, level);
      tree[category][prevIndex].level = newLevel;
    } else if (name) {
      // This is a new skill entry
      updatedTree[category].push(entry);
    }
  } else if (name) {
    // Category does not exist, add new skill
    updatedTree[category] = [entry];
  } else {
    // New skill is just generic category
    updatedTree[category] = [];
  }
  return updatedTree;
}

export function getHigherSkillLevel(
  a: SkillLevel | undefined,
  b: SkillLevel | undefined
): SkillLevel | undefined {
  if (a && b) {
    const indexA = skillLevels.indexOf(a);
    const indexB = skillLevels.indexOf(b);
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

export function encodeSkillTree(tree: SkillTree): string {
  return getAllSkills(tree).map(encodeSkill).join("; ");
}

export function decodeSkill(input: string): Skill {
  const decodeLevel = union(...skillLevels, undef);
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

export function decodeSkillTree(input: string): SkillTree {
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
// Upgrading
//

export function upgradeLegacySkills(
  legacySkills: Omit<LegacySkill, "id">[]
): SkillTree {
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
Analýza / business -> Vývoj / Analýza
Analýza / IT -> Vývoj / Analýza
Architektura / business -> Vývoj / Architektura
Architektura / enterprise -> Vývoj / Architektura
Architektura / solution -> Vývoj / Architektura
Architektura / systémová -> Vývoj / Architektura
Business / development -> Projektové řízení / Business model a development
Business / model -> Projektové řízení / Business model a development
Business / plan -> Projektové řízení / Business model a development
Business / startups -> Projektové řízení / Business model a development
Business / strategic partnership -> Projektové řízení / Business model a development
Design /  mobilní -> Design / Mobile design
Design /  service ->
Design / informační architektura ->
Design / interakční ->
Design / motion ->
Design / přístupnost ->
Design / produktový -> Design / Product design
Design / UI -> Design / UI design
Design / vizuální ->
Design / výzkum a testování -> Design / Research
Design / webu -> Design / Web design
Design / writing ->
Finance / analýza -> Projektové řízení / Finance
Finance / plánování -> Projektové řízení / Finance
Finance / reportování -> Projektové řízení / Finance
Lidské zdroje /  administrativa -> Personalistika / Administrace a nástroje
Lidské zdroje / nábor -> Personalistika / Recruitment
Lidské zdroje / vzdělávání -> Personalistika / Vzdělávání
Management /  development -> Projektové řízení / Business model a development
Management / leadership ->
Management / marketingový ->
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
Strategie / produktová -> Projektové řízení
Strategie / projektová -> Projektové řízení
Vývoj / Android -> Vývoj / Mobilní aplikace (Android, iOS, Flutter, …)
Vývoj / Angular -> Vývoj / Frontend
Vývoj / automatizace ->
Vývoj / Azure, AWS, Google Cloud Platform -> Vývoj / Cloud (Azure, AWS, GCP)
Vývoj / C# ->
Vývoj / C++ ->
Vývoj / Clojure ->
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
