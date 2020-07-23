import { identity } from './function';
// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/lib/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @category guards
 * @since 2.0.0
 */
export var isSome = function (fa) { return fa._tag === 'Some'; };
/**
 * Returns `true` if the option is `None`, `false` otherwise
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/lib/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category guards
 * @since 2.0.0
 */
export var isNone = function (fa) { return fa._tag === 'None'; };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
export var none = { _tag: 'None' };
/**
 * @category constructors
 * @since 2.0.0
 */
export var some = function (a) { return ({ _tag: 'Some', value: a }); };
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category constructors
 * @since 2.0.0
 */
export function fromNullable(a) {
    return a == null ? none : some(a);
}
export function fromPredicate(predicate) {
    return function (a) { return (predicate(a) ? some(a) : none); };
}
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
 * `Some`
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @category constructors
 * @since 2.0.0
 */
export function tryCatch(f) {
    try {
        return some(f());
    }
    catch (e) {
        return none;
    }
}
/**
 * Returns an `E` value if possible
 *
 * @category constructors
 * @since 2.0.0
 */
export function getLeft(ma) {
    return ma._tag === 'Right' ? none : some(ma.left);
}
/**
 * Returns an `A` value if possible
 *
 * @category constructors
 * @since 2.0.0
 */
export function getRight(ma) {
    return ma._tag === 'Left' ? none : some(ma.right);
}
/**
 * @category constructors
 * @since 2.0.0
 */
export var fromEither = function (ma) { return (ma._tag === 'Left' ? none : some(ma.right)); };
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, fold } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export function fold(onNone, onSome) {
    return function (ma) { return (isNone(ma) ? onNone() : onSome(ma.value)); };
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @example
 * import { some, none, toNullable } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toNullable
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toNullable
 *   ),
 *   null
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export function toNullable(ma) {
    return isNone(ma) ? null : ma.value;
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @example
 * import { some, none, toUndefined } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toUndefined
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toUndefined
 *   ),
 *   undefined
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export function toUndefined(ma) {
    return isNone(ma) ? undefined : ma.value;
}
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export var getOrElseW = function (onNone) { return function (ma) { return (isNone(ma) ? onNone() : ma.value); }; };
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export var getOrElse = getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * This is `chain` + `fromNullable`, useful when working with optional values
 *
 * @example
 * import { some, none, fromNullable, mapNullable } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * interface Employee {
 *   company?: {
 *     address?: {
 *       street?: {
 *         name?: string
 *       }
 *     }
 *   }
 * }
 *
 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee1.company),
 *     mapNullable(company => company.address),
 *     mapNullable(address => address.street),
 *     mapNullable(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     mapNullable(company => company.address),
 *     mapNullable(address => address.street),
 *     mapNullable(street => street.name)
 *   ),
 *   none
 * )
 *
 * @category combinators
 * @since 2.0.0
 */
export function mapNullable(f) {
    return function (ma) { return (isNone(ma) ? none : fromNullable(f(ma.value))); };
}
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return (isNone(fa) ? none : some(f(fa.value))); };
var ap_ = function (fab, fa) { return (isNone(fab) ? none : isNone(fa) ? none : some(fab.value(fa.value))); };
var chain_ = function (ma, f) { return (isNone(ma) ? none : f(ma.value)); };
var reduce_ = function (fa, b, f) { return (isNone(fa) ? b : f(b, fa.value)); };
var foldMap_ = function (M) { return function (fa, f) { return (isNone(fa) ? M.empty : f(fa.value)); }; };
var reduceRight_ = function (fa, b, f) { return (isNone(fa) ? b : f(fa.value, b)); };
var traverse_ = function (F) { return function (ta, f) {
    return isNone(ta) ? F.of(none) : F.map(f(ta.value), some);
}; };
var alt_ = function (fa, that) { return (isNone(fa) ? that() : fa); };
var filter_ = function (fa, predicate) {
    return isNone(fa) ? none : predicate(fa.value) ? fa : none;
};
var filterMap_ = function (ma, f) { return (isNone(ma) ? none : f(ma.value)); };
var extend_ = function (wa, f) { return (isNone(wa) ? none : some(f(wa))); };
var partition_ = function (fa, predicate) {
    return {
        left: filter_(fa, function (a) { return !predicate(a); }),
        right: filter_(fa, predicate)
    };
};
var partitionMap_ = function (fa, f) { return separate(map_(fa, f)); };
var wither_ = function (F) { return function (fa, f) {
    return isNone(fa) ? F.of(none) : f(fa.value);
}; };
var wilt_ = function (F) { return function (fa, f) {
    var o = map_(fa, function (a) {
        return F.map(f(a), function (e) { return ({
            left: getLeft(e),
            right: getRight(e)
        }); });
    });
    return isNone(o)
        ? F.of({
            left: none,
            right: none
        })
        : o.value;
}; };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Functor
 * @since 2.0.0
 */
