import React from 'react'
import { Avatar } from 'components/avatar'
import * as S from './styles'

export interface Volunteer {
  name: string
  role: string
  profilePictureUrl?: string
}

interface Props {
  volunteers: Volunteer[]
}

const VolunteersGrid: React.FC<Props> = ({ volunteers }) => {
  return (
    <S.Grid>
      {volunteers.map((volunteer, index) => (
        <Avatar
          key={`volunteer_${index}`}
          title={volunteer.name}
          subtitle={volunteer.role}
          pictureUrl={volunteer.profilePictureUrl}
        />
      ))}
    </S.Grid>
  )
}

export default VolunteersGrid
