import { AirTableRecord } from './airtable-record'

export interface AirTablePartner extends AirTableRecord {
  fields: {
    name: string
    url: string
    logoUrl: string
  }
}
