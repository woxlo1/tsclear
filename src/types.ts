export interface ErrorPattern {
  /** Unique id for this pattern, used internally and in tests */
  id: string;
  /** TypeScript error code, e.g. TS2322 */
  code: string;
  /** Regex used to detect and capture details from the raw tsc message */
  match: RegExp;
  /** Builds a human-readable explanation from the regex match */
  explain: (m: RegExpMatchArray) => string;
}

export interface ParsedDiagnostic {
  file: string;
  line: number;
  column: number;
  code: string;
  rawMessage: string;
}

export interface ClearedDiagnostic extends ParsedDiagnostic {
  explanation: string;
  matchedPatternId: string | null;
}
