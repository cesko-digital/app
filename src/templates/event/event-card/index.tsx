import { PortalEvent } from '../../../page-components/portal-dobrovolnika/types'
import React from 'react'
import * as S from './styles'
import { ButtonAsLink } from '../../../components/links'

interface EventCardProps {
  data: PortalEvent
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
  return (
    <S.Container>
        <ButtonAsLink to={data.rsvpUrl}>
          Zajímá mě to
        </ButtonAsLink>
    </S.Container>
  )
}

export default EventCard
