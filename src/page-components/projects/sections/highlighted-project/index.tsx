import React from 'react'
import * as S from './styles'
import { ButtonAsLink } from 'components/links'
import { useTranslation } from 'gatsby-plugin-react-i18next'

interface Props {
  projectImageSrc: string
  avatarSrc: string
  tags: string[]
  name: string
  tagline?: string | null
  link: string
}

const HighlightedProject: React.FC<Props> = ({
  projectImageSrc,
  avatarSrc,
  tagline,
  tags,
  name,
  link,
}) => {
  const { t } = useTranslation()
  return (
    <S.Container>
      <S.ProjectImage src={projectImageSrc} />
      <S.Content>
        <S.ProjectInfo>
          <S.Avatar src={avatarSrc} />
          <S.Name>{name}</S.Name>
          <S.Tags>
            {tags.map((tag, index) => (
              <S.Tag key={index}>#{tag}</S.Tag>
            ))}
          </S.Tags>
          {tagline && <S.Tagline>{tagline}</S.Tagline>}
          <ButtonAsLink inverted to={link}>
            {t('cards.project.projectDetail')}
          </ButtonAsLink>
        </S.ProjectInfo>
      </S.Content>
    </S.Container>
  )
}

export default HighlightedProject
