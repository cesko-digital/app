import { Layout, SectionContent, Section } from 'components/layout'
import * as Typography from 'components/typography'
import { Opportunity } from 'generated/graphql-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import OpportunityItem from '../../../components/sections/opportunity-overview'
import { CompetencyFilterLabel, CompetencyFilterRadio } from '../styles'

interface OpportunitiesProps {
  data: {
    opportunities: { nodes: Opportunity[] }
  }
  selectedSkill: string
}

const OpportunitiesCountSpan = styled.span`
  color: gray;
`
const Opportunities: React.FC<OpportunitiesProps> = (props) => {
  const [selectedSkill, updateSelectedSkill] = useState(
    props.selectedSkill || 'Vše'
  )

  function handleSkillSelectionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSelectedSkill = e.target.value
    updateSelectedSkill(newSelectedSkill)
  }

  function filterOpportunities() {
    if (selectedSkill === 'Vše') filteredOpportunities = allOpportunities
    else {
      filteredOpportunities = []

      allOpportunities.forEach((r) => {
        r.skills.some((rs) => {
          if (rs === selectedSkill) {
            filteredOpportunities.push(r)
          }
        })
      })
    }
  }

  function getSkills() {
    let toReturn: { name: string; count: number }[] = []
    allOpportunities.forEach((r) => {
      r.skills &&
        r.skills.forEach((s) => {
          if (!toReturn.find((t) => t.name === s))
            toReturn.push({ name: s, count: 0 })
          const skill:
            | { name: string; count: number }
            | undefined = toReturn.find((t) => t.name === s)
          if (skill) skill.count++
        })
    })

    // Add "Vše"
    toReturn.push({ name: 'Vše', count: allOpportunities.length })

    // We sort; "Vše" goes to the beginning
    toReturn = toReturn.sort((a, b) => {
      if (a.name === 'Vše') return -1
      else if (b.name === 'Vše') return 1
      else if (a.name < b.name) return -1
      else if (a.name > b.name) return 1
      else return 0
    })

    return toReturn
  }

  const allOpportunities = props.data.opportunities.nodes
  const allSkills = getSkills()
  let filteredOpportunities: Opportunity[] = []
  filterOpportunities()

  return (
    <Layout
      crumbs={[
        { label: 'Portál dobrovolníka', path: '../portal-dobrovolnika' },
        { label: 'Volné pozice' },
      ]}
      seo={{
        title: 'Volné pozice - Portál dobrovolníka',
        description: 'Volné pozice - Portál dobrovolníka',
      }}
    >
      <Section>
        <SectionContent>
          <Typography.Heading1>
            Volné pozice{' '}
            <OpportunitiesCountSpan>
              {allOpportunities.length}
            </OpportunitiesCountSpan>
          </Typography.Heading1>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          {allSkills.map((s) => [
            <CompetencyFilterRadio
              key={'competencyInput' + s.name}
              type="radio"
              defaultChecked={s.name === 'Vše'}
              value={s.name}
              name="competencyInputRadio"
              onChange={handleSkillSelectionChange}
            />,
            <CompetencyFilterLabel
              key={'competencyLabel' + s.name}
              onClick={() => {
                const target: HTMLInputElement | null = document.querySelector(
                  'input[value="' + s.name + '"]'
                )
                if (target) target.click()
              }}
            >
              {s.name + ' (' + s.count + ')'}
            </CompetencyFilterLabel>,
          ])}
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          {filteredOpportunities.map((r) => (
            <OpportunityItem
              key={r.id}
              id={r.id}
              name={r.name}
              skills={r.skills}
              project={r.project}
              timeRequirements={r.timeRequirements}
              slug={r.slug}
            />
          ))}
        </SectionContent>
      </Section>
    </Layout>
  )
}

export default Opportunities
