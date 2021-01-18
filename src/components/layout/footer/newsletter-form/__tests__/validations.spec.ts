import { validateEmail } from '../validations'

describe('validations', () => {
  describe('validateEmail', () => {
    const errorMessages = { required: 'Error', invalid: 'Invalid' }

    it('should return undefined for valid email', () => {
      expect(
        validateEmail({
          email: 'vaclav.havel@cesko.digital',
          errorMessages,
        })
      ).toBeUndefined()
    })

    it('should return string for invalid email', () => {
      expect(validateEmail({ email: '', errorMessages })).toEqual(
        errorMessages.required
      )
      expect(validateEmail({ email: 'Václav', errorMessages })).toEqual(
        errorMessages.invalid
      )
      expect(validateEmail({ email: 'vaclav.havel', errorMessages })).toEqual(
        errorMessages.invalid
      )
    })
  })
})
