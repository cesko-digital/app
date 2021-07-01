import React from 'react'
import * as S from './styles'
import { ButtonAsLink } from '../../../components/links'
import Project from './project'
import Garant from './garant'
import Info from './info'
import { PortalDetailEvent } from '../types'

interface EventCardProps {
  data: PortalDetailEvent
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
  return (
    <S.Container>
      <Project
        avatarUrl={data.project.logoUrl}
        name={data.project.name}
        projectUrl={`/projekty/${data.project.slug}`}
        silent={data.project.silent}
      />
      <Garant
        avatarUrl={data.owner.profilePictureUrl}
        name={data.owner.name}
        email={data.owner.email}
      />
      <Info
        title="Datum konání"
        content={new Date(data.startTime).toLocaleString('cs-CZ')}
      />
      <Info
        title="Místo konání"
        content={data.locationTitle}
        url={data.locationUrl}
      />
      {data.rsvpUrl && (
        <ButtonAsLink to={data.rsvpUrl}>{data.rsvpTitle}</ButtonAsLink>
      )}
    </S.Container>
  )
}

export default EventCard
