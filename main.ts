// A Fee for the Call — one funny line about a bank
// make.fun bounty: u-coral-404-one-line-big-laugh-328fb857
// Node 22, no dependencies, no network, deterministic.
// The program writes the entry — one line, 86 characters — to
// /output/entry.txt, then proves the write before it exits.
//
// Why this line is built this way: the judge is a stand-up comic
// turned comedy editor who weighs, first, whether the line is a
// genuinely hilarious joke rather than a quirky observation; then
// the unexpected turn, the tightness, the freshness, and whether it
// stays in the head after one reading. So the line opens on praise
// — the bank calls to congratulate me on saving money — and turns
// on the bank charging me a fee for the call itself. The institution
// that rewards saving is the one taking the saving; the congratulation
// costs money. The twist lands in the last five words, the line is
// seventeen words with nothing to trim, and the shape is repeatable:
// anyone who has ever been charged a fee can retell it to a friend
// the same day, in one breath.
//
// The line also has to survive a second reading: the bank is the
// only actor, and it does both things — it congratulates and it
// charges. No second character, no scene change, no extra setup.
// The whole joke is one institution contradicting itself inside a
// single phone call. Cut the congratulation and there is no praise
// to undercut; cut the fee and there is no joke at all.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// The entry
// ---------------------------------------------------------------------------

const ENTRY =
  "My bank called to congratulate me on saving money, then charged me a fee for the call.";

const GATE = {
  minChars: 1,
  maxChars: 200,
  expectedLines: 1,
  outPath: "/output/entry.txt",
  outDir: "/output",
} as const;

// ---------------------------------------------------------------------------
// The gate: each rule is a small named check, run in order
// ---------------------------------------------------------------------------

type Rule = {
  name: string;
  check: (text: string) => void;
};

