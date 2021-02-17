/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path') // eslint-disable-line
const ProjectPagesGenerator = require('./gatsby-utils/project-pages-generator') // eslint-disable-line

const projectPagesGenerator = new ProjectPagesGenerator()

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await projectPagesGenerator.generatePages(graphql, actions.createPage)
}

exports.onCreatePage = async ({ page, actions }) => {
  projectPagesGenerator.removeDuplicatedPage(page, actions.deletePage)
}
