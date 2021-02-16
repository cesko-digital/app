import { isExternalURL } from '../is-url-external'

describe('is-url-external', () => {
  it('should return true for https://blog.cesko.digital/', () => {
    expect(isExternalURL('https://blog.cesko.digital/')).toBe(true)
  })

  it('should return false for /projects', () => {
    expect(isExternalURL('/projects')).toBe(false)
  })
})
