import { Layout, SectionContent, Section } from 'components/layout'
import RolesPaging from 'page-components/portal-dobrovolnika/roles/roles-paging'
import * as Typography from 'components/typography'
import { Opportunity } from 'generated/graphql-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import RoleItem from '../../../components/sections/role-overview'
import { CompetencyFilterLabel, CompetencyFilterRadio } from '../styles'

interface RolesProps {
  data: {
    roles: { nodes: Opportunity[] }
  }
  page: number
  selectedSkill: string
}

const RolesCountSpan = styled.span`
  color: gray;
`
const PAGE_SIZE = 15

const Roles: React.FC<RolesProps> = (props) => {
  const [currentPage, setPage] = useState(props.page || 1)
  const [selectedSkill, updateSelectedSkill] = useState(
    props.selectedSkill || 'Vše'
  )
  const onPageSelected = (index: number) => {
    setPage(index)
  }

  function handleSkillSelectionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSelectedSkill = e.target.value
    updateSelectedSkill(newSelectedSkill)

    // If the selection changed, we go to first page, because it makes sense - if we stayed at a later page, different set of entries would be on the previous ones.
    if (currentPage > 1 && newSelectedSkill !== selectedSkill) setPage(1)
  }

  function filterRoles() {
    if (selectedSkill === 'Vše') filteredRoles = allRoles
    else {
      filteredRoles = []

      allRoles.forEach((r) => {
        r.skills.some((rs) => {
          if (rs === selectedSkill) {
            filteredRoles.push(r)
          }
        })
      })
    }
    paginatedRoles = filteredRoles.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    )
  }

  function getSkills() {
    let toReturn: { name: string; count: number }[] = []
    allRoles.forEach((r) => {
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
    toReturn.push({ name: 'Vše', count: allRoles.length })

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

  const allRoles = props.data.roles.nodes
  const allSkills = getSkills()
  let filteredRoles: Opportunity[] = [],
    paginatedRoles: Opportunity[] = []
  filterRoles()

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
            Volné pozice <RolesCountSpan>{allRoles.length}</RolesCountSpan>
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
          {paginatedRoles.map((r) => (
            <RoleItem
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
      <Section>
        <SectionContent>
          <RolesPaging
            currentPage={currentPage}
            totalPages={Math.ceil(filteredRoles.length / PAGE_SIZE)}
            onPageSelected={onPageSelected}
          />
        </SectionContent>
      </Section>
    </Layout>
  )
}

export default Roles
