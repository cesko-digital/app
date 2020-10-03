const path = require('path')

module.exports = ({ config }) => {
  config.module.rules[0].use[0].loader = require.resolve('babel-loader')
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
  ]

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
      plugins: [],
    },
  })

  // Remove the existing css rule
  config.module.rules = config.module.rules.filter(
    (f) => f.test.toString() !== '/\\.css$/'
  )

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader', 'postcss-loader'],
    include: path.resolve(__dirname, '../'),
  })

  return config
}
