import * as _ from '../../src/StateReaderTaskEither.ts'
import * as E from '../../src/Either.ts'
import * as TE from '../../src/TaskEither.ts'
import * as RTE from '../../src/ReaderTaskEither.ts'
import * as IOE from '../../src/IOEither.ts'
import { pipe } from '../../src/pipeable.ts'

//
// chainW
//

// $ExpectType StateReaderTaskEither<boolean, { a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<boolean, { a: string }, string, string>('a'),
  _.chainW(() => _.right<boolean, { b: number }, number, number>(1))
)

//
// chainEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainEitherKW(() => E.right<number, number>(1))
)

//
// chainTaskEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainTaskEitherKW(() => TE.right<number, number>(1))
)

//
// chainReaderTaskEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainReaderTaskEitherKW(() => RTE.right<string, number, number>(1))
)

//
// chainIOEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainIOEitherKW(() => IOE.right<number, number>(1))
)
