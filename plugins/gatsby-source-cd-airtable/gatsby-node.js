require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
})

exports.sourceNodes = require('./source-nodes').sourceNodes
exports.createSchemaCustomization = require('./create-schema-customization').createSchemaCustomization
