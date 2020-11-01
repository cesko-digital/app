import styled from 'styled-components'

export const Card = styled.section`
  max-width: 768px;
  border-radius: ${({ theme }) => theme.borderRadius.base}px;
  overflow: hidden;
`

export const Cover = styled.div<{ url: string }>`
  height: 287px;
  width: 100%;
  background-image: url(${({ url }) => url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

export const Content = styled.div`
  padding: ${({ theme }) => theme.space.lg}px;
  padding-top: 30px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  color: ${({ theme }) => theme.colors.pebble};
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
  margin: 10px 0 23px;
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
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.darkGrey};
`
