require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
})

// Docs: https://www.gatsbyjs.com/docs/creating-a-source-plugin
exports.sourceNodes = require('./source-nodes').sourceNodes
