import { Layout, SectionContent, Section } from 'components/layout'
//import RolesFilter from 'page-components/portal-dobrovolnika/roles/roles-filter'
import * as Typography from 'components/typography'
import React from 'react'
import styled from 'styled-components'
/*import { PortalDobrovolnikaPageQuery } from '../../../generated/graphql-types'*/
//import {  } from '../types'
/*import * as S from '../styles'*/
import RoleItem from '../../../components/sections/role-overview'

interface RolesProps {
  data: any
}

const RolesCountSpan = styled.span`
  color: gray;
`
const Roles: React.FC<RolesProps> = (props) => {
  const roles = props.data.roles.nodes as any[]
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
            Volné pozice <RolesCountSpan>{roles.length}</RolesCountSpan>
          </Typography.Heading1>
        </SectionContent>
      </Section>
      {/* <Section>
            <SectionContent>
                <RolesFilter data=""></RolesFilter>
            </SectionContent>
        </Section> */}
      <Section>
        <SectionContent>
          {roles.map((r) => (
            <RoleItem
              name={r.name}
              id={r.id}
              skills={r.skills}
              project={r.project}
              timeRequirements={r.timeRequirements}
            />
          ))}
        </SectionContent>
      </Section>
    </Layout>
  )
}

export default Roles
