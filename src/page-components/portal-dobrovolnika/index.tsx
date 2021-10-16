import { Layout, SectionContent, Section } from 'components/layout'
import * as Typography from 'components/typography'
import React from 'react'
import { Event, Opportunity } from 'generated/graphql-types'
import { PortalEvent } from './types'
import * as S from './styles'
import RoleItem from '../../components/sections/role-overview'
import { Button } from '../../components/buttons'
import { ButtonWrapper, RolesMainWrapper } from './styles'

interface PortalDobrovolnikaProps {
  data: {
    roles: {
      nodes: Opportunity[]
    }
    events: {
      nodes: Event[]
    }
  }
}

const PortalDobrovolnika: React.FC<PortalDobrovolnikaProps> = (props) => {
  const sortedOpportunities = sortOpportunities(props.data.events.nodes)
  const sortedRoles = props.data.roles.nodes as Opportunity[]

  return (
    <Layout
      crumbs={[{ label: 'Portál dobrovolníka' }]}
      seo={{
        title: 'Portál dobrovolníka',
        description: 'Portál dobrovolníka',
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
          <Typography.Heading3>Právě hledáme</Typography.Heading3>
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
          <ButtonWrapper>
            <a href={'/roles'}>
              <Button>Více volných pozic</Button>
            </a>
          </ButtonWrapper>
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
                    cover={
                      opportunity.coverUrl
                        ? opportunity.coverUrl
                        : opportunity.project.coverUrl
                    }
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
