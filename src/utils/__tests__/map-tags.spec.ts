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
        },
        {
          rowId: '2',
          slug: 'html',
          name: 'HTML',
        },
        {
          rowId: '3',
          slug: 'react',
          name: 'React',
        },
      ] as Tag[])
    ).toStrictEqual(['js', 'html', 'react'])
  })
})
