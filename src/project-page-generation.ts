import { CreatePagesArgs, CreatePageArgs } from 'gatsby'
import path from 'path'
import { Project } from './generated/graphql-types'

const PROJECT_TEMPLATE_RELATIVE_PATH = './src/templates/project/index.tsx'
const SUPPORTED_LANGUAGES = ['cs']

export const getProjectUrl = (node: Project) => {
  if (node.lang === 'cs') {
    return `/projekty/${node.slug}`
  }

  return `/${node.lang}/projects/${node.slug}`
}

export const generateProjectPages = async ({
  graphql,
  actions: { createPage },
}: CreatePagesArgs): Promise<void> => {
  const result = await graphql<{ allProject: { nodes: Project[] } }>(`
    query {
      allProject {
        nodes {
          lang
          slug
          id
        }
      }
    }
  `)

  result?.data?.allProject.nodes
    .filter((node) => SUPPORTED_LANGUAGES.includes(node.lang))
    .forEach((node: Project) => {
      const projectUrl = getProjectUrl(node)
      createPage({
        path: projectUrl,
        component: path.resolve(PROJECT_TEMPLATE_RELATIVE_PATH),
        context: {
          id: node.id,
        },
      })
    })
}

export const isValidProjectUrl = (url: string): boolean =>
  !url.includes('/en/projekty/')

export const removeInvalidProjectPages = async ({
  page,
  actions: { deletePage },
}: CreatePageArgs): Promise<void> => {
  if (!isValidProjectUrl(page.path)) {
    deletePage(page)
  }
}
