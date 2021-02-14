import { isExternalURL } from './is-url-external'

describe('is-url-external', () => {
  test('should return true for https://blog.cesko.digital/', () => {
    expect(isExternalURL('https://blog.cesko.digital/')).toBe(true)
  })

  test('should return false for /projects', () => {
    expect(isExternalURL('/projects')).toBe(false)
  })
})
