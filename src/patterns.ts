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
  {
    id: "object-possibly-null",
    code: "TS2531",
    match: /Object is possibly 'null'\.?$/,
    explain: () =>
      `This value could be 'null' here. ` +
      `Add a check (like 'if (value !== null)') or optional chaining '?.' before using it, or use a non-null assertion '!' if you're certain it can't be null at this point.`,
  },
  {
    id: "missing-required-properties",
    code: "TS2741",
    match: /Property '(.+)' is missing in type '(.+)' but required in type '(.+)'\.?$/,
    explain: (m) =>
      `The object you're providing (of type '${m[2]}') is missing the required property '${m[1]}' that '${m[3]}' expects. ` +
      `Add '${m[1]}' to the object, or make it optional in the type definition if it shouldn't be required.`,
  },
  {
    id: "wrong-argument-count",
    code: "TS2554",
    match: /Expected (\d+) arguments?, but got (\d+)\.?$/,
    explain: (m) =>
      `This function expects ${m[1]} argument(s), but it's being called with ${m[2]}. ` +
      `Check the function's signature and make sure you're passing the right number of arguments.`,
  },
  {
    id: "implicit-any-parameter",
    code: "TS7006",
    match: /Parameter '(.+)' implicitly has an '(.+)' type\.?$/,
    explain: (m) =>
      `The parameter '${m[1]}' doesn't have an explicit type, so TypeScript is falling back to '${m[2]}'. ` +
      `Add a type annotation (e.g. '${m[1]}: string') to get proper type checking here.`,
  },
  {
    id: "no-overload-matches",
    code: "TS2769",
    match: /No overload matches this call\.?$/,
    explain: () =>
      `None of this function's overloads accept the arguments you're passing. ` +
      `Check the function's available signatures (hover over it in your editor) and compare them against what you're passing in — usually one argument's type is slightly off.`,
  },

  {
    id: "did-you-mean",
    code: "TS2551",
    match: /Property '(.+)' does not exist on type '(.+)'\. Did you mean '(.+)'\?\.?$/,
    explain: (m) =>
      `'.${m[1]}' doesn't exist on type '${m[2]}'. TypeScript thinks you meant '.${m[3]}' — check for a typo.`,
  },

  {
    id: "not-callable",
    code: "TS2349",
    match: /This expression is not callable\./,
    explain: () =>
      `You're trying to call something as a function, but its type says it isn't callable. ` +
      `Check whether the variable actually holds a function, or if you're missing parentheses somewhere.`,
  },
];


