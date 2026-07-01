#!/usr/bin/env node
import { parseTscOutput } from "./parser.js";
import { explainAll } from "./explainer.js";

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

async function main() {
  const raw = await readStdin();

  if (!raw.trim()) {
    console.error(
      `${RED}tsclear:${RESET} no input received. Pipe tsc's output into this command, e.g.:\n  npx tsc --noEmit | npx tsclear`,
    );
    process.exit(1);
  }

  const diagnostics = parseTscOutput(raw);

  if (diagnostics.length === 0) {
    console.log(`${GREEN}tsclear:${RESET} no recognizable tsc errors found in input.`);
    return;
  }

  const cleared = explainAll(diagnostics);

  for (const d of cleared) {
    console.log(
      `${BOLD}${RED}${d.code}${RESET} ${DIM}${d.file}:${d.line}:${d.column}${RESET}`,
    );
    console.log(`  ${CYAN}→${RESET} ${d.explanation}`);
    if (!d.matchedPatternId) {
      console.log(`  ${DIM}(no plain-language pattern for this one yet — raw message shown)${RESET}`);
    }
    console.log("");
  }

  console.log(`${DIM}${cleared.length} error(s) explained.${RESET}`);
}

main().catch((err) => {
  console.error(`${RED}tsclear: unexpected error${RESET}`, err);
  process.exit(1);
});
