import styled from 'styled-components'

export const Grid = styled.div`
  margin: 44px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 48px 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 38px 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`
