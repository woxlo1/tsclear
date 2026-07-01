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
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS2531",
      rawMessage: "Object is possibly 'null'.",
    });

    expect(result.matchedPatternId).toBe("object-possibly-null");
    expect(result.explanation).toContain("null");
  });

  it("explains TS2741 (missing required property)", () => {
    const result = explainDiagnostic({
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS2741",
      rawMessage:
        "Property 'id' is missing in type '{ name: string; }' but required in type 'User'.",
    });

    expect(result.matchedPatternId).toBe("missing-required-properties");
    expect(result.explanation).toContain("id");
    expect(result.explanation).toContain("User");
  });

  it("explains TS2554 (wrong argument count)", () => {
    const result = explainDiagnostic({
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS2554",
      rawMessage: "Expected 2 arguments, but got 1.",
    });

    expect(result.matchedPatternId).toBe("wrong-argument-count");
    expect(result.explanation).toContain("2 argument");
  });

  it("explains TS7006 (implicit any parameter)", () => {
    const result = explainDiagnostic({
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS7006",
      rawMessage: "Parameter 'x' implicitly has an 'any' type.",
    });

    expect(result.matchedPatternId).toBe("implicit-any-parameter");
    expect(result.explanation).toContain("x");
  });

  it("explains TS2769 (no overload matches)", () => {
    const result = explainDiagnostic({
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS2769",
      rawMessage: "No overload matches this call.",
    });

    expect(result.matchedPatternId).toBe("no-overload-matches");
    expect(result.explanation).toContain("overload");
  });
});
