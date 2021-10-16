import { Layout, SectionContent, Section } from 'components/layout'
import RolesPaging from 'page-components/portal-dobrovolnika/roles/roles-paging'
import * as Typography from 'components/typography'
import { Opportunity } from 'generated/graphql-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import RoleItem from '../../../components/sections/role-overview'

interface RolesProps {
  data: {
    roles: { nodes: Opportunity[] }
  }
  page: number
}

const RolesCountSpan = styled.span`
  color: gray;
`
const PAGE_SIZE = 15

const Roles: React.FC<RolesProps> = (props) => {
  const [currentPage, setPage] = useState(props.page || 1)
  const onPageSelected = (index: number) => {
    setPage(index)
  }

  const allRoles = props.data.roles.nodes
  const roles = allRoles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )
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
          {roles.map((r) => (
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
            totalPages={Math.ceil(allRoles.length / PAGE_SIZE)}
            onPageSelected={onPageSelected}
          />
        </SectionContent>
      </Section>
    </Layout>
  )
}

export default Roles
