import fetch from 'node-fetch'
import { loadData } from '../src/load-data'

jest.mock('node-fetch')

describe('loadData', () => {
  test('should throw an error when no key is provided', async () => {
    process.env = {}
    await expect(async () => await loadData('tableName')).rejects.toThrow()
  })

  test('should throw and error when api key is not provided', async () => {
    process.env = {
      AIRTABLE_BASE_URL: 'http://example.com',
    }
    await expect(async () => await loadData('tableName')).rejects.toThrow()
  })

  test('should throw and error when base key is not provided', async () => {
    process.env = {
      AIRTABLE_API_KEY: 'key',
    }
    await expect(async () => await loadData('tableName')).rejects.toThrow()
  })

  describe('Data loading with both keys provided', () => {
    beforeAll(() => {
      process.env = {
        AIRTABLE_API_KEY: 'foo',
        AIRTABLE_BASE_URL: 'http://example.com',
      }
      ;((fetch as unknown) as jest.Mock)
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce({
          ok: true,
          json: () => ({
            records: [
              {
                id: '1',
                fields: {
                  Name: 'name',
                  'Tagline CS': ' tagline',
                },
              },
            ],
          }),
        })
        .mockResolvedValueOnce({
          ok: false,
          json: () => ({}),
        })
    })

    afterAll(() => jest.restoreAllMocks())

    test('should throw error when no table name is provided', async () => {
      await expect(async () => await loadData((null as unknown) as string)).rejects.toThrow()
    })
    test('should send request to table url', () => {
      loadData('foo')
      expect(fetch).toBeCalledWith('http://example.com/foo', {
        headers: { Authorization: 'Bearer foo' },
      })
    })
    test('should return data when request was successful', async () => {
      const data = await loadData('foo')
      expect(data).toEqual([{ id: '1', fields: { Name: 'name', 'Tagline CS': ' tagline' } }])
    })
    test('should throw an error when request was unsuccessful', async () => {
      await expect(async () => await loadData('foo')).rejects.toThrow()
    })
  })
})
