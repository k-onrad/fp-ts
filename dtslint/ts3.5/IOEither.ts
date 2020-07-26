import * as _ from '../../src/IOEither.ts'
import * as IO from '../../src/IO.ts'
import * as E from '../../src/Either.ts'
import { pipe } from '../../src/pipeable.ts'

//
// getOrElseW
//

// $ExpectType IO<string | null>
pipe(
  _.right('a'),
  _.getOrElseW(() => IO.of(null))
)

//
// chainW
//

// $ExpectType IOEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainW(() => _.right<number, number>(1))
)

//
// chainEitherKW
//

// $ExpectType IOEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainEitherKW(() => E.right<number, number>(1))
)
