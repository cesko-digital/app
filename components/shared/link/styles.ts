import styled, { css } from "styled-components";
import { StyledLinkProps } from ".";
import { ButtonSize } from "../buttons";

function getDefaultBorderStyle() {
  return css`
    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.colors.purple};
    }
    border-bottom: 2px solid;
    border-color: ${({ theme }) => theme.colors.lightViolet};
  `;
}

function getSmallSizeBorderStyle() {
  return css`
    &:hover,
    &:focus {
      text-decoration: none;
    }
    border: none;
    text-decoration: underline;
  `;
}

function getDefaultColor() {
  return css`
    color: ${({ theme }) => theme.colors.darkGrey};
  `;
}

function getNormalSizeColor() {
  return css`
    color: ${({ theme }) => theme.colors.it};
  `;
}

function getColor({ size }: StyledLinkProps) {
  const { Normal } = ButtonSize;

  if (size === Normal) {
    return getNormalSizeColor();
  }

  return getDefaultColor();
}

function getBorderStyle({ size }: StyledLinkProps) {
  const { Small } = ButtonSize;
  if (size === Small) {
    return getSmallSizeBorderStyle();
  }

  return getDefaultBorderStyle();
}

export const StyledLink = styled.a<StyledLinkProps>`
  ${({ size }) => applyLinkStyles({ size })}
`;

export const applyLinkStyles = ({ size }: StyledLinkProps) => {
  const { Normal, Small } = ButtonSize;
  return css`
    width: max-content;

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

    cursor: pointer;

    ${getColor({ size })};
    ${getBorderStyle({ size })};
  `;
};
