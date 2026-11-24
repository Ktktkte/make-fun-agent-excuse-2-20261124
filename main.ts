// agent-excuse-2: writes the agent's one-line deadline excuse to /output/entry.txt
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(here, "entry.txt"), "utf8").replace(/\r\n/g, "\n");
if (line.length < 1 || line.length > 160 || !line.trim()) {
  throw new Error("entry.txt must be 1-160 non-whitespace characters");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
// Verify the write landed byte-identical before exiting.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== line) throw new Error("output mismatch after write");
