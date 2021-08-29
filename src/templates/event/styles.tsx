import styled from 'styled-components'
import { Heading2 } from '../../components/typography'
import EventCard from '../../page-components/portal-dobrovolnika/event-card'

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

export const CoverFilter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 255, 0.5);
  border-radius: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    border-radius: 0;
  }
`

export const TwoColumnLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 50px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
  }
`

export const MainColumn = styled.div`
  flex-grow: 1;
`

export const ReminderColumn = styled.div`
  max-width: 400px;
  margin-left: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0px;
    max-width: 1024px;
  }
`

export const Container = styled.div`
  margin: 50px 0 50px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 48px -${({ theme }) => theme.space.outer}px;
  }
`

export const CategoryHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

export const Title = styled(Heading2)``

export const CardWrapper = styled.div`
  display: grid; // this fixes collapsed right padding in overflow
  margin: 30px 0 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    overflow-x: scroll;
    margin-top: 8px;
  }
`

export const ProjectCard = styled(EventCard)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-width: 264px;
  }
`
