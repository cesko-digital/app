import React, { useState, useEffect } from "react";
import Strings from "../strings.json";
import * as S from "./styles";
import { Field } from "lib/airtable/skills";

export interface Props {
  skillField: Field;
  id: string;
  selectedIds: string[];
  handleChange: (id: string) => void;
  disabled: boolean;
}

const SkillFieldToggle = (props: Props) => {
  const contentRef: React.RefObject<HTMLDivElement> = React.createRef();
  const [toggle, setToggle] = useState<boolean>(false);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const isSelected = (id: string) => props.selectedIds.indexOf(id) !== -1;

  useEffect(() => {
    const isSelected = (id: string) => props.selectedIds.indexOf(id) !== -1;
    const calculateSelectedCount = () =>
      (props.skillField.skills || [])
        .map((s) => s.id)
        .reduce((count, s) => {
          return isSelected(s) ? ++count : count;
        }, 0);

    setSelectedCount(calculateSelectedCount());
  }, [props.selectedIds, props.skillField]);

  const skills =
    props.skillField.skills && props.skillField.skills.length
      ? props.skillField.skills
      : [];

  const Skills = () => (
    <S.SkillsList>
      {skills.map((skill) => (
        <S.SkillsListItem key={skill.id}>
          <S.SkillCheckbox
            id={skill.id}
            label={skill.name}
            onChange={onCheckboxChange}
            checked={isSelected(skill.id)}
            disabled={props.disabled}
          />
        </S.SkillsListItem>
      ))}
    </S.SkillsList>
  );

  const getCountTemplateString = (count: number) =>
    (Strings as any)[`skills_selected_${count}`].replace(
      /(\%{count})/g,
      selectedCount
    );

  const SelectedCount = () => {
    let templateString = getCountTemplateString(1);
    if (selectedCount > 1) {
      templateString = getCountTemplateString(2);
    }
    if (selectedCount > 4) {
      templateString = getCountTemplateString(5);
    }
    return <S.SelectedCountLabel>{templateString}</S.SelectedCountLabel>;
  };

  const onToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggle(e.target.checked);
    const element = contentRef.current;
    if (element === null) return;
    // hide/show content on the transition end
    if (e.target.checked) {
      element.style.display = "block";
      setTimeout(() => {
        element.style.maxHeight = "1000px";
        element.style.opacity = "1";
      }, 10);
    } else {
      element.addEventListener(
        "transitionend",
        () => {
          element.style.display = "none";
        },
        { once: true }
      );
      element.style.maxHeight = "0";
      element.style.opacity = "0";
    }
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.handleChange(e.target.id);
  };

  const { id } = props;

  return (
    <>
      <S.ToggleInput type="checkbox" id={id} onChange={onToggleChange} />
      <S.ToggleLabel htmlFor={id}>
        <S.ToggleIcon />
        {props.skillField.name}
      </S.ToggleLabel>
      {selectedCount > 0 && <SelectedCount />}
      <S.ToggleContent
        aria-hidden={!toggle}
        ref={contentRef}
        style={{ maxHeight: 0, opacity: 0 }}
      >
        <S.ToggleContentContainer>
          <Skills />
          {props.skillField.seniorSkillId && (
            <S.SkillCheckbox
              separated
              id={props.skillField.seniorSkillId}
              label={Strings.skills_senior}
              onChange={onCheckboxChange}
              checked={isSelected(props.skillField.seniorSkillId)}
              disabled={props.disabled}
            />
          )}
          {props.skillField.mentorSkillId && (
            <S.SkillCheckbox
              separated
              id={props.skillField.mentorSkillId}
              label={Strings.skills_mentor}
              onChange={onCheckboxChange}
              checked={isSelected(props.skillField.mentorSkillId)}
              disabled={props.disabled}
            />
          )}
        </S.ToggleContentContainer>
      </S.ToggleContent>
    </>
  );
};

export default SkillFieldToggle;
