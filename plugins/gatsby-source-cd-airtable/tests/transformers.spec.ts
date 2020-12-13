import { transformProject } from '../src/transformers'
import 'jest'

describe('transformers', () => {
  describe('transformProject', () => {
    test('should transform project without tagline', () => {
      const result = transformProject({
        id: 'id',
        fields: {
          Name: 'name',
        },
      })

      expect(result).toEqual({
        originalId: 'id',
        name: 'name',
        tagline: null,
      })
    })
    test('should transform project with tagline', () => {
      const result = transformProject({
        id: 'id',
        fields: {
          Name: 'name',
          'Tagline CS': 'tagline',
        },
      })

      expect(result).toEqual({
        originalId: 'id',
        name: 'name',
        tagline: 'tagline',
      })
    })
  })
})
