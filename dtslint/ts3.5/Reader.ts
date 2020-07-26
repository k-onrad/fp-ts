import * as _ from '../../src/Reader.ts'
import { pipe } from '../../src/pipeable.ts'

//
// chainW
//

// $ExpectType Reader<{ a: string; } & { b: number; }, number>
pipe(
  _.of<{ a: string }, string>('a'),
  _.chainW(() => _.of<{ b: number }, number>(1))
)
