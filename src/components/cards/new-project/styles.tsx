import styled from 'styled-components'

export const Wrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  display: flex;
  flex-direction: column;
  max-width: 370px;
  border: ${({ theme }) => `2px solid ${theme.colors.lightGray}`};
  border-radius: 8px;
  padding: 30px;
`

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-align: left;
  font-weight: bold;
  max-width: 50%;
  margin: 60px 0 0 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
  }
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-align: left;
  font-weight: normal;
  margin: 20px 0 0 0;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 30px 0 0 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`
