import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Link } from '../components/links'

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />

    <h1>cesko.digital</h1>

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
