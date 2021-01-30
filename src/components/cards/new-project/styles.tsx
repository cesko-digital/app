import styled from 'styled-components'

export const Wrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 308px;
  min-height: 508px;
  border: ${({ theme }) => `2px solid ${theme.colors.lightGray}`};
  border-radius: 8px;
  padding: 32px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 24px;
  }
`

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  color: ${({ theme }) => theme.colors.darkGrey};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  text-align: left;
  font-weight: bold;
  margin: 60px 0 0 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
  }
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  color: ${({ theme }) => theme.colors.darkGrey};
  line-height: ${({ theme }) => theme.lineHeights.body};
  text-align: left;
  font-weight: normal;
  margin: 0;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`
