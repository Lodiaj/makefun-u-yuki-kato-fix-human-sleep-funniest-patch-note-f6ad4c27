// Fix Human Sleep: Funniest Patch Note.
// One line of patch notes announcing that human sleep is fixed: funny
// enough to make a reader laugh, plausible enough to sit in a real
// changelog. The program writes the single line to /output/entry.txt,
// where the sealed scorer checks the file is 1 to 160 characters of
// real UTF-8 text on one line.

import { mkdirSync, writeFileSync } from "node:fs";

const PATCH_NOTE =
  "Fixed a bug where sleep stopped at 3 a.m. to replay your most embarrassing moments from 2019; it now runs until the alarm.";

const DESTINATION = "/output/entry.txt";
const LIMIT = 160;

// The joke is specific and surprising rather than a flat claim that
// sleep is fixed: the bug is sleep itself pausing at 3 a.m. to replay
// the reader's most embarrassing moments from 2019, and the fix is
// that it now runs until the alarm. Terse, confident, changelog voice.
// The gate counts code points (not UTF-16 units) and requires 1-160
// characters of real text on a single line. Count with the spread
// operator so every character counts once, exactly as the gate counts
// them. A trailing newline would be an extra character and a second
// line, so the file is written with no trailing newline.
function validatePatchNote(text: string, limit: number): string {
  const length = [...text].length;
  if (text.trim() === "") {
    throw new Error("patch note is blank");
  }
  if (length > limit) {
    throw new Error(`patch note is ${length} characters; the gate allows 1-${limit}`);
  }
  const lines = text.split("\n");
  if (lines.length !== 1) {
    throw new Error(`patch note must be exactly one line, got ${lines.length}`);
  }
  return text;
}

function writeEntry(): void {
  const note = validatePatchNote(PATCH_NOTE, LIMIT);
  mkdirSync("/output", { recursive: true });
  writeFileSync(DESTINATION, note, "utf8");
}

writeEntry();
