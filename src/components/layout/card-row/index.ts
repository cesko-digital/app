import styled from 'styled-components'

export default styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: none;
    padding: 0 ${({ theme }) => theme.space.outer}px;
  }
`
