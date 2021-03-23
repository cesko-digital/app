import React from 'react'
import { Body, Heading2 } from 'components/typography'
import * as S from './styles'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { ButtonSize, SlackButton } from 'components/buttons'
import { LINKS } from 'utils/constants'

interface Props {
  contributeText: string
}

const Contribute: React.FC<Props> = ({ contributeText }) => {
  const { t } = useTranslation()
  return (
    <S.Wrapper>
      <Heading2>{t('pages.project.about.contribute.title')}</Heading2>
      <S.Description>{contributeText}</S.Description>
      <S.Text>
        <S.SlackLink>
          <SlackButton
            slackLink={LINKS.joinUs}
            slackText={t('pages.project.about.contribute.buttonText')}
          />
        </S.SlackLink>
        <Body>
          <S.Note>
            {t('pages.project.about.contribute.note')}
            <S.LinkHome size={ButtonSize.Small} to="/">
              {t('pages.project.about.contribute.noteLink')}
            </S.LinkHome>
          </S.Note>
        </Body>
      </S.Text>
    </S.Wrapper>
  )
}

export default Contribute
