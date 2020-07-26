import * as assert from 'assert.ts'
import * as _ from '../src/Tuple.ts'

describe('Tuple', () => {
  it('swap', () => {
    assert.deepStrictEqual(_.swap([1, 'a']), ['a', 1])
  })
})
