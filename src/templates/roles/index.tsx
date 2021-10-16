import { Opportunity } from 'generated/graphql-types'
import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, SectionContent } from '../../components/layout'
import { Heading1 } from 'components/typography'
import * as S from './styles'
import { BodySmall, Body } from 'components/typography'
import { OwnerName, RoleMetaRow } from './styles'
import TimeIcon from '../../components/icons/time'

interface RolePageProps {
  data: {
    opportunity: Opportunity
  }
}

const RolePage: React.FC<RolePageProps> = (props) => {
  const role = props.data.opportunity
  return (
    <Layout
      crumbs={[
        { path: '/portal-dobrovolnika', label: 'Portál dobrovolníka' },
        { path: '/roles', label: 'Volné pozice' },
        { label: role.name },
      ]}
      seo={{
        title: role.name,
        description: 'Detail volné pozice',
        coverUrl: 'TBD',
      }}
    >
      <Section>
        <SectionContent>
          <Heading1>{role.name}</Heading1>
          <S.RoleHeader>
            <S.CoverImageWrapper>
              <S.CoverImage src={role.project.coverUrl} loading="lazy" />
            </S.CoverImageWrapper>
            <S.RoleContactCard>
              <S.RoleMetaRow>
                <S.RoleProjectImg src={role.project.logoUrl} />
                <a href={`/roles/${role.slug}`}>
                  <Body>{role.project.name}</Body>
                </a>
              </S.RoleMetaRow>
              <RoleMetaRow>
                <TimeIcon />
                <Body>{role.timeRequirements}</Body>
              </RoleMetaRow>
              <S.RoleOwnerWrapper>
                <Body>Kontaktní osoba</Body>
                <S.OwnerWrapper>
                  <S.OwnerImage src={role.owner.profilePictureUrl} />
                  <div>
                    <OwnerName>{role.owner.name}</OwnerName>
                    <BodySmall>{role.project.name}</BodySmall>
                  </div>
                </S.OwnerWrapper>
              </S.RoleOwnerWrapper>
              <a href={role.project.slackChannelUrl} target="blank">
                <S.RoleSlackButton>Kontaktovat přes Slack</S.RoleSlackButton>
              </a>
            </S.RoleContactCard>
          </S.RoleHeader>
          <S.RoleDescription>
            <Body>{role.summary}</Body>
          </S.RoleDescription>
        </SectionContent>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query RolePage($id: String!, $locale: String!) {
    opportunity(id: { eq: $id }) {
      id
      name
      slug
      summary
      timeRequirements
      contactUrl
      owner {
        email
        name
        profilePictureUrl
      }
      juniorFriendly
      project {
        coverUrl
        description
        finished
        githubUrl
        id
        lang
        logoUrl
        name
        rowId
        slackChannelName
        slackChannelUrl
        slug
        tagline
        tags {
          name
          rowId
          slug
          lang
          id
        }
        trelloUrl
        url
        silent
      }
    }
    locales: allLocale(filter: { language: { eq: $locale } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
export default RolePage
