/**
 * The `Const` type constructor, which wraps its first type argument and ignores its second.
 * That is, `Const<E, A>` is isomorphic to `E` for any `A`.
 *
 * `Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Monoid`
 * while ignoring return values.
 *
 * @since 2.0.0
 */
import { Applicative2C } from './Applicative.ts'
import { Apply2C } from './Apply.ts'
import { Bifunctor2 } from './Bifunctor.ts'
import { BooleanAlgebra } from './BooleanAlgebra.ts'
import { Bounded } from './Bounded.ts'
import { Contravariant2 } from './Contravariant.ts'
import { Eq } from './Eq.ts'
import { identity, unsafeCoerce } from './function.ts'
import { Functor2 } from './Functor.ts'
import { HeytingAlgebra } from './HeytingAlgebra.ts'
import { Monoid } from './Monoid.ts'
import { Ord } from './Ord.ts'
import { Ring } from './Ring.ts'
import { Semigroup } from './Semigroup.ts'
import { Semiring } from './Semiring.ts'
import { Show } from './Show.ts'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export type Const<E, A> = E & { readonly _A: A }

/**
 * @category constructors
 * @since 2.0.0
 */
export const make: <E, A = never>(e: E) => Const<E, A> = unsafeCoerce

/**
 * @category instances
 * @since 2.0.0
 */
export function getShow<E, A>(S: Show<E>): Show<Const<E, A>> {
  return {
    show: (c) => `make(${S.show(c)})`
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export const getEq: <E, A>(E: Eq<E>) => Eq<Const<E, A>> = identity

/**
 * @category instances
 * @since 2.6.0
 */
export const getOrd: <E, A>(O: Ord<E>) => Ord<Const<E, A>> = identity

/**
 * @category instances
 * @since 2.6.0
 */
export const getBounded: <E, A>(B: Bounded<E>) => Bounded<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getSemigroup: <E, A>(S: Semigroup<E>) => Semigroup<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getMonoid: <E, A>(M: Monoid<E>) => Monoid<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getSemiring: <E, A>(S: Semiring<E>) => Semiring<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getRing: <E, A>(S: Ring<E>) => Ring<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getHeytingAlgebra: <E, A>(H: HeytingAlgebra<E>) => HeytingAlgebra<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getBooleanAlgebra: <E, A>(H: BooleanAlgebra<E>) => BooleanAlgebra<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.0.0
 */
export function getApply<E>(S: Semigroup<E>): Apply2C<URI, E> {
  return {
    URI,
    _E: undefined as any,
    map: map_,
    ap: (fab, fa) => make(S.concat(fab, fa))
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getApplicative<E>(M: Monoid<E>): Applicative2C<URI, E> {
  const A = getApply(M)
  return {
    URI,
    _E: undefined as any,
    map: A.map,
    ap: A.ap,
    of: () => make(M.empty)
  }
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const contramap_: Contravariant2<URI>['contramap'] = unsafeCoerce
const map_: Functor2<URI>['map'] = unsafeCoerce
const bimap_: Bifunctor2<URI>['bimap'] = (fea, f) => make(f(fea))
const mapLeft_: Bifunctor2<URI>['mapLeft'] = (fea, f) => make(f(fea))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Contravariant
 * @since 2.0.0
 */
export const contramap: <A, B>(f: (b: B) => A) => <E>(fa: Const<E, A>) => Const<E, B> = (f) => (fa) => contramap_(fa, f)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Const<E, A>) => Const<E, B> = (f) => (fa) => map_(fa, f)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Const<E, A>) => Const<G, B> = (f, g) => (fa) =>
  bimap_(fa, f, g)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Const<E, A>) => Const<G, A> = (f) => (fa) => mapLeft_(fa, f)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Const'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Const<E, A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Contravariant: Contravariant2<URI> = {
  URI,
  contramap: contramap_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  bimap: bimap_,
  mapLeft: mapLeft_
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export const const_: Functor2<URI> & Contravariant2<URI> & Bifunctor2<URI> = {
  URI,
  map: map_,
  contramap: contramap_,
  bimap: bimap_,
  mapLeft: mapLeft_
}
