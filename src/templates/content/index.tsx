import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, SectionContent } from '../../components/layout'
import { ContentPageQuery } from '../../generated/graphql-types'
import * as Typography from '../../components/typography'
import {
  BoxesColumn,
  MainColumn,
  TwoColumnLayout,
  VideoIframe,
  VideoWrapper,
} from './styles'
import {CreditsBox, ResourceBox, TableOfContentBox} from './content-box'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
deckDeckGoHighlightElement()

interface ContentPageProps {
  data: ContentPageQuery
  location: Location
}

const ContentPage: React.FC<ContentPageProps> = ({ data }) => {
  const start = new URLSearchParams(location.search).get('start') ?? '0'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout
      crumbs={[
        { path: '/portal-dobrovolnika', label: 'Portál dobrovolníka' },
        { label: data.markdownRemark.frontmatter.title },
      ]}
      seo={{
        title: data.markdownRemark.frontmatter.title,
        description: data.markdownRemark.frontmatter.description,
        coverUrl: data.markdownRemark.frontmatter.cover,
      }}
    >
      <Section>
        <SectionContent>
          <Typography.Heading1>
            {data.markdownRemark.frontmatter.title}
          </Typography.Heading1>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <TwoColumnLayout>
            <MainColumn>
              <VideoWrapper>
                <VideoIframe
                  src={
                    data.markdownRemark.frontmatter.videoUrl +
                    '?autoplay=1&start=' +
                    start
                  }
                  title={data.markdownRemark.frontmatter.title}
                  frameBorder="0"
                  allow="autoplay"
                  allowFullScreen
                />
              </VideoWrapper>
              <Typography.Body
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
              />
            </MainColumn>
            <BoxesColumn>
              <TableOfContentBox
                data={data.markdownRemark.frontmatter.tableOfContent}
              />
              <ResourceBox data={data.markdownRemark.frontmatter.sources} />
              <CreditsBox data={data.markdownRemark.frontmatter.credits} />
            </BoxesColumn>
          </TwoColumnLayout>
        </SectionContent>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query ContentPage($id: String!, $locale: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        cover
        credits {
          title
          name
        }
        date
        description
        slug
        sources {
          title
          type
          url
        }
        tableOfContent {
          start
          time
          title
        }
        tags
        title
        videoUrl
      }
      html
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

export default ContentPage
