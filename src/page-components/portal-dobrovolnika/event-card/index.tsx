import React, { FC } from 'react'
import * as S from './styles'
import { Link } from 'components/links'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { getResizedImgUrl } from 'utils/get-resized-img-url'
import { getRelativeDate } from 'utils/get-relative-date'

interface EventCardProps {
  title: string
  description: string
  cover: string
  logo: string
  link: string
  tags: string[]
  startTime: string
  endTime: string
  locationTitle?: string
}

const EventCard: FC<EventCardProps> = ({
  title,
  description,
  cover,
  logo,
  link,
  tags,
  startTime,
  endTime,
  locationTitle,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <S.Card {...rest}>
      <S.Header>
        <S.Cover
          url={getResizedImgUrl(cover, 372)}
          aria-label={`${t('cards.project.coverAriaLabel')} ${title}`}
        />
        <S.CoverWrap />
        <S.Logo
          url={logo}
          aria-label={`${t('cards.project.logoAriaLabel')}  ${title}`}
        />
      </S.Header>
      <S.Content>
        <div>
          <S.ShortInfoBubble>
            {getRelativeDate(startTime, endTime)}
          </S.ShortInfoBubble>
          {locationTitle && locationTitle !== '' && (
            <S.ShortInfoBubble>{locationTitle}</S.ShortInfoBubble>
          )}
        </div>
        <S.Title>{title}</S.Title>
        <S.TagList>
          {tags.map((tag) => (
            <S.Tag key={tag}>#{tag}</S.Tag>
          ))}
        </S.TagList>
        <S.Description>{description}</S.Description>
        <Link to={link}>Detail akce</Link>
      </S.Content>
    </S.Card>
  )
}

export default EventCard
