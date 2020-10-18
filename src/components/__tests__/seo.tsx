import React from 'react'
import renderer from 'react-test-renderer'
import { GraphQLData, PureSEO as SEO } from '../seo'

describe('SEO', () => {
  it('renders correctly', () => {
    const data: GraphQLData = {
      site: {
        siteMetadata: {
          title: 'cesko.digital',
          description: 'lorem ipsum',
          author: 'Jose',
        },
      },
    }
    const tree = renderer
      .create(<SEO data={data} title={data.site.siteMetadata.title} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
