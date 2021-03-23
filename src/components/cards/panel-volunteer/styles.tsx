import styled from 'styled-components'
import { Body } from 'components/typography'

export const Wrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  display: flex;
  flex-direction: column;
  max-width: 769px;
  width: 100%;
`

export const Cover = styled.div`
  display: flex;
`

export const Image = styled.div<{ url: string }>`
  height: 287px;
  width: 100%;
  background-image: url(${({ url }) => url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0% 25%;
  border-radius: ${({ theme }) =>
      `${theme.borderRadius.base}px ${theme.borderRadius.base}px`}
    0 0;
`

export const Content = styled.div`
  height: 223px;
  padding: ${({ theme }) => theme.space.lg}px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  color: ${({ theme }) => theme.colors.pebble};
  border-radius: 0 0
    ${({ theme }) =>
      `${theme.borderRadius.base}px ${theme.borderRadius.base}px`};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px;
  }
`

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.md}px;
  }
`

export const Description = styled(Body)`
  margin: 20px 0 23px;
  max-width: 36em;

  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 7px 0 18px;
  }
`
