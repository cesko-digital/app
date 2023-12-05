import {
  SKILL_LEVELS,
  type SkillLevel,
  type SkillMenu,
  type SkillSelection,
  type SubSkillSelection,
} from "~/src/skills";

/** Skill selection tree widget */
export type SkillPickerProps = {
  /** All skills the user can select from */
  skillMenu: SkillMenu;
  /** Current skill selection */
  selection?: SkillSelection;
  onChange?: (selection: SkillSelection) => void;
  disabled?: boolean;
};

/** Display a three-level skill selection menu */
export const SkillPicker = ({
  skillMenu,
  disabled = false,
  selection = {},
  onChange = (_) => {},
}: SkillPickerProps) => {
  // Update main selection, called when user (un)checks main category
  const updateSelection = (category: string, checked: boolean) => {
    const newSelection = checked
      ? objectByAdding(selection, category, {})
      : objectByDeleting(selection, category);
    onChange(newSelection);
  };

  // Update subselection, called when user changes selection inside category
  const updateSubSelection = (category: string, skills: SubSkillSelection) => {
    const newSelection = { ...selection, [category]: skills };
    onChange(newSelection);
  };

  return (
    <ul className="ml-0 list-none leading-loose">
      {Object.entries(skillMenu).map(([category, skills]) => (
        <li key={category}>
          <label className="flex items-center">
            <input
              type="checkbox"
              disabled={disabled}
              onChange={(e) => updateSelection(category, e.target.checked)}
              checked={!!selection[category]}
              className="mr-3 mt-[1.5ex] shrink-0 self-start"
            ></input>
            <span className={selection[category] ? "font-bold" : ""}>
              {category}
            </span>
          </label>
          {selection[category] && (
            <SubSkillPicker
              skills={skills}
              disabled={disabled}
              selection={selection[category]}
              onChange={(skills) => updateSubSelection(category, skills)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

type SubSkillPickerProps = {
  skills: string[];
  disabled?: boolean;
  selection?: SubSkillSelection;
  onChange?: (skills: SubSkillSelection) => void;
};

/** Pick subskill such as “Java” (for developers) or “Web design” (for designers) */
const SubSkillPicker: React.FC<SubSkillPickerProps> = ({
  skills,
  disabled = false,
  selection = {},
  onChange = (_) => {},
}) => {
  // Update main selection, called when user (un)checks a particular subskill
  const updateSelection = (skill: string, checked: boolean) => {
    const newSelection = checked
      ? objectByAdding(selection, skill, null)
      : objectByDeleting(selection, skill);
    onChange(newSelection);
  };

  // Update skill level, called when user changes level selection for a subskill
  const updateLevel = (skill: string, level: SkillLevel) => {
    const newSelection = { ...selection, [skill]: level };
    onChange(newSelection);
  };

  return (
    <ul className="ml-6 list-none">
      {skills.map((skill) => (
        <li key={skill}>
          <label className="flex items-center">
            <input
              type="checkbox"
              disabled={disabled}
              checked={selection[skill] !== undefined}
              onChange={(e) => updateSelection(skill, e.target.checked)}
              className="mr-3 mt-[1.5ex] shrink-0 self-start"
            ></input>
            <span className={selection[skill] !== undefined ? "font-bold" : ""}>
              {skill}
            </span>
          </label>
          {selection[skill] !== undefined && (
            <LevelPicker
              namespace={skill}
              disabled={disabled}
              value={selection[skill]}
              onChange={(level) => updateLevel(skill, level)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

type LevelPickerProps = {
  namespace: string;
  disabled?: boolean;
  value: SkillLevel | null;
  onChange?: (level: SkillLevel) => void;
};

/** Pick skill level such as junior, medior, … */
const LevelPicker: React.FC<LevelPickerProps> = ({
  namespace,
  disabled = false,
  value = null,
  onChange = (_) => {},
}) => {
  return (
    <div className="py-2 text-base">
      {SKILL_LEVELS.map((level) => (
        <div key={level} className="inline-block pl-4">
          <label>
            <input
              type="radio"
              value={level}
              disabled={disabled}
              checked={level === value}
              name={`${namespace}-level`}
              className="mr-2"
              onChange={(_) => onChange(level)}
            />
            {level === "mentor" ? "senior + mentor" : level}
          </label>
        </div>
      ))}
    </div>
  );
};

//
// Helpers
//

function objectByDeleting<K extends string, V>(
  object: Record<K, V>,
  key: K,
): Record<K, V> {
  const value = { ...object };
  delete value[key];
  return value;
}

function objectByAdding<K extends string, V>(
  object: Record<K, V>,
  key: K,
  value: V,
): Record<K, V> {
  return { ...object, [key]: value };
}
