import React from 'react'
import { BodySmall, Body } from 'components/typography'
import * as S from './styles'

import { Project } from 'templates/event/event-card/project/styles'

interface Props {
  id: string
  name: string
  skills: Array<string>
  project: Project
  timeRequirements: string
  slug: string
}

interface Project {
  name: string
  url: string
  logoUrl: string
}

const OpportunityItem: React.FC<Props> = ({
  id,
  name,
  skills,
  project,
  timeRequirements,
  slug,
}) => {
  const link = '/opportunities/' + slug
  return (
    <S.Container>
      <S.OpportunityWrapper key={id}>
        <div>
          <a href={link}>
            <S.OpportunityHeading>{name}</S.OpportunityHeading>
          </a>
          <S.OpportunityMetaWrapper>
            <BodySmall>{timeRequirements}</BodySmall>
            <BodySmall>{skills.join(', ')}</BodySmall>
          </S.OpportunityMetaWrapper>
        </div>
        <S.OpportunityRightWrapper>
          <a href={project.url}>
            <Body>{project.name}</Body>
          </a>
          <S.OpportunityLogo src={project.logoUrl} />
        </S.OpportunityRightWrapper>
      </S.OpportunityWrapper>
    </S.Container>
  )
}

export default OpportunityItem
