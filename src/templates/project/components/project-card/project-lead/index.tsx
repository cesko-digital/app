import React from 'react'
import * as S from './styles'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { COMPONENT_TRANSLATION_KEY } from '../index'

export interface ProjectLeadProps {
  name: string
  company: string
  profilePictureUrl?: string | null
}

const Avatar: React.FC<ProjectLeadProps> = ({
  name,
  profilePictureUrl,
  company,
}) => {
  const { t } = useTranslation()
  return (
    <S.Wrapper>
      <S.Title>{t(`${COMPONENT_TRANSLATION_KEY}.projectLead`)}</S.Title>
      <S.Container>
        {profilePictureUrl && <S.Image url={profilePictureUrl} />}
        <S.Text>
          <S.Name>{name}</S.Name>
          <S.Perex>{company}</S.Perex>
        </S.Text>
      </S.Container>
    </S.Wrapper>
  )
}

export default Avatar
