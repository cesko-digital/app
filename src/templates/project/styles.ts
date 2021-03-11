import { BodyBig } from 'components/typography'
import styled from 'styled-components'

export const AboutSectionWrapper = styled.div`
  display: flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 100px 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column-reverse;
  }
`
export const DescriptionWrapper = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 5;
    margin-right: 60px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-right: 100px;
  }
`
export const ProjectCardWrapper = styled.div`
  flex: 2;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 48px;
  }
`

export const Tagline = styled(BodyBig)`
  margin: 16px 0;
`

export const CoverImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  margin-top: 50px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 24px -20px -20px -20px;
    border-radius: 0;
  }
`

export const CoverImage = styled.img`
  width: 100%;
  max-height: 560px;
`
