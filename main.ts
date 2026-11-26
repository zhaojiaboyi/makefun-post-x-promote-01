// Entry program for the make.fun X promo bounty (Node 22, standard library only).
// The entry itself is a post on X; this repository hands in the post's address.
// All the program does is copy POST.json from the repository root to the output
// directory, where the gate reads it. The house then reads the post on X and
// scores its replies, reposts and quotes.
//
// Outside the grader's container, two environment variables stand in for the
// container paths:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });

const source = join(botDir, 'POST.json');

// Fail loudly on a malformed address file instead of handing in a bad entry:
// the gate reads the url out of POST.json, so check it parses and names an
// X post before copying anything.
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(source, 'utf8'));
} catch (err) {
  console.error(`POST.json could not be read as JSON from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
const url = (parsed as { url?: unknown }).url;
if (typeof url !== 'string' || !url.startsWith('https://x.com/')) {
  console.error(`POST.json must hold {"url": "https://x.com/<handle>/status/<id>"}; got: ${JSON.stringify(parsed)}`);
  process.exit(1);
}

try {
  copyFileSync(source, join(outputDir, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
