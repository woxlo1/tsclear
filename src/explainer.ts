import type { ClearedDiagnostic, ParsedDiagnostic } from "./types.js";
import { patterns } from "./patterns.js";

export function explainDiagnostic(diag: ParsedDiagnostic): ClearedDiagnostic {
  const candidate = patterns.find((p) => p.code === diag.code);

  if (candidate) {
    const matched = diag.rawMessage.match(candidate.match);
    if (matched) {
      return {
        ...diag,
        explanation: candidate.explain(matched),
        matchedPatternId: candidate.id,
      };
    }
  }

  return {
    ...diag,
    explanation: diag.rawMessage,
    matchedPatternId: null,
  };
}

export function explainAll(diags: ParsedDiagnostic[]): ClearedDiagnostic[] {
  return diags.map(explainDiagnostic);
}
