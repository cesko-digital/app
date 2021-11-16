import { resolve } from 'path'
import {
  generateContentPages,
  generateEventPages,
  generateRolePages,
  generateProjectPages,
} from './src/page-generation'

export function onCreateWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      modules: [resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

export const createPages = async (args) => {
  await generateProjectPages(args)
  await generateEventPages(args)
  await generateContentPages(args)
  await generateRolePages(args)
}
