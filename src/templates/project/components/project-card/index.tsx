import React from 'react'
import * as S from './styles'
import { ArrowIcon } from 'components/icons'
import { GithubIcon } from 'components/icons'
import { TrelloIcon } from 'components/icons'
import { SlackIcon } from 'components/icons'
import Coordinators from './coordinators'
import SocialMedia from './social-media'
import { ButtonAsLink } from 'components/links'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Volunteer } from '../../../../generated/graphql-types'

interface ProjectCardProps {
  slackChannelUrl?: string | null
  slackChannelName?: string | null
  trelloUrl?: string | null
  githubUrl?: string | null
  url: string
  coordinators: Pick<Volunteer, 'name' | 'profilePictureUrl' | 'company'>[]
  name: string
}

export const COMPONENT_TRANSLATION_KEY = 'pages.project.projectCard'

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  trelloUrl,
  slackChannelName,
  slackChannelUrl,
  githubUrl,
  url,
  coordinators,
}) => {
  const { t } = useTranslation()
  const showLinks =
    githubUrl || trelloUrl || (slackChannelName && slackChannelUrl)
  return (
    <S.Container>
      {Array.isArray(coordinators) && coordinators.length > 0 && (
        <S.Wrapper>
          <Coordinators coordinators={coordinators} />
        </S.Wrapper>
      )}
      {showLinks && (
        <S.Social>
          <S.Title>{t(`${COMPONENT_TRANSLATION_KEY}.links`)}</S.Title>
          {githubUrl && (
            <SocialMedia logo={GithubIcon} url={githubUrl} name={'GitHub'} />
          )}
          {trelloUrl && (
            <SocialMedia logo={TrelloIcon} url={trelloUrl} name={'Trello'} />
          )}
          {slackChannelName && slackChannelUrl && (
            <SocialMedia
              logo={SlackIcon}
              url={slackChannelUrl}
              name={`Slack: #${slackChannelName}`}
            />
          )}
        </S.Social>
      )}
      <S.ButtonWrapper>
        <ButtonAsLink to={url}>
          <S.InnerText>{name}</S.InnerText>
          <ArrowIcon />
        </ButtonAsLink>
      </S.ButtonWrapper>
    </S.Container>
  )
}
export default ProjectCard
