import React from 'react'
import { ProjectCard } from 'components/cards'
import styled from 'styled-components'
import { mapTags } from 'utils/map-tags'
import { Project, Tag } from 'generated/graphql-types'

interface Props {
  projects: Array<
    Pick<Project, 'name' | 'slug' | 'tagline' | 'coverUrl' | 'logoUrl'> & {
      tags: Pick<Tag, 'slug'>[]
    }
  >
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
        key={project.slug}
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
