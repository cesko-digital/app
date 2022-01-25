import styled from 'styled-components'
import { Heading1, BodyBig, Body } from 'components/typography'

export const Heading = styled(Heading1)`
  margin: 50px 0 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 38px;
  }
`
export const Tagline = styled(BodyBig)`
  margin-bottom: 60px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 28px;
  }
`
export const PaddedBody = styled(Body)`
  padding: 34px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px 0;
  }
`
