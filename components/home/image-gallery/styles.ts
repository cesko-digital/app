import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1760px;
  margin: auto;
  padding: 32px 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 96px 32px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 130px 32px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 400px);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(2, 160px);
  }
  grid-gap: 16px;
`;
