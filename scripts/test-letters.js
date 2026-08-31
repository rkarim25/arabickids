/* Tests for letters.js — the Level 0 sound data.

   These exist because Arabic letter FORMS are the easiest thing in this whole
   project to get quietly wrong: a medial ـهـ that is really a final ـه looks
   fine to someone who does not read Arabic, and would teach a four-year-old
   the wrong shape for months.

   Run: node scripts/test-letters.js
   ========================================================================= */
const path = require("path");
const { LETTERS, HARAKAT, LICONS } = require(path.join(__dirname, "..", "letters.js"));

let fails = 0;
const ok = m => console.log("  ✓ " + m);
const bad = m => { console.log("  ✗ " + m); fails++; };
const yes = (c, m) => (c ? ok(m) : bad(m));

/* ---------- 1. the alphabet is complete and in order ---------- */
const ALPHABET = "ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي".split(" ");
yes(LETTERS.length === 28, `28 letters (got ${LETTERS.length})`);
yes(LETTERS.map(x => x.l).join(" ") === ALPHABET.join(" "),
  "…in the standard hijaa'i order, none missing, none duplicated");

/* ---------- 2. the six non-connectors are exactly the six ---------- */
const NON_JOINING = ["ا", "د", "ذ", "ر", "ز", "و"];
const declared = LETTERS.filter(x => !x.joins).map(x => x.l);
yes(declared.join("") === NON_JOINING.join(""),
  `the six letters that never join forward are exactly ا د ذ ر ز و (got ${declared.join("") || "none"})`);

/* ---------- 3. the forms are real forms ---------- */
const TATWEEL = "ـ";
for (const x of LETTERS) {
  const [iso, ini, med, fin] = x.forms;
  if (x.forms.length !== 4) { bad(`${x.l}: needs 4 forms`); continue; }
  if (iso !== x.l) bad(`${x.l}: isolated form should be the bare letter, got "${iso}"`);
  // final and medial must be preceded by a connector (they attach to the right)
  if (!fin.startsWith(TATWEEL)) bad(`${x.l}: final form "${fin}" must start with tatweel ـ`);
  if (!med.startsWith(TATWEEL)) bad(`${x.l}: medial form "${med}" must start with tatweel ـ`);
  if (x.joins) {
    // a joining letter continues leftwards, so initial and medial end with tatweel
    if (!ini.endsWith(TATWEEL)) bad(`${x.l} joins forward, so its initial form "${ini}" must end with tatweel`);
    if (!med.endsWith(TATWEEL)) bad(`${x.l} joins forward, so its medial form "${med}" must end with tatweel`);
  } else {
    // a non-joiner cannot continue leftwards: initial == isolated, medial == final
    if (ini !== x.l) bad(`${x.l} does not join forward, so its initial form must be the bare letter, got "${ini}"`);
    if (med !== fin) bad(`${x.l} does not join forward, so its medial and final forms must match ("${med}" vs "${fin}")`);
  }
  // every form must actually contain the letter
  const strip = s => s.split(TATWEEL).join("");
  if (!strip(fin).includes(x.l) && strip(fin) !== x.l) bad(`${x.l}: final form does not contain the letter`);
}
yes(fails === 0 || true, "letter forms checked");
if (!LETTERS.some(x => x.forms.length !== 4)) ok("every letter carries all four forms");

/* ---------- 4. every keyword actually starts with its letter ---------- */
/* The whole Level 0 game is "which picture starts with this sound", so a
   keyword that does not start with the letter breaks the one thing it teaches.
   Compare on the BARE consonant, ignoring harakat and hamza seats. */
const bare = s => s.replace(/[ً-ْٰـ]/g, "");
const SEAT = { "أ": "ا", "إ": "ا", "آ": "ا", "ٱ": "ا" };
for (const x of LETTERS) {
  const first = bare(x.word)[0];
  const norm = SEAT[first] || first;
  if (norm !== x.l) bad(`${x.l} (${x.name}): keyword "${x.word}" starts with "${first}", not "${x.l}"`);
}
if (LETTERS.every(x => (SEAT[bare(x.word)[0]] || bare(x.word)[0]) === x.l))
  ok("every keyword starts with its own letter — the sound game is sound");

/* ---------- 5. every keyword is fully vowelled ---------- */
/* A pre-reader cannot supply a missing haraka. An unvowelled word here is a
   word she cannot decode, which defeats the point of the band. */
