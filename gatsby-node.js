import { resolve } from 'path'
import { generateProjectPages } from './src/project-page-generation'

export function onCreateWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      modules: [resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

export const createPages = async (args) => await generateProjectPages(args)
