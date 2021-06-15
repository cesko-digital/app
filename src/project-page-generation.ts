import { CreatePagesArgs, CreatePageArgs } from 'gatsby'
import { resolve } from 'path'
import { Project } from './generated/graphql-types'

const PROJECT_TEMPLATE_RELATIVE_PATH = './src/templates/project/index.tsx'
const SUPPORTED_LANGUAGES = ['cs']

export function getProjectUrl(args: { lang: string; slug: string }): string {
  return args.lang === 'cs'
    ? `/projekty/${args.slug}`
    : `/${args.lang}/projects/${args.slug}`
}

export async function generateProjectPages({
  graphql,
  actions: { createPage },
}: CreatePagesArgs): Promise<void> {
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
        component: resolve(PROJECT_TEMPLATE_RELATIVE_PATH),
        context: {
          id: node.id,
        },
      })
    })
}

export const isValidProjectUrl = (url: string): boolean =>
  !url.includes('/en/projekty/')

export async function removeInvalidProjectPages({
  page,
  actions: { deletePage },
}: CreatePageArgs): Promise<void> {
  if (!isValidProjectUrl(page.path)) {
    deletePage(page)
  }
}
