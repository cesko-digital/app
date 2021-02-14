import { Tag } from 'pages/projects'
import { mapTags } from './map-tags'

describe('map-tags', () => {
  const tags: Tag[] = [
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
  ]

  test('should returned hashed slugs from Tags', () => {
    const expected = ['#js', '#html', '#react']
    expect(mapTags(tags)).toStrictEqual(expected)
  })
})
