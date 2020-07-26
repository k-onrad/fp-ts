import * as assert from 'assert.ts'
import * as A from '../src/ReadonlyArray.ts'
import { getFilterableComposition } from '../src/Filterable.ts'
import { some, none } from '../src/Option.ts'
import { right, left } from '../src/Either.ts'

describe('Filterable', () => {
  it('getFilterableComposition', () => {
    const F = getFilterableComposition(A.Functor, A.Filterable)
    assert.deepStrictEqual(
      F.filter(
        [
          [1, 2],
          [3, 4]
        ],
        (a) => a > 1
      ),
      [[2], [3, 4]]
    )

    assert.deepStrictEqual(
      F.filterMap(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        (a) => (a.length > 1 ? some(a.length) : none)
      ),
      [[2], [3, 4]]
    )

    assert.deepStrictEqual(
      F.partition(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        (a) => a.length % 2 === 0
      ),
      {
        left: [['a'], ['ccc']],
        right: [['bb'], ['dddd']]
      }
    )

    assert.deepStrictEqual(
      F.partitionMap(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        (a) => (a.length % 2 === 0 ? right(a.length) : left(a))
      ),
      {
        left: [['a'], ['ccc']],
        right: [[2], [4]]
      }
    )
  })
})
