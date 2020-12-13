import fetch from 'node-fetch'
import { ConnectionError } from './errors/connection-error'

export const loadData = async <T>(tableName: string): Promise<T[]> => {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_URL) {
    return Promise.reject(new ConnectionError('API key and base url are both required'))
  }
  if (!tableName) {
    return Promise.reject(new Error('Table Name is required'))
  }

  const response = await fetch(`${process.env.AIRTABLE_BASE_URL}/${tableName}`, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
  })

  if (!response.ok) {
    return Promise.reject(new Error(`Loading data from ${tableName} failed.`))
  }

  const data: { records: T[] } = await response.json()

  return data.records
}
