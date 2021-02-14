import React from 'react'
import ProjectCard from 'components/cards/project'
import styled from 'styled-components'

interface Props {}

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 16px;
  margin-top: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const data = [
  {
    id: '1',
    title: 'Našipolitici.cz',
    description:
      'Největší otevřená databáze českých politiků a političek. Zjistěte si, kdo vám vládne.',
    cover: 'https://via.placeholder.com/400x200',
    logo: 'https://via.placeholder.com/100',
    link: '/sdf',
    tags: ['#javascript', '#go', '#web', '#politika'],
  },
  {
    id: '2',
    title: 'Cityvizor',
    description:
      'Transparentní hospodaření pro každou obec, vizualizace rozpočtu až na úroveň jednotlivých faktur.',
    cover: 'https://via.placeholder.com/400x200',
    logo: 'https://via.placeholder.com/100',
    link: '/sdf',
    tags: ['#pascal', '#html', '#ios'],
  },
  {
    id: '3',
    title: 'Našipolitici.cz',
    description:
      'Největší otevřená databáze českých politiků a političek. Zjistěte si, kdo vám vládne.',
    cover: 'https://via.placeholder.com/400x200',
    logo: 'https://via.placeholder.com/100',
    link: '/sdf',
    tags: ['#javascript', '#go', '#web', '#politika'],
  },
  {
    id: '4',
    title: 'Cityvizor',
    description:
      'Transparentní hospodaření pro každou obec, vizualizace rozpočtu až na úroveň jednotlivých faktur.',
    cover: 'https://via.placeholder.com/400x200',
    logo: 'https://via.placeholder.com/100',
    link: '/sdf',
    tags: ['#pascal', '#html', '#ios'],
  },
]

const OngoingProjects: React.FC<Props> = () => (
  <Container>
    {data.map((item) => (
      <ProjectCard
        key={item.id}
        title={item.title}
        description={item.description}
        cover={item.cover}
        logo={item.logo}
        link={item.link}
        tags={item.tags}
      />
    ))}
  </Container>
)

export default OngoingProjects
