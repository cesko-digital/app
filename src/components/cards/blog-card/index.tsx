import React, { FC } from 'react'
import * as S from './styles'
import { Link } from 'components/links'
import { useTranslation } from 'gatsby-plugin-react-i18next'

export interface BlogCardProps {
  title: string
  description: string
  cover: string
  link: string
}

const BlogCard: FC<BlogCardProps> = ({
  title,
  cover,
  link,
  description,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <S.Card {...rest}>
      <S.Header>
        <S.Cover
          url={cover}
          aria-label={`${t('cards.blog.coverAriaLabel')} ${title}`}
        />
      </S.Header>
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <Link to={link}>{t('cards.blog.readMore')}</Link>
      </S.Content>
    </S.Card>
  )
}

export default BlogCard
