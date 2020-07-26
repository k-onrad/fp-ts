import * as assert from 'assert.ts'
import * as A from '../src/ReadonlyArray.ts'
import { getCompactableComposition } from '../src/Compactable.ts'
import { none, some } from '../src/Option.ts'
import { left, right } from '../src/Either.ts'

describe('Compactable', () => {
  it('getCompactableComposition', () => {
    const C = getCompactableComposition(A.Functor, { ...A.Functor, ...A.Compactable })
    assert.deepStrictEqual(
      C.compact([
        [some(1), none],
        [none, some(2)]
      ]),
      [[1], [2]]
    )
    assert.deepStrictEqual(
      C.separate([
        [left('a'), right(1)],
        [right(2), left('b')]
      ]),
      {
        left: [['a'], ['b']],
        right: [[1], [2]]
      }
    )
  })
})
