import styled from 'styled-components'
import { Heading2 } from '../../components/typography'
import EventCard from './event-card'

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

export const CardRow = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: none;
    padding: 0 ${({ theme }) => theme.space.outer}px;
  }
`

export const ProjectCard = styled(EventCard)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-width: 264px;
  }
`

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 22px;
  a {
    text-decoration: none;
  }
`

export const RolesMainWrapper = styled.div`
  margin-top: 18px;
`
