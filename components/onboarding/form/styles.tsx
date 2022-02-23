import styled from "styled-components";
import { CheckboxWrapper } from "components/onboarding/form/checkbox/styles";
import { ValidationMessage } from "components/onboarding/form/input/styles";
import SkillTree, {
  Props as SkillTreeProps,
} from "components/onboarding/skill-tree";

export const Form = styled.form`
  max-width: 670px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding-top: 32px;
  margin-top: 22px;
  border-top: 2px solid rgba(169, 169, 177, 0.25);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: center;

    ${CheckboxWrapper} {
      margin-bottom: 0;
    }
  }
`;

export const FormValidationError = styled(ValidationMessage)`
  margin-top: 8px;
`;

const getErrorStyles = ({ skills }: { skills: SkillTreeProps["skills"] }) =>
  skills.length === 0 &&
  `
  margin: 0;
  min-height: 0;
  transition: 0.2s all linear;
`;

export const StyledSkillTree = styled(SkillTree)`
  position: relative;
  transition: 3s all linear;
  max-height: 5000px;
  min-height: 80px;
  overflow: hidden;
  ${({ skills }) => getErrorStyles({ skills })}

  &:after {
    content: "";
    pointer-events: none;
    opacity: 0;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.base}px;
    background-color: #cbcbcf;
    transition: 0.2s all linear;
  }
`;
