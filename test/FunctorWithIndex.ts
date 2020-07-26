import * as assert from 'assert.ts'
import * as A from '../src/ReadonlyArray.ts'
import { getFunctorWithIndexComposition } from '../src/FunctorWithIndex.ts'

describe('FunctorWithIndex', () => {
  it('getFunctorComposition', () => {
    const arrayOfArray = getFunctorWithIndexComposition(A.FunctorWithIndex, A.FunctorWithIndex)
    const f = ([i, j]: readonly [number, number], a: string) => a + i + j
    assert.deepStrictEqual(
      arrayOfArray.mapWithIndex(
        [
          ['a', 'b'],
          ['c', 'd']
        ],
        f
      ),
      [
        ['a00', 'b01'],
        ['c10', 'd11']
      ]
    )
  })
})
