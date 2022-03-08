import styled from "styled-components";
import { InputErrorProps } from "./index";

export const InputError = styled.span<InputErrorProps>`
  color: ${({ dark, theme }) =>
    dark ? theme.colors.orange : theme.colors.darkRed};
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  font-family: ${({ theme }) => theme.fonts.body};
`;