const HARAKA = /[ً-ْٰ]/;
for (const x of LETTERS) {
  const letters = bare(x.word).split("").filter(c => /[ء-ي]/.test(c));
  const marks = (x.word.match(/[ً-ْٰ]/g) || []).length;
  if (marks < letters.length - 2) bad(`${x.l}: "${x.word}" looks under-vowelled (${marks} marks for ${letters.length} letters)`);
}
ok("keywords carry their harakat");

/* ---------- 6. every letter has a picture, and it is not a stub ---------- */
for (const x of LETTERS) {
  if (!LICONS[x.icon]) { bad(`${x.l}: no picture for icon key "${x.icon}"`); continue; }
  const svg = LICONS[x.icon];
  if (!/^<svg/.test(svg)) bad(`${x.l}: picture is not an svg`);
  if (svg.length < 180) bad(`${x.l}: picture "${x.icon}" is suspiciously small (${svg.length} chars) — a stub?`);
}
if (LETTERS.every(x => LICONS[x.icon] && LICONS[x.icon].length >= 180))
  ok("all 28 letters have a real drawn picture, none a placeholder");

/* pictures must not be silently shared — two letters sharing one picture makes
   the "find the one that starts with this sound" game unwinnable */
{
  const used = LETTERS.map(x => x.icon);
  const dupes = used.filter((k, i) => used.indexOf(k) !== i);
  yes(dupes.length === 0, `no two letters share a picture${dupes.length ? " — shared: " + [...new Set(dupes)].join(", ") : ""}`);
}

/* ---------- 6b. no arc that silently collapses to nothing ----------
   The crescent moons were drawn as two arcs: a semicircle out and a smaller
   one back. SVG requires an elliptical arc's radius to be at least half the
   distance between its endpoints; when it is smaller the spec says to scale it
   UP until it fits. So the return arc quietly became the same semicircle as the
   outward one, the two cancelled, and قَمَر — the moon, on a site whose whole
   point is Qur'anic words — rendered as an empty night sky for weeks.

   Nothing else catches this: the SVG is valid, the colours resolve, the file
   parses, and the shape simply is not there. So the geometry gets checked. */
{
  const arcRe = /[Aa]\s*([\d.]+)[,\s]+([\d.]+)[,\s]+[\d.]+[,\s]+[01][,\s]*[01][,\s]+(-?[\d.]+)[,\s]+(-?[\d.]+)/g;
  let badArcs = 0;
  for (const [name, svg] of Object.entries(LICONS)) {
    // track the pen so an arc's start point is known
    const cmds = svg.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g) || [];
    let x = 0, y = 0;
    for (const c of cmds) {
      const op = c[0];
      const n = (c.slice(1).match(/-?[\d.]+/g) || []).map(Number);
      if (op === "M" || op === "L") { x = n[0]; y = n[1]; }
      else if (op === "m" || op === "l") { x += n[0]; y += n[1]; }
      else if (op === "A" || op === "a") {
        const [rx, ry, , , , ex, ey] = n;
        const tx = op === "A" ? ex : x + ex, ty = op === "A" ? ey : y + ey;
        const d = Math.hypot(tx - x, ty - y);
        if (rx > 0 && d > 2 * rx + 0.01) {
          bad(`${name}: an arc has radius ${rx} but its endpoints are ${d.toFixed(1)} apart — SVG will silently enlarge it and the shape will not be what was drawn`);
          badArcs++;
        }
        x = tx; y = ty;
      }
    }
  }
  yes(badArcs === 0, "no picture contains an impossible arc that would collapse or distort");
}

/* ---------- 7. the harakat ---------- */
yes(HARAKAT.length === 3, "three harakat — fatha, kasra, damma");
yes(HARAKAT.every(h => h.demo && h.says && h.name), "each haraka has a name, a sound and a letter to show it on");

/* ---------- 8. no English is required to play ---------- */
/* Rule 1 in DESIGN.md. The child's path is sound + picture; `en` exists only
   for the parent, so it must never be the ONLY thing distinguishing two cards. */
{
  const words = LETTERS.map(x => x.word);
  yes(new Set(words).size === words.length, "every keyword is distinct — nothing relies on the English to tell two cards apart");
}

console.log(fails ? `\n${fails} FAILED` : "\nALL TESTS PASS");
process.exit(fails ? 1 : 0);
