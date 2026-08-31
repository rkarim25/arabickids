/* Tests for the no-picture stories.

   These carry MORE risk than the picture books, not less. In a picture book a
   sentence that is slightly out of band is cushioned — the illustration still
   tells the child what is happening. Here there is nothing else on the page, so
   a word the child cannot decode is a dead stop. The bands are therefore
   enforced exactly as strictly, and every line must have audio.

   Run: node scripts/test-stories-text.js
   ========================================================================= */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const { TEXT_STORIES } = require(path.join(ROOT, "stories-text.js"));

let fails = 0;
const ok = m => console.log("  ✓ " + m);
const bad = m => { console.log("  ✗ " + m); fails++; };
const yes = (c, m) => (c ? ok(m) : bad(m));

const SUN = "ت ث د ذ ر ز س ش ص ض ط ظ ل ن".split(" ");
const SHADDA = "ّ", SUKOON = "ْ";
const stripH = w => w.replace(/[ً-ْٰـ]/g, "");
/* word-INITIAL اَلْ only — قَالَتْ and خَالَة contain alif-lam in their roots */
function sunAl(word) {
  const m = stripH(word).match(/^[وفبلك]?ال(.)/);
  return !!m && SUN.includes(m[1]);
}

/* ---------- 1. one at every level ---------- */
yes(TEXT_STORIES.length >= 5, `at least five stories (got ${TEXT_STORIES.length})`);
for (let lv = 1; lv <= 5; lv++)
  yes(TEXT_STORIES.some(s => s.level === lv), `Level ${lv} has a no-picture story`);

/* ---------- 2. shape ---------- */
for (const s of TEXT_STORIES) {
  if (!s.title || !s.titleEn) bad(`${s.id}: needs an Arabic and an English title`);
  if (!s.blurb) bad(`${s.id}: needs a one-line blurb for the shelf`);
  if (!s.lines || s.lines.length < 5) bad(`${s.id}: a story needs at least five lines (got ${(s.lines || []).length})`);
  for (const l of s.lines || []) {
    if (!l.ar || !l.ar.trim()) bad(`${s.id}: a line has no Arabic`);
    if (!l.en || !l.en.trim()) bad(`${s.id}: "${l.ar}" has no meaning — with no picture, that line says nothing at all`);
  }
  /* no picture may sneak in: that is the entire point of this shelf */
  if (JSON.stringify(s).includes("<svg") || JSON.stringify(s).includes("<img"))
    bad(`${s.id}: contains a picture — these are the NO-picture stories`);
}
ok("every story has a title, a blurb, and at least five lines that all carry a meaning");

/* ---------- 3. THE BANDS, exactly as for the picture books ---------- */
let before = fails;
for (const s of TEXT_STORIES) {
  const max = { 1: 5, 2: 5, 3: 6, 4: 12, 5: 12 }[s.level] || 12;
  for (const l of s.lines) {
    const words = l.ar.split(/\s+/).filter(Boolean);
    if (words.length > max)
      bad(`${s.id} (L${s.level}): "${l.ar}" is ${words.length} words, band allows ${max}`);
    if (s.level < 2 && words.some(w => w.includes(SUKOON)))
      bad(`${s.id} (L1): "${l.ar}" has a sukoon — Level 1 is harakat and long vowels only`);
    if (s.level < 3 && words.some(w => w.includes(SHADDA)))
      bad(`${s.id} (L${s.level}): "${l.ar}" has a shadda — not until Level 3`);
    if (s.level < 4) {
      const hits = words.filter(sunAl);
      if (hits.length) bad(`${s.id} (L${s.level}): "${l.ar}" has sun-letter اَلْ (${hits.join(", ")}) — not until Level 4`);
    }
  }
}
yes(fails === before, "every line of every story obeys its band");

/* ---------- 4. fully vowelled ---------- */
before = fails;
for (const s of TEXT_STORIES) {
  for (const l of s.lines) {
    for (const w of l.ar.split(/\s+/).filter(Boolean)) {
      const bare = w.replace(/[^ء-ي]/g, "");
      const marks = (w.match(/[ً-ْٰ]/g) || []).length;
      const chars = bare.split("");
      const need = chars.filter((c, i) => {
        if (i === chars.length - 1) return false;
        if ("اوي".includes(c) && i > 0) return false;
        if (c === "ا" && i === 0) return false;
        return true;
      }).length;
      if (need >= 2 && marks < need - 1)
        bad(`${s.id}: "${w}" looks under-vowelled (${marks} marks for ${need} letters that need one)`);
    }
  }
}
yes(fails === before, "every word carries its harakat — there is no picture to guess from");

/* ---------- 5. every line and every word has a clip ---------- */
const MP = path.join(ROOT, "data", "audio-manifest.json");
if (!fs.existsSync(MP)) {
  bad("data/audio-manifest.json missing — run scripts/gen-audio.py");
} else {
  const M = JSON.parse(fs.readFileSync(MP, "utf8"));
  const normAr = s => String(s || "").replace(/[ً-ْٰـ]/g, "")
    .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
    .replace(/[؟،؛.!?]/g, "").replace(/[^؀-ۿ\s]/g, "")
    .replace(/\s+/g, " ").trim();
  const normEn = s => String(s || "").replace(/\s+/g, " ").trim().toLowerCase();

  const missAr = [], missEn = [];
  for (const s of TEXT_STORIES) for (const l of s.lines) {
    if (!M[normAr(l.ar)]) missAr.push(l.ar);
    for (const w of l.ar.split(/\s+/).filter(Boolean))
      if (normAr(w) && !M[normAr(w)]) missAr.push(w);
    if (!M["en:" + normEn(l.en)]) missEn.push(l.en);
  }
  yes(!missAr.length, missAr.length
    ? `${missAr.length} Arabic line(s)/word(s) have no clip — run gen-audio.py. e.g. ${[...new Set(missAr)].slice(0, 4).join(" | ")}`
    : "every Arabic line and every tappable word has a clip");
  yes(!missEn.length, missEn.length
    ? `${missEn.length} meaning(s) have no clip. e.g. ${missEn.slice(0, 3).join(" | ")}`
    : "every meaning has a clip");
}

console.log(fails ? `\n${fails} FAILED` : "\nALL TESTS PASS");
process.exit(fails ? 1 : 0);
