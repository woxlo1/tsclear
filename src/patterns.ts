import type { ErrorPattern } from "./types.js";

export const patterns: ErrorPattern[] = [
  {
    id: "type-not-assignable",
    code: "TS2322",
    match: /Type '(.+)' is not assignable to type '(.+)'\.?$/,
    explain: (m) =>
      `You're trying to use a value of type '${m[1]}' where type '${m[2]}' is expected. ` +
      `Check the value you're assigning, or update the target type if '${m[1]}' should actually be allowed there.`,
  },
  {
    id: "property-does-not-exist",
    code: "TS2339",
    match: /Property '(.+)' does not exist on type '(.+)'\.?$/,
    explain: (m) =>
      `You're accessing '.${m[1]}' on something typed as '${m[2]}', but that type has no such property. ` +
      `This usually means a typo, a missing type definition, or the object hasn't been narrowed to the right type yet.`,
  },
  {
    id: "possibly-undefined",
    code: "TS18048",
    match: /'(.+)' is possibly 'undefined'\.?$/,
    explain: (m) =>
      `'${m[1]}' might be 'undefined' at this point. ` +
      `Add a check (like 'if (${m[1]})' or optional chaining '?.'), or use a non-null assertion '!' if you're certain it's always defined here.`,
  },
  {
    id: "argument-mismatch",
    code: "TS2345",
    match: /Argument of type '(.+)' is not assignable to parameter of type '(.+)'\.?$/,
    explain: (m) =>
      `You're calling a function with an argument of type '${m[1]}', but it expects type '${m[2]}'. ` +
      `Double-check the value you're passing in, or the function's parameter type.`,
  },
  {
    id: "cannot-find-name",
    code: "TS2304",
    match: /Cannot find name '(.+)'\.?$/,
    explain: (m) =>
      `'${m[1]}' isn't defined anywhere TypeScript can see. ` +
      `This is usually a missing import, a typo, or a missing @types package for a third-party library.`,
  },
];
