require('dotenv').config()

const subPagePaths = [
  'partners',
  'portal-dobrovolnika',
  'projekty',
  'opportunities',
  'rsvp',
  'show-and-tell',
  'events',
  '404',
]

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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: 'carbon',
              theme: 'one-light',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        siteUrl: `https://cesko.digital/`,
        languages: [`cs`, 'en'],
        defaultLanguage: `cs`,
        redirect: false,
        pages: subPagePaths.map((path) => ({
          matchPath: `/:lang?/${path}/:uid?`,
          getLanguageFromPath: true,
          languages: ['cs'],
        })),
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locale`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-plugin-client-side-redirect`,
    },
  ],
}
