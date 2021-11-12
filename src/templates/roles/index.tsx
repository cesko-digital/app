import { Opportunity } from 'generated/graphql-types'
import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, SectionContent } from '../../components/layout'
import { Heading1 } from 'components/typography'
import * as S from './styles'
import { BodySmall, Body } from 'components/typography'
import { OwnerName, RoleMetaRow } from './styles'
import TimeIcon from '../../components/icons/time'
import RoleItem from '../../components/sections/role-overview'
import { RolesMainWrapper } from '../../page-components/portal-dobrovolnika/styles'
import { getResizedImgUrl } from '../../utils/get-resized-img-url'

interface RolePageProps {
  data: {
    opportunity: Opportunity
    roles: {
      nodes: Opportunity[]
    }
  }
}

const RolePage: React.FC<RolePageProps> = (props) => {
  const role = props.data.opportunity
  const sortedRoles = props.data.roles.nodes

  return (
    <Layout
      crumbs={[
        { path: '/portal-dobrovolnika', label: 'Portál dobrovolníka' },
        { path: '/roles', label: 'Volné pozice' },
        { label: role.name },
      ]}
      seo={{
        title: role.name,
        description: role.summary,
        coverUrl: role.project.coverUrl,
      }}
    >
      <Section>
        <SectionContent>
          <Heading1>{role.name}</Heading1>
          <S.CoverImageWrapper>
            <S.CoverImage
              src={getResizedImgUrl(role.project.coverUrl, 1160)}
              loading="lazy"
            />
          </S.CoverImageWrapper>
          <S.RoleHeader>
            <S.RoleDescription>
              <Body>{role.summary}</Body>
            </S.RoleDescription>
            <S.RoleContactCard>
              <S.RoleMetaRow>
                <S.RoleProjectImg
                  src={getResizedImgUrl(role.project.logoUrl, 35)}
                />
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
                  <S.OwnerImage
                    src={getResizedImgUrl(role.owner.profilePictureUrl, 60)}
                  />
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
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <RolesMainWrapper>
            {sortedRoles.map((r) => (
              <RoleItem
                key={r.id}
                name={r.name}
                id={r.id}
                skills={r.skills}
                project={r.project}
                timeRequirements={r.timeRequirements}
                slug={r.slug}
              />
            ))}
          </RolesMainWrapper>
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
    roles: allOpportunity(limit: 3, filter: { status: { eq: "live" } }) {
      nodes {
        id
        name
        timeRequirements
        skills
        slug
        project {
          name
          logoUrl
          url
        }
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
