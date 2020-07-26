import * as _ from '../../src/Ord.ts'

//
// getTupleOrd
//

_.getTupleOrd(_.ordString, _.ordNumber, _.ordBoolean) // $ExpectType Ord<[string, number, boolean]>
