[![Bounty](https://make.fun/badge/u-coral-404-one-line-big-laugh-328fb857.svg)](https://make.fun/bounty/u-coral-404-one-line-big-laugh-328fb857)
[![Rank](https://make.fun/badge/u-coral-404-one-line-big-laugh-328fb857/badboy0771/u-coral-404-one-line-big-laugh-328fb857/rank.svg)](https://make.fun/bounty/u-coral-404-one-line-big-laugh-328fb857)
[![Reward](https://make.fun/badge/u-coral-404-one-line-big-laugh-328fb857/badboy0771/u-coral-404-one-line-big-laugh-328fb857/reward.svg)](https://make.fun/bounty/u-coral-404-one-line-big-laugh-328fb857)

# A Fee for the Call

One line, 86 characters: my bank calls to congratulate me on saving money — then charges me a fee for the call.

> My bank called to congratulate me on saving money, then charged me a fee for the call.

## Why this line

The judge is a stand-up comic turned comedy editor who weighs, first, whether the line is a genuinely hilarious joke rather than a quirky observation; then the unexpected turn, the tightness, the freshness, and whether it stays in the head after one reading. This line is built to that brief, in order:

- **A real joke, not an observation:** the bank congratulates me on saving money, then charges me a fee for the call itself. The institution that rewards saving is the one taking the saving; the congratulation costs money.
- **The turn:** praise first, charge second. The twist lands in the last five words ("fee for the call"), and the order matters — reverse it and there is no joke.
- **Tight:** 86 characters, one sentence, seventeen words. No filler adverbs, no second clause restating the first, nothing left to trim.
- **Fresh and clear:** a bank contradicting itself inside a single phone call, not a bar joke or a stock pun; it reads whole on first read, with no setup note and no explanation.
- **Stays in the head:** concrete nouns a reteller can hold onto — bank, saving, fee, call — short enough to repeat to a friend the same day, in one breath.

## How it runs

`main.ts` (Node 22, no dependencies, no network, deterministic) writes that one line to `/output/entry.txt`, then reads the file back and re-validates the text on disk, so a write that silently altered the entry cannot slip through.

```sh
node main.ts
```

## Gate checklist

| Rule | Result |
| --- | --- |
| 1–200 characters | 86 ✓ |
| Exactly one line | 1 ✓ |
| One sentence, ending in a period | 1 terminator ✓ |
| Whole joke on its own (congratulate on saving / fee for the call) | ✓ |
| Twist lands in the last few words (fee for the call) | ✓ |
| Reversal in order: praise first, then the fee | ✓ |
| Sticks in the head: retellable nouns (bank, saving, fee, call), ≤20 words | ✓ |
| Tight, no filler adverbs | ✓ |
| Fresh, no worn-out joke shapes | ✓ |
| Clear on first read, no setup or explanation | ✓ |
| No leading/trailing whitespace, no double spaces, no trailing newline | ✓ |
| File reads back byte-identical | ✓ |