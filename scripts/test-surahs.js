/* Tests for the surah module.

     node scripts/test-surahs.js [path-to-arabiclanguage-checkout]

   This is Qur'an, so the bar is different from everywhere else on the site.
   A picture that renders oddly is a nuisance; an ayah with a dropped letter,
   or an ayah playing the recitation of a DIFFERENT ayah, is a serious thing to
   put in front of a child. So:

     - the Arabic is compared CHARACTER BY CHARACTER against the source it was
       copied from, when that source is available;
     - every ayah must have a recitation file that really exists on disk;
     - the recitation id must match the ayah's own ref, because the failure
       that matters here is silent: the wrong ayah plays and it still sounds
       beautiful.
*/
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");

let fails = 0;
const ok = m => console.log("  ✓ " + m);
const bad = m => { console.log("  ✗ " + m); fails++; };
const yes = (c, m) => (c ? ok(m) : bad(m));

const P = path.join(ROOT, "data", "surahs.json");
if (!fs.existsSync(P)) { bad("data/surahs.json missing — run scripts/gen-surahs.js"); process.exit(1); }
const D = JSON.parse(fs.readFileSync(P, "utf8"));
const { AYAH_NOTES, AYAH_PROMPTS } = require(path.join(ROOT, "surah-notes.js"));

/* ---------- 1. the set he asked for ---------- */
yes(D.surahs.length === 11, `11 surahs — Al-Fatiha and the ten shortest (got ${D.surahs.length})`);
yes(D.surahs[0].id === "fatiha", "Al-Fatiha comes first");
yes(!!D.reciter, `a named reciter (${D.reciter})`);

/* ---------- 2. every ayah has real recitation, and it is the RIGHT one ---- */
let ayat = 0, words = 0, noAudio = 0, wrongId = 0, missingFile = 0, wordsNoAudio = 0;
for (const s of D.surahs) {
  for (const a of s.ayat) {
    ayat++;
    if (!a.audio) { noAudio++; continue; }
    /* the id encodes surah+ayah: 001007 is 1:7. If this ever drifts, a child
       hears a different ayah than the one on the screen and nothing complains. */
    const [sn, an] = a.ref.split(":").map(Number);
    const want = "a-" + String(sn).padStart(3, "0") + String(an).padStart(3, "0") + ".mp3";
    if (a.audio !== want) { bad(`${a.ref}: recitation file is ${a.audio}, expected ${want}`); wrongId++; }
    if (!fs.existsSync(path.join(ROOT, "audio", "quran", a.audio))) {
      bad(`${a.ref}: recitation file ${a.audio} does not exist`); missingFile++;
    }
    for (const w of a.words) {
      words++;
      if (!w.audio) { wordsNoAudio++; continue; }
      if (!fs.existsSync(path.join(ROOT, "audio", "quran", w.audio)))
        bad(`${a.ref}: word file ${w.audio} does not exist`);
    }
  }
}
yes(noAudio === 0, `every one of the ${ayat} ayat has a recitation clip`);
yes(wrongId === 0, "every recitation id matches its own ayah — no ayah plays another ayah's audio");
yes(missingFile === 0, "every recitation file named in the data is really on disk");
yes(wordsNoAudio <= 5, `word-by-word audio present for ${words - wordsNoAudio} of ${words} words`);

/* ---------- 3. shape ---------- */
for (const s of D.surahs) {
  if (!s.name || !s.nameEn) bad(`${s.id}: missing a name`);
  if (!s.ayat.length) bad(`${s.id}: no ayat`);
  for (const a of s.ayat) {
    if (!a.ar || !a.ar.trim()) bad(`${a.ref}: no Arabic`);
    if (!a.en || !a.en.trim()) bad(`${a.ref}: no meaning — the check step cannot work without it`);
    if (!a.words.length) bad(`${a.ref}: no word breakdown`);
    if (!/^\d+:\d+$/.test(a.ref)) bad(`bad ref "${a.ref}"`);
  }
}
ok("every ayah has Arabic, a meaning, a word breakdown and a well-formed ref");

/* ---------- 4. the meaning check must be answerable ---------- */
/* Distractors are drawn from other ayat, so two ayat sharing an identical
   English meaning would make a question with two right answers. */
{
  const seen = new Map();
  let dupes = 0;
  for (const s of D.surahs) for (const a of s.ayat) {
    const k = a.en.trim().toLowerCase();
    if (seen.has(k)) { bad(`${a.ref} and ${seen.get(k)} have the same English meaning — the check would have two correct answers`); dupes++; }
    else seen.set(k, a.ref);
  }
  yes(dupes === 0, "no two ayat share a meaning, so every check question has exactly one right answer");
}

/* ---------- 5. the notes point at ayat that exist ---------- */
{
  const refs = new Set(D.surahs.flatMap(s => s.ayat.map(a => a.ref)));
  const strayN = Object.keys(AYAH_NOTES).filter(r => !refs.has(r));
  const strayP = Object.keys(AYAH_PROMPTS).filter(r => !refs.has(r));
  yes(!strayN.length, strayN.length ? `notes for ayat that are not in the data: ${strayN.join(", ")}` : `${Object.keys(AYAH_NOTES).length} ayat carry a child-friendly note`);
  yes(!strayP.length, strayP.length ? `prompts for ayat not in the data: ${strayP.join(", ")}` : `${Object.keys(AYAH_PROMPTS).length} ayat carry thinking prompts`);
  // and a note must be short enough to listen to
  for (const [r, n] of Object.entries(AYAH_NOTES))
    if (n.split(/\s+/).length > 55) bad(`${r}: the note is ${n.split(/\s+/).length} words — too long to sit through`);
  // no grammar jargon: this is for a five-year-old
  const JARGON = /\b(genitive|accusative|nominative|imperative|pronoun suffix|i'?raab|morphology|particle|vocative|jussive)\b/i;
  for (const [r, n] of Object.entries(AYAH_NOTES)) {
    const hit = n.match(JARGON);
    if (hit) bad(`${r}: note uses grammar jargon ("${hit[0]}")`);
  }
  ok("notes are short and free of grammar jargon");
}

/* ---------- 6. the text is EXACTLY the source ---------- */
const SRC = process.argv[2];
if (SRC && fs.existsSync(path.join(SRC, "data", "verses.json"))) {
  const src = JSON.parse(fs.readFileSync(path.join(SRC, "data", "verses.json"), "utf8"));
  let diff = 0, checked = 0;
  for (const s of D.surahs) {
    const o = src.surahs.find(x => x.id === s.id);
    if (!o) { bad(`${s.id} is not in the source at all`); continue; }
    if (o.verses.length !== s.ayat.length) bad(`${s.id}: ${s.ayat.length} ayat here, ${o.verses.length} in the source`);
    s.ayat.forEach((a, i) => {
      checked++;
      if (!o.verses[i]) return;
      if (a.ar !== o.verses[i].ar) { bad(`${a.ref}: THE ARABIC DIFFERS FROM THE SOURCE`); diff++; }
      if (a.ref !== o.verses[i].ref) { bad(`ref mismatch at ${a.ref}`); diff++; }
    });
  }
  yes(diff === 0, `all ${checked} ayat are character-for-character identical to the source`);
} else {
  console.log("  · source checkout not given — skipping the character-by-character comparison");
  console.log("    (run: node scripts/test-surahs.js /path/to/arabiclanguage)");
}

console.log(fails ? `\n${fails} FAILED` : "\nALL TESTS PASS");
process.exit(fails ? 1 : 0);
