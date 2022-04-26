import { Body, Heading2 } from "components/typography";
import { Skill } from "lib/airtable/skills";
import { unique } from "lib/utils";
import { useState } from "react";
import styled from "styled-components";

export type SkillBoxProps = {
  /** All available skills */
  allSkills: Skill[];
  /** IDs of the skills selected by user */
  userSkillIds: string[];
  /** Called when selected skills change */
  onChange: (skills: Skill[]) => void;
};

export const SkillBox: React.FC<SkillBoxProps> = ({
  userSkillIds,
  allSkills,
  onChange,
}) => {
  const userSkills = allSkills.filter((skill) =>
    userSkillIds.includes(skill.id)
  );
  const [selectedSkills, setSelectedSkills] = useState(userSkills);
  const fields = unique(allSkills.map((skill) => skill.field));

  const toggleSkill = (skill: Skill) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((other) => other.id !== skill.id)
      : [skill, ...selectedSkills];
    setSelectedSkills(newSkills);
    onChange(newSkills);
  };

  const skillsForField = (field: string) =>
    allSkills
      .filter((skill) => skill.field === field)
      .sort((a, b) => a.name.localeCompare(b.name));

  const hasSelectedSkills = (field: string) =>
    skillsForField(field).some((skill) => selectedSkills.includes(skill));

  return (
    <div style={{ marginBottom: "20px" }}>
      <Body style={{ marginBottom: "20px" }}>
        Co byste chtěli v Česko.Digital dělat? Dejte nám to vědět, ať vám můžeme
        různými kanály nabízet relevantnější příležitosti. <i>(Copy TBD)</i>
      </Body>

      {fields.map((field) => (
        <div key={field}>
          <Heading2
            style={{
              marginBottom: "20px",
              display: "inline-block",
              background: hasSelectedSkills(field) ? "#FFF6A3" : "inherit",
            }}
          >
            {field}
          </Heading2>
          <div style={{ lineHeight: "3ex", marginBottom: "20px" }}>
            {skillsForField(field).map((skill) => (
              <SkillPill
                key={skill.id}
                skill={skill}
                onClick={toggleSkill}
                checked={selectedSkills.some((s) => s.id === skill.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

type SkillPillProps = {
  skill: Skill;
  checked: boolean;
  onClick?: (skill: Skill) => void;
};

const SkillPill: React.FC<SkillPillProps> = ({
  skill,
  checked: checkedInitially,
  onClick = (sender: Skill) => {},
}) => {
  const [checked, setChecked] = useState(checkedInitially);
  const toggle = () => {
    setChecked(!checked);
    onClick(skill);
  };
  return (
    <AnimatedSpan
      onClick={toggle}
      style={{
        display: "inline-block",
        background: checked ? "blue" : "#eee",
        color: checked ? "white" : "black",
        padding: "1ex 2ex 1ex 2ex",
        borderRadius: "8px",
        marginRight: "2ex",
        marginBottom: "2ex",
        cursor: "pointer",
      }}
    >
      {skill.name}
    </AnimatedSpan>
  );
};

const AnimatedSpan = styled.span`
  transition: transform 0.1s;
  &:active {
    transform: scale(0.9);
  }
`;
