import * as _ from '../../src/Eq.ts'

//
// getTupleEq
//

_.getTupleEq(_.eqString, _.eqNumber, _.eqBoolean) // $ExpectType Eq<[string, number, boolean]>
