import styled, { css } from "styled-components";
import { Section } from "components/layout";

export const CustomSection = styled(Section)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: relative;
    z-index: 5;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const sectionDivider = css`
  &:after {
    content: "";
    position: absolute;
    top: 22px;
    bottom: 0;
    right: -2px;
    width: 2px;
    height: 36px;
    background-color: rgba(8, 8, 49, 0.1);
  }
`;

export const Item = styled.dl`
  flex: 25%;
  box-sizing: border-box;
  padding: 0 24px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 8px;
  }
  &:not(:last-of-type) {
    position: relative;
    ${sectionDivider}
  }
`;

export const Value = styled.dt`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: ${({ theme }) => theme.fontSizes.xxl}px;
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  text-align: center;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.l}px;
    font-weight: ${({ theme }) => theme.fontWeights.button};
  }
`;

export const Subtitle = styled.dd`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: 20px;
  text-align: center;
  margin: 16px 0 0 0;
`;
