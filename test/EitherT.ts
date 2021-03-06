import * as assert from 'assert.ts'
import * as E from '../src/Either.ts'
import { getEitherM } from '../src/EitherT.ts'
import * as I from '../src/IO.ts'

const T = getEitherM(I.Monad)

describe('EitherT', () => {
  it('fold', () => {
    const onLeft = (s: string) => I.of(`left(${s})`)
    const onRight = (n: number) => I.of(`right(${n})`)
    assert.deepStrictEqual(T.fold(I.of(E.right(1)), onLeft, onRight)(), 'right(1)')
    assert.deepStrictEqual(T.fold(I.of(E.left('bb')), onLeft, onRight)(), 'left(bb)')
  })

  it('getOrElse', () => {
    const onLeft = (s: string) => I.of(`left(${s})`)
    assert.deepStrictEqual(T.getOrElse(I.of(E.right('a')), onLeft)(), 'a')
    assert.deepStrictEqual(T.getOrElse(I.of(E.left('bb')), onLeft)(), 'left(bb)')
  })
})
