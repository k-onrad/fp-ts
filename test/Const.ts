import * as assert from 'assert.ts'
import * as _ from '../src/Const.ts'
import { semigroupString } from '../src/Semigroup.ts'
import { eqNumber } from '../src/Eq.ts'
import { monoidString } from '../src/Monoid.ts'
import { showString } from '../src/Show.ts'
import { pipe } from '../src/function.ts'

describe('Const', () => {
  describe('pipeables', () => {
    it('map', () => {
      const fa = _.make('foo')
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(fa, _.map(double)), fa)
    })

    it('contramap', () => {
      const fa: _.Const<string, number> = _.make('foo')
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(fa, _.contramap(double)), fa)
    })

    it('bimap', () => {
      const fa: _.Const<string, number> = _.make('a')
      const f = (s: string): string => s.toUpperCase()
      const g = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(fa, _.bimap(f, g)), _.make('A'))
    })

    it('mapLeft', () => {
      const fa: _.Const<string, number> = _.make('a')
      const f = (s: string): string => s.toUpperCase()
      assert.deepStrictEqual(pipe(fa, _.mapLeft(f)), _.make('A'))
    })
  })

  it('getApplicative', () => {
    const F = _.getApplicative(monoidString)
    assert.deepStrictEqual(F.of(1), _.make(''))
  })

  it('getEq', () => {
    const S = _.getEq(eqNumber)
    assert.deepStrictEqual(S.equals(_.make(1), _.make(1)), true)
    assert.deepStrictEqual(S.equals(_.make(1), _.make(2)), false)
  })

  it('getApplicative', () => {
    const F = _.getApply(semigroupString)
    const fa = _.make('foo')
    assert.deepStrictEqual(F.ap(fa, _.make('bar')), _.make('foobar'))
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    const x: _.Const<string, number> = _.make('a')
    assert.deepStrictEqual(S.show(x), `make("a")`)
  })
})
