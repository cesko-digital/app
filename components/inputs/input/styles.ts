import styled, { css, CssWithTheme, DefaultTheme } from "styled-components";
import { StyledInputProps } from "./index";
import { transparentize } from "polished";
import { bodyBase, bodySmallStyles } from "components/typography";

function getBorderColor(
  { dark, invalid }: StyledInputProps,
  theme: DefaultTheme
): string {
  if (dark) {
    return invalid ? theme.colors.orange : theme.colors.martinique;
  }
  return invalid ? theme.colors.darkRed : theme.colors.gravel;
}

function getBorderStyle({ dark, invalid }: StyledInputProps): CssWithTheme {
  return css`
    border-width: ${({ theme }) => theme.borderWidth.normal}px;
    border-style: solid;
    border-color: ${({ theme }) => getBorderColor({ dark, invalid }, theme)};
  `;
}

function getBoxShadowStyle({ dark, invalid }: StyledInputProps): CssWithTheme {
  if (invalid) {
    return css`
      box-shadow: 0 0 0 ${({ theme }) => theme.borderWidth.normal * 2}px
        ${({ theme }) =>
          transparentize(
            0.9,
            dark ? theme.colors.orange : theme.colors.darkRed
          )};
    `;
  }
  return css``;
}

function getPlaceholderStyle(color: string): CssWithTheme {
  return css`
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${color};
    }
    :-ms-input-placeholder {
      color: ${color};
    }
  `;
}

function getColorStyle({ dark }: StyledInputProps): CssWithTheme {
  if (dark) {
    return css`
      background: ${({ theme }) => theme.colors.martinique};
      color: ${({ theme }) => theme.colors.white};
      ${({ theme }) => getPlaceholderStyle(theme.colors.gravel)}
    `;
  }

  return css`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.darkGrey};
    ${({ theme }) => getPlaceholderStyle(theme.colors.gravel)}
  `;
}

export const applyInputStyles = ({
  dark,
  invalid,
}: StyledInputProps): CssWithTheme => {
  return css`
    ${getColorStyle({ dark, invalid })};

    ${getBorderStyle({ dark, invalid })};
    border-radius: ${({ theme }) => theme.borderRadius.base}px;

    ${getBoxShadowStyle({ dark, invalid })};

    box-sizing: border-box;
    padding: ${({ theme }) =>
        theme.space.base * 1.5 - theme.borderWidth.normal}px
      ${({ theme }) => theme.space.base * 2.5}px;
    outline: 0;
    line-height: ${({ theme }) =>
      theme.controlHeights.normal - theme.space.base * 3}px;

    font-size: ${({ theme }) => theme.fontSizes.base}px;
    font-family: ${({ theme }) => theme.fonts.body};
  `;
};

export const Input = styled.input<StyledInputProps>`
  ${({ dark, invalid }) =>
    applyInputStyles({
      dark,
      invalid,
    })}
`;

export const TextArea = styled.textarea<StyledInputProps>`
  ${({ dark, invalid }) =>
    applyInputStyles({
      dark,
      invalid,
    })}
`;

export const InputLabel = styled.label`
  ${bodyBase}
  ${bodySmallStyles}
  font-weight: ${({ theme }) => theme.fontWeights.button};
  display: block;
  margin: 12px 0;
`;
