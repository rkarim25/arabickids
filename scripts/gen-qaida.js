/* Build data/qaida.json — the whole Qaida progression, generated.

     node scripts/gen-qaida.js

   WHY GENERATED. A Qaida is 28 letters run through a dozen mechanical
   transformations: every letter with every haraka, then with every tanween,
   then with each long vowel, then with sukoon, then with shadda. Typed by hand
   that is roughly 400 cells of vowelled Arabic, and a single mis-typed mark is
   a cell that teaches a child the wrong sound. So the marks are applied in code
   and the letters come from letters.js, which is already tested.

   WHY IT MATTERS. The reading ladder has always assumed a Qaida the site did
   not contain: sukoon gates Level 2, shadda gates Level 3, and sun-letter اَلْ
   gates Level 4 — and not one of them was ever taught anywhere. This closes
   that hole.

   The last stage is deliberately different: it reads REAL Qur'anic words with
   the REAL reciter, pulled from data/surahs.json, because the point of a Qaida
   is not the Qaida.
*/
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const { LETTERS } = require(path.join(ROOT, "letters.js"));

const FATHA = "َ", KASRA = "ِ", DAMMA = "ُ";
const FATHATAN = "ً", KASRATAN = "ٍ", DAMMATAN = "ٌ";
const SUKOON = "ْ", SHADDA = "ّ";
const ALIF = "ا", WAW = "و", YA = "ي";

/* the six that never join to the letter after them */
const NON_JOINING = new Set(["ا", "د", "ذ", "ر", "ز", "و"]);
/* sun letters: اَلْ assimilates into them */
const SUN = "ت ث د ذ ر ز س ش ص ض ط ظ ل ن".split(" ");

const L = LETTERS.map(x => x.l);
const nameOf = ch => (LETTERS.find(x => x.l === ch) || {}).name || ch;

/* A cell is what a child taps: what is SHOWN, and what is SAID. They differ
   only where showing the bare form would be unreadable. */
const cell = (show, say) => ({ show, say: say || show });

const stages = [];

/* ---- 1. the letters themselves ---- */
stages.push({
  id: "huruf", n: 1,
  title: "الحُرُوف", titleEn: "The letters",
  teaches: "All 28, on their own. Tap one to hear its name.",
  cells: LETTERS.map(x => cell(x.l, x.name)),
  sayIsName: true,
});

/* ---- 2. the four shapes ---- */
stages.push({
  id: "ashkal", n: 2,
  title: "أَشْكَال الحَرْف", titleEn: "The four shapes",
  teaches: "The same letter changes its clothes depending on where it stands. Six letters never join to the one after them — those are the ones that look the same twice.",
  cells: LETTERS.map(x => cell(x.forms.join("  "), x.name)),
  wide: true,
  note: l => (NON_JOINING.has(l) ? "never joins forward" : null),
});

/* ---- 3. harakat: every letter, all three ---- */
stages.push({
  id: "harakat", n: 3,
  title: "الحَرَكَات", titleEn: "Fatha, kasra, damma",
  teaches: "One letter, three different noises. This is the whole of early reading.",
  rows: L.map(l => {
    if (l === ALIF) return [cell("أَ", "أَ"), cell("إِ", "إِ"), cell("أُ", "أُ")];
    return [
      cell(l + FATHA, l + FATHA + ALIF),
      cell(l + KASRA, l + KASRA + YA),
      cell(l + DAMMA, l + DAMMA + WAW),
    ];
  }),
});

/* ---- 4. tanween ---- */
stages.push({
  id: "tanween", n: 4,
  title: "التَّنْوِين", titleEn: "Tanween — the doubled marks",
  teaches: "Two marks instead of one, and an n sound appears at the end: an, in, un.",
  rows: L.map(l => {
    if (l === ALIF) return [cell("ءً", "أَنْ"), cell("ءٍ", "إِنْ"), cell("ءٌ", "أُنْ")];
    return [
      cell(l + FATHATAN + ALIF, l + FATHA + "نْ"),
      cell(l + KASRATAN, l + KASRA + "نْ"),
      cell(l + DAMMATAN, l + DAMMA + "نْ"),
    ];
  }),
});

