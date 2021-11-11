import React from 'react'
import { BodySmall, Body } from 'components/typography'
import * as S from './styles'
import { getResizedImgUrl } from '../../../utils/get-resized-img-url'

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

const RoleItem: React.FC<Props> = ({
  id,
  name,
  skills,
  project,
  timeRequirements,
  slug,
}) => {
  const link = '/roles/' + slug
  return (
    <S.Container>
      <S.RoleWrapper key={id}>
        <div>
          <a href={link}>
            <S.RoleHeading>{name}</S.RoleHeading>
          </a>
          <S.RoleMetaWrapper>
            <BodySmall>{timeRequirements}</BodySmall>
            <BodySmall>{skills.join(', ')}</BodySmall>
          </S.RoleMetaWrapper>
        </div>
        <S.RoleRightWrapper>
          <a href={project.url}>
            <Body>{project.name}</Body>
          </a>
          <S.RoleLogo src={getResizedImgUrl(project.logoUrl, 80)} />
        </S.RoleRightWrapper>
      </S.RoleWrapper>
    </S.Container>
  )
}

export default RoleItem
