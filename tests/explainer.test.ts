import { describe, it, expect } from "vitest";
import { explainDiagnostic } from "../src/explainer.js";

describe("explainDiagnostic", () => {
  it("explains a known pattern (TS2322)", () => {
    const result = explainDiagnostic({
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS2322",
      rawMessage: "Type 'string' is not assignable to type 'number'.",
    });
    expect(result.matchedPatternId).toBe("type-not-assignable");
    expect(result.explanation).toContain("string");
    expect(result.explanation).toContain("number");
  });

  it("falls back to raw message for unknown codes", () => {
    const result = explainDiagnostic({
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS9999",
      rawMessage: "Some made up error.",
    });
    expect(result.matchedPatternId).toBeNull();
    expect(result.explanation).toBe("Some made up error.");
  });

  it("explains TS2531 (object possibly null)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2531",
      rawMessage: "Object is possibly 'null'.",
    });
    expect(result.matchedPatternId).toBe("object-possibly-null");
    expect(result.explanation).toContain("null");
  });

  it("explains TS2741 (missing required property)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2741",
      rawMessage: "Property 'id' is missing in type '{ name: string; }' but required in type 'User'.",
    });
    expect(result.matchedPatternId).toBe("missing-required-properties");
    expect(result.explanation).toContain("id");
  });

  it("explains TS2554 (wrong argument count)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2554",
      rawMessage: "Expected 2 arguments, but got 1.",
    });
    expect(result.matchedPatternId).toBe("wrong-argument-count");
    expect(result.explanation).toContain("2 argument");
  });

  it("explains TS7006 (implicit any parameter)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS7006",
      rawMessage: "Parameter 'x' implicitly has an 'any' type.",
    });
    expect(result.matchedPatternId).toBe("implicit-any-parameter");
    expect(result.explanation).toContain("x");
  });

  it("explains TS2769 (no overload matches)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2769",
      rawMessage: "No overload matches this call.",
    });
    expect(result.matchedPatternId).toBe("no-overload-matches");
    expect(result.explanation).toContain("overload");
  });

  it("explains TS2551 (did you mean)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2551", rawMessage: "Property 'naem' does not exist on type 'User'. Did you mean 'name'?" });
    expect(result.matchedPatternId).toBe("did-you-mean");
    expect(result.explanation).toContain("name");
  });

  it("explains TS2349 (not callable)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2349",
      rawMessage: "This expression is not callable.",
    });
    expect(result.matchedPatternId).toBe("not-callable");
    expect(result.explanation).toContain("function");
  });

  it("explains TS2532 (possibly undefined access)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2532",
      rawMessage: "Object is possibly 'undefined'.",
    });
    expect(result.matchedPatternId).toBe("possibly-undefined-access");
    expect(result.explanation).toContain("undefined");
  });

  it("explains TS2540 (readonly cannot assign)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2540",
      rawMessage: "Cannot assign to 'id' because it is a read-only property.",
    });
    expect(result.matchedPatternId).toBe("readonly-cannot-assign");
    expect(result.explanation).toContain("id");
  });

  it("explains TS2307 (cannot find module)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2307",
      rawMessage: "Cannot find module 'lodash' or its corresponding type declarations.",
    });
    expect(result.matchedPatternId).toBe("cannot-find-module");
    expect(result.explanation).toContain("lodash");
  });

  it("explains TS7053 (no index signature)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS7053",
      rawMessage: "Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ a: number; }'.",
    });
    expect(result.matchedPatternId).toBe("type-has-no-index-signature");
    expect(result.explanation).toContain("index");
  });

  it("explains TS2367 (union not narrowed)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2367",
      rawMessage: "This condition will always return 'false' since the types 'string' and 'number' have no overlap.",
    });
    expect(result.matchedPatternId).toBe("union-not-narrowed");
    expect(result.explanation).toContain("overlap");
  });

  it("explains TS2366 (missing return type)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2366",
      rawMessage: "Function lacks ending return statement and return type does not include 'undefined'.",
    });
    expect(result.matchedPatternId).toBe("missing-return-type");
    expect(result.explanation).toContain("return");
  });

  it("explains TS2511 (abstract class instantiation)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2511",
      rawMessage: "Cannot create an instance of an abstract class.",
    });
    expect(result.matchedPatternId).toBe("abstract-class-instantiation");
    expect(result.explanation).toContain("abstract");
  });

  it("explains TS2352 (conversion may be a mistake)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2352",
      rawMessage: "Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other.",
    });
    expect(result.matchedPatternId).toBe("conversion-may-be-mistake");
    expect(result.explanation).toContain("string");
  });
});
