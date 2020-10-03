import React from 'react'
import renderer from 'react-test-renderer'
import { PureSEO as SEO } from '../seo'

describe('SEO', () => {
  it('renders correctly', () => {
    // Created using the query from SEO.js
    const data = {
      site: {
        siteMetadata: {
          title: 'cesko.digital',
        },
      },
    }
    const tree = renderer
      .create(<SEO data={data} title={data.site.siteMetadata.title} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
