import React from 'react'
import * as S from './styles'
import ButtonAsLink from '../../links/button-as-link'
import { BulbIcon } from 'components/icons'
import { LINKS } from 'utils/constants'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const NewProject: React.FC = () => {
  const { t } = useTranslation()

  return (
    <S.Wrapper>
      <BulbIcon />
      <S.Title>{t('components.cards.newProject.title')}</S.Title>
      <S.Description>
        {t('components.cards.newProject.description')}
      </S.Description>
      <S.ButtonWrapper>
        <ButtonAsLink to={LINKS.submitProject}>
          {t('components.cards.newProject.linkText')}
        </ButtonAsLink>
      </S.ButtonWrapper>
    </S.Wrapper>
  )
}

export default NewProject
