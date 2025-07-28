# Architecture

## ADRs

### No to aliases

_Given that_:

- Some names felt unnatural, so initially I started adding aliases. For example, while `extends` is accurate, in some cases `narrows` was more semantically fitting.
- However, not all names needed or really have meaningful aliases, i.e. `satisfies`, yet I insisted on adding those for the sake of symmetry.
- Tests code is inherently inconsistent and chaotic, so adding implicity only hurts them.
- It also hurts discoverability, as with a growing number of matchers, it is hard to understand differences without referring to documentation.
- As tests are often the source of truth, they must be as clear as possible to avoid making costly mistakes.

_So that_ **Tyst shall not have aliases and stick to one name for everything**.

### Why not `extends` and `satisfies`

_Given that_:

- The matchers API provides four core methods: `assignableTo`, `assignableFrom`, `subtypeOf` and `supertypeOf` that correspond to TypeScript behavior of `𝑥 satisfies 𝑦`, `𝑦 satisfies 𝑥`, `𝑥 extends 𝑦` and `𝑦 extends 𝑥` respectively.
- Initially they were named `satisfies`, `satisfiedBy`, `extends` and `extendedBy`.
- However, they don't sound natural in an example such as `ty<unknown>().is.not(ty.extends<never>());`.
- Also, `satisfies` and `extends` names aren't that clear to begin with.

_So that_ **to make tysts sound natural and be as clear as possible, we choose `assignableTo`, `assignableFrom`, `subtypeOf` and `supertypeOf`.**
