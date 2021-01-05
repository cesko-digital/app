import fetch from 'node-fetch'
import { ConnectionError } from './errors/connection-error'

export const loadData = async <T>(tableName: string): Promise<T[]> => {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_URL) {
    throw new ConnectionError('API key and base url are both required')
  }
  if (!tableName) {
    throw new Error('Table Name is required')
  }

  const response = await fetch(
    `${process.env.AIRTABLE_BASE_URL}/${tableName}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Loading data from ${tableName} failed.`)
  }

  const data: { records: T[] } = await response.json()

  return data.records
}
