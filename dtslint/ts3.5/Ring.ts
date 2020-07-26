import * as _ from '../../src/Ring.ts'
import { fieldNumber } from '../../src/Field.ts'

//
// getTupleRing
//

_.getTupleRing(fieldNumber, fieldNumber, fieldNumber) // $ExpectType Ring<[number, number, number]>
