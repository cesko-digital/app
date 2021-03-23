import * as React from 'react'
import { SlackButton } from 'components/buttons'

import * as S from './styles'
import { LINKS } from 'utils/constants'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const PanelVolunteer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <S.Wrapper>
      <S.Cover>
        <S.Image
          url={'https://data.cesko.digital/web/sections/join-us/cover.jpg'}
        />
      </S.Cover>
      <S.Content>
        <S.Title>{t('components.cards.panelVolunteer.title')}</S.Title>
        <S.Description>
          {t('components.cards.panelVolunteer.description')}
        </S.Description>
        <SlackButton
          slackLink={LINKS.joinUs}
          slackText={t('components.cards.panelVolunteer.linkText')}
        />
      </S.Content>
    </S.Wrapper>
  )
}

export default PanelVolunteer
