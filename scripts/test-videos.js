/* Tests for the video strip.

   A test cannot reach YouTube, so this does NOT check that a video still
   exists — that stays a manual check, and HANDOVER.md §7 says so. What it CAN
   check is every property that makes the strip safe, and those are exactly the
   ones that would rot silently in a refactor:

     · nothing is embedded until somebody taps. If an <iframe> ever appears in
       the strip's own markup, every child who opens الأَصْوَات starts talking to
       Google without being asked, and the page would look completely normal.
     · the embed host is youtube-nocookie.com, not youtube.com.
     · autoplay is never in the URL. On an ear-first site a second voice
       starting by itself is the worst possible failure.
     · one player, not one per card.

   Run: node scripts/test-videos.js
   ========================================================================= */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const src = f => fs.readFileSync(path.join(ROOT, f), "utf8");

let fails = 0;
const ok = m => console.log("  ✓ " + m);
const bad = m => { console.log("  ✗ " + m); fails++; };
const yes = (c, m) => (c ? ok(m) : bad(m));

const V = src("videos.js");

/* ---------- 1. the data ---------- */
const { VIDEOS } = require(path.join(ROOT, "videos.js"));
const topics = Object.keys(VIDEOS);
yes(topics.length >= 2, `at least two topics (got ${topics.join(", ")})`);

let before = fails;
const seen = new Map();
for (const t of topics) {
  const set = VIDEOS[t];
  if (!set.title || !set.titleEn) bad(`${t}: needs an Arabic and an English title`);
  if (!set.note) bad(`${t}: needs a note saying what it is for`);
  if (!set.items || !set.items.length) bad(`${t}: has no videos`);
  for (const v of set.items || []) {
    /* 11 characters of [A-Za-z0-9_-] is the YouTube id format. A typo here is
       a grey box on a child's screen and nothing in the console. */
    if (!/^[A-Za-z0-9_-]{11}$/.test(v.id || "")) bad(`${t}: "${v.ar}" has an id that is not a YouTube id: ${v.id}`);
    if (!v.ar || !v.en) bad(`${t}: ${v.id} needs an Arabic and an English label`);
    if (!v.emoji) bad(`${t}: ${v.id} needs a picture — rule 2, a child picks by picture`);
    /* channel and title are what make a dead video identifiable later */
    if (!v.channel) bad(`${t}: ${v.id} does not say whose channel it is`);
    if (!v.title) bad(`${t}: ${v.id} does not record its real title, so a dead link would be unidentifiable`);
    if (seen.has(v.id) && seen.get(v.id) !== v.ar)
      bad(`${v.id} appears twice with different labels ("${seen.get(v.id)}" and "${v.ar}")`);
    seen.set(v.id, v.ar);
  }
}
yes(fails === before, `every video carries an id, a picture, both labels, its channel and its real title (${seen.size} videos)`);

/* ---------- 2. nothing plays until asked ---------- */
const stripFn = V.slice(V.indexOf("function videoStrip"), V.indexOf("function openVideo"));
yes(!/<iframe/i.test(stripFn),
  "the strip itself contains no <iframe> — nothing is embedded until a tap");
yes(/hidden/.test(stripFn) && /vsPlayer/.test(stripFn),
  "the player starts hidden and empty");

/* ---------- 3. the embed itself ---------- */
yes(/youtube-nocookie\.com/.test(V), "embeds go to youtube-nocookie.com");
yes(!/\bsrc\s*=\s*['\"]https:\/\/www\.youtube\.com\/embed/.test(V),
  "nothing embeds from plain youtube.com");
yes(!/autoplay\s*=\s*1/.test(V), "autoplay is never switched on");
yes(/rel=0/.test(V), "rel=0 — related videos are held to the same channel");
yes(/playsinline=1/.test(V), "playsinline — a tap does not throw a phone into fullscreen");
yes(/modestbranding=1/.test(V), "modestbranding");

/* ---------- 4. one player, and closing it really stops it ---------- */
yes((V.match(/<iframe/gi) || []).length === 1, "there is exactly one iframe in the whole file");
const closeFn = V.slice(V.indexOf("function closeVideo"));
yes(/innerHTML\s*=\s*''/.test(closeFn),
  "closing REMOVES the iframe rather than hiding it — hiding does not stop the sound");

/* ---------- 5. it is not a sixth door (DESIGN.md §2) ---------- */
const idx = src("index.html");
yes(!/📺/.test(idx), "no 📺 tile on the home screen — five doors is still the ceiling");
yes(/videoStrip\(/.test(src("kids.js")), "the strip is attached to الأَصْوَات");
yes(/videoStrip\(/.test(src("qaida-ui.js")), "the strip is attached to القَاعِدَة");

/* ---------- 6. offline ---------- */
yes(/navigator\.onLine/.test(V),
  "the strip checks for a connection — video is the one thing here that needs one");
yes(/'videos\.js'/.test(src("sw.js")),
  "videos.js is in the offline cache, so the strip itself works offline even when a video cannot");

console.log(fails ? `\n${fails} FAILED` : "\nALL TESTS PASS");
process.exit(fails ? 1 : 0);
