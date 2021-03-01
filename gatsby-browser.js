/**
 * Implement Gatsby's Browser APIs in this file.
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
const React = require('react')
const Theme = require('./src/theme').Theme
const ReactDOM = require('react-dom')

exports.wrapPageElement = ({ element, props }) => {
  return <Theme {...props}>{element}</Theme>
}

// Fix incorrect SSR styled components rendering, avatars on project page were broken
// Issue: https://github.com/gatsbyjs/gatsby/issues/8560
exports.replaceHydrateFunction = () => {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback)
  }
}
