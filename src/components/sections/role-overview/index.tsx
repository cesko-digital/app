import React from 'react'
import { Heading3, BodySmall, Body } from 'components/typography'

import {
  RoleMetaWrapper,
  RoleRightWrapper,
  RoleLogo,
  RoleWrapper,
  Container,
} from './styles'
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

interface Skills {
  name: string
  url: string
  logoUrl: string
}

const RoleItem = ({
  id,
  name,
  skills,
  project,
  timeRequirements,
  slug,
}: Props) =>
{
  const link = "roles/" + slug;
  return <Container>
    <RoleWrapper id={id}>
      <div>
        <a href={link}><Heading3>{name}</Heading3></a>
        <RoleMetaWrapper>
          <BodySmall>{timeRequirements}</BodySmall>
          <BodySmall>{skills.join(", ")}</BodySmall>
        </RoleMetaWrapper>
      </div>
      <RoleRightWrapper>
        <a href={project.url}>
          <Body>{project.name}</Body>
        </a>
        <RoleLogo src={project.logoUrl} />
      </RoleRightWrapper>
    </RoleWrapper>
  </Container>
}

export default RoleItem
