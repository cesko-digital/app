import * as React from 'react'
import ButtonAsLink from 'components/links/button-as-link'
import { SlackIcon } from 'components/icons'
import volunteer from 'images/volunteer.jpg'

import * as S from './styles'

interface Volunteer {
  title: string
  description: string
  cover: string
  slackLink: string
}

const PanelVolunteer: React.FC = () => {
  const t: Volunteer = {
    title: 'Jsem Dobrovolník',
    description:
      'Vývojář? Projekťák? Marketér? Projekty fungují nejlépe právě díky rozmanitosti týmů a sdílení zkušeností. Pokud máte chuť a čas, ať už hodinu nebo deset týdně, přidejte se.',
    cover: volunteer,
    slackLink: 'https://cesko-digital.slack.com/archives/CHG9NA23D',
  }
  return (
    <S.Wrapper>
      <S.Cover>
        <S.Image url={t.cover} />
      </S.Cover>
      <S.Content>
        <S.Title>{t.title}</S.Title>
        <S.Description>{t.description}</S.Description>
        <ButtonAsLink inverted to={t.slackLink}>
          <>
            <SlackIcon /> <S.ButtonLabel>Přidat se do Slacku</S.ButtonLabel>
          </>
        </ButtonAsLink>
      </S.Content>
    </S.Wrapper>
  )
}

export default PanelVolunteer
