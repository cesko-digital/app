import * as React from 'react'
import volunteer from 'images/volunteer.jpg'
import { SlackButton } from 'components/buttons'

import * as S from './styles'

interface Volunteer {
  title: string
  description: string
  cover: string
  slackLink: string
  slackText: string
}

const PanelVolunteer: React.FC = () => {
  const t: Volunteer = {
    title: 'Jsem Dobrovolník',
    description:
      'Vývojář? Projekťák? Marketér? Projekty fungují nejlépe právě díky rozmanitosti týmů a sdílení zkušeností. Pokud máte chuť a čas, ať už hodinu nebo deset týdně, přidejte se.',
    cover: volunteer,
    slackLink: 'https://cesko-digital.slack.com/archives/CHG9NA23D',
    slackText: 'Přidat se do Slacku',
  }
  return (
    <S.Wrapper>
      <S.Cover>
        <S.Image url={t.cover} />
      </S.Cover>
      <S.Content>
        <S.Title>{t.title}</S.Title>
        <S.Description>{t.description}</S.Description>
        <SlackButton slackLink={t.slackLink} slackText={t.slackText} />
      </S.Content>
    </S.Wrapper>
  )
}

export default PanelVolunteer
