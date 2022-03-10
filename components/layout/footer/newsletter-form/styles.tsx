import styled from "styled-components";
import { Input as InputComponent, InputError } from "components/inputs";
import { Button as ButtonComponent } from "components/buttons";
import { MailIcon } from "components/icons";
import { Heading } from "../styles";
import { heading3Styles, headingBase } from "components/typography";

export const Container = styled.section`
  grid-area: newsletter;

  background-position: top right;
  background-repeat: no-repeat;
  @media (min-width: ${({ theme }) =>
      theme.breakpoints.md}) and (max-width: ${({ theme }) =>
      theme.breakpoints.lg}) {
    background-image: none;
  }
`;

export const Info = styled.p`
  ${headingBase}
  ${heading3Styles}
  max-width: 480px;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.space.lg}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
`;

export const Form = styled.form`
  display: grid;
  grid-template-areas: "input button" "message message";
  grid-template-rows: auto auto;
  grid-template-columns: 316px auto;
  grid-gap: ${({ theme }) => theme.space.md}px
    ${({ theme }) => theme.space.md * 1.5}px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-areas: "input" "button" "message";
    grid-template-rows: auto;
    grid-template-columns: min(316px, 100%);
  }
`;

export const FormControl = styled.div`
  flex: 1;
  grid-area: input;
`;

export const Input = styled(InputComponent).attrs(() => ({
  dark: true,
}))`
  width: 100%;
`;

export const ErrorMessage = styled(InputError).attrs(() => ({
  dark: true,
}))`
  grid-area: message;
`;

export const Button = styled(ButtonComponent)`
  grid-area: button;
  justify-content: center;
  height: ${({ theme }) => theme.controlHeights.normal}px;
`;

export const Icon = styled(MailIcon)`
  float: right;
`;

export const SubscribeDoneWrapper = styled.div`
  background-color: #ddf0e3;
  border: 2px solid #006622;
  box-shadow: 0px 0px 0px 4px rgba(0, 102, 34, 0.1);
  border-radius: 8px;
  position: relative;
  color: #006622;
  padding: 16px;
  display: flex;
`;

export const CheckIconWrapper = styled.div`
  padding-right: 12px;
`;

export { Heading };
