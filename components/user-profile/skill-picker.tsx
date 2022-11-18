import {
  SKILL_LEVELS,
  SkillLevel,
  SkillMenu,
  SkillSelection,
  SubSkillSelection,
} from "lib/skills";

export type SkillPickerProps = {
  /** All skills the user can select from */
  skillMenu: SkillMenu;
  /** Current skill selection */
  selection?: SkillSelection;
  onChange?: (selection: SkillSelection) => void;
  disabled?: boolean;
};

/** Display a three-level skill selection menu */
export const SkillPicker: React.FC<SkillPickerProps> = ({
  skillMenu,
  disabled = false,
  selection = {},
  onChange = (_) => {},
}) => {
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
    <ul className="list-none ml-0 leading-loose">
      {Object.entries(skillMenu).map(([category, skills]) => (
        <li key={category}>
          <label className="flex items-center">
            <input
              type="checkbox"
              disabled={disabled}
              onChange={(e) => updateSelection(category, e.target.checked)}
              checked={!!selection[category]}
              className="mr-2 shrink-0 self-start mt-[1.5ex]"
            ></input>
            {category}
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
    <ul className="list-none">
      {skills.map((skill) => (
        <li key={skill}>
          <label className="flex items-center">
            <input
              type="checkbox"
              disabled={disabled}
              checked={selection[skill] !== undefined}
              onChange={(e) => updateSelection(skill, e.target.checked)}
              className="mr-2 mt-[1.5ex] self-start shrink-0"
            ></input>
            {skill}
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
    <div className="text-base py-2">
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
  key: K
): Record<K, V> {
  const value = { ...object };
  delete value[key];
  return value;
}

function objectByAdding<K extends string, V>(
  object: Record<K, V>,
  key: K,
  value: V
): Record<K, V> {
  return { ...object, [key]: value };
}
