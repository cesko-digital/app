import { parseCompetenceMap } from '../src/transformers'

test('parseCompetenceMap', () => {
  expect(parseCompetenceMap([])).toEqual({})
  expect(parseCompetenceMap(['dev:100'])).toEqual({ dev: 100 })
  expect(parseCompetenceMap(['dev:foo'])).toEqual({})
  expect(parseCompetenceMap(['dev:'])).toEqual({})
  expect(parseCompetenceMap([''])).toEqual({})
})
