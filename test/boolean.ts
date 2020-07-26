import * as assert from 'assert.ts'
import * as B from '../src/boolean.ts'

describe('boolean', () => {
  it('fold', () => {
    assert.deepStrictEqual(
      B.fold(
        () => 'false',
        () => 'true'
      )(true),
      'true'
    )
    assert.deepStrictEqual(
      B.fold(
        () => 'false',
        () => 'true'
      )(false),
      'false'
    )
  })
})
