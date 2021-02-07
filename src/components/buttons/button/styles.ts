import styled, { css, CssWithTheme } from 'styled-components'
import { ButtonSize } from './enums'

export interface StyledButtonProps {
  // https://styled-components.com/docs/api#transient-props
  $inverted?: boolean
  size: ButtonSize
  disabled?: boolean
}

const { Normal } = ButtonSize

function getDefaultColorStyle(disabled: boolean) {
  if (disabled) {
    return css`
      background: ${({ theme }) => theme.colors.gravel};
      color: ${({ theme }) => theme.colors.white};
    `
  }

  return css`
    &:hover {
      background-color: ${({ theme }) => theme.colors.darkIt};
    }
    background-color: ${({ theme }) => theme.colors.it};
    color: ${({ theme }) => theme.colors.white};
  `
}

function getInvertedColorStyle(disabled: boolean) {
  if (disabled) {
    return css`
      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.gravel};
    `
  }

  return css`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.it};
  `
}

function getColorStyle({
  $inverted,
  disabled,
}: StyledButtonProps): CssWithTheme {
  return $inverted
    ? getInvertedColorStyle(!!disabled)
    : getDefaultColorStyle(!!disabled)
}

function getBoxShadow({ disabled }: StyledButtonProps): CssWithTheme {
  if (disabled) {
    return css`
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(8, 8, 49, 0.12);
    `
  }

  return css`
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(8, 8, 49, 0.12);

    &:hover,
    &:focus {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18), 0 1px 2px rgba(8, 8, 49, 0.12);
    }
  `
}

export const applyButtonStyles = ({
  size,
  disabled,
  $inverted,
}: StyledButtonProps): CssWithTheme => {
  return css`
    display: inline-flex;

    font-family: ${({ theme }) => theme.fonts.body};

    height: ${() => (size === Normal ? 52 : 30)}px;

    padding: 0 ${() => (size === Normal ? 30 : 14)}px;

    font-weight: ${({ theme }) => theme.fontWeights.button};
    line-height: ${({ theme }) => theme.lineHeights.button};

    align-items: center;

    border: none;
    outline: none;

    position: relative;

    text-decoration: none;

    ${getColorStyle({ size, disabled, $inverted })};
    ${getBoxShadow({ size, disabled, $inverted })};

    cursor: ${() => (disabled ? 'not-allowed' : 'pointer')};

    font-size: ${({ theme }) =>
      size === Normal ? theme.fontSizes.base : theme.fontSizes.small}px;

    border-radius: ${({ theme }) => theme.borderRadius.base}px;
    &:focus {
      ::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: -${({ theme }) => theme.borderWidth.normal}px;
        left: -${({ theme }) => theme.borderWidth.normal}px;
        border: ${({ theme }) => theme.borderWidth.normal}px solid
          ${({ theme }) => theme.colors.violet};
        border-radius: ${({ theme }) =>
          theme.borderRadius.base + theme.borderWidth.normal}px;
      }
    }
  `
}

export const Button = styled.button<StyledButtonProps>`
  ${({ size, disabled, $inverted }) =>
    applyButtonStyles({
      size,
      disabled,
      $inverted,
    })}
`
