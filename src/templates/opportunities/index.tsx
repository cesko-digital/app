import { Opportunity } from 'generated/graphql-types'
import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, SectionContent } from '../../components/layout'
import { Heading1 } from 'components/typography'
import * as S from './styles'
import { BodySmall, Body } from 'components/typography'
import { OwnerName, OpportunityMetaRow } from './styles'
import TimeIcon from '../../components/icons/time'
import OpportunityItem from '../../components/sections/opportunity-overview'
import { OpportunitiesMainWrapper } from '../../page-components/portal-dobrovolnika/styles'
import { getResizedImgUrl } from 'utils/get-resized-img-url'

interface OpportunityPageProps {
  data: {
    opportunity: Opportunity
    opportunities: {
      nodes: Opportunity[]
    }
  }
}

const OpportunityPage: React.FC<OpportunityPageProps> = (props) => {
  const opportunity = props.data.opportunity
  const sortedOpportunities = props.data.opportunities.nodes

  return (
    <Layout
      crumbs={[
        { path: '/portal-dobrovolnika', label: 'Portál dobrovolníka' },
        { path: '/opportunities', label: 'Volné pozice' },
        { label: opportunity.name },
      ]}
      seo={{
        title: opportunity.name,
        description: opportunity.summary,
        coverUrl: opportunity.coverUrl
          ? opportunity.coverUrl
          : opportunity.project.coverUrl,
      }}
    >
      <Section>
        <SectionContent>
          <Heading1>{opportunity.name}</Heading1>
          <S.CoverImageWrapper>
            <S.CoverImage
              src={getResizedImgUrl(
                opportunity.coverUrl
                  ? opportunity.coverUrl
                  : opportunity.project.coverUrl,
                1160
              )}
              loading="lazy"
            />
          </S.CoverImageWrapper>
          <S.OpportunityHeader>
            <S.OpportunityDescription>
              <Body>{opportunity.summary}</Body>
            </S.OpportunityDescription>
            <S.OpportunityContactCard>
              <S.OpportunityMetaRow>
                <S.OpportunityProjectImg src={opportunity.project.logoUrl} />
                <a href={`/opportunities/${opportunity.slug}`}>
                  <Body>{opportunity.project.name}</Body>
                </a>
              </S.OpportunityMetaRow>
              <OpportunityMetaRow>
                <TimeIcon />
                <Body>{opportunity.timeRequirements}</Body>
              </OpportunityMetaRow>
              <S.OpportunityOwnerWrapper>
                <Body>Kontaktní osoba</Body>
                <S.OwnerWrapper>
                  <S.OwnerImage src={opportunity.owner.profilePictureUrl} />
                  <div>
                    <OwnerName>{opportunity.owner.name}</OwnerName>
                    <BodySmall>{opportunity.project.name}</BodySmall>
                  </div>
                </S.OwnerWrapper>
              </S.OpportunityOwnerWrapper>
              <a href={opportunity.contactUrl} target="blank">
                <S.OpportunitySlackButton>
                  Kontaktovat přes Slack
                </S.OpportunitySlackButton>
              </a>
            </S.OpportunityContactCard>
          </S.OpportunityHeader>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <OpportunitiesMainWrapper>
            {sortedOpportunities.map((o) => (
              <OpportunityItem
                key={o.id}
                name={o.name}
                id={o.id}
                skills={o.skills}
                project={o.project}
                timeRequirements={o.timeRequirements}
                slug={o.slug}
              />
            ))}
          </OpportunitiesMainWrapper>
        </SectionContent>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query OpportunityPage($id: String!, $language: String!) {
    opportunity(id: { eq: $id }) {
      id
      name
      slug
      summary
      timeRequirements
      contactUrl
      coverUrl
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
          id
        }
        trelloUrl
        url
        silent
      }
    }
    opportunities: allOpportunity(
      limit: 3
      filter: { status: { eq: "live" } }
    ) {
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
    locales: allLocale(filter: { language: { eq: $language } }) {
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
export default OpportunityPage
