/* Tests for the storybooks — the band rules, and the shell.

   Why this file exists: a colour band is a PROMISE to a parent. "Level 1 is
   harakat and long vowels only" means a child who has done the early Qaida
   pages can read every word on the page unaided. One shadda slipped into a
   Level 1 book and that promise is quietly false — and nobody notices, because
   the page still looks lovely.

   So the bands are enforced here, mechanically, on the actual sentences.

   Run: node scripts/test-books.js
   ========================================================================= */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");

let fails = 0;
const ok = m => console.log("  ✓ " + m);
const bad = m => { console.log("  ✗ " + m); fails++; };
const yes = (c, m) => (c ? ok(m) : bad(m));

/* ---------- load the browser files in a fake window ---------- */
const src = f => fs.readFileSync(path.join(ROOT, f), "utf8");
/* A stub browser. speechSynthesis must EXIST with a working getVoices — app.js
   guards with `'speechSynthesis' in window`, so handing it the key with an
   undefined value passes the guard and then explodes on the first call. */
const speech = { getVoices: () => [], speak() {}, cancel() {}, onvoiceschanged: null };
const sandbox = {
  document: { querySelector: () => null, addEventListener: () => {} },
  location: { hash: "" },
  speechSynthesis: speech,
  localStorage: null,
  setTimeout: () => 0,
  // sync.js and kids.js register DOMContentLoaded handlers at top level; without
  // this the whole bundle refuses to run and every book assertion is skipped
  addEventListener: () => {},
  fetch: () => Promise.reject(new Error("no network in tests")),
  Audio: function () { return { play: () => Promise.resolve(), pause() {} }; },
  AudioContext: function () { return { createOscillator: () => ({ connect() {}, start() {}, stop() {}, frequency: {} }), createGain: () => ({ connect() {}, gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} } }), currentTime: 0, destination: {} }; },
};
sandbox.window = sandbox;

/* The scripts to load, READ OUT OF index.html rather than listed here.
   Listed by hand, this drifted immediately: a new book was added to the page
   and not to the test, so the shelf it was meant to fill still looked empty
   and every assertion still passed. The test must see exactly what the browser
   sees. */
const BOOK_FILES = [...src("index.html").matchAll(/<script src="([^"]+)"><\/script>/g)]
  .map(m => m[1])
  .filter(f => !/^(kids|print)\.js$/.test(f));   // those need a real DOM

let BOOKS, LEVELS, LICONS;
try {
  const fn = new Function("window", "document", "location", "speechSynthesis", "setTimeout", "fetch", "Audio",
    BOOK_FILES.map(src).join("\n") +
    "\nreturn { BOOKS, LEVELS, LICONS, ICONS };");
  const out = fn(sandbox, sandbox.document, sandbox.location, sandbox.speechSynthesis,
    sandbox.setTimeout, sandbox.fetch, sandbox.Audio);
  ({ BOOKS, LEVELS, LICONS } = out);
  sandbox.ICONS = out.ICONS;
  ok(`the ${BOOK_FILES.length} scripts index.html loads all parse and run together: ${BOOK_FILES.join(", ")}`);
} catch (e) {
  bad(`the book files do not run: ${e.message}`);
  console.log(`\n1 FAILED`); process.exit(1);
}

/* ---------- 1. shape ---------- */
yes(BOOKS.length >= 3, `at least three books on the shelf (got ${BOOKS.length})`);
/* The bottom rung must not be empty. A ladder whose first step has no book on
   it sends a brand-new reader straight into sukoon. */
yes(BOOKS.some(b => b.level === 1), "Level 1 has at least one book — a new reader has somewhere to start");
for (const b of BOOKS) {
  const t = b.pages.map(p => p.type);
  yes(t[0] === "cover", `${b.title}: opens on a cover`);
  yes(t.includes("words"), `${b.title}: has a word-practice page before the story`);
  yes(t[t.length - 1] === "end", `${b.title}: ends on an end page`);
  yes(b.pages.filter(p => p.type === "story").length >= 4, `${b.title}: has a real story (4+ pages)`);
  // every drawn page must actually draw
  for (const p of b.pages) {
    if (p.type === "words" || p.type === "game") continue;
    if (typeof p.svg !== "function") { bad(`${b.title}: a ${p.type} page has no picture`); continue; }
    let out = ""; try { out = p.svg(); } catch (e) { bad(`${b.title}: a ${p.type} picture threw — ${e.message}`); continue; }
    if (!out || out.length < 100) bad(`${b.title}: a ${p.type} picture came out empty`);
    if (/undefined/.test(out)) bad(`${b.title}: a ${p.type} picture contains "undefined" — a bad pose or colour name`);
  }
}
ok("every page of every book draws something, and nothing renders 'undefined'");

