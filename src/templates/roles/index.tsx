import { Opportunity } from 'generated/graphql-types'
import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, SectionContent } from '../../components/layout'
import { Heading1 } from 'components/typography'
import * as S from './styles'

interface RolePageProps {
  data: {
    opportunity: Opportunity;
  }
}

const RolePage: React.FC<RolePageProps> = (props) => {
  const role = props.data.opportunity;
  return (
    <Layout
      crumbs={[
        { path: '/portal-dobrovolnika', label: 'Portál dobrovolníka' },
        { path: '/roles', label: 'Volné pozice' },
        { label: role.name },
      ]}
      seo={{
        title: role.name,
        description: 'Detail volné pozice',
        coverUrl: 'TBD',
      }}
    >
      <Section>
        <SectionContent>
          <Heading1>{role.name}</Heading1>
          <S.CoverImageWrapper>
            <S.CoverImage src={role.project.coverUrl} loading="lazy" />
          </S.CoverImageWrapper>
        </SectionContent>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query RolePage($id: String!, $locale: String!) {
    opportunity(id: { eq: $id }) {
      id
      name
      slug
      project {
        coverUrl
        description
        finished
        githubUrl
        id
        lang
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
          lang
          id
        }
        trelloUrl
        url
        silent
      }
    }
    locales: allLocale(filter: { language: { eq: $locale } }) {
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
export default RolePage
