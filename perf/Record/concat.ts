mport * as Benchmark from 'benchmark.ts'
mport { getMonoid } from '../../src/Record.ts'
mport { semigroupSum } from '../../src/Semigroup.ts'

onst suite = new Benchmark.Suite()

const M = getMonoid(semigroupSum)
const as = { a: 1, b: 2 }

suite
  .add('concat', function() {
    M.concat(as, M.empty)
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