export var map = function (f) { return function (fa) { return map_(fa, f); }; };
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export var ap = function (fa) { return function (fab) { return ap_(fab, fa); }; };
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.0.0
 */
export var apFirst = function (fb) { return function (fa) {
    return ap_(map_(fa, function (a) { return function () { return a; }; }), fb);
}; };
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.0.0
 */
export var apSecond = function (fb) { return function (fa) {
    return ap_(map_(fa, function () { return function (b) { return b; }; }), fb);
}; };
/**
 * @category Applicative
 * @since 2.7.0
 */
export var of = some;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = function (f) { return function (ma) { return chain_(ma, f); }; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chainFirst = function (f) { return function (ma) {
    return chain_(ma, function (a) { return map_(f(a), function () { return a; }); });
}; };
/**
 * @category Monad
 * @since 2.0.0
 */
export var flatten = function (mma) { return chain_(mma, identity); };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * @example
 * import * as O from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 *
 * @category Alt
 * @since 2.0.0
 */
export var alt = function (that) { return function (fa) { return alt_(fa, that); }; };
/**
 * @category Alternative
 * @since 2.7.0
 */
export var zero = function () { return none; };
/**
 * @category MonadThrow
 * @since 2.7.0
 */
export var throwError = function () { return none; };
/**
 * @category Extend
 * @since 2.0.0
 */
export var duplicate = function (wa) { return extend_(wa, identity); };
/**
 * @category Extend
 * @since 2.0.0
 */
export var extend = function (f) { return function (ma) { return extend_(ma, f); }; };
/**
 * @category Foldable
 * @since 2.0.0
 */
export var foldMap = function (M) {
    var foldMapM = foldMap_(M);
    return function (f) { return function (fa) { return foldMapM(fa, f); }; };
};
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduce = function (b, f) { return function (fa) { return reduce_(fa, b, f); }; };
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduceRight = function (b, f) { return function (fa) {
    return reduceRight_(fa, b, f);
}; };
/**
 * @category Compactable
 * @since 2.0.0
 */
export var compact = flatten;
var defaultSeparate = { left: none, right: none };
/**
 * @category Compactable
 * @since 2.0.0
 */
export var separate = function (ma) {
    var o = map_(ma, function (e) { return ({
        left: getLeft(e),
        right: getRight(e)
    }); });
    return isNone(o) ? defaultSeparate : o.value;
};
/**
 * @category Filterable
 * @since 2.0.0
 */
export var filter = function (predicate) { return function (fa) { return filter_(fa, predicate); }; };
/**
 * @category Filterable
 * @since 2.0.0
 */
export var filterMap = function (f) { return function (fa) {
    return filterMap_(fa, f);
}; };
/**
 * @category Filterable
 * @since 2.0.0
 */
export var partition = function (predicate) { return function (fa) { return partition_(fa, predicate); }; };
/**
 * @category Filterable
 * @since 2.0.0
 */
export var partitionMap = function (f) { return function (fa) { return partitionMap_(fa, f); }; };
/**
 * @category Traversable
 * @since 2.6.3
 */
export var traverse = function (F) {
    var traverseF = traverse_(F);
    return function (f) { return function (ta) { return traverseF(ta, f); }; };
};
/**
 * @category Traversable
 * @since 2.6.3
 */
export var sequence = function (F) { return function (ta) {
    return isNone(ta) ? F.of(none) : F.map(ta.value, some);
}; };
/**
 * @category Witherable
 * @since 2.6.5
 */
export var wither = function (F) {
    var witherF = wither_(F);
    return function (f) { return function (ta) { return witherF(ta, f); }; };
};
/**
 * @category Witherable
 * @since 2.6.5
 */
export var wilt = function (F) {
    var wiltF = wilt_(F);
    return function (f) { return function (ta) { return wiltF(ta, f); }; };
};
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Option';
/**
 * @category instances
 * @since 2.0.0
 */
export function getShow(S) {
    return {
        show: function (ma) { return (isNone(ma) ? 'none' : "some(" + S.show(ma.value) + ")"); }
    };
}
/**
 * @example
 * import { none, some, getEq } from 'fp-ts/lib/Option'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(none, none), true)
 * assert.strictEqual(E.equals(none, some(1)), false)
 * assert.strictEqual(E.equals(some(1), none), false)
 * assert.strictEqual(E.equals(some(1), some(2)), false)
 * assert.strictEqual(E.equals(some(1), some(1)), true)
 *
 * @category instances
 * @since 2.0.0
 */
export function getEq(E) {
    return {
        equals: function (x, y) { return x === y || (isNone(x) ? isNone(y) : isNone(y) ? false : E.equals(x.value, y.value)); }
    };
}
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/lib/Option'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * const O = getOrd(ordNumber)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @category instances
 * @since 2.0.0
 */
export function getOrd(O) {
    return {
        equals: getEq(O).equals,
        compare: function (x, y) { return (x === y ? 0 : isSome(x) ? (isSome(y) ? O.compare(x.value, y.value) : 1) : -1); }
    };
}
/**
 * `Apply` semigroup
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getApplySemigroup, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup(semigroupSum)
 * assert.deepStrictEqual(S.concat(none, none), none)
 * assert.deepStrictEqual(S.concat(some(1), none), none)
 * assert.deepStrictEqual(S.concat(none, some(1)), none)
 * assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
 *
 * @category instances
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return {
        concat: function (x, y) { return (isSome(x) && isSome(y) ? some(S.concat(x.value, y.value)) : none); }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: some(M.empty)
    };
}
/**
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @category instances
 * @since 2.0.0
 */
export function getFirstMonoid() {
    return {
        concat: function (x, y) { return (isNone(x) ? y : x); },
        empty: none
    };
}
/**
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
 *
 * @category instances
 * @since 2.0.0
 */
export function getLastMonoid() {
    return {
        concat: function (x, y) { return (isNone(y) ? x : y); },
        empty: none
    };
}
/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(a) | some(a)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @category instances
 * @since 2.0.0
 */
export function getMonoid(S) {
    return {
        concat: function (x, y) { return (isNone(x) ? y : isNone(y) ? x : some(S.concat(x.value, y.value))); },
        empty: none
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
export var Functor = {
    URI: URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Applicative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Monad = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Foldable = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Alt = {
    URI: URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Alternative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    alt: alt_,
    zero: zero
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Extend = {
    URI: URI,
    map: map_,
    extend: extend_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Compactable = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Filterable = {
    URI: URI,
    map: map_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Traversable = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Witherable = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    wither: wither_,
    wilt: wilt_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var MonadThrow = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_,
    throwError: throwError
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var option = {
    URI: URI,
    map: map_,
    of: of,
    ap: ap_,
    chain: chain_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    zero: zero,
    alt: alt_,
    extend: extend_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    wither: wither_,
    wilt: wilt_,
    throwError: throwError
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if `ma` contains `a`
 *
 * @example
 * import { some, none, elem } from 'fp-ts/lib/Option'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.strictEqual(elem(eqNumber)(1, some(1)), true)
 * assert.strictEqual(elem(eqNumber)(2, some(1)), false)
 * assert.strictEqual(elem(eqNumber)(1, none), false)
 *
 * @since 2.0.0
 */
export function elem(E) {
    return function (a, ma) { return (isNone(ma) ? false : E.equals(a, ma.value)); };
}
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 0)
 *   ),
 *   true
 * )
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 1)
 *   ),
 *   false
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     exists(n => n > 0)
 *   ),
 *   false
 * )
 *
 * @since 2.0.0
 */
export function exists(predicate) {
    return function (ma) { return (isNone(ma) ? false : predicate(ma.value)); };
}
/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 *
 * ```ts
 * import { some, none, getRefinement } from 'fp-ts/lib/Option'
 *
 * type A = { type: 'A' }
 * type B = { type: 'B' }
 * type C = A | B
 *
 * const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
 * const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
 * ```
 *
 * @since 2.0.0
 */
export function getRefinement(getOption) {
    return function (a) { return isSome(getOption(a)); };
}
