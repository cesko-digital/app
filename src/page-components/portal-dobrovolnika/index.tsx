import { Layout, SectionContent, Section } from 'components/layout'
import * as Typography from 'components/typography'
import React from 'react'
import { Event, MarkdownRemark, Opportunity } from 'generated/graphql-types'
import { PortalEvent } from './types'
import * as S from './styles'
import OpportunityItem from '../../components/sections/opportunity-overview'
import { Button } from '../../components/buttons'
import { ButtonWrapper, OpportunitiesMainWrapper } from './styles'
import { CardRow } from 'components/layout'
import CeduCard from './cedu-card'

interface PortalDobrovolnikaProps {
  data: {
    opportunities: {
      nodes: Opportunity[]
    }
    events: {
      nodes: Event[]
    }
    cedu: {
      nodes: MarkdownRemark[]
    }
  }
}

const PortalDobrovolnika: React.FC<PortalDobrovolnikaProps> = (props) => {
  const sortedEvents = sortEvents(props.data.events.nodes)
  const sortedOpportunities = props.data.opportunities.nodes as Opportunity[]

  return (
    <Layout
      crumbs={[{ label: 'Portál dobrovolníka' }]}
      seo={{
        title: 'Portál dobrovolníka',
        description: 'Portál dobrovolníka',
        coverUrl: 'https://data.cesko.digital/img/bcbb8e4a.png',
      }}
    >
      <Section>
        <SectionContent>
          <Typography.Heading1>Portál dobrovolníka</Typography.Heading1>
          <Typography.Body>
            Tržiště příležitostí, jak se zapojit v Česko.Digital
          </Typography.Body>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <Typography.Heading2>Právě hledáme</Typography.Heading2>
          <OpportunitiesMainWrapper>
            {sortedOpportunities.map((r) => (
              <OpportunityItem
                key={r.id}
                name={r.name}
                id={r.id}
                skills={r.skills}
                project={r.project}
                timeRequirements={r.timeRequirements}
                slug={r.slug}
              />
            ))}
          </OpportunitiesMainWrapper>
          <ButtonWrapper>
            <a href={'/opportunities'}>
              <Button>Více volných pozic</Button>
            </a>
          </ButtonWrapper>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <S.CategoryHeader>
            <S.Title>Vzdělávání – č.edu</S.Title>
          </S.CategoryHeader>
          <S.Container>
            <S.CardWrapper>
              <CardRow>
                {props.data.cedu.nodes.map((remark, index) => (
                  <CeduCard
                    key={index}
                    title={remark.frontmatter.title}
                    description={remark.frontmatter.description}
                    cover={remark.frontmatter.cover}
                    logo="https://data.cesko.digital/web/projects/cesko-digital/logo.png"
                    link={`/cedu/${remark.frontmatter.slug}`}
                    tags={
                      remark.frontmatter.tags
                        ? remark.frontmatter.tags.map((tag) => {
                            return tag
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
      <Section>
        <SectionContent>
          <S.CategoryHeader>
            <S.Title>Nejbližší akce</S.Title>
          </S.CategoryHeader>
          <S.Container>
            <S.CardWrapper>
              <CardRow>
                {sortedEvents.map((event, index) => (
                  <S.ProjectCard
                    key={index}
                    title={event.name}
                    description={event.summary}
                    cover={
                      event.coverUrl ? event.coverUrl : event.project.coverUrl
                    }
                    logo={event.project.logoUrl}
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

function biggestCompetence(event: PortalEvent): number {
  return Math.max(
    ...event.competenceMap.map((competence) => {
      const [, score] = competence.split(':')
      return parseInt(score)
    })
  )
}

function sortEvents(events: Array<PortalEvent>): Array<PortalEvent> {
  return events.sort((first, second) => {
    return biggestCompetence(second) - biggestCompetence(first)
  })
}

export default PortalDobrovolnika
