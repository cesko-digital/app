import styled from 'styled-components'

export const AboutSectionWrapper = styled.main`
  margin: 30px 0;
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
