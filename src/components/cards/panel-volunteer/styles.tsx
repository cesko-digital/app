import styled from 'styled-components'

export const Wrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  display: flex;
  flex-direction: column;
  max-width: 769px;
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
  border-radius: 8px 8px 0 0;
`

export const Content = styled.div`
  height: 223px;
  padding: ${({ theme }) => theme.space.lg}px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  color: ${({ theme }) => theme.colors.pebble};
  border-radius: 0 0 8px 8px;
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

export const Description = styled.p`
  margin: 20px 0 23px;
  font-weight: ${({ theme }) => theme.fontWeights.body};
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  line-height: ${({ theme }) => theme.lineHeights.body};
  max-width: 36em;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.small}px;
    margin: 7px 0 18px;
  }
`
export const ButtonLabel = styled.span`
  display: inline-flex;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.darkGrey};
`
