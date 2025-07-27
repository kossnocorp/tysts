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
