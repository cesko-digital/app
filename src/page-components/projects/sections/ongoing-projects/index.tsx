import React from 'react'
import ProjectCard from 'components/cards/project'
import styled from 'styled-components'
import { Project } from 'pages/projects'
import { mapTags } from 'utils/map-tags'

interface Props {
  projects: Omit<Project, 'lang' | 'highlighted'>[]
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => `${theme.space.md}px ${theme.space.md}px`};
  margin-top: ${({ theme }) => theme.space.md}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const OngoingProjects: React.FC<Props> = ({ projects }) => (
  <Container>
    {projects.map((project) => (
      <ProjectCard
        key={project.rowId}
        title={project.name}
        description={project.tagline}
        cover={project.coverUrl}
        logo={project.logoUrl}
        link={`/projects/${project.slug}`}
        tags={mapTags(project.tags)}
      />
    ))}
  </Container>
)

export default OngoingProjects
