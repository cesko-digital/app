import {buildTrendOptions} from "./trend-request";

function getParams(key: string, value: string): URLSearchParams {
    const params = new URLSearchParams()
    params.set(key, value)

    return params
}

jest.useFakeTimers()
jest.setSystemTime(new Date(2050, 0, 1))


test('buildTrendOptions return null if ?year parameter is not sent', () => {
    expect(buildTrendOptions(new URLSearchParams()).toYear).toBeNull()
    expect(buildTrendOptions(new URLSearchParams()).fromYear).toBeNull()
})

test('buildTrendOptions year return null if not 4 year digit', () => {
    expect(buildTrendOptions(getParams('year',  '202')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('year',  '20222')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('year',  '2022a')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('year',  'asde')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('year',  '202')).toYear).toBeNull()
    expect(buildTrendOptions(getParams('year',  '20222')).toYear).toBeNull()
    expect(buildTrendOptions(getParams('year',  '2022a')).toYear).toBeNull()
    expect(buildTrendOptions(getParams('year',  'asde')).toYear).toBeNull()
})

test('buildTrendOptions year expect 4 year digit and sets fromYear/toYear', () => {
    expect(buildTrendOptions(getParams('year',  '2022')).fromYear).toEqual(2022)
    expect(buildTrendOptions(getParams('year',  '2023')).fromYear).toEqual(2023)
    expect(buildTrendOptions(getParams('year',  '2022')).toYear).toEqual(2022)
    expect(buildTrendOptions(getParams('year',  '2023')).toYear).toEqual(2023)
})

test('buildTrendOptions from return null if not 4 year digit', () => {
    expect(buildTrendOptions(getParams('from',  '202')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('from',  '20222')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('from',  '2022a')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('from',  'asde')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('from',  '202')).toYear).toBeNull()
    expect(buildTrendOptions(getParams('from',  '20222')).toYear).toBeNull()
    expect(buildTrendOptions(getParams('from',  '2022a')).toYear).toBeNull()
    expect(buildTrendOptions(getParams('from',  'asde')).toYear).toBeNull()
})

test('buildTrendOptions from expects 4 year digit', () => {
    expect(buildTrendOptions(getParams('from',  '2022')).fromYear).toEqual(2022)
    expect(buildTrendOptions(getParams('from',  '2023')).fromYear).toEqual(2023)
    expect(buildTrendOptions(getParams('from',  '2022')).toYear).toEqual(null)
    expect(buildTrendOptions(getParams('from',  '2023')).toYear).toEqual(null)
})

test('buildTrendOptions to supports now/previous', () => {
    expect(buildTrendOptions(getParams('from',  'now')).fromYear).toEqual(2050)
    expect(buildTrendOptions(getParams('from',  'previous')).fromYear).toEqual(2049)
    expect(buildTrendOptions(getParams('from',  'now')).toYear).toEqual(null)
    expect(buildTrendOptions(getParams('from',  'previous')).toYear).toEqual(null)
})

test('buildTrendOptions to return null if not 4 year digit', () => {
    expect(buildTrendOptions(getParams('to',  '202')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('to',  '20222')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('to',  '2022a')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('to',  'asde')).fromYear).toBeNull()
    expect(buildTrendOptions(getParams('to',  '202')).toYear).toBeNull()
    expect(buildTrendOptions(getParams('to',  '20222')).toYear).toBeNull()
    expect(buildTrendOptions(getParams('to',  '2022a')).toYear).toBeNull()
    expect(buildTrendOptions(getParams('to',  'asde')).toYear).toBeNull()
})

test('buildTrendOptions to expects 4 year digit', () => {
    expect(buildTrendOptions(getParams('to',  '2022')).fromYear).toEqual(null)
    expect(buildTrendOptions(getParams('to',  '2023')).fromYear).toEqual(null)
    expect(buildTrendOptions(getParams('to',  '2022')).toYear).toEqual(2022)
    expect(buildTrendOptions(getParams('to',  '2023')).toYear).toEqual(2023)
})

test('buildTrendOptions to supports now/previous', () => {
    expect(buildTrendOptions(getParams('to',  'now')).fromYear).toEqual(null)
    expect(buildTrendOptions(getParams('to',  'previous')).fromYear).toEqual(null)
    expect(buildTrendOptions(getParams('to',  'now')).toYear).toEqual(2050)
    expect(buildTrendOptions(getParams('to',  'previous')).toYear).toEqual(2049)
})

test('buildTrendOptions autoFill returns false if ?fill not sent', () => {
    expect(buildTrendOptions(getParams('test','123')).autoFill).toBeFalsy()
})

test('buildTrendOptions autoFill returns true only if true/1 is passed', () => {
    expect(buildTrendOptions(getParams('fill', '1'))).toBeTruthy()
    expect(buildTrendOptions(getParams('fill', 'true'))).toBeTruthy()
})

test('buildTrendOption autoFill returns false on negative values', () => {
    expect(buildTrendOptions(getParams('fill', '0')).autoFill).toBeFalsy()
    expect(buildTrendOptions(getParams('fill', 'false')).autoFill).toBeFalsy()
    expect(buildTrendOptions(getParams('fill', 'test')).autoFill).toBeFalsy()
})