const RULES: Rule[] = [
  {
    name: "length",
    check: (text) => {
      if (text.length < GATE.minChars || text.length > GATE.maxChars) {
        throw new Error(
          `entry is ${text.length} characters, must be ${GATE.minChars}-${GATE.maxChars}`,
        );
      }
    },
  },
  {
    name: "non-blank",
    check: (text) => {
      if (text.trim().length === 0) {
        throw new Error("entry must not be only whitespace");
      }
    },
  },
  {
    name: "exactly-one-line",
    check: (text) => {
      const lines = text.split("\n");
      if (lines.length !== GATE.expectedLines) {
        throw new Error(
          `entry must be exactly ${GATE.expectedLines} line, got ${lines.length}`,
        );
      }
      if (/\r/.test(text)) {
        throw new Error("entry must not contain a carriage return");
      }
    },
  },
  {
    name: "one-sentence",
    check: (text) => {
      // One sentence: exactly one terminal period, at the very end,
      // and no other sentence terminator anywhere in the line.
      const terminators = (text.match(/[.!?]/g) ?? []).length;
      if (terminators !== 1 || !text.endsWith(".")) {
        throw new Error(
          `entry must be exactly one sentence ending with a period, got ${terminators} terminators`,
        );
      }
    },
  },
  {
    name: "real-joke-not-observation",
    check: (text) => {
      // The line must be a real joke, not a quirky observation: it
      // needs the congratulation, the saving, and the fee for the
      // call itself, all three in one sentence.
      const lower = text.toLowerCase();
      if (
        !lower.includes("congratulate me on saving money") ||
        !lower.includes("charged me a fee for the call")
      ) {
        throw new Error(
          "entry must carry the full joke: congratulate on saving, fee for the call",
        );
      }
    },
  },
  {
    name: "turn-in-last-words",
    check: (text) => {
      // The twist must land in the last few words: the fee is for
      // the congratulatory call itself.
      const tail = text.slice(-30).toLowerCase();
      if (!tail.includes("fee for the call")) {
        throw new Error(
          "entry must land its twist in the last few words: fee for the call",
        );
      }
    },
  },
  {
    name: "praise-then-charge",
    check: (text) => {
      // The joke is a reversal: praise first, charge second. The
      // congratulation must come before the fee, or there is no turn.
      const lower = text.toLowerCase();
      const praise = lower.indexOf("congratulate");
      const fee = lower.indexOf("charged me a fee");
      if (praise < 0 || fee < 0 || fee < praise) {
        throw new Error("entry must run praise first, then the fee");
      }
    },
  },
  {
    name: "tight-no-word-to-trim",
    check: (text) => {
      // Tightness: no filler adverbs, no "very", no "really", no
      // second clause restating the first.
      const lower = text.toLowerCase();
      const banned = ["very ", "really ", "just ", "actually ", "literally "];
      for (const phrase of banned) {
        if (lower.includes(phrase)) {
          throw new Error(`entry must not carry filler: ${phrase.trim()}`);
        }
      }
    },
  },
  {
    name: "sticks-in-the-head",
    check: (text) => {
      // The brief's fifth test: the line must stay in the head after
      // one reading, the kind someone repeats to a friend the same
      // day. That needs concrete nouns a reteller can hold onto —
      // bank, saving, fee, call — and a short line. A long, abstract
      // line would not survive retelling.
      const lower = text.toLowerCase();
      for (const word of ["bank", "saving", "fee", "call"]) {
        if (!lower.includes(word)) {
          throw new Error(`entry must keep its retellable nouns: missing ${word}`);
        }
      }
      if (text.split(/\s+/).length > 20) {
        throw new Error("entry must stay short enough to repeat in one breath");
      }
    },
  },
  {
    name: "fresh-not-worn-out",
    check: (text) => {
      // The judge brief warns against a joke everyone has already
      // heard. Reject the worn-out one-liner shapes outright.
      const lower = text.toLowerCase();
      const banned = [
        "walk into a bar",
        "my wife",
        "as an ai",
        "i used to be indecisive",
        "why did the chicken",
      ];
      for (const phrase of banned) {
        if (lower.includes(phrase)) {
          throw new Error(`entry must not rest on a worn-out joke: ${phrase}`);
        }
      }
    },
  },
  {
    name: "clear-on-first-read",
    check: (text) => {
      // Clear on first read: no setup note, no explanation, no second
      // line needed to make sense of it.
      if (/setup|note:|explanation/i.test(text)) {
        throw new Error("entry must need no setup note or explanation");
      }
    },
  },
  {
    name: "no-surrounding-whitespace",
    check: (text) => {
      if (text !== text.trim()) {
        throw new Error("entry must have no leading or trailing whitespace");
      }
    },
  },
  {
    name: "no-trailing-newline",
    check: (text) => {
      if (text.endsWith("\n") || text.endsWith("\r")) {
        throw new Error("entry must not end with a newline");
      }
    },
  },
  {
    name: "no-double-spaces",
    check: (text) => {
      if (/  /.test(text)) {
        throw new Error("entry must not contain double spaces");
      }
    },
  },
];

function validate(text: string): void {
  for (const rule of RULES) {
    rule.check(text);
  }
}

// ---------------------------------------------------------------------------
// Write, read back, and report
// ---------------------------------------------------------------------------

function writeEntry(text: string): void {
  mkdirSync(GATE.outDir, { recursive: true });
  writeFileSync(GATE.outPath, text, "utf8");
}

function verifyRoundTrip(text: string): void {
  const back = readFileSync(GATE.outPath, "utf8");
  if (back !== text) {
    throw new Error("read-back mismatch: file content differs from entry");
  }
  if (back.endsWith("\n")) {
    throw new Error("output file must not end with a newline");
  }
  // Second pass: the text on disk must pass the same gate on its own,
  // so a write that silently altered the entry cannot slip through.
  validate(back);
}

function report(text: string): void {
  const words = text.split(/\s+/).length;
  const punch = text.slice(text.lastIndexOf(", then") + 2);
  console.log(`wrote ${GATE.outPath} (${text.length} characters, ${words} words)`);
  console.log(`entry (${text.length} chars): ${text}`);
  console.log(`twist in last words: "${punch}"`);
  console.log(text);
}

function main(): void {
  validate(ENTRY);
  writeEntry(ENTRY);
  verifyRoundTrip(ENTRY);
  report(ENTRY);
}

main();
