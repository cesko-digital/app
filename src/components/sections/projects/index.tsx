import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import * as S from './styles'
import { Project, Tag } from 'generated/graphql-types'
import { mapTags } from 'utils/map-tags'
import { CardRow } from 'components/layout'

export interface ProjectsProps {
  projects: Array<
    Pick<Project, 'name' | 'slug' | 'tagline' | 'coverUrl' | 'logoUrl'> & {
      tags: Pick<Tag, 'slug'>[]
    }
  >
  otherProjects?: boolean
}

const COMPONENT_TRANSLATION_KEY = `components.sections.projects`

const getTitleTranslationKey = (otherProjects: boolean): string => {
  if (otherProjects) {
    return `${COMPONENT_TRANSLATION_KEY}.otherProjects`
  }

  return `${COMPONENT_TRANSLATION_KEY}.ourProjects`
}

const Projects: React.FC<ProjectsProps> = ({
  projects,
  otherProjects = false,
}) => {
  const { t } = useTranslation()
  return (
    <S.Container>
      <S.TitleRow>
        <S.Title>{t(getTitleTranslationKey(otherProjects))}</S.Title>
        <S.ShowAll to={'/projekty'}>
          {t(`${COMPONENT_TRANSLATION_KEY}.showAll`)}
        </S.ShowAll>
      </S.TitleRow>
      <S.CardWrapper>
        <CardRow>
          {projects.map((project, index) => (
            <S.ProjectCard
              key={index}
              title={project.name}
              description={project.tagline}
              cover={project.coverUrl}
              logo={project.logoUrl}
              link={`/projekty/${project.slug}`}
              tags={mapTags(project.tags)}
            />
          ))}
        </CardRow>
      </S.CardWrapper>
    </S.Container>
  )
}

export default Projects
