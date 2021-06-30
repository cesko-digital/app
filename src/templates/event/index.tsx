import React from 'react'
import * as Typography from 'components/typography'
import { graphql } from 'gatsby'
import { EventPageQuery } from '../../generated/graphql-types'
import { Layout, Section, SectionContent } from '../../components/layout'
import * as S from './styles'
import EventCard from './event-card'
import { Link } from 'components/links'

interface EventPageProps {
  data: EventPageQuery
}

const EventPage: React.FC<EventPageProps> = ({ data }) => {
  return (
    <Layout
      crumbs={[
        { path: '/portal-dobrovolnika', label: 'Portál dobrovolníka' },
        { label: data.event.name },
      ]}
      seo={{
        title: data.event.name,
        description: data.event.summary,
        coverUrl: data.event.coverUrl
          ? data.event.coverUrl
          : data.event.project.coverUrl,
      }}
    >
      <Section>
        <SectionContent>
          <Typography.Heading1>{data.event.name}</Typography.Heading1>
          <Typography.Body>{data.event.summary}</Typography.Body>
          <S.CoverImageWrapper>
            <S.CoverFilter />
            <S.CoverImage
              src={
                data.event.coverUrl
                  ? data.event.coverUrl
                  : data.event.project.coverUrl
              }
              loading="lazy"
            />
          </S.CoverImageWrapper>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <S.TwoColumnLayout>
            <S.MainColumn>
              <Typography.Heading2>Popis události</Typography.Heading2>
              <Typography.Body
                dangerouslySetInnerHTML={{ __html: data.event.description }}
              />
            </S.MainColumn>
            <S.ReminderColumn>
              <EventCard data={data.event} />
            </S.ReminderColumn>
          </S.TwoColumnLayout>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <S.Container>
            <S.CategoryHeader>
              <S.Title>Další příležitosti</S.Title>
              <Link to="/portal-dobrovolnika">Všechny příležitosti</Link>
            </S.CategoryHeader>
            <S.CardWrapper>
              <S.CardRow>
                {data.otherEvents.nodes.map((opportunity, index) => (
                  <S.ProjectCard
                    key={index}
                    title={opportunity.name}
                    description={opportunity.summary}
                    cover={opportunity.project.coverUrl}
                    logo={opportunity.project.logoUrl}
                    link={`/events/${opportunity.slug}`}
                    tags={
                      opportunity.tags
                        ? opportunity.tags.map((tag) => {
                            return tag.name
                          })
                        : []
                    }
                  />
                ))}
              </S.CardRow>
            </S.CardWrapper>
          </S.Container>
        </SectionContent>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query EventPage($id: String!) {
    event(id: { eq: $id }) {
      competenceMap
      description
      endTime
      id
      name
      owner {
        id
        name
        rowId
        profilePictureUrl
        email
        slackId
      }
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
      rowId
      rsvpUrl
      slug
      startTime
      status
      summary
      tags {
        id
        lang
        name
        rowId
        slug
      }
      coverUrl
    }
    otherEvents: allEvent(
      limit: 3
      filter: { id: { ne: $id }, status: { eq: "live" } }
    ) {
      nodes {
        competenceMap
        description
        endTime
        id
        name
        rowId
        startTime
        status
        summary
        project {
          logoUrl
          name
          id
          coverUrl
          url
          rowId
        }
        owner {
          id
          name
          rowId
          profilePictureUrl
        }
        tags {
          id
          lang
          name
          rowId
          slug
        }
        rsvpUrl
        slug
        coverUrl
      }
    }
  }
`

export default EventPage
