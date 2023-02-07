import { undef, union } from "typescript-json-decoder";

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
  const parts = input.split(/ \/ /);
  if (parts.length > 3) {
    throw `Invalid number of skill components: “${input}”`;
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
