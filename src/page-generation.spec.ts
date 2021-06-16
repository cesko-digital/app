import { getProjectUrl } from './page-generation'

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
})
