import type { ClearedDiagnostic, ParsedDiagnostic } from "./types.js";
import { patterns, getPatternExplanation } from "./patterns.js";
import { type Language, getMessage } from "./i18n.js";

export function explainDiagnostic(diag: ParsedDiagnostic, lang: Language = "en"): ClearedDiagnostic {
  const candidate = patterns.find((p) => p.code === diag.code);

  if (candidate) {
    const matched = diag.rawMessage.match(candidate.match);
    if (matched) {
      return {
        ...diag,
        explanation: getPatternExplanation(candidate, matched, lang),
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

export function explainAll(diags: ParsedDiagnostic[], lang: Language = "en"): ClearedDiagnostic[] {
  return diags.map((d) => explainDiagnostic(d, lang));
}
