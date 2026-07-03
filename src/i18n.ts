/**
 * Internationalization (i18n) module for ts-explainer
 * Supports: English (en), Japanese (ja)
 */

export type Language = "en" | "ja";

/** UI messages for different contexts */
export interface UIMessages {
  noInput: string;
  noErrors: string;
  errorCount: (count: number) => string;
  noPattern: string;
}

export const uiMessages: Record<Language, UIMessages> = {
  en: {
    noInput: "no input received. Pipe tsc's output into this command, e.g.:\n  npx tsc --noEmit | npx ts-explainer",
    noErrors: "no recognizable tsc errors found in input.",
    errorCount: (count) => `${count} error(s) explained.`,
    noPattern: "(no plain-language pattern for this one yet — raw message shown)",
  },
  ja: {
    noInput: "入力がありません。tscの出力をこのコマンドにパイプしてください。例：\n  npx tsc --noEmit | npx ts-explainer",
    noErrors: "入力内に認識可能なtscエラーが見つかりません。",
    errorCount: (count) => `${count}個のエラーが説明されました。`,
    noPattern: "(このエラーには平易な説明パターンがまだありません — 生のメッセージを表示しています)",
  },
};

/**
 * Error explanation patterns for different languages
 */
export interface ErrorExplanation {
  en: string;
  ja: string;
}

/** Helper function to create multilingual explanations */
export function explain(en: string, ja: string): ErrorExplanation {
  return { en, ja };
}

/** Get a message in the specified language, with fallback to English */
export function getMessage(msg: ErrorExplanation | string, lang: Language): string {
  if (typeof msg === "string") {
    return msg;
  }
  return msg[lang] || msg.en;
}

/** Get UI message in the specified language */
export function getUIMessage(key: "errorCount", lang: Language): UIMessages["errorCount"];
export function getUIMessage(key: Exclude<keyof UIMessages, "errorCount">, lang: Language): string;
export function getUIMessage(key: keyof UIMessages, lang: Language): UIMessages[keyof UIMessages] {
  return uiMessages[lang][key];
}

/** Detect language from environment or command-line args */
export function detectLanguage(args: string[]): Language {
  // Check for explicit --lang flag
  const langIndex = args.indexOf("--lang");
  if (langIndex !== -1 && args[langIndex + 1]) {
    const lang = args[langIndex + 1].toLowerCase();
    if (lang === "ja" || lang === "jp") return "ja";
    if (lang === "en") return "en";
  }

  // Check for --ja or --japanese flags
  if (args.includes("--ja") || args.includes("--japanese")) {
    return "ja";
  }

  // Check environment variable
  const envLang = process.env.TS_EXPLAINER_LANG?.toLowerCase();
  if (envLang === "ja" || envLang === "jp") return "ja";
  if (envLang === "en") return "en";

  // Default to English
  return "en";
}