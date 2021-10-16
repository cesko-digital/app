import styled from 'styled-components'

export const CoverImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  margin-top: 50px;
  position: relative;
  max-height: 560px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 24px -20px -20px -20px;
    border-radius: 0;
  }
`

export const CoverImage = styled.img`
  width: 100%;
  filter: grayscale(100%);
`
