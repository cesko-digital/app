import { insertIf } from '../insert-if'

describe('insertIf', () => {
  it('should return empty array when condition is false', () => {
    expect(insertIf({ condition: false, elements: [1, 2, 3] })).toEqual([])
  })
  it('should return elements array when condition is true', () => {
    expect(insertIf({ condition: true, elements: [1, 2, 3] })).toEqual([
      1,
      2,
      3,
    ])
  })
})
