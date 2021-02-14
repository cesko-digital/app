import { getTitle } from '../helpers'

describe('helpers', () => {
  describe('getTitle', () => {
    const translations = {
      incubator: 'incubator',
      ongoing: 'ongoing',
      finished: 'finished',
    }
    it('should return incubator title when progress percent is lte 20', () => {
      expect(getTitle({ percent: 0, translations })).toEqual(
        translations.incubator
      )
      expect(getTitle({ percent: -10, translations })).toEqual(
        translations.incubator
      )
      expect(getTitle({ percent: 10, translations })).toEqual(
        translations.incubator
      )
      expect(getTitle({ percent: 20, translations })).toEqual(
        translations.incubator
      )
    })
    it('should return finished title when progress percent is gte 100', () => {
      expect(getTitle({ percent: 100, translations })).toEqual(
        translations.finished
      )
      expect(getTitle({ percent: 110, translations })).toEqual(
        translations.finished
      )
    })
    it('should return ongoing title for any other progress', () => {
      expect(getTitle({ percent: 21, translations })).toEqual(
        translations.ongoing
      )
      expect(getTitle({ percent: 99, translations })).toEqual(
        translations.ongoing
      )
      expect(getTitle({ percent: 50, translations })).toEqual(
        translations.ongoing
      )
    })
  })
})
