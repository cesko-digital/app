import React from 'react'
import * as Typography from 'components/typography'
import { graphql } from 'gatsby'
import { EventPageQuery } from '../../generated/graphql-types'
import { Layout, Section, SectionContent } from '../../components/layout'
import * as S from './styles'
import EventCard from './event-card'
import { Link } from 'components/links'
import { CardRow } from 'components/layout'
import { getResizedImgUrl } from '../../utils/get-resized-img-url'

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
              src={getResizedImgUrl(
                data.event.coverUrl
                  ? data.event.coverUrl
                  : data.event.project.coverUrl,
                1160
              )}
              loading="lazy"
            />
          </S.CoverImageWrapper>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <S.TwoColumnLayout>
            <S.MainColumn>
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
              <S.Title>Další akce</S.Title>
              <Link to="/portal-dobrovolnika">Všechny příležitosti</Link>
            </S.CategoryHeader>
            <S.CardWrapper>
              <CardRow>
                {data.otherEvents.nodes.map((event, index) => (
                  <S.ProjectCard
                    key={index}
                    title={event.name}
                    description={event.summary}
                    cover={event.coverUrl}
                    logo={event.project.logoUrl}
                    startTime={event.startTime}
                    locationTitle={event.locationTitle}
                    endTime={event.endTime}
                    link={`/events/${event.slug}`}
                    tags={
                      event.tags
                        ? event.tags.map((tag) => {
                            return tag.name
                          })
                        : []
                    }
                  />
                ))}
              </CardRow>
            </S.CardWrapper>
          </S.Container>
        </SectionContent>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query EventPage($id: String!, $language: String!) {
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
      }
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
      rowId
      rsvpUrl
      rsvpTitle
      slug
      startTime
      status
      summary
      tags {
        id
        name
        rowId
        slug
      }
      coverUrl
      locationTitle
      locationUrl
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
        locationTitle
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
          name
          rowId
          slug
        }
        rsvpUrl
        slug
        coverUrl
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

export default EventPage
