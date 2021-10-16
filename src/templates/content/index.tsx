import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../../components/layout'

interface ContentPageProps {
  data: unknown
}

const ContentPage: React.FC<ContentPageProps> = ({ data }) => {
  return <Layout>data.frontmatter.title</Layout>
}

export const query = graphql`
  query ContentPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`

export default ContentPage
