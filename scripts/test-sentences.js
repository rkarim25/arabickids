/* Tests for the sentence lessons.

   These are picture-free, so EVERY piece of meaning arrives through the ear.
   That makes two things load-bearing in a way they are not elsewhere:

     1. every Arabic line, every variation, every English meaning and every
        explanation must have an audio clip — a missing clip here is not a
        degraded experience, it is a blank screen with nothing to go on;
     2. the band rules still apply, because a sentence a child cannot decode is
        not a lesson, it is a recording.

   Run: node scripts/test-sentences.js
   ========================================================================= */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const { SENTENCE_SETS, ALL_LESSONS } = require(path.join(ROOT, "sentences.js"));

let fails = 0;
const ok = m => console.log("  ✓ " + m);
const bad = m => { console.log("  ✗ " + m); fails++; };
const yes = (c, m) => (c ? ok(m) : bad(m));

/* ---------- 1. shape ---------- */
yes(SENTENCE_SETS.length >= 3, `at least three sets (got ${SENTENCE_SETS.length})`);
yes(ALL_LESSONS.length >= 8, `at least eight sentences (got ${ALL_LESSONS.length})`);
for (const s of SENTENCE_SETS) {
  if (!s.title || !s.titleEn) bad(`set ${s.id}: needs an Arabic and an English title`);
  if (!s.lessons.length) bad(`set ${s.id}: has no lessons`);
}
for (const L of ALL_LESSONS) {
  if (!L.ar) bad("a lesson has no Arabic");
  if (!L.en) bad(`${L.ar}: no English meaning`);
  if (!L.why) bad(`${L.ar}: no explanation — "more explanation" was the whole point`);
  if (!L.vary || L.vary.length < 2) bad(`${L.ar}: needs at least two variations to swap a word with`);
  for (const v of L.vary || []) if (!v.ar || !v.en) bad(`${L.ar}: a variation is missing its Arabic or English`);
}
ok("every lesson has Arabic, a meaning, an explanation and variations");

/* ---------- 2. the explanation is for a CHILD ---------- */
/* Grammar words are exactly what makes an explanation useless to a five-year-
   old. If one is needed the idea gets described instead of named. */
const JARGON = /\b(nominal sentence|genitive|accusative|nominative|i'?raab|idafa|construct state|definite article|conjugation|morphology|preposition|predicate)\b/i;
for (const L of ALL_LESSONS) {
  const hit = L.why.match(JARGON);
  if (hit) bad(`${L.ar}: the explanation uses grammar jargon ("${hit[0]}") — describe it instead`);
  if (L.why.split(/\s+/).length > 45) bad(`${L.ar}: the explanation is ${L.why.split(/\s+/).length} words — too long to listen to`);
}
ok("no explanation uses grammar jargon, and none is too long to sit through");

/* ---------- 3. the band rules, same as the storybooks ---------- */
const SUN = "ت ث د ذ ر ز س ش ص ض ط ظ ل ن".split(" ");
const SHADDA = "ّ", SUKOON = "ْ";
/* The definite article is اَلْ at the START of a word, optionally behind one of
   the prefixes و ف ب ل ك. Searching for "ال" ANYWHERE in the word is wrong and
   was rejecting perfectly legal Level 3 words: قَالَتْ contains alif-lam as part
   of its own root, and so do خَالَة and حَالَة. Only word-initial counts. */
const stripH = w => w.replace(/[ً-ْٰـ]/g, "");
function sunAl(word) {
  const m = stripH(word).match(/^[وفبلك]?ال(.)/);
  return !!m && SUN.includes(m[1]);
}

const linesOf = L => [L.ar, ...(L.vary || []).map(v => v.ar)];

let before = fails;
for (const L of ALL_LESSONS) {
  for (const line of linesOf(L)) {
    const words = line.split(/\s+/).filter(Boolean);
    if (words.length > 5) bad(`"${line}" is ${words.length} words — too long for these bands`);
    if (L.level < 2 && words.some(w => w.includes(SUKOON)))
      bad(`"${line}" (L${L.level}): sukoon is not introduced until Level 2`);
    if (L.level < 3 && words.some(w => w.includes(SHADDA)))
      bad(`"${line}" (L${L.level}): shadda is not introduced until Level 3`);
    if (L.level < 4) {
      const hits = words.filter(sunAl);
      if (hits.length) bad(`"${line}" (L${L.level}): sun-letter اَلْ (${hits.join(", ")}) is not until Level 4`);
    }
  }
}
yes(fails === before, "every sentence and every variation obeys its band");

/* ---------- 4. a variation really is ONE word different ---------- */
before = fails;
/* The step is called "change one word". If two change, the child cannot see
   which one carried the meaning, and the exercise teaches nothing. */
for (const L of ALL_LESSONS) {
  const base = L.ar.split(/\s+/);
  for (const v of L.vary || []) {
    const alt = v.ar.split(/\s+/);
    if (alt.length !== base.length) {
      bad(`"${v.ar}" has ${alt.length} words against the original's ${base.length} — not a one-word swap`);
      continue;
    }
    const diff = base.filter((w, i) => w !== alt[i]).length;
    if (diff !== 1) bad(`"${v.ar}" differs from "${L.ar}" in ${diff} words — the step is CHANGE ONE WORD`);
  }
}
yes(fails === before, "every variation differs from its sentence by exactly one word");

/* ---------- 5. EVERY line has a clip ---------- */
/* Picture-free means audio-critical. */
const manifestPath = path.join(ROOT, "data", "audio-manifest.json");
if (!fs.existsSync(manifestPath)) {
  bad("data/audio-manifest.json is missing — run scripts/gen-audio.py");
} else {
  const M = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const TASHKEEL = /[ً-ْٰـ]/g;
  const normAr = s => String(s || "").replace(TASHKEEL, "").replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/[؟،؛.!?]/g, "")
    .replace(/[^؀-ۿ\s]/g, "").replace(/\s+/g, " ").trim();
  const normEn = s => String(s || "").replace(/\s+/g, " ").trim().toLowerCase();

  const missing = [];
  const wantAr = new Set(), wantEn = new Set();
  for (const L of ALL_LESSONS) {
    linesOf(L).forEach(x => wantAr.add(normAr(x)));
    // individual words are tappable, so each one needs its own clip too
    linesOf(L).forEach(x => x.split(/\s+/).forEach(w => wantAr.add(normAr(w))));
    wantEn.add(normEn(L.en));
    wantEn.add(normEn(L.why));
    (L.vary || []).forEach(v => wantEn.add(normEn(v.en)));
  }
  for (const k of wantAr) if (k && !M[k]) missing.push("ar:" + k);
  for (const k of wantEn) if (k && !M["en:" + k]) missing.push("en:" + k);

  yes(missing.length === 0,
    missing.length
      ? `${missing.length} line(s) have no audio, and there is no picture to fall back on — run scripts/gen-audio.py. First few: ${missing.slice(0, 5).join(" | ")}`
      : `all ${wantAr.size + wantEn.size} spoken strings have a clip`);

  // and the files behind the manifest must exist
  const gone = [...wantAr].map(k => M[k]).concat([...wantEn].map(k => M["en:" + k]))
    .filter(Boolean).filter(stem => !fs.existsSync(path.join(ROOT, "audio", stem + ".mp3")));
  yes(gone.length === 0, gone.length ? `${gone.length} clip file(s) named in the manifest do not exist` : "every clip named in the manifest is really on disk");
}

console.log(fails ? `\n${fails} FAILED` : "\nALL TESTS PASS");
process.exit(fails ? 1 : 0);
