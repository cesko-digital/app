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
      <Project avatarUrl={data.project.logoUrl} name={data.project.name} />
      <Garant avatarUrl={data.owner.profilePictureUrl} name={data.owner.name} />
      <Info title="Datum konání" content={data.startTime} />
      <Info title="Místo konání" content="Online" />
      <ButtonAsLink to={data.rsvpUrl}>Zajímá mě to</ButtonAsLink>
    </S.Container>
  )
}

export default EventCard
