import { transformProject } from '../src/transformers'

describe('transformers', () => {
  describe('transformProject', () => {
    test('should transform project without tagline', () => {
      expect(
        transformProject({
          id: 'id',
          fields: {
            Name: 'name',
          },
        })
      ).toEqual({
        originalId: 'id',
        name: 'name',
        tagline: null,
      })
    })
    test('should transform project with tagline', () => {
      expect(
        transformProject({
          id: 'id',
          fields: {
            Name: 'name',
            'Tagline CS': 'tagline',
          },
        })
      ).toEqual({
        originalId: 'id',
        name: 'name',
        tagline: 'tagline',
      })
    })
  })
})
