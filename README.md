# tsclear

[![CI](https://github.com/woxlo1/tsclear/actions/workflows/ci.yml/badge.svg)](https://github.com/woxlo1/tsclear/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/tsclear.svg)](https://www.npmjs.com/package/tsclear)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> TypeScript compiler errors, explained in plain English.

`tsclear` pipes between `tsc` and your terminal and rewrites cryptic TypeScript errors into clear, actionable explanations — without losing any information.

---

## The problem

```
src/api.ts(23,5): error TS2345: Argument of type '{ id: string; name: string; }' is not
assignable to parameter of type 'User'. Type '{ id: string; name: string; }' is missing
the following properties from type 'User': email, createdAt, updatedAt
```

What does that actually mean? What should you fix first?

## The solution

```
$ npx tsc --noEmit | npx tsclear

TS2345  src/api.ts:23:5
  → You're calling a function with an argument of type '{ id: string; name: string; }',
    but it expects type 'User'. Double-check the value you're passing in, or the
    function's parameter type.
```

Same information, actually readable.

---

## Install

```bash
npm install -D tsclear
```

Or run without installing:

```bash
npx tsc --noEmit | npx tsclear
```

## Usage

Pipe any `tsc` output into `tsclear`:

```bash
npx tsc --noEmit | npx tsclear
```

Works with any `tsc` flags you're already using:

```bash
npx tsc --noEmit --strict | npx tsclear
npx tsc -p tsconfig.prod.json | npx tsclear
```

### Add to package.json

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit | tsclear"
  }
}
```

Then run with:

```bash
npm run typecheck
```

### Unknown errors

Errors that `tsclear` doesn't recognize yet are passed through unchanged — you never lose information from the original `tsc` output.

---

## Use as a library

`tsclear` also exports its parser and explainer for programmatic use:

```typescript
import { parseTscOutput, explainAll } from "tsclear";

const raw = `src/index.ts(1,1): error TS2304: Cannot find name 'fetchUser'.`;

const diagnostics = parseTscOutput(raw);
const explained = explainAll(diagnostics);

console.log(explained[0].explanation);
// → 'fetchUser' isn't defined anywhere TypeScript can see. This is usually
//   a missing import, a typo, or a missing @types package for a third-party library.
```

Available exports:

```typescript
import {
  parseTscOutput,      // string → ParsedDiagnostic[]
  explainAll,          // ParsedDiagnostic[] → ClearedDiagnostic[]
  explainDiagnostic,   // ParsedDiagnostic → ClearedDiagnostic
  patterns,            // ErrorPattern[] — the full list of known patterns
} from "tsclear";
```

---

## Supported error codes

| Code     | Meaning                                          |
| -------- | ------------------------------------------------- |
| TS2304   | Cannot find name (missing import / typo)          |
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

More patterns are added with every release. Open an issue or PR if you keep running into an error that isn't covered yet — see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Requirements

- Node.js 18 or later

## Versioning

This project follows [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/). Version numbers are bumped at release time only — not on every commit. See [CHANGELOG.md](./CHANGELOG.md) for release history.

## Contributing

Contributions are welcome! The most valuable thing you can add is a new error pattern explanation. See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add one, run tests, and how releases are cut.

## License

MIT © [woxlo1](https://github.com/woxlo1)
