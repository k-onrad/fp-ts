import * as assert from 'assert.ts'
import * as R from '../src/Reader.ts'
import { fanout, splitStrong } from '../src/Strong.ts'

describe('Strong', () => {
  it('splitStrong', () => {
    const ab = (s: string) => s.length
    const cd = (n: number) => n >= 2
    assert.deepStrictEqual(splitStrong({ ...R.Strong, ...R.Category })(ab, cd)(['foo', 2]), [3, true])
    assert.deepStrictEqual(splitStrong({ ...R.Strong, ...R.Category })(ab, cd)(['a', 1]), [1, false])
  })

  it('fanout', () => {
    const ab = (s: string) => s.length
    const ac = (s: string) => s === s.toLowerCase()
    assert.deepStrictEqual(fanout({ ...R.Strong, ...R.Category })(ab, ac)('foo'), [3, true])
    assert.deepStrictEqual(fanout({ ...R.Strong, ...R.Category })(ab, ac)('A'), [1, false])
  })
})
