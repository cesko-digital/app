import React from 'react'
import * as S from './styles'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { COMPONENT_TRANSLATION_KEY } from '../index'
import { Volunteer } from 'generated/graphql-types'

interface CoordinatorsProps {
  coordinators: Pick<Volunteer, 'name' | 'profilePictureUrl' | 'company'>[]
}

const Coordinators: React.FC<CoordinatorsProps> = ({ coordinators }) => {
  const { t } = useTranslation()
  return (
    <S.Wrapper>
      <S.Title>{t(`${COMPONENT_TRANSLATION_KEY}.coordinators`)}</S.Title>
      {coordinators.map(({ profilePictureUrl, name, company }, index) => (
        <S.Container key={index}>
          {profilePictureUrl && <S.Image url={profilePictureUrl} />}
          <S.Text>
            <S.Name>{name}</S.Name>
            {company && <S.Perex>{company}</S.Perex>}
          </S.Text>
        </S.Container>
      ))}
    </S.Wrapper>
  )
}

export default Coordinators
