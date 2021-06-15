export * from './mock-partners'
export * from './mock-projects'
export * from './mock-tags'
export * from './mock-volunteers'

import events from '../../samples/events.json'
import { notEmpty } from '../graphql-types/utils'
import { transformEvent } from '../transformers'

// eslint-disable-next-line
export const getMockEvents = () =>
  events.records.map(transformEvent).filter(notEmpty)
