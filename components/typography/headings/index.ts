import styled, { css } from "styled-components";

export const headingBase = css`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkGrey};
  font-weight: ${({ theme }) => theme.fontWeights.heading};
`;

export const heading2Styles = css`
  font-size: ${({ theme }) => theme.fontSizes.xxl}px;
  line-height: ${({ theme }) => theme.lineHeights.heading};
`;

export const heading3Styles = css`
  font-size: ${({ theme }) => theme.fontSizes.l}px;
  line-height: ${({ theme }) => theme.lineHeights.heading};
`;

export const heading4Styles = css`
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  line-height: ${({ theme }) => theme.lineHeights.body};
`;

export const Heading1 = styled.h1`
  ${headingBase}

  font-size: ${({ theme }) => theme.fontSizes.xxxl}px;
  line-height: ${({ theme }) => theme.lineHeights.heading};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${heading2Styles}
  }
`;

export const Heading2 = styled.h2`
  ${headingBase}
  ${heading2Styles}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${heading3Styles}
  }
`;

export const Heading3 = styled.h3`
  ${headingBase}
  ${heading3Styles}


  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${heading4Styles}
  }
`;

export const Heading4 = styled.h4`
  ${headingBase}
  ${heading4Styles}
`;
