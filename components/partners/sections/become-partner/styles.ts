import styled from "styled-components";
import { BodyBig, Heading2 } from "components/typography";
import { Input } from "components/inputs";
import { TextArea } from "components/inputs/input/styles";
import { Button } from "components/buttons/button/styles";

export const Wrapper = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 45px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  } */
`;

export const CenteredTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  overflow-wrap: anywhere;
`;

export const Subtitle = styled(BodyBig)`
  font-size: 34px;
  a {
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 28px;
  }
`;

export const Title = styled(Heading2)`
  font-size: 58px;
  margin: 16px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 48px;
  }
`;

export const FullWidthInput = styled(Input)`
  width: 100%;
`;

export const FullWidthTextArea = styled(TextArea)`
  resize: vertical;
  width: 100%;
  min-height: 190px;
`;

export const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-gap: 12px;
  }
`;

export const PositionedButton = styled(Button)`
  margin-top: 26px;
`;
