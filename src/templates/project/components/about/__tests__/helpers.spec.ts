import { getBodyText } from '../helpers'

describe('helpers', () => {
  describe('getBodyText', () => {
    const finishedProjectSubtitle = 'contribute text from airtable'
    const ongoingProjectSubtitle = 'subtitle from translations'
    it('should return translation subtitle when project is ongoing', () => {
      expect(
        getBodyText({
          progress: 0,
          finishedProjectSubtitle,
          ongoingProjectSubtitle,
        })
      ).toEqual(ongoingProjectSubtitle)
      expect(
        getBodyText({
          progress: 20,
          finishedProjectSubtitle,
          ongoingProjectSubtitle,
        })
      ).toEqual(ongoingProjectSubtitle)
      expect(
        getBodyText({
          progress: 88,
          finishedProjectSubtitle,
          ongoingProjectSubtitle,
        })
      ).toEqual(ongoingProjectSubtitle)
    })

    it('should return contribute text when project is finished', () => {
      expect(
        getBodyText({
          progress: 100,
          finishedProjectSubtitle,
          ongoingProjectSubtitle,
        })
      ).toEqual(finishedProjectSubtitle)
    })
  })
})