/* ---- 5. the long vowels ---- */
stages.push({
  id: "mudood", n: 5,
  title: "المُدُود", titleEn: "The long vowels",
  teaches: "Hold the sound. A fatha with an alif after it becomes aaa, a kasra with a ya becomes eee, a damma with a waw becomes ooo.",
  rows: L.map(l => {
    if (l === ALIF) return [cell("آ"), cell("إِي"), cell("أُو")];
    return [cell(l + FATHA + ALIF), cell(l + KASRA + YA), cell(l + DAMMA + WAW)];
  }),
});

/* ---- 6. sukoon ---- */
stages.push({
  id: "sukoon", n: 6,
  title: "السُّكُون", titleEn: "Sukoon — the stop",
  teaches: "A little circle means no vowel at all. The letter just stops. This is what Level 2 books are full of.",
  rows: L.map(l => {
    if (l === ALIF) return [cell("أَأْ"), cell("إِئْ"), cell("أُؤْ")];
    return [cell("أَ" + l + SUKOON), cell("إِ" + l + SUKOON), cell("أُ" + l + SUKOON)];
  }),
});

/* ---- 7. shadda ---- */
stages.push({
  id: "shadda", n: 7,
  title: "الشَّدَّة", titleEn: "Shadda — hold it twice",
  teaches: "The little w means the letter is said twice, held. Level 3 books need this one.",
  rows: L.map(l => {
    if (l === ALIF) return [cell("أَأَّ"), cell("أَأِّ"), cell("أَأُّ")];
    return [cell("أَ" + l + SHADDA + FATHA), cell("أَ" + l + SHADDA + KASRA), cell("أَ" + l + SHADDA + DAMMA)];
  }),
});

/* ---- 8. the two lams ---- */
stages.push({
  id: "lam", n: 8,
  title: "اللَّام الشَّمْسِيَّة وَالقَمَرِيَّة", titleEn: "The two kinds of al-",
  teaches: "Sometimes you hear the l in al-, and sometimes it vanishes into the next letter and doubles it. Say them and listen for the difference. Level 4 books need this.",
  pairs: SUN.map(l => ({
    sun: cell("اَل" + l + SHADDA + FATHA, "اَل" + l + SHADDA + FATHA),
    label: l,
  })),
  moon: ["أ", "ب", "ج", "ح", "خ", "ع", "غ", "ف", "ق", "ك", "م", "ه", "و", "ي"].map(l =>
    cell("اَلْ" + (l === "أ" ? "أَ" : l + FATHA))),
});

/* ---- 9. real words, real reciter ---- */
/* The point of a Qaida is not the Qaida. The last stage reads actual Qur'anic
   words with Alafasy's own recitation, taken from the surah data. */
let quranWords = [];
const sp = path.join(ROOT, "data", "surahs.json");
if (fs.existsSync(sp)) {
  const D = JSON.parse(fs.readFileSync(sp, "utf8"));
  const seen = new Set();
  for (const s of D.surahs) for (const a of s.ayat) for (const w of a.words) {
    const k = w.ar;
    if (seen.has(k) || !w.audio) continue;
    seen.add(k);
    quranWords.push({ show: w.ar, audio: "audio/quran/" + w.audio, ref: a.ref });
    if (quranWords.length >= 60) break;
  }
}
stages.push({
  id: "kalimat", n: 9,
  title: "كَلِمَات مِنَ القُرْآن", titleEn: "Real words, real reciter",
  teaches: "Everything you have practised, in words from the Qur'an — and this time it is a real reciter, not a machine.",
  real: quranWords,
});

const out = {
  note: "GENERATED by scripts/gen-qaida.js. The marks are applied in code so a mis-typed haraka cannot teach a wrong sound. Do not hand-edit.",
  stages,
};
fs.writeFileSync(path.join(ROOT, "data", "qaida.json"), JSON.stringify(out, null, 1));

const count = stages.reduce((a, s) =>
  a + (s.cells ? s.cells.length : 0) + (s.rows ? s.rows.flat().length : 0)
    + (s.pairs ? s.pairs.length : 0) + (s.moon ? s.moon.length : 0) + (s.real ? s.real.length : 0), 0);
console.log(`${stages.length} stages, ${count} cells`);
for (const s of stages) {
  const n = (s.cells ? s.cells.length : 0) + (s.rows ? s.rows.flat().length : 0)
    + (s.pairs ? s.pairs.length : 0) + (s.moon ? s.moon.length : 0) + (s.real ? s.real.length : 0);
  console.log(`  ${String(s.n).padStart(2)}. ${s.id.padEnd(9)} ${String(n).padStart(3)}  ${s.titleEn}`);
}
