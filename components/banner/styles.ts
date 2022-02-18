import styled, { css, CssWithTheme } from "styled-components";

export const Section = styled.section`
  color: #fff;
  background: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 20px;
  min-height: 200px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
  }
`;

export const Container = styled.div`
  max-width: ${({ theme }) => theme.contentSize}px;
  padding: 40px 20px 40px 20px;
  margin: auto;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 10px 20px 20px 20px;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => `${theme.space.md}px ${theme.space.md}px`};
  position: relative;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;
