import { getRelativeDate } from '../get-relative-date'

describe('get-relative-date', () => {
  it('should return the right text for dates', () => {
    expect(
      getRelativeDate(
        '2021-11-25T10:00:00',
        '2021-11-25T11:00:00',
        new Date('2021-11-25T10:30:00')
      )
    ).toStrictEqual('Probíhá')
    expect(
      getRelativeDate(
        '2021-11-25T10:00:00',
        '2021-11-25T11:00:00',
        new Date('2021-11-25T09:30:00')
      )
    ).toStrictEqual('Dnes, 10:00')
    expect(
      getRelativeDate(
        '2021-11-25T10:00:00',
        '2021-11-25T11:00:00',
        new Date('2021-11-25T11:30:00')
      )
    ).toStrictEqual('Proběhlo')
    expect(
      getRelativeDate(
        '2021-11-26T12:34:00',
        '2021-11-26T11:00:00',
        new Date('2021-11-25T10:30:00')
      )
    ).toStrictEqual('Zítra, 12:34')
    expect(
      getRelativeDate(
        '2023-11-25T00:00:00',
        '2023-11-25T11:00:00',
        new Date('2021-11-25T10:30:00')
      )
    ).toStrictEqual('25.11.2023, 00:00')
    // Test that we do not check for data consistency in the function
    expect(
      getRelativeDate(
        '2021-12-25T00:00:00',
        '2021-11-25T11:00:00',
        new Date('2021-11-25T10:30:00')
      )
    ).toStrictEqual('25.12., 00:00')
  })
})
