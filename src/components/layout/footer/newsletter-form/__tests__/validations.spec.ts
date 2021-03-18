import { useValidateNewsletter } from '../validations'

jest.mock('gatsby-plugin-react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
    }
  },
}))

describe('validations', () => {
  describe('validateEmail', () => {
    const validate = useValidateNewsletter()

    it('should return undefined for valid email', () => {
      expect(
        validate({
          email: 'vaclav.havel@cesko.digital',
        })
      ).toEqual({})
    })

    it('should return string for invalid email', () => {
      expect(validate({ email: '' }).email).toBeDefined()
      expect(validate({ email: 'Václav' }).email).toBeDefined()
      expect(validate({ email: 'vaclav.havel' }).email).toBeDefined()
    })
  })
})
