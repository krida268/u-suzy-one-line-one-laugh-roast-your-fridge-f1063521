// One Line, One Laugh: Roast Your Fridge — entry program.
// Writes a single-line roast of the fridge to /output/entry.txt
// (or to the path given as argv[2], file or directory).
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The roast: the mystery container at the back of the fridge.
// Specific, lived detail (every fridge has one), and the twist lands
// in the last few words — the "science experiment" pays no rent.
// Judge angle: it roasts the fridge itself (not the owner), it names
// one recognisable detail instead of a generic insult, and it reads
// cleanly aloud as a single sentence.
const ENTRY =
  "There's a container in the back of my fridge from 2019 that nobody will open — we've agreed it's a science experiment now, and it still doesn't pay rent.";

function main(): void {
  const target = process.argv[2] ?? "/output";
  const outPath = target.endsWith(".txt") ? target : join(target, "entry.txt");
  const dir = resolve(outPath, "..");
  mkdirSync(dir, { recursive: true });
  // Gate: entry.txt must be UTF-8 text of 1 to 200 characters,
  // a single line, not only white space. The entry is written
  // with no trailing newline so its byte size equals its length.
  const line = ENTRY.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry is ${line.length} characters, gate needs 1-200`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  writeFileSync(outPath, line, "utf8");
  console.log(`wrote ${outPath} (${line.length} characters)`);
}

main();
