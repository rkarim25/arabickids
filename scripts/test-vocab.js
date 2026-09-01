/* Tests for vocab.js — Vocabulary & Spaced Repetition (SRS).
   Run: node scripts/test-vocab.js
   ========================================================================= */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const { VOCAB_CATEGORIES, VOCAB_WORDS } = require(path.join(ROOT, "vocab.js"));

let fails = 0;
const ok = m => console.log("  ✓ " + m);
const bad = m => { console.log("  ✗ " + m); fails++; };
const yes = (c, m) => (c ? ok(m) : bad(m));

console.log("\nTesting Vocabulary Data & SRS Setup...");

/* ---------- 1. Categories are complete ---------- */
yes(VOCAB_CATEGORIES && VOCAB_CATEGORIES.length >= 5,
  `at least 5 vocabulary categories defined (got ${VOCAB_CATEGORIES.length})`);
const catIds = new Set(VOCAB_CATEGORIES.map(c => c.id));
yes(catIds.has("all") && catIds.has("characters") && catIds.has("home") && catIds.has("food") && catIds.has("nature"),
  "core categories (all, characters, home, food, nature) are all present");

/* ---------- 2. Vocabulary words list is complete and well-formed ---------- */
yes(VOCAB_WORDS && VOCAB_WORDS.length >= 35,
  `at least 35 foundational vocabulary items defined (got ${VOCAB_WORDS.length})`);

const seenIds = new Set();
let badWords = 0;
for (const w of VOCAB_WORDS) {
  if (!w.id || !w.ar || !w.en || !w.cat || !w.icon) {
    bad(`word ${w.id || 'unknown'} is missing required fields (id, ar, en, cat, icon)`);
    badWords++;
  }
  if (seenIds.has(w.id)) {
    bad(`duplicate word ID: ${w.id}`);
    badWords++;
  }
  seenIds.add(w.id);
  if (!catIds.has(w.cat)) {
    bad(`word ${w.id} has unknown category: ${w.cat}`);
    badWords++;
  }
}
yes(badWords === 0, "every vocabulary item is well-formed with no duplicate IDs");

/* ---------- 3. Every word has an audio clip mapped in manifest ---------- */
const MP = path.join(ROOT, "data", "audio-manifest.json");
if (fs.existsSync(MP)) {
  const MAN = JSON.parse(fs.readFileSync(MP, "utf8"));
  const TASHKEEL = /[\u064B-\u0652\u0670\u0640]/g;
  const normAr = s => (s || "").replace(TASHKEEL, "")
    .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
    .replace(/[؟،؛.!?]/g, "").replace(/[^\u0600-\u06FF\s]/g, "")
    .replace(/\s+/g, " ").trim();

  const missingAudio = [];
  for (const w of VOCAB_WORDS) {
    const k = normAr(w.ar);
    if (!MAN[k]) missingAudio.push(`${w.id} (${w.ar} -> ${k})`);
  }
  yes(!missingAudio.length, missingAudio.length
    ? `${missingAudio.length} words have no audio clip in manifest: ${missingAudio.slice(0, 5).join(", ")}`
    : "every vocabulary word has an audio clip in the manifest");
}

/* ---------- 4. Shipped files exist and index.html loads vocab modules ---------- */
const idxHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
yes(idxHtml.includes("vocab.js"), "index.html loads vocab.js");
yes(idxHtml.includes("vocab-ui.js"), "index.html loads vocab-ui.js");
yes(idxHtml.includes('id="vocab"'), "index.html has #vocab container");
yes(!idxHtml.includes('id="shelfHome">✕</button>'), "#shelf no longer uses cross-out ✕ close button");
yes(idxHtml.includes('class="reader-head"'), "#reader uses clean dedicated navigation header");

console.log(fails ? `\n${fails} FAILED` : "\nALL VOCABULARY TESTS PASS");
process.exit(fails ? 1 : 0);
