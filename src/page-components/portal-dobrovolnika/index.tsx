import { Layout, SectionContent, Section } from 'components/layout'
import * as Typography from 'components/typography'
import React from 'react'
import { Event, MarkdownRemark, Opportunity } from 'generated/graphql-types'
import { PortalEvent } from './types'
import * as S from './styles'
import RoleItem from '../../components/sections/role-overview'
import { Button } from '../../components/buttons'
import { ButtonWrapper, RolesMainWrapper } from './styles'
import { CardRow } from 'components/layout'
import CeduCard from './cedu-card'

interface PortalDobrovolnikaProps {
  data: {
    roles: {
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
  const sortedOpportunities = sortOpportunities(props.data.events.nodes)
  const sortedRoles = props.data.roles.nodes as Opportunity[]

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
                {sortedOpportunities.map((opportunity, index) => (
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

function sortOpportunities(events: Array<PortalEvent>): Array<PortalEvent> {
  return events.sort((first, second) => {
    return biggestCompetence(second) - biggestCompetence(first)
  })
}

export default PortalDobrovolnika
