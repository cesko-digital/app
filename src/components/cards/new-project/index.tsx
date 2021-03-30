import React from 'react'
import * as S from './styles'
import { BulbIcon } from 'components/icons'
import { LINKS } from 'utils/constants'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const NewProject: React.FC = () => {
  const { t } = useTranslation()

  return (
    <S.Wrapper>
      <div>
        <BulbIcon />
        <S.Title>{t('components.cards.newProject.title')}</S.Title>
      </div>
      <S.Description>
        {t('components.cards.newProject.description')}
      </S.Description>
      <S.ButtonWrapper>
        <S.ButtonAsLinkElement to={LINKS.submitProject}>
          {t('components.cards.newProject.linkText')}
        </S.ButtonAsLinkElement>
      </S.ButtonWrapper>
    </S.Wrapper>
  )
}

export default NewProject
