/* Rewrite the ASSETS list in sw.js from what is actually on disk.
   cache.addAll() rejects the WHOLE install if one URL 404s, so a hand-kept
   list of 200 clips is a guaranteed outage. Run after gen-audio.py. */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..");
/* FILES only. readdirSync also returns sub-directories, and "audio/quran" went
   into the cache list as if it were a file — cache.addAll would have 404'd on
   it and aborted the entire install, killing offline for the whole site. */
const list = d => fs.existsSync(path.join(ROOT, d))
  ? fs.readdirSync(path.join(ROOT, d))
      .filter(f => !f.startsWith(".") && fs.statSync(path.join(ROOT, d, f)).isFile())
      .sort().map(f => d + "/" + f)
  : [];
/* The recitation in audio/quran/ is ~18MB. Putting it in cache.addAll would
   make the very first install download all of it before the site works at all,
   and one failure aborts the whole install. It is cached at RUNTIME instead —
   the fetch handler stores every clip the moment it is played — so a surah the
   child has listened to once is available on a plane, and one they have never
   opened costs nothing. */
const assets = [...list("pic"), ...list("audio").filter(f => !f.startsWith("audio/quran/"))];

/* the shipped code and data — what the cache name is hashed from */
const CORE_FILES = (fs.readFileSync(path.join(ROOT, "sw.js"), "utf8")
  .match(/const CORE = \[([\s\S]*?)\];/) || ["", ""])[1]
  .match(/'([^']+)'/g)?.map(x => x.slice(1, -1)).filter(f => f !== "./") || [];
const p = path.join(ROOT, "sw.js");
const block = `\n/* generated: every picture and every clip, so the whole site works on a plane.\n   Re-run scripts/gen-audio.py then scripts/sync-sw.js after adding content. */\nconst ASSETS = [\n${assets.map(f => `  '${f}',\n`).join("")}];\n`;
let src = fs.readFileSync(p, "utf8");
src = src.replace(/\n\/\* generated[\s\S]*?const ASSETS = \[[\s\S]*?\];\n/, block);

/* STAMP A NEW CACHE NAME WHENEVER THE SHIPPED CODE CHANGES.

   VERSION used to be the constant 'hikayat-v1'. The activate handler deletes
   caches whose name differs from VERSION — so with a name that never changed,
   nothing was ever evicted and a device could keep serving the previous build.
   Reza hit exactly this: a fix was live on the server and his screen still
   showed the old one, which is indistinguishable from the fix not working.

   The name now carries a hash of what the site is made of, so any edit to any
   shipped file produces a new cache and the stale one is dropped on activate. */
const stamp = crypto.createHash("sha1").update(
  CORE_FILES.map(f => {
    const fp = path.join(ROOT, f);
    return f + ":" + (fs.existsSync(fp) ? fs.readFileSync(fp).length : 0);
  }).join("|") + "|" + assets.length
).digest("hex").slice(0, 10);
src = src.replace(/const VERSION = '[^']*';/, "const VERSION = 'hikayat-" + stamp + "';");

fs.writeFileSync(p, src);

/* STAMP THE SCRIPT AND STYLE URLS TOO.

   The cache NAME alone was not enough. GitHub Pages serves assets with
   Cache-Control: max-age=600, and the service worker's network-first fetch
   still goes through the browser's own HTTP cache — so for ten minutes after a
   deploy the browser hands back the previous sync.js and the page runs old
   code no matter what the worker does. That is what made a shipped fix look
   broken twice in a row.

   The grown-up site solved this years ago with scripts/bump-version.js. Same
   trick here: every script and stylesheet URL carries ?v=<hash>, so a new
   build is a new URL and there is nothing stale to serve. */
const idx = path.join(ROOT, "index.html");
let html = fs.readFileSync(idx, "utf8");
html = html.replace(/(<script src="|<link rel="stylesheet" href="|<link rel="manifest" href=")([^"?]+)(\?v=[^"]*)?"/g,
  (m, pre, file) => `${pre}${file}?v=${stamp}"`);
fs.writeFileSync(idx, html);

const stamped = (html.match(/\?v=/g) || []).length;
console.log(`sw.js caches ${assets.length} assets · cache hikayat-${stamp} · ${stamped} urls stamped`);
