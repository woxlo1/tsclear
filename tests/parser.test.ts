import { describe, it, expect } from "vitest";
import { parseTscOutput } from "../src/parser.js";

describe("parseTscOutput", () => {
  it("parses a single tsc error line", () => {
    const raw = `src/index.ts(12,5): error TS2322: Type 'string' is not assignable to type 'number'.`;
    const result = parseTscOutput(raw);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      file: "src/index.ts",
      line: 12,
      column: 5,
      code: "TS2322",
      rawMessage: "Type 'string' is not assignable to type 'number'.",
    });
  });

  it("ignores non-error lines", () => {
    const raw = "Found 1 error in src/index.ts\n\nSome unrelated build log line";
    expect(parseTscOutput(raw)).toHaveLength(0);
  });

  it("parses multiple errors", () => {
    const raw = [
      `a.ts(1,1): error TS2304: Cannot find name 'foo'.`,
      `b.ts(2,2): error TS2339: Property 'bar' does not exist on type 'Baz'.`,
    ].join("\n");

    expect(parseTscOutput(raw)).toHaveLength(2);
  });
});
