import { useState } from "react";

/** All available skill levels we work with */
const skillLevels = ["junior", "medior", "senior", "mentor"] as const;

/** Skill level such as junior, medior, … */
export type SkillLevel = typeof skillLevels[number];

/** The complete menu of skills that the user can select from */
export type SkillMenu = Record<string, string[]>;

/** A list of skills selected by user */
export type SkillSelection = Record<string, SubSkillSelection>;

export type SkillPickerProps = {
  /** All skills the user can select from */
  skillMenu: SkillMenu;
  disabled?: boolean;
  initialSelection?: SkillSelection;
  onChange?: (selection: SkillSelection) => void;
};

/** Display a three-level skill selection menu */
export const SkillPicker: React.FC<SkillPickerProps> = ({
  skillMenu,
  disabled = false,
  initialSelection = {},
  onChange = (_) => {},
}) => {
  const [selection, setSelection] = useState<SkillSelection>(initialSelection);

  // Update main selection, called when user (un)checks main category
  const updateSelection = (category: string, checked: boolean) => {
    const newState = checked
      ? objectByAdding(selection, category, {})
      : objectByDeleting(selection, category);
    setSelection(newState);
    onChange(newState);
  };

  // Update subselection, called when user changes selection inside category
  const updateSubSelection = (category: string, skills: SubSkillSelection) => {
    const newState = { ...selection, [category]: skills };
    setSelection(newState);
    onChange(newState);
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
              defaultChecked={!!selection[category]}
              className="mr-2"
            ></input>
            {category}
          </label>
          {selection[category] && (
            <SubSkillPicker
              skills={skills}
              disabled={disabled}
              initialSelection={selection[category]}
              onChange={(skills) => updateSubSelection(category, skills)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

type SubSkillSelection = Record<string, SkillLevel | null>;

type SubSkillPickerProps = {
  skills: string[];
  disabled?: boolean;
  initialSelection?: SubSkillSelection;
  onChange?: (skills: SubSkillSelection) => void;
};

/** Pick subskill such as “Java” (for developers) or “Web design” (for designers) */
const SubSkillPicker: React.FC<SubSkillPickerProps> = ({
  skills,
  disabled = false,
  initialSelection = {},
  onChange = (_) => {},
}) => {
  const [selection, setSelection] =
    useState<SubSkillSelection>(initialSelection);

  // Update main selection, called when user (un)check a particular subskill
  const updateSelection = (skill: string, checked: boolean) => {
    const newState = checked
      ? objectByAdding(selection, skill, null)
      : objectByDeleting(selection, skill);
    setSelection(newState);
    onChange(newState);
  };

  // Update skill level, called when user changes level selection for a subskill
  const updateLevel = (skill: string, level: SkillLevel) => {
    const newState = { ...selection, [skill]: level };
    setSelection(newState);
    onChange(newState);
  };

  return (
    <ul className="list-none">
      {skills.map((skill) => (
        <li key={skill}>
          <label className="flex items-center">
            <input
              type="checkbox"
              disabled={disabled}
              defaultChecked={!!selection[skill]}
              onChange={(e) => updateSelection(skill, e.target.checked)}
              className="mr-2"
            ></input>
            {skill}
          </label>
          {selection[skill] !== undefined && (
            <LevelPicker
              namespace={skill}
              disabled={disabled}
              initialValue={selection[skill]}
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
  initialValue: SkillLevel | null;
  onChange?: (level: SkillLevel) => void;
};

/** Pick skill level such as junior, medior, … */
const LevelPicker: React.FC<LevelPickerProps> = ({
  namespace,
  disabled = false,
  initialValue = null,
  onChange = (_) => {},
}) => {
  return (
    <div className="text-base py-2">
      {skillLevels.map((level) => (
        <div key={level} className="inline-block pl-4">
          <label>
            <input
              type="radio"
              value={level}
              disabled={disabled}
              defaultChecked={level === initialValue}
              name={`${namespace}-level`}
              className="mr-2"
              onChange={(_) => onChange(level)}
            />
            {level}
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
  const value = object;
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
