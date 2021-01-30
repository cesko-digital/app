import * as React from 'react'
import ButtonAsLink from 'components/links/button-as-link'
import { SlackIcon } from 'components/icons'

import * as S from './styles'

export interface Props {
  name: string
  description: string
  cover: string
  slackLink: string
}

const PanelVolunteer: React.FC<Props> = () => {
  const t = {
    name: 'Jsem Dobrovolník',
    description:
      'Vývojář? Projekťák? Marketér? Projekty fungují nejlépe právě díky rozmanitosti týmů a sdílení zkušeností. Pokud máte chuť a čas, ať už hodinu nebo deset týdně, přidejte se.',
    cover:
      'https://s3-alpha-sig.figma.com/img/1372/b917/60935c9cdba4bd181193b46a5082dde3?Expires=1612742400&Signature=UvFFiLOCp1z1mvFTdfWOpcw7wHu8xJniJpHMpAesiCivBF5sIY123XBwt3Fdu9j~l0s6thUw6tcXrCY1LY9p8wrxVwPJ3ub5xLBthZIHpVCt1Gvo0QPN8D6OIHBHbXrC-i~w10jE~87nJ1GLzhputAO6FCvEaHGKccBWC41IsNtc9FWfDnjjs9vmE~fVXRrJhDsd5POLzhX3RdSCIZB9BFXDGRqFrbsoS1g3xgaUF~xzmAlkj5ko6elIiLn5orD57wxmgMLSdopDj6vJP35S1pURC0XmpMW0kJzJvTWWIccKlYB9jOvPVEPRXuZq2bdZx~7UAUUGRdOCAf5grO2Xrw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    slackLink: 'https://cesko-digital.slack.com/archives/CHG9NA23D',
  }
  return (
    <S.Wrapper>
      <S.Cover>
        <S.Image url={t.cover} />
      </S.Cover>
      <S.Content>
        <S.Title>{t.name}</S.Title>
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
