module.exports = {
  siteMetadata: {
    title: `česko.digital`,
    description: `Skrz jedničky a nuly měníme Česko k lepšímu`,
    author: `cesko.digital`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        // This loads settings for Netlify CMS, custom widgets etc.
        modulePath: `${__dirname}/src/cms/cms.jsx`,
        // Do no bundle Identity Widget
        // Docs: https://www.gatsbyjs.org/packages/gatsby-plugin-netlify-cms/#enableidentitywidget
        enableIdentityWidget: false,
        // Specifies public path to administration
        publicPath: 'admin',
        // Browser title displayed in administration
        htmlTitle: 'Admin cesko.digital',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve('./src/layouts/DefaultLayout.tsx'),
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
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
