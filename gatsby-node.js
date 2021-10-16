import { resolve } from 'path'
import {
  generateContentPages,
  generateEventPages,
  generateRolePages,
  generateOpportunityPages,
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
  await generateOpportunityPages(args)
  await generateContentPages(args)
  await generateRolePages(args)
}
