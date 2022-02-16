import SkillFieldToggle from "./skill-field-toggle";
import { Spinner } from "components/onboarding/styles";
import * as S from "./styles";
import { Field } from "lib/skills";

export interface Props extends React.HTMLAttributes<HTMLUListElement> {
  selected: string[];
  skills: Field[];
  handleChange: (id: string) => void;
  fetching: boolean;
}

const SkillTree = (props: Props) => {
  return (
    <S.TreeList className={props.className}>
      {props.fetching && (
        <li>
          <Spinner background="#cbcbcf" />
        </li>
      )}
      {props.skills.map((skillField) => (
        <S.TreeListItem key={skillField.name}>
          <SkillFieldToggle
            skillField={skillField}
            selected={props.selected}
            handleChange={props.handleChange}
          />
        </S.TreeListItem>
      ))}
    </S.TreeList>
  );
};

export default SkillTree;
