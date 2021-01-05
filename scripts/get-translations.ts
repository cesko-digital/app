import Airtable from 'airtable'
import { set as lodashSet } from 'lodash'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import dotenv from 'dotenv'
import { default as AirtableRecord } from 'airtable/lib/record'

dotenv.config()

enum AirTableColumn {
  Key = 'id',
  Czech = 'cs',
  English = 'en',
}
interface AirtableStructure {
  [AirTableColumn.Key]: string
  [AirTableColumn.Czech]: string
  [AirTableColumn.English]: string
}

const config = {
  API_KEY: process.env.AIRTABLE_TRANSLATION_API_KEY,
  BASE_ID: process.env.AIRTABLE_TRANSLATION_BASE_ID,
  TABLE_NAME: process.env.AIRTABLE_TRANSLATION_BASE_NAME || 'Translations',
  VIEW: process.env.AIRTABLE_TRANSLATION_VIEW || 'Grid view',
}

interface MappedTranslations {
  lang: string
  key: string
  translation: string
}

const getAirtableRecords = async (): Promise<AirtableRecord[]> => {
  if (!config.API_KEY || !config.BASE_ID) {
    throw new Error('Env variables not specified!')
  }

  return new Airtable({ apiKey: config.API_KEY })
    .base(config.BASE_ID)
    .table(config.TABLE_NAME)
    .select({ view: config.VIEW })
    .all()
}

// Gets plain JS object from Airtable structure.
const getPlainObjectFromRecord = (
  data: AirtableRecord[]
): AirtableStructure[] => data.map((record) => record._rawJson.fields)

// Maps rows from Airtable to object arrays.
const splitByLanguages = (data: AirtableStructure[]) =>
  data.reduce<MappedTranslations[]>((acc, row) => {
    return [
      ...acc,
      {
        lang: AirTableColumn.Czech,
        key: row[AirTableColumn.Key],
        translation: row[AirTableColumn.Czech],
      },
      {
        lang: AirTableColumn.English,
        key: row[AirTableColumn.Key],
        translation: row[AirTableColumn.English],
      },
      //  ... if adding new language, add here
    ]
  }, [])

// Prefix the nesting with language.
const createNestedTranslations = (data: MappedTranslations[]) =>
  data.reduce(
    (acc, { key, lang, translation }) =>
      lodashSet(acc, `${lang}.${key}`, translation),
    {}
  )

// Write for all files. Language is always top key.
const writeFilesForLanguages = (data: Record<string, unknown>) =>
  Object.entries(data).forEach(([language, values]) => {
    const folderName = `./locale/${language}`
    const fileName = `${folderName}/translation.json`

    if (!existsSync(folderName)) {
      mkdirSync(folderName)
    }

    writeFileSync(fileName, JSON.stringify(values), 'utf8')
  })

const run = async () => {
  try {
    const results = await getAirtableRecords()
    const translationArray = getPlainObjectFromRecord(results)
    const groupedTranslations = splitByLanguages(translationArray)
    const nestedTranslations = createNestedTranslations(groupedTranslations)

    writeFilesForLanguages(nestedTranslations)
  } catch (e) {
    console.error(e)
    throw new Error('Error has occured.')
  }
}

run()
