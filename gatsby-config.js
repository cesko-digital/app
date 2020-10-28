require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Česko.digital`,
    description: `Skrz jedničky a nuly měníme Česko k lepšímu`,
    author: `@ceskodigital`,
  },
  plugins: [
    // Docs: https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/
    `gatsby-plugin-react-helmet`,
    {
      // Docs: https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // Docs: https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/
    `gatsby-transformer-sharp`,
    // Docs: https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/
    `gatsby-plugin-sharp`,
    {
      // Docs: https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve('./src/components/layout/mdx-layout.tsx'),
        },
      },
    },
    {
      // Plugin for generating manifest file for browsers
      // Docs: https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `cesko.digital`,
        short_name: `>c.d`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#1428C8`,
        // This path is relative to the root of the site.
        icon: `src/images/icon.png`,
      },
    },
    // Docs: https://www.gatsbyjs.com/plugins/gatsby-plugin-styled-components/
    `gatsby-plugin-styled-components`,
    // Docs: https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/
    `gatsby-plugin-typescript`,
    // This (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // Docs: https://www.gatsbyjs.org/packages/gatsby-plugin-offline/
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-cd-airtable`,
      options: {
        projectsTableName: 'Projects',
      },
    },
  ],
}