/* ---------- 2. every word card has a picture, and it is not broken ----------
   This originally checked only the STORY pages for "undefined" and skipped the
   words page entirely — so two icons written with `${C.teal}`, a palette key
   that does not exist, shipped as fill="undefined" and rendered as black
   blobs. Anything that ends up in front of a child gets checked. */
const PALETTE_KEYS = (src("app.js").match(/const C = \{[\s\S]*?\};/) || [""])[0];
for (const b of BOOKS) {
  b.words.forEach((w, i) => {
    const svg = String(w.icon || "");
    const img = svg.match(/<img[^>]+src="([^"]+)"/);
    if (img) {
      if (!fs.existsSync(path.join(ROOT, img[1])))
        bad(`${b.title}: word ${i + 1} (${w.ar}) points at ${img[1]}, which does not exist`);
      return;
    }
    if (!/^<svg/.test(svg)) {
      bad(`${b.title}: word ${i + 1} (${w.ar}) has no picture — rule 2, the picture carries the meaning`);
      return;
    }
    if (/undefined/.test(svg))
      bad(`${b.title}: word ${i + 1} (${w.ar}) renders "undefined" — almost always a colour key that is not in the palette`);
    if (/(fill|stroke)="(undefined|null|NaN)"/.test(svg))
      bad(`${b.title}: word ${i + 1} (${w.ar}) has a broken colour`);
  });
}
ok("every word card carries a real picture, with no broken colours");

/* the same check for the listening-game pictures, which are also on screen */
for (const b of BOOKS) {
  for (const r of b.game || []) {
    for (const k of r.opts || []) {
      const svg = String((sandbox.ICONS && sandbox.ICONS[k]) || (LICONS && LICONS[k]) || k);
      if (/undefined|NaN/.test(svg))
        bad(`${b.title}: game picture "${k}" renders undefined`);
    }
  }
}
ok("every listening-game picture renders cleanly");

/* ---------- 3. THE BAND RULES ---------- */
/* Applied to the story sentences — what the child is actually asked to read. */
const SUN = "ت ث د ذ ر ز س ش ص ض ط ظ ل ن".split(" ");
const SHADDA = "ّ";
const SUKOON = "ْ";

function sentencesOf(b) {
  return b.pages.filter(p => p.type === "story").map(p => p.ar.map(w => w.t).join(" "));
}
function wordsOf(b) { return sentencesOf(b).flatMap(s => s.split(/\s+/)).filter(Boolean); }

for (const b of BOOKS) {
  const words = wordsOf(b);
  const sents = sentencesOf(b);
  const lvl = b.level;

  /* sentence length */
  const max = { 1: 5, 2: 5, 3: 6, 4: 12, 5: 12 }[lvl] || 12;
  const longest = Math.max(...sents.map(s => s.split(/\s+/).length));
  yes(longest <= max, `${b.title} (L${lvl}): longest sentence is ${longest} words, band allows ${max}`);

  /* shadda: not before level 3 */
  if (lvl < 3) {
    const withShadda = words.filter(w => w.includes(SHADDA));
    yes(withShadda.length === 0,
      `${b.title} (L${lvl}): no shadda${withShadda.length ? " — found " + withShadda.join(", ") : ""}`);
  }

  /* sun-letter اَلْ: not before level 4. اَلْ + sun letter shows as ال + shadda
     on the next letter, so detect the pattern rather than trusting the eye. */
  if (lvl < 4) {
    const sunAl = words.filter(w => {
      const i = w.indexOf("ال");
      if (i === -1) return false;
      const after = w.slice(i + 2).replace(/[ً-ِْٰ]/g, "")[0];
      return after && SUN.includes(after);
    });
    yes(sunAl.length === 0,
      `${b.title} (L${lvl}): no sun-letter اَلْ${sunAl.length ? " — found " + sunAl.join(", ") : ""}`);
  }

  /* sukoon: level 1 is harakat and long vowels only */
  if (lvl < 2) {
    const withSukoon = words.filter(w => w.includes(SUKOON));
    yes(withSukoon.length === 0,
      `${b.title} (L${lvl}): no sukoon yet${withSukoon.length ? " — found " + withSukoon.join(", ") : ""}`);
  }

  /* and the band must actually USE its DEFINING skill, or it is mislabelled */
  if (lvl === 2) {
    yes(words.some(w => w.includes(SUKOON)), `${b.title} (L2): actually uses sukoon — the band earns its name`);
  }
}

/* The joining words فِي / مِنْ / وَ are something Level 2 INTRODUCES, not
   something every Level 2 book must contain — «أَيْنَ الْقَمَر؟» is a perfectly
   good sukoon book without them. So this is checked across the band's shelf
   rather than book by book: a child working through Level 2 must meet them. */
{
  const l2 = BOOKS.filter(b => b.level === 2);
  const meets = l2.some(b => wordsOf(b).some(w => /^(فِي|وَ|مِنْ)/.test(w)));
  yes(!l2.length || meets, "the Level 2 shelf does teach the joining words فِي / وَ / مِنْ somewhere");
}

