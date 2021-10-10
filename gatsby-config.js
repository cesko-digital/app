require('dotenv').config()

module.exports = {
  siteMetadata: {},
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
    // Docs: https://www.gatsbyjs.com/plugins/gatsby-plugin-react-i18next/
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locale`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        siteUrl: `https://cesko.digital/`,
        languages: [`cs`],
        defaultLanguage: `cs`,
        redirect: false,
        pages: [
          {
            matchPath: '/projekty/:uid',
            languages: ['cs'],
          },
        ],
      },
    },
    {
      // Docs: https://www.npmjs.com/package/gatsby-plugin-translate-urls
      resolve: `gatsby-plugin-translate-urls`,
      options: {
        defaultLocale: 'cs',
        prefix: 'urls.',
        translations: {
          cs: require('./locale/cs/pages.json'),
        },
      },
    },
    {
      resolve: `gatsby-source-cd-airtable`,
      options: {
        airtableApiKey: process.env.AIRTABLE_API_KEY,
        airtableBaseUrl: process.env.AIRTABLE_BASE_URL,
        forceMockMode: process.env.USE_MOCKS,
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-PWGVF79',
      },
    },
  ],
}
