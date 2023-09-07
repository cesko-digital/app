import styled from 'styled-components'

export const BlogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 40px 0;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    > * {
      &:not(:first-child) {
        padding-top: 20px;
      }
    }
  }
`
