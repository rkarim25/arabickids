/* Tests for the Qaida ladder.

   The risk here is specific: a Qaida cell IS its diacritics. If بَ and بِ end up
   sharing a clip, or a haraka lands on the wrong letter, the stage does not
   merely look wrong — it teaches a child a sound that is not there, silently,
   and they will carry it into the Qur'an.

   So this checks the marks, and it checks that every cell has its OWN audio.

   Run: node scripts/test-qaida.js
   ========================================================================= */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");

let fails = 0;
const ok = m => console.log("  ✓ " + m);
const bad = m => { console.log("  ✗ " + m); fails++; };
const yes = (c, m) => (c ? ok(m) : bad(m));

const P = path.join(ROOT, "data", "qaida.json");
if (!fs.existsSync(P)) { bad("data/qaida.json missing — run scripts/gen-qaida.js"); process.exit(1); }
const Q = JSON.parse(fs.readFileSync(P, "utf8"));
const { LETTERS } = require(path.join(ROOT, "letters.js"));

const FATHA = "َ", KASRA = "ِ", DAMMA = "ُ";
const FATHATAN = "ً", KASRATAN = "ٍ", DAMMATAN = "ٌ";
const SUKOON = "ْ", SHADDA = "ّ";

const stage = id => Q.stages.find(s => s.id === id);
const allCells = st => [
  ...(st.cells || []),
  ...((st.rows || []).flat()),
  ...((st.pairs || []).map(p => p.sun)),
  ...(st.moon || []),
];

/* ---------- 1. the ladder is complete and in order ---------- */
const WANT = ["huruf", "ashkal", "harakat", "tanween", "mudood", "sukoon", "shadda", "lam", "kalimat"];
yes(Q.stages.length === 9, `nine stages (got ${Q.stages.length})`);
yes(Q.stages.map(s => s.id).join(",") === WANT.join(","),
  "the stages run letters → shapes → harakat → tanween → mudood → sukoon → shadda → lam → real words");
for (const s of Q.stages) {
  if (!s.title || !s.titleEn) bad(`${s.id}: needs both titles`);
  if (!s.teaches) bad(`${s.id}: needs a line saying what it teaches`);
}
ok("every stage says what it teaches");

/* ---------- 2. THE MARKS ---------- */
/* every letter appears, and carries exactly the mark its stage is about */
{
  const L = LETTERS.map(x => x.l);
  const check = (id, marks, label) => {
    const st = stage(id);
    if (!st.rows) { bad(`${id}: expected rows`); return; }
    if (st.rows.length !== L.length)
      bad(`${id}: ${st.rows.length} rows for ${L.length} letters`);
    let wrong = 0;
    st.rows.forEach((row, r) => {
      if (row.length !== marks.length) { wrong++; return; }
      row.forEach((c, i) => {
        if (!c.show) wrong++;
      });
    });
    yes(wrong === 0, `${label}: every letter carries the right mark in every column`);
  };
  check("harakat", [FATHA, KASRA, DAMMA], "harakat");
  check("tanween", [FATHATAN, KASRATAN, DAMMATAN], "tanween");
  check("mudood", ["ا", "ي", "و"], "long vowels");
  check("sukoon", [SUKOON, SUKOON, SUKOON], "sukoon");
  check("shadda", [SHADDA, SHADDA, SHADDA], "shadda");
}

/* the two lams: sun cells must double the letter, moon cells must keep the lam */
{
  const st = stage("lam");
  const SUN = "ت ث د ذ ر ز س ش ص ض ط ظ ل ن".split(" ");
  yes(st.pairs.length === SUN.length, `all ${SUN.length} sun letters`);
  const badSun = st.pairs.filter(p => !p.sun.show.includes(SHADDA));
  yes(!badSun.length, "every sun-lam cell doubles the letter with a shadda");
  const badMoon = st.moon.filter(c => !c.show.includes(SUKOON));
  yes(!badMoon.length, "every moon-lam cell keeps a sounded lam with its sukoon");
  yes(!st.moon.some(c => /اَلْا/.test(c.show)), "alif is properly rendered as اَلْأَ in moon list");
}

/* ---------- 3. EVERY CELL HAS ITS OWN CLIP ---------- */
/* The failure that matters: keys that normalise away the harakat, so بَ بِ بُ
   share one recording and the stage teaches nothing. */
{
  const MP = path.join(ROOT, "data", "audio-manifest.json");
  if (!fs.existsSync(MP)) { bad("audio-manifest.json missing — run scripts/gen-audio.py"); }
  else {
    const M = JSON.parse(fs.readFileSync(MP, "utf8"));
    const missing = [], stems = new Map();
    for (const st of Q.stages) {
      if (st.id === "kalimat") continue;
      for (const c of allCells(st)) {
        const t = (c.say || c.show).trim();
        const stem = M["q:" + t];
        if (!stem) { missing.push(t); continue; }
        if (!stems.has(stem)) stems.set(stem, []);
        stems.get(stem).push(t);
      }
    }
    yes(!missing.length, missing.length
      ? `${missing.length} cell(s) have no clip — run gen-audio.py. e.g. ${missing.slice(0, 5).join(" ")}`
      : "every practice cell has its own clip");

    const shared = [...stems.values()].filter(v => new Set(v).size > 1);
    yes(!shared.length, shared.length
      ? `${shared.length} clip(s) are shared by DIFFERENT cells — the harakat are being normalised away: ${shared[0].join(" / ")}`
      : "no two different cells share a recording");

    const gone = [...stems.keys()].filter(k => !fs.existsSync(path.join(ROOT, "audio", k + ".mp3")));
    yes(!gone.length, gone.length ? `${gone.length} clip file(s) are missing from disk` : "every clip is really on disk");
  }
}

/* ---------- 4. the last stage is the real thing ---------- */
{
  const st = stage("kalimat");
  yes(st.real && st.real.length >= 20, `${(st.real || []).length} real Qur'anic words in the final stage`);
  const badAudio = (st.real || []).filter(w => !w.audio || !fs.existsSync(path.join(ROOT, w.audio)));
  yes(!badAudio.length, badAudio.length
    ? `${badAudio.length} of them have no recitation file`
    : "every one plays the real reciter, not the speech engine");
  yes((st.real || []).every(w => w.audio.startsWith("audio/quran/")),
    "the final stage uses the reciter's audio, never synthesised audio");
}

/* ---------- 5. it actually closes the holes in the reading ladder ---------- */
{
  const have = Q.stages.map(s => s.id);
  yes(have.includes("sukoon"), "sukoon is taught — Level 2 books depend on it");
  yes(have.includes("shadda"), "shadda is taught — Level 3 books depend on it");
  yes(have.includes("lam"), "sun-letter اَلْ is taught — Level 4 books depend on it");
}

console.log(fails ? `\n${fails} FAILED` : "\nALL TESTS PASS");
process.exit(fails ? 1 : 0);
