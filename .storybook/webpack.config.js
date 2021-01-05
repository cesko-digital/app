const path = require('path')

module.exports = ({ config }) => {
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

  // fonts
  config.module.rules.push({
    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    use: [
      {
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
        },
      },
    ],
    include: path.resolve(__dirname, '../'),
  })

  // Resolve absolute paths
  config.resolve.modules = [path.resolve(__dirname, '../src'), 'node_modules']

  return config
}
