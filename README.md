# tsclear

**Turns confusing TypeScript compiler errors into clear, human-readable explanations.**

```
$ npx tsc --noEmit | npx tsclear

TS2339 src/user.ts:14:10
  → You're accessing '.name' on something typed as 'User | undefined', but that type has no
    such property. This usually means a typo, a missing type definition, or the object hasn't
    been narrowed to the right type yet.

1 error(s) explained.
```

## Why

TypeScript's type checker is great, but its error messages can be long, jargon-heavy,
and hard to parse — especially for beginners or when generics are involved. `tsclear`
sits between `tsc` and your terminal and rewrites known error patterns into plain
language, with a suggestion for what to check first.

## Install

```bash
npm install -D tsclear
```

Or run it without installing:

```bash
npx tsc --noEmit | npx tsclear
```

## Usage

`tsclear` reads from stdin, so pipe any `tsc` output into it:

```bash
npx tsc --noEmit | npx tsclear
```

Errors it doesn't recognize yet are passed through with the original message, so you
never lose information — you just get extra help on the patterns it knows.

## Currently supported error codes

| Code     | Meaning                                          |
| -------- | ------------------------------------------------- |
| TS2304   | Cannot find name (missing import/typo)            |
| TS2307   | Cannot find module or its type declarations       |
| TS2322   | Type is not assignable to target type             |
| TS2339   | Property does not exist on type                   |
| TS2345   | Argument type mismatch in a function call         |
| TS2349   | Expression is not callable                        |
| TS2352   | Type conversion may be a mistake                  |
| TS2366   | Function missing ending return statement          |
| TS2367   | Condition always returns same value (no overlap)  |
| TS2511   | Cannot instantiate an abstract class              |
| TS2531   | Object is possibly `null`                         |
| TS2532   | Object is possibly `undefined`                    |
| TS2540   | Cannot assign to a read-only property             |
| TS2551   | Property doesn't exist — did you mean X?          |
| TS2554   | Wrong number of arguments in a call               |
| TS2741   | Required property missing on an object            |
| TS2769   | No function overload matches the call             |
| TS7006   | Parameter implicitly has an `any` type            |
| TS7053   | Expression can't be used to index type            |
| TS18048  | Value is possibly `undefined`                     |

More patterns are added regularly — see [CONTRIBUTING.md](./CONTRIBUTING.md) if you'd
like to add one for an error you keep running into.

## Versioning

This project follows [Semantic Versioning](https://semver.org/) and
[Conventional Commits](https://www.conventionalcommits.org/). The version number is
**not** bumped on every commit — only on meaningful releases. See
[CONTRIBUTING.md](./CONTRIBUTING.md#versioning--releases) for details on how releases
are cut.

## License

MIT
