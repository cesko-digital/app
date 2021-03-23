import * as React from 'react'
import volunteer from 'images/volunteer.jpg'
import { SlackButton } from 'components/buttons'

import * as S from './styles'
import { LINKS } from 'utils/constants'

const PanelVolunteer: React.FC = () => {
  const t = {
    title: 'Jsem Dobrovolník',
    description:
      'Vývojář? Projekťák? Marketér? Projekty fungují nejlépe právě díky rozmanitosti týmů a sdílení zkušeností. Pokud máte chuť a čas, ať už hodinu nebo deset týdně, přidejte se.',
    cover: volunteer,
    slackLink: 'https://cesko-digital.slack.com',
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
        <SlackButton slackLink={LINKS.joinUs} slackText={t.slackText} />
      </S.Content>
    </S.Wrapper>
  )
}

export default PanelVolunteer
