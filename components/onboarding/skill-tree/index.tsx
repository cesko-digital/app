import SkillFieldToggle from "./skill-field-toggle";
import * as S from "./styles";
import { Field } from "lib/skills";

export interface Props extends React.HTMLAttributes<HTMLUListElement> {
  selected: string[];
  skills: Field[];
  handleChange: (id: string) => void;
  disabled: boolean;
}

const SkillTree = (props: Props) => {
  return (
    <S.TreeList className={props.className}>
      {props.skills.map((skillField) => (
        <S.TreeListItem key={skillField.name}>
          <SkillFieldToggle
            id={skillField.name}
            skillField={skillField}
            selectedIds={props.selected}
            handleChange={props.handleChange}
            disabled={props.disabled}
          />
        </S.TreeListItem>
      ))}
    </S.TreeList>
  );
};

export default SkillTree;
