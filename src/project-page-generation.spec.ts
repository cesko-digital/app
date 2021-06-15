import { getProjectUrl, isValidProjectUrl } from './project-page-generation'

describe('project page generation helpers', () => {
  describe('getProjectUrl', () => {
    it('should return cs url for for cs project', () => {
      expect(getProjectUrl({ slug: 'cesky-projekt', lang: 'cs' })).toEqual(
        '/projekty/cesky-projekt'
      )
    })
    it('should return en url for for en project', () => {
      expect(getProjectUrl({ slug: 'english-project', lang: 'en' })).toEqual(
        '/en/projects/english-project'
      )
    })
  })

  describe('isValidProjectUrl', () => {
    it('should return true for cs project url', () => {
      expect(isValidProjectUrl('/projekty/test')).toEqual(true)
    })
    it('should return true for en project url', () => {
      expect(isValidProjectUrl('/en/projects/test')).toEqual(true)
    })
    it('should return false for mixed en project url', () => {
      expect(isValidProjectUrl('/en/projekty/test')).toEqual(false)
    })
  })
})
