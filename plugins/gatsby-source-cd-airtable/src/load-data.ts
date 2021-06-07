import fetch from 'node-fetch'

export async function getAllAirtableRecords<T>(
  airtableApiKey: string,
  airtableBaseUrl: string,
  tableName: string
): Promise<T[]> {
  const response = await fetch(`${airtableBaseUrl}/${tableName}`, {
    headers: {
      Authorization: `Bearer ${airtableApiKey}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Loading data from ${tableName} failed.`)
  }

  const data: { records: T[] } = await response.json()
  return data.records
}
