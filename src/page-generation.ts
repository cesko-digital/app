import { CreatePagesArgs } from 'gatsby'
import { resolve } from 'path'
import {
  Project,
  Event,
  Opportunity,
  MarkdownRemark,
} from './generated/graphql-types'

const PROJECT_TEMPLATE_RELATIVE_PATH = './src/templates/project/index.tsx'

export async function generateProjectPages({
  graphql,
  actions: { createPage },
}: CreatePagesArgs): Promise<void> {
  const result = await graphql<{ allProject: { nodes: Project[] } }>(`
    query GenerateProjectPages {
      allProject {
        nodes {
          slug
          id
        }
      }
    }
  `)

  result?.data?.allProject.nodes.forEach((node: Project) => {
    const projectUrl = `/projekty/${node.slug}`
    createPage({
      path: projectUrl,
      component: resolve(PROJECT_TEMPLATE_RELATIVE_PATH),
      context: {
        id: node.id,
      },
    })
  })
}

export async function generateEventPages({
  graphql,
  actions: { createPage },
}: CreatePagesArgs): Promise<void> {
  const result = await graphql<{ allEvent: { nodes: Event[] } }>(`
    query GenerateEventPages {
      allEvent(filter: { status: { in: ["live", "unlisted"] } }) {
        nodes {
          id
          name
          slug
        }
      }
    }
  `)

  result?.data?.allEvent.nodes.forEach((node: Event) => {
    createPage({
      path: `/events/${node.slug}`,
      component: resolve('./src/templates/event/index.tsx'),
      context: {
        id: node.id,
      },
    })
  })
}

export async function generateOpportunityPages({
  graphql,
  actions: { createPage, createRedirect },
}: CreatePagesArgs): Promise<void> {
  const result = await graphql<{ allOpportunity: { nodes: Opportunity[] } }>(`
    query GenerateOpportunityPages {
      allOpportunity(filter: { status: { in: ["live", "unlisted"] } }) {
        nodes {
          id
          name
          slug
        }
      }
    }
  `)

  result?.data?.allOpportunity.nodes.forEach((node: Opportunity) => {
    createPage({
      path: `/opportunities/${node.slug}`,
      component: resolve('./src/templates/opportunities/index.tsx'),
      context: {
        id: node.id,
      },
    })
    
    createRedirect({
      fromPath: `/roles/${node.slug}`,
      toPath: `/opportunities/${node.slug}`,
      isPermanent: true,
      redirectInBrowser: true
    });
  })
}

export async function generateContentPages({
  graphql,
  actions: { createPage },
}: CreatePagesArgs): Promise<void> {
  const result = await graphql<{
    allMarkdownRemark: { nodes: MarkdownRemark[] }
  }>(`
    query GenerateContentPages {
      allMarkdownRemark {
        nodes {
          html
          id
          frontmatter {
            cover
            date
            description
            slug
            sources {
              title
              type
              url
            }
            tableOfContent {
              time
              title
            }
            title
          }
        }
      }
    }
  `)

  result?.data?.allMarkdownRemark.nodes.forEach((node: MarkdownRemark) => {
    createPage({
      path: `/cedu/${node.frontmatter.slug}`,
      component: resolve('./src/templates/content/index.tsx'),
      context: {
        id: node.id,
      },
    })
  })
}
