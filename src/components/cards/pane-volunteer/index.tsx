import * as React from 'react'
import ButtonAsLink from 'components/links/button-as-link'
import { SlackIcon } from 'components/icons'

import * as S from './styles'

export interface Props {
  title: string
  description: string
  cover: string
  slackLink: string
}

const PaneVolunteer: React.FC<Props> = ({
  title,
  description,
  cover,
  slackLink,
}) => (
  <S.Card>
    <S.Cover url={cover} />
    <S.Content>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <ButtonAsLink inverted to={slackLink}>
        <>
          <SlackIcon /> <S.ButtonLabel>Přidat se do Slacku</S.ButtonLabel>
        </>
      </ButtonAsLink>
    </S.Content>
  </S.Card>
)

export default PaneVolunteer
