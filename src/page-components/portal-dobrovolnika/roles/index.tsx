import { Layout, SectionContent, Section } from 'components/layout'
import * as Typography from 'components/typography'
import React from 'react'
import { PortalDobrovolnikaPageQuery } from '../../../generated/graphql-types'
//import {  } from '../types'
import * as S from '../styles'
import RoleOverview from '../../../components/sections/role-overview'

interface RolesProps {
  data: any
}

const Roles: React.FC<RolesProps> = (props) => {
  const roles = props.data.roles.nodes as any[]
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
          <Typography.Heading1>Portál dobrovolníka - role</Typography.Heading1>
          <Typography.Body>
            Tržiště příležitostí, jak se zapojit v Česko.Digital
          </Typography.Body>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          {roles.map((r) => (
            <RoleOverview
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
