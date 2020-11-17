import styled, { css, CssWithTheme } from 'styled-components'
import { default as GatsbyLink } from 'gatsby-link'
import { StyledLinkProps } from '.'
import { ButtonSize } from '../../buttons'

function getDefaultBorderStyle(disabled: boolean) {
  if (disabled) {
    return css`
      border-bottom: 2px solid;
      border-color: ${({ theme }) => theme.colors.pebble};
    `
  }

  return css`
    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.colors.purple};
    }
    border-bottom: 2px solid;
    border-color: ${({ theme }) => theme.colors.lightViolet};
  `
}

function getSmallSizeBorderStyle() {
  return css`
    &:hover,
    &:focus {
      text-decoration: none;
    }
    border: none;
    text-decoration: underline;
  `
}

function getDefaultColor(disabled: boolean) {
  if (disabled) {
    return css`
      color: ${({ theme }) => theme.colors.gravel};
    `
  }

  return css`
    color: ${({ theme }) => theme.colors.darkGrey};
  `
}

function getNormalSizeColor(disabled: boolean) {
  if (disabled) {
    return css`
      color: ${({ theme }) => theme.colors.gravel};
    `
  }

  return css`
    color: ${({ theme }) => theme.colors.it};
  `
}

function getColor({ size, disabled }: StyledLinkProps): CssWithTheme {
  const { Normal } = ButtonSize

  if (size === Normal) {
    return getNormalSizeColor(!!disabled)
  }

  return getDefaultColor(!!disabled)
}

function getBorderStyle({ size, disabled }: StyledLinkProps): CssWithTheme {
  const { Small } = ButtonSize
  if (size === Small) {
    return getSmallSizeBorderStyle()
  }

  return getDefaultBorderStyle(!!disabled)
}

export const Link = styled(GatsbyLink)<StyledLinkProps>`
  ${({ size, disabled }) => applyLinkStyles({ size, disabled })}
`

export const applyLinkStyles = ({
  size,
  disabled,
}: StyledLinkProps): CssWithTheme => {
  const { Normal, Small } = ButtonSize
  return css`
    display: inline-flex;
    text-decoration: none;
    background: none;

    font-family: ${({ theme }) => theme.fonts.body};

    font-weight: ${({ theme }) =>
      size === Small ? 500 : theme.fontWeights.button};

    font-size: ${({ theme }) =>
      size === Normal ? theme.fontSizes.base : theme.fontSizes.small}px;

    line-height: ${({ theme }) => theme.lineHeights.button};

    align-items: center;

    border: none;
    outline: none;

    padding: 0;

    position: relative;

    border-radius: ${({ theme }) => theme.borderRadius.none};

    cursor: ${() => (disabled ? 'not-allowed' : 'pointer')};

    ${getColor({ size, disabled })};
    ${getBorderStyle({ size, disabled })};

    &:hover,
    &:focus {
      font-weight: ${({ theme }) =>
        size === Small ? 300 : theme.fontWeights.button};
    }
  `
}
