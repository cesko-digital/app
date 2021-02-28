import { mapTags } from '../map-tags'
import { Tag } from 'generated/graphql-types'

describe('map-tags', () => {
  it('should returned hashed slugs from Tags', () => {
    expect(
      mapTags([
        {
          rowId: '1',
          slug: 'js',
          name: 'JS',
          lang: 'cs',
        },
        {
          rowId: '2',
          slug: 'html',
          name: 'HTML',
          lang: 'cs',
        },
        {
          rowId: '3',
          slug: 'react',
          name: 'React',
          lang: 'cs',
        },
      ] as Tag[])
    ).toStrictEqual(['js', 'html', 'react'])
  })
})
