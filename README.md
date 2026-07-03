<p align="center">
  <img src="./assets/logo.svg" alt="ts-explainer logo" width="400">
</p>

# ts-explainer

[![CI](https://github.com/woxlo1/ts-explainer/actions/workflows/ci.yml/badge.svg)](https://github.com/woxlo1/ts-explainer/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/ts-explainer.svg)](https://www.npmjs.com/package/ts-explainer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> TypeScript compiler errors, explained in plain English. Now with Japanese support! 🇯🇵

`ts-explainer` pipes between `tsc` and your terminal and rewrites cryptic TypeScript errors into clear, actionable explanations — without losing any information. **Supports English and Japanese.**

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
$ npx tsc --noEmit | npx ts-explainer

TS2345  src/api.ts:23:5
  → You're calling a function with an argument of type '{ id: string; name: string; }',
    but it expects type 'User'. Double-check the value you're passing in, or the
    function's parameter type.
```

Same information, actually readable.

---

## Install

```bash
npm install -D ts-explainer
```

Or run without installing:

```bash
npx tsc --noEmit | npx ts-explainer
```

## Usage

Pipe any `tsc` output into `ts-explainer`:

```bash
npx tsc --noEmit | npx ts-explainer
```

Works with any `tsc` flags you're already using:

```bash
npx tsc --noEmit --strict | npx ts-explainer
npx tsc -p tsconfig.prod.json | npx ts-explainer
```

### Language support

By default, errors are explained in **English**. To use **Japanese**, pass the `--ja` flag or `--lang ja`:

```bash
# Japanese output
npx tsc --noEmit | npx ts-explainer --ja
npx tsc --noEmit | npx ts-explainer --lang ja

# English output (default)
npx tsc --noEmit | npx ts-explainer --lang en
npx tsc --noEmit | npx ts-explainer
```

You can also set the language via environment variable:

```bash
export TS_EXPLAINER_LANG=ja
npx tsc --noEmit | npx ts-explainer
```

#### Japanese example (日本語の例)

```
$ npx tsc --noEmit | npx ts-explainer --ja

TS2345  src/api.ts:23:5
  → 型 '{ id: string; name: string; }' の引数で関数を呼び出していますが、型 'User' を期待しています。
    渡している値、または関数のパラメータ型を再確認してください。
```

### Add to package.json

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit | ts-explainer",
    "typecheck:ja": "tsc --noEmit | ts-explainer --ja"
  }
}
```

Then run with:

```bash
npm run typecheck
npm run typecheck:ja
```

### JSON output

`ts-explainer` also supports JSON output for programmatic use:

```bash
npx tsc --noEmit | npx ts-explainer --json
npx tsc --noEmit | npx ts-explainer --ja --json
```

### Unknown errors

Errors that `ts-explainer` doesn't recognize yet are passed through unchanged — you never lose information from the original `tsc` output.

---

## Use as a library

`ts-explainer` also exports its parser and explainer for programmatic use:

```typescript
import { parseTscOutput, explainAll } from "ts-explainer";

const raw = `src/index.ts(1,1): error TS2304: Cannot find name 'fetchUser'.`;

// English (default)
const diagnostics = parseTscOutput(raw);
const explained = explainAll(diagnostics, "en");

console.log(explained[0].explanation);
// → 'fetchUser' isn't defined anywhere TypeScript can see. This is usually
//   a missing import, a typo, or a missing @types package for a third-party library.

// Japanese
const explainedJa = explainAll(diagnostics, "ja");
console.log(explainedJa[0].explanation);
// → 'fetchUser' は TypeScript が確認できる場所のどこにも定義されていません。
//   これは通常、インポートの欠落、タイプミス、またはサードパーティライブラリの @types パッケージの欠落です。
```

Available exports:

```typescript
import {
  parseTscOutput,      // string → ParsedDiagnostic[]
  explainAll,          // ParsedDiagnostic[], Language? → ClearedDiagnostic[]
  explainDiagnostic,   // ParsedDiagnostic, Language? → ClearedDiagnostic
  patterns,            // ErrorPattern[] — the full list of known patterns
} from "ts-explainer";
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
| TS2347   | Type arguments not allowed here                   |
| TS2448   | Variable used before its declaration              |
| TS2559   | Object has no properties in common with type      |
| TS2578   | Unused @ts-expect-error directive                 |
| TS2614   | Module has no exported member                     |
| TS2693   | Type used as a value at runtime                   |
| TS2722   | Cannot invoke a possibly undefined function       |
| TS4114   | Override keyword required                         |
| TS6133   | Variable declared but never read                  |
| TS7015   | Array index expression is not a number            |
| TS2355   | Function must return a value                      |
| TS2377   | Derived class constructor must call super()       |
| TS2391   | Function implementation is missing               |
| TS2408   | Setters cannot return a value                     |
| TS2416   | Property incompatible with base type              |
| TS2420   | Class incorrectly implements interface            |
| TS2451   | Cannot redeclare block-scoped variable            |
| TS2454   | Variable used before being assigned               |
| TS2503   | Cannot find namespace                             |
| TS2515   | Abstract members not implemented                  |
| TS2533   | Object is possibly null or undefined              |
| TS2564   | Property has no initializer                       |
| TS2571   | Object is of type unknown                         |
| TS2588   | Cannot assign to a constant                       |
| TS2683   | this implicitly has type any                      |
| TS2689   | Use implements instead of extends for interface   |
| TS2691   | Import path cannot end with .ts extension         |
| TS2759   | Cannot destructure property of null/undefined     |
| TS2589   | Type instantiation is excessively deep            |

All error explanations are now available in **English and Japanese**. More patterns are added with every release. Open an issue or PR if you keep running into an error that isn't covered yet — see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Requirements

- Node.js 18 or later

## Versioning

This project follows [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/). Version numbers are bumped at release time only — not on every commit.

## Contributing

Contributions are welcome! The most valuable thing you can add is a new error pattern explanation. See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add one, run tests, and how releases are cut.

## License

MIT © [woxlo1](https://github.com/woxlo1)
