import React from 'react'
import * as S from './styles'
import { ArrowIcon } from 'components/icons'
import { GithubIcon } from 'components/icons'
import { TrelloIcon } from 'components/icons'
import { SlackIcon } from 'components/icons'
import Avatar, { ProjectLeadProps } from './project-lead'
import SocialMedia from './social-media'
import Progress from './progress'
import { ButtonAsLink } from 'components/links'
import { useTranslation } from 'gatsby-plugin-react-i18next'

interface ProjectCardProps {
  slackChannelUrl: string
  slackChannelName: string
  trelloUrl: string
  githubUrl: string
  url: string
  projectLead: ProjectLeadProps
  name: string
  progress: number
}

export const COMPONENT_TRANSLATION_KEY = 'pages.project.projectCard'

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  trelloUrl,
  slackChannelName,
  slackChannelUrl,
  githubUrl,
  url,
  progress,
  projectLead,
}) => {
  const { t } = useTranslation()
  return (
    <S.Container>
      <Progress percent={progress} />
      <S.Wrapper>
        <Avatar {...projectLead} />
      </S.Wrapper>
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
