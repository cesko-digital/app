import styled, { css } from 'styled-components'

export const bodyBase = css`
  margin: 0;
  font-weight: ${({ theme }) => theme.fontWeights.body};
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.darkGrey};
`

export const bodyBigStyles = css`
  font-size: ${({ theme }) => theme.fontSizes.md}px;
`

export const bodyStyles = css`
  font-size: 20px;
`

export const bodySmallStyles = css`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
`

export const BodyBig = styled.p`
  ${bodyBase}
  ${bodyBigStyles}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${bodyStyles}
  }
`

export const Body = styled.p`
  ${bodyBase}
  ${bodyStyles}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${bodySmallStyles}
  }
`

export const BodySmall = styled.p`
  ${bodyBase}
  ${bodySmallStyles}
`
