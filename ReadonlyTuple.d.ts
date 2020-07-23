/**
 * @since 2.5.0
 */
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { ChainRec2C } from './ChainRec'
import { Comonad2 } from './Comonad'
import { Foldable2 } from './Foldable'
import { Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { PipeableTraverse2, Traversable2 } from './Traversable'
/**
 * @category destructors
 * @since 2.5.0
 */
export declare function fst<A, S>(sa: readonly [A, S]): A
/**
 * @category destructors
 * @since 2.5.0
 */
export declare function snd<A, S>(sa: readonly [A, S]): S
/**
 * @category combinators
 * @since 2.5.0
 */
export declare function swap<A, S>(sa: readonly [A, S]): readonly [S, A]
/**
 * @category instances
 * @since 2.5.0
 */
export declare function getApply<S>(S: Semigroup<S>): Apply2C<URI, S>
/**
 * @category instances
 * @since 2.5.0
 */
export declare function getApplicative<S>(M: Monoid<S>): Applicative2C<URI, S>
/**
 * @category instances
 * @since 2.5.0
 */
export declare function getChain<S>(S: Semigroup<S>): Chain2C<URI, S>
/**
 * @category instances
 * @since 2.5.0
 */
export declare function getMonad<S>(M: Monoid<S>): Monad2C<URI, S>
/**
 * @category instances
 * @since 2.5.0
 */
export declare function getChainRec<S>(M: Monoid<S>): ChainRec2C<URI, S>
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.5.0
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: readonly [A, E]) => readonly [B, G]
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.5.0
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: readonly [A, E]) => readonly [A, G]
/**
 * @category Semigroupoid
 * @since 2.5.0
 */
export declare const compose: <E, A>(la: readonly [A, E]) => <B>(ab: readonly [B, A]) => readonly [B, E]
/**
 * @category Extend
 * @since 2.5.0
 */
export declare const duplicate: <E, A>(ma: readonly [A, E]) => readonly [readonly [A, E], E]
/**
 * @category Extend
 * @since 2.5.0
 */
export declare const extend: <E, A, B>(f: (fa: readonly [A, E]) => B) => (wa: readonly [A, E]) => readonly [B, E]
/**
 * @category Extract
 * @since 2.6.2
 */
export declare const extract: <E, A>(wa: readonly [A, E]) => A
/**
 * @category Foldable
 * @since 2.5.0
 */
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E]
/**
 * @category Foldable
 * @since 2.5.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: readonly [A, E]) => B
/**
 * @category Foldable
 * @since 2.5.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B
/**
 * @since 2.6.3
 */
export declare const traverse: PipeableTraverse2<URI>
/**
 * @since 2.6.3
 */
export declare const sequence: Traversable2<URI>['sequence']
/**
 * @category instances
 * @since 2.5.0
 */
export declare const URI = 'ReadonlyTuple'
/**
 * @category instances
 * @since 2.5.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: readonly [A, E]
  }
}
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Functor: Functor2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Bifunctor: Bifunctor2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Semigroupoid: Semigroupoid2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Comonad: Comonad2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Foldable: Foldable2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Traversable: Traversable2<URI>
/**
 * @category instances
 * @since 2.5.0
 */
export declare const readonlyTuple: Semigroupoid2<URI> &
  Bifunctor2<URI> &
  Comonad2<URI> &
  Foldable2<URI> &
  Traversable2<URI>
