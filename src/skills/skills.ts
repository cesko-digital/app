import { undef, union } from "typescript-json-decoder";

import { unique } from "~/src/utils";

/** All available skill levels we work with */
export const SKILL_LEVELS = ["junior", "medior", "senior", "mentor"] as const;

/** Skill level such as junior, medior, … */
export type SkillLevel = (typeof SKILL_LEVELS)[number];

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
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
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
  skill: Skill,
): SkillSelection {
  const newSelection = { ...selection };
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
  b: SkillLevel | null,
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
  const parts = input.split(/ \/ /);
  if (parts.length > 3) {
    throw new Error(`Invalid number of skill components: “${input}”`);
  }
  const [category, name, level] = parts;
  if (!category) {
    throw new Error("Failed to decode skill category");
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

export function skillsToHashtags(skills: string): string {
  const tags: string[] = [];
  const selection = decodeSkillSelection(skills);

  //
  // Convert top-level categories
  //
  const categoryMap: Record<string, string> = {
    "Marketing": "#marketing",
    "Projektové řízení": "#projektové-řízení",
    "Personalistika": "#hr",
    "Design": "#design",
  };

  for (const category of Object.keys(selection)) {
    if (
      // Have conversion rule
      categoryMap[category] &&
      // There are no skills selected in category
      Object.values(selection[category]).length === 0
    ) {
      tags.push(categoryMap[category]);
    }
  }

  //
  // Convert regular mid-level skills
  //
  for (const categoryName of Object.keys(selection)) {
    const category = selection[categoryName];
    for (const skill of Object.keys(category)) {
      for (const line of conversionTable) {
        const [key, val] = line;
        if (key === `${categoryName} / ${skill}`) {
          tags.push(...val.split(" "));
        }
      }
    }
  }

  return unique(tags).sort().join(" ");
}

export function getMaxSeniority(
  skills: string,
): "junior" | "medior" | "senior" | undefined {
  const selection = decodeSkillSelection(skills);
  const levels = Object.values(selection)
    .flatMap((selection) => Object.values(selection))
    .filter((s) => s !== null);
  if (levels.includes("senior")) {
    return "senior";
  } else if (levels.includes("medior")) {
    return "medior";
  } else if (levels.includes("junior")) {
    return "junior";
  }
  return undefined;
}

const conversionTableSrc = `
Marketing / Analýza marketingových dat -> #marketing
Marketing / Audiovizuální produkce -> #audio #video
Marketing / Event management -> #eventy
Marketing / Marketingová strategie -> #marketing #strategie
Marketing / Copywriting -> #copywriting
Marketing / Public Relations -> #pr
Vývoj / Backend -> #backend
Vývoj / Cloud (Azure, AWS, GCP) -> #cloud
Vývoj / Databáze -> #databáze
Vývoj / DevOps -> #devops
Vývoj / Docker a Kubernetes -> #devops
Vývoj / Frontend -> #frontend
Vývoj / HTML & CSS -> #html #css
Vývoj / Java a Kotlin -> #java #kotlin
Vývoj / JavaScript + TypeScript -> #javascript #typescript
Vývoj / Mobilní aplikace (Android, iOS, Flutter, …) -> #mobile
Vývoj / Node.js -> #node
Vývoj / PHP -> #php
Vývoj / Python -> #python
Vývoj / React -> #react
Vývoj / Testování -> #testování
Vývoj / WordPress -> #wordpress
Projektové řízení / Business model a development -> #projektové-řízení
Projektové řízení / Finance -> #finance
Projektové řízení / Fundraising -> #fundraising
Projektové řízení / Product Owner -> #product-owner
Projektové řízení / Scrum Master -> #scrum
Personalistika / Community management -> #komunity
Personalistika / Recruitment -> #hr
Design / Mobile design -> #design
Design / Research -> #design #výzkum
Design / UI design -> #design #ui
Design / UX design -> #design #ux
Design / Web design -> #design
`;

const conversionTable = conversionTableSrc
  .split(/\n/)
  .map((line) => line.split(" -> "));