/* ---------- 4. every sentence is fully vowelled ---------- */
/* A child at these bands cannot supply a missing haraka. */
for (const b of BOOKS) {
  for (const w of wordsOf(b)) {
    /* Only some letters CAN carry a mark. Count the ones that must:
         – drop ا و ي when they are acting as long vowels (they carry none),
         – drop the final letter, which is unmarked in pausal reading,
         – drop the definite article's ا, which is hamzat wasl.
       Counting raw letters instead flags الْكِتَاب — correctly vowelled with
       three marks over six letters — as under-vowelled. */
    const bare = w.replace(/[^ء-ي]/g, "");
    const marks = (w.match(/[ً-ْٰ]/g) || []).length;
    const chars = bare.split("");
    const needMark = chars.filter((c, i) => {
      if (i === chars.length - 1) return false;            // pausal ending
      if ("اوي".includes(c) && i > 0) return false;         // long vowel
      if (c === "ا" && i === 0) return false;               // article / wasl
      return true;
    }).length;
    if (needMark >= 2 && marks < needMark - 1)
      bad(`${b.title}: "${w}" looks under-vowelled (${marks} marks for ${needMark} letters that need one)`);
  }
}
ok("every story word carries its harakat");

/* ---------- 5. the game is playable ---------- */
for (const b of BOOKS) {
  if (!b.game || !b.game.length) { bad(`${b.title}: no listening game`); continue; }
  b.game.forEach((r, i) => {
    if (!r.opts || r.opts.length < 2) bad(`${b.title} game ${i + 1}: needs at least two pictures`);
    if (r.ans == null || r.ans < 0 || r.ans >= r.opts.length) bad(`${b.title} game ${i + 1}: answer index out of range`);
    if (new Set(r.opts).size !== r.opts.length) bad(`${b.title} game ${i + 1}: the same picture appears twice — unwinnable`);
    // the pictures must all resolve, in either kit
    const missing = r.opts.filter(k => !(k in (LICONS || {})) && !/^<svg/.test(String(k)) && !ICONSHAS(k));
    if (missing.length) bad(`${b.title} game ${i + 1}: no picture for ${missing.join(", ")}`);
  });
}
function ICONSHAS(k) { try { return !!sandbox.ICONS && k in sandbox.ICONS; } catch (e) { return false; } }
ok("every listening game has a findable, unambiguous answer");

/* ---------- 6. the service worker ---------- */
const swSrc = src("sw.js");
let swOk = true, swErr = "";
try { new Function(swSrc); } catch (e) { swOk = false; swErr = e.message; }
yes(swOk, swOk ? "sw.js parses" : `sw.js DOES NOT PARSE — ${swErr}`);
{
  const m = swSrc.match(/const CORE = \[([\s\S]*?)\];/);
  yes(!!m, "sw.js declares a CORE list");
  if (m) {
    const files = (m[1].match(/'([^']+)'/g) || []).map(s => s.slice(1, -1)).filter(f => f !== "./");
    const missing = files.filter(f => !fs.existsSync(path.join(ROOT, f)));
    yes(!missing.length, missing.length
      ? `${missing.length} CORE file(s) do not exist — cache.addAll rejects the WHOLE install: ${missing.join(", ")}`
      : `all ${files.length} cached files exist`);
    // and every script the page loads must be cached, or offline breaks silently
    const html = src("index.html");
    const needed = [...html.matchAll(/<script src="([^"]+)"/g)].map(x => x[1])
      .concat([...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(x => x[1]));
    const uncached = needed.filter(n => !files.includes(n));
    yes(!uncached.length, uncached.length
      ? `these are loaded by index.html but NOT cached, so offline would break: ${uncached.join(", ")}`
      : "every script and stylesheet the page loads is in the offline cache");
  }
}

/* ---------- 7. no writing anywhere (DESIGN.md rule 3) ---------- */
{
  /* Check what a child is actually SHOWN, not what the source says about
     itself — print.js explains at length that these are deliberately not
     worksheets, and that sentence is not an instruction to write. */
  const stripComments = s => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const all = ["index.html", "kids.js", "print.js", "app.js"].map(f => stripComments(src(f))).join("\n");
  const banned = /trace the|worksheet|handwriting|write the letter|copy the letter|join the dots/i;
  const hit = all.match(banned);
  yes(!hit, hit ? `something asks the child to write ("${hit[0]}") — rule 3 says no writing` : "nothing shown to a child asks them to write");
}

console.log(fails ? `\n${fails} FAILED` : "\nALL TESTS PASS");
process.exit(fails ? 1 : 0);
