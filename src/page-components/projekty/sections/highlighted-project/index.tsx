import React from 'react'
import * as S from './styles'
import { ButtonAsLink } from 'components/links'
import { useTranslation } from 'gatsby-plugin-react-i18next'

interface Props {
  title: string
  description: string
  cover: string
  logo: string
  link: string
  tags: string[]
}

const HighlightedProject: React.FC<Props> = ({
  title,
  description,
  cover,
  logo,
  link,
  tags,
}) => {
  const { t } = useTranslation()
  return (
    <S.Container data-cy="highlighted-project">
      <S.ProjectImage src={cover} />
      <S.Content>
        <S.ProjectInfo>
          <S.Avatar src={logo} />
          <S.Name>{title}</S.Name>
          <S.Tags>
            {tags.map((tag, index) => (
              <S.Tag key={index}>#{tag}</S.Tag>
            ))}
          </S.Tags>
          {description && <S.Tagline>{description}</S.Tagline>}
          <ButtonAsLink inverted to={link}>
            {t('cards.project.projectDetail')}
          </ButtonAsLink>
        </S.ProjectInfo>
      </S.Content>
    </S.Container>
  )
}

export default HighlightedProject
