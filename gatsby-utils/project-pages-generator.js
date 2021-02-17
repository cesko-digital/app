const path = require('path') // eslint-disable-line
const csPagesLocale = require('../locale/cs/pages.json') // eslint-disable-line
const enPagesLocale = require('../locale/en/pages.json') // eslint-disable-line

const PROJECT_PAGE_TYPE = 'project-page'
const PROJECT_PAGE_LOCALE_KEY = 'urls.projects'
const PROJECT_TEMPLATE_RELATIVE_PATH = './src/templates/project.tsx'

class ProjectPagesGenerator {
  #pagesMap = {}

  #getProjectSubPath = (lang) => {
    const locales = {
      cs: csPagesLocale[PROJECT_PAGE_LOCALE_KEY],
      en: enPagesLocale[PROJECT_PAGE_LOCALE_KEY],
    }

    return locales[lang]
  }

  #getProjectUrls = (node) => {
    const projectSubPath = this.#getProjectSubPath(node.lang)
    const nonTranslatedUrl = `${projectSubPath}/${node.slug}`
    const translatedUrl = `${
      node.lang === 'cs' ? '' : `/${node.lang}`
    }/${nonTranslatedUrl}`
    return { nonTranslatedUrl, translatedUrl }
  }

  #mapNodes = (createPage) => (node) => {
    const { translatedUrl, nonTranslatedUrl } = this.#getProjectUrls(node)
    this.#pagesMap[translatedUrl] = true
    createPage({
      path: nonTranslatedUrl,
      component: path.resolve(PROJECT_TEMPLATE_RELATIVE_PATH),
      context: {
        id: node.id,
        type: PROJECT_PAGE_TYPE,
      },
    })
  }

  generatePages = async (graphql, createPage) => {
    const result = await graphql(`
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

    result.data.allProject.nodes.forEach(this.#mapNodes(createPage))
  }

  removeDuplicatedPage = (page, deletePage) => {
    const isProjectPage = page.context.type === PROJECT_PAGE_TYPE
    const hasInvalidPath = !this.#pagesMap[page.path]

    if (isProjectPage && hasInvalidPath) {
      deletePage(page)
    }
  }
}

module.exports = ProjectPagesGenerator
