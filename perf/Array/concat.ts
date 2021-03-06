import * as Benchmark from 'benchmark.ts'
import { getMonoid, empty } from '../../src/Array.ts'

const suite = new Benchmark.Suite()

const M = getMonoid<number>()
// tslint:disable-next-line: readonly-array
const as = [1, 2, 3]

suite
  .add('concat', function() {
    M.concat(as, empty)
  })
  .on('cycle', function(event: any) {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .on('complete', function(this: any) {
    // tslint:disable-next-line: no-console
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
