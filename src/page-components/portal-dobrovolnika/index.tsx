import { Layout, SectionContent, Section } from 'components/layout'
import * as Typography from 'components/typography'
import React from 'react'
import { PortalDobrovolnikaPageQuery } from '../../generated/graphql-types'
import { PortalEvent } from './types'
import * as S from './styles'
import HighlightedEvent from './highlighted-event'

interface PortalDobrovolnikaProps {
  data: PortalDobrovolnikaPageQuery
}

const PortalDobrovolnika: React.FC<PortalDobrovolnikaProps> = (props) => {
  const sortedOpportunities = sortOpportunities(props.data.events.nodes)
  const highlightedOpportunity = sortedOpportunities[0]

  return (
    <Layout
      crumbs={[{ label: 'Portál Dobrovolníka' }]}
      seo={{
        title: 'Portál Dobrovolníka',
        description: 'Portál Dobrovolníka',
      }}
    >
      <Section>
        <SectionContent>
          <Typography.Heading1>Portál Dobrovolníka</Typography.Heading1>
          <Typography.Body>
            Tržiště příležitostí, jak se zapojit a pomoct Česko.Digital
          </Typography.Body>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <HighlightedEvent
            cover={highlightedOpportunity.project.coverUrl}
            logo={highlightedOpportunity.project.logoUrl}
            description={highlightedOpportunity.summary}
            title={highlightedOpportunity.name}
            tags={
              highlightedOpportunity.tags
                ? highlightedOpportunity.tags.map((tag) => {
                    return tag.name
                  })
                : []
            }
            link={`/events/${highlightedOpportunity.slug}`}
            actionLink={highlightedOpportunity.rsvpUrl}
            actionTitle="Zajímá mě to"
          />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <S.Container>
            <S.CategoryHeader>
              <S.Title>Všechny příležitosti</S.Title>
            </S.CategoryHeader>
            <S.CardWrapper>
              <S.CardRow>
                {sortedOpportunities.slice(1).map((opportunity, index) => (
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

function biggestCompetence(event: PortalEvent): number {
  return Math.max(
    ...event.competenceMap.map((competence) => {
      const [, score] = competence.split(':')
      return parseInt(score)
    })
  )
}

function sortOpportunities(events: Array<PortalEvent>): Array<PortalEvent> {
  return events.sort((first, second) => {
    return biggestCompetence(second) - biggestCompetence(first)
  })
}

export default PortalDobrovolnika
