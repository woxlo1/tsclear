import { describe, it, expect } from "vitest";
import { explainDiagnostic } from "../src/explainer.js";

describe("explainDiagnostic - English", () => {
  it("explains a known pattern (TS2322) in English", () => {
    const result = explainDiagnostic({
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS2322",
      rawMessage: "Type 'string' is not assignable to type 'number'.",
    }, "en");
    expect(result.matchedPatternId).toBe("type-not-assignable");
    expect(result.explanation).toContain("string");
    expect(result.explanation).toContain("number");
    expect(result.explanation).toContain("You're trying");
  });

  it("falls back to raw message for unknown codes", () => {
    const result = explainDiagnostic({
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS9999",
      rawMessage: "Some made up error.",
    }, "en");
    expect(result.matchedPatternId).toBeNull();
    expect(result.explanation).toBe("Some made up error.");
  });

  it("explains TS2531 (object possibly null) in English", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2531",
      rawMessage: "Object is possibly 'null'.",
    }, "en");
    expect(result.matchedPatternId).toBe("object-possibly-null");
    expect(result.explanation).toContain("null");
    expect(result.explanation).toContain("check");
  });

  it("explains TS2741 (missing required property) in English", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2741",
      rawMessage: "Property 'id' is missing in type '{ name: string; }' but required in type 'User'.",
    }, "en");
    expect(result.matchedPatternId).toBe("missing-required-properties");
    expect(result.explanation).toContain("id");
    expect(result.explanation).toContain("missing");
  });

  it("explains TS2554 (wrong argument count) in English", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2554",
      rawMessage: "Expected 2 arguments, but got 1.",
    }, "en");
    expect(result.matchedPatternId).toBe("wrong-argument-count");
    expect(result.explanation).toContain("2");
    expect(result.explanation).toContain("function");
  });
});

describe("explainDiagnostic - Japanese", () => {
  it("explains a known pattern (TS2322) in Japanese", () => {
    const result = explainDiagnostic({
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS2322",
      rawMessage: "Type 'string' is not assignable to type 'number'.",
    }, "ja");
    expect(result.matchedPatternId).toBe("type-not-assignable");
    expect(result.explanation).toContain("string");
    expect(result.explanation).toContain("number");
    expect(result.explanation).toContain("型");
  });

  it("explains TS2531 (object possibly null) in Japanese", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2531",
      rawMessage: "Object is possibly 'null'.",
    }, "ja");
    expect(result.matchedPatternId).toBe("object-possibly-null");
    expect(result.explanation).toContain("null");
    expect(result.explanation).toContain("チェック");
  });

  it("explains TS2741 (missing required property) in Japanese", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2741",
      rawMessage: "Property 'id' is missing in type '{ name: string; }' but required in type 'User'.",
    }, "ja");
    expect(result.matchedPatternId).toBe("missing-required-properties");
    expect(result.explanation).toContain("id");
    expect(result.explanation).toContain("必須");
  });

  it("explains TS2554 (wrong argument count) in Japanese", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2554",
      rawMessage: "Expected 2 arguments, but got 1.",
    }, "ja");
    expect(result.matchedPatternId).toBe("wrong-argument-count");
    expect(result.explanation).toContain("2");
    expect(result.explanation).toContain("引数");
  });

  it("defaults to English when language not specified", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2322",
      rawMessage: "Type 'string' is not assignable to type 'number'.",
    });
    expect(result.explanation).toContain("You're trying");
  });
});

describe("explainDiagnostic - More patterns", () => {
  it("explains TS2304 (cannot find name) in both languages", () => {
    const enResult = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2304",
      rawMessage: "Cannot find name 'myVar'.",
    }, "en");
    const jaResult = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2304",
      rawMessage: "Cannot find name 'myVar'.",
    }, "ja");

    expect(enResult.matchedPatternId).toBe("cannot-find-name");
    expect(jaResult.matchedPatternId).toBe("cannot-find-name");
    expect(enResult.explanation).toContain("myVar");
    expect(jaResult.explanation).toContain("myVar");
    expect(enResult.explanation).toContain("isn't");
    expect(jaResult.explanation).toContain("定義");
  });

  it("explains TS2339 (property does not exist) in both languages", () => {
    const enResult = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2339",
      rawMessage: "Property 'foo' does not exist on type 'Bar'.",
    }, "en");
    const jaResult = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2339",
      rawMessage: "Property 'foo' does not exist on type 'Bar'.",
    }, "ja");

    expect(enResult.matchedPatternId).toBe("property-does-not-exist");
    expect(jaResult.matchedPatternId).toBe("property-does-not-exist");
    expect(enResult.explanation).toContain("foo");
    expect(jaResult.explanation).toContain("foo");
  });

  it("explains TS2345 (argument mismatch) in both languages", () => {
    const enResult = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2345",
      rawMessage: "Argument of type 'string' is not assignable to parameter of type 'number'.",
    }, "en");
    const jaResult = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2345",
      rawMessage: "Argument of type 'string' is not assignable to parameter of type 'number'.",
    }, "ja");

    expect(enResult.matchedPatternId).toBe("argument-mismatch");
    expect(jaResult.matchedPatternId).toBe("argument-mismatch");
    expect(enResult.explanation).toContain("calling");
    expect(jaResult.explanation).toContain("呼び出し");
  });
});
