import * as assert from 'assert.ts'
import { getApplicativeComposition } from '../src/Applicative.ts'
import * as A from '../src/ReadonlyArray.ts'
import * as O from '../src/Option.ts'

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    const arrayOption = getApplicativeComposition(A.Applicative, O.Applicative)
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    assert.deepStrictEqual(arrayOption.ap([O.some(double), O.some(inc)], [O.some(1), O.some(2)]), [
      O.some(2),
      O.some(4),
      O.some(2),
      O.some(3)
    ])
    assert.deepStrictEqual(arrayOption.ap([O.some(double), O.none], [O.some(1), O.some(2)]), [
      O.some(2),
      O.some(4),
      O.none,
      O.none
    ])
  })
})
