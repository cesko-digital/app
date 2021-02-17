import ProjectPagesGenerator from './project-pages-generator'

jest.mock('path', () => {
  return { resolve: jest.fn().mockImplementation((path) => path) }
})

describe('project-pages-generator', () => {
  const mockGraphql = jest.fn().mockResolvedValue({
    data: {
      allProject: {
        nodes: [
          {
            lang: 'en',
            slug: 'test-slug-en',
            id: '0',
          },
          {
            lang: 'cs',
            slug: 'test-slug-cs',
            id: '1',
          },
        ],
      },
    },
  })

  test('should generate pages', async () => {
    const projectPagesGenerator = new ProjectPagesGenerator()
    const mockCreatePage = jest.fn()
    await projectPagesGenerator.generatePages(mockGraphql, mockCreatePage)
    expect(mockCreatePage).toBeCalledTimes(2)
    expect(mockCreatePage).toBeCalledWith({
      path: 'projects/test-slug-en',
      component: './src/templates/project.tsx',
      context: {
        type: 'project-page',
        id: '0',
      },
    })
    expect(mockCreatePage).toBeCalledWith({
      path: 'projekty/test-slug-cs',
      component: './src/templates/project.tsx',
      context: {
        type: 'project-page',
        id: '1',
      },
    })
  })

  test('should remove incrorrect pages', async () => {
    const projectPagesGenerator = new ProjectPagesGenerator()
    const mockCreatePage = jest.fn()
    await projectPagesGenerator.generatePages(mockGraphql, mockCreatePage)
    const mockDeletePage = jest.fn()

    const mockCorrectPageCs = {
      path: '/projekty/test-slug-cs',
      context: {
        type: 'project-page',
      },
    }
    const mockCorrectPageEn = {
      path: '/en/projects/test-slug-en',
      context: {
        type: 'project-page',
      },
    }

    projectPagesGenerator.removeDuplicatedPage(
      mockCorrectPageCs,
      mockDeletePage
    )

    projectPagesGenerator.removeDuplicatedPage(
      mockCorrectPageEn,
      mockDeletePage
    )
    expect(mockDeletePage).toBeCalledTimes(0)

    const mockIncorrectPageCs = {
      path: 'en/projekty/test-slug-cs',
      context: {
        type: 'project-page',
      },
    }
    const mockIncorrectPageEn = {
      path: '/projects/test-slug-en',
      context: {
        type: 'project-page',
      },
    }

    projectPagesGenerator.removeDuplicatedPage(
      mockIncorrectPageCs,
      mockDeletePage
    )

    projectPagesGenerator.removeDuplicatedPage(
      mockIncorrectPageEn,
      mockDeletePage
    )
    expect(mockDeletePage).toBeCalledTimes(2)
    expect(mockDeletePage).toBeCalledWith(mockIncorrectPageCs)
    expect(mockDeletePage).toBeCalledWith(mockIncorrectPageEn)
  })
})
