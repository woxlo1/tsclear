#!/usr/bin/env node
import { parseTscOutput } from "./parser.js";
import { explainAll } from "./explainer.js";
import { detectLanguage, getUIMessage, type Language } from "./i18n.js";

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk as Buffer);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function printText(
  cleared: ReturnType<typeof explainAll>,
  lang: Language
): void {
  for (const d of cleared) {
    console.log(
      `${BOLD}${RED}${d.code}${RESET} ${DIM}${d.file}:${d.line}:${d.column}${RESET}`,
    );
    console.log(`  ${CYAN}→${RESET} ${d.explanation}`);
    if (!d.matchedPatternId) {
      console.log(`  ${DIM}${getUIMessage("noPattern", lang)}${RESET}`);
    }
    console.log("");
  }
  console.log(`${DIM}${getUIMessage("errorCount", lang)(cleared.length)}${RESET}`);
}

function printJson(cleared: ReturnType<typeof explainAll>): void {
  const output = {
    total: cleared.length,
    errors: cleared.map((d) => ({
      code: d.code,
      file: d.file,
      line: d.line,
      column: d.column,
      explanation: d.explanation,
      raw: d.rawMessage,
      matched: d.matchedPatternId !== null,
    })),
  };
  console.log(JSON.stringify(output, null, 2));
}

async function main() {
  const args = process.argv.slice(2);
  const useJson = args.includes("--json") || args.includes("-j");
  const lang = detectLanguage(args);

  const raw = await readStdin();

  if (!raw.trim()) {
    const msg = getUIMessage("noInput", lang);
    if (useJson) {
      console.error(JSON.stringify({ error: msg }));
    } else {
      console.error(`${RED}ts-explainer:${RESET} ${msg}`);
    }
    process.exit(1);
  }

  const diagnostics = parseTscOutput(raw);

  if (diagnostics.length === 0) {
    if (useJson) {
      console.log(JSON.stringify({ total: 0, errors: [] }));
    } else {
      console.log(`${GREEN}ts-explainer:${RESET} ${getUIMessage("noErrors", lang)}`);
    }
    return;
  }

  const cleared = explainAll(diagnostics, lang);

  if (useJson) {
    printJson(cleared);
  } else {
    printText(cleared, lang);
  }
}

main().catch((err) => {
  console.error(`${RED}ts-explainer: unexpected error${RESET}`, err);
  process.exit(1);
});
