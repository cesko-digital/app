import { parseCompetenceMap, transformEvent } from '../src/transformers'
import { Event } from '../src/types'
import sampleEvent from '../samples/event.json'

test('parseCompetenceMap', () => {
  expect(parseCompetenceMap([])).toEqual({})
  expect(parseCompetenceMap(['dev:100'])).toEqual({ dev: 100 })
  expect(parseCompetenceMap(['dev:foo'])).toEqual({})
  expect(parseCompetenceMap(['dev:'])).toEqual({})
  expect(parseCompetenceMap([''])).toEqual({})
})

test('transformEvents', () => {
  const received = transformEvent(sampleEvent as any) // eslint-disable-line
  const expected: Event = {
    name: 'Show & Tell #2',
    summary: 'Živé vysílání bla bla bla…',
    description: 'Bude to **pecka**!\n',
    competenceMap: {
      dev: 100,
      marketing: 100,
    },
    startTime: new Date('2021-06-24T17:00:00.000Z'),
    endTime: new Date('2021-06-24T18:00:00.000Z'),
    status: 'draft',
    rowId: 'rec9ujcN8HSkE0hgh',
  }
  expect(received).toEqual(expected)
})
