/* Rewrite the ASSETS list in sw.js from what is actually on disk.
   cache.addAll() rejects the WHOLE install if one URL 404s, so a hand-kept
   list of 200 clips is a guaranteed outage. Run after gen-audio.py. */
const fs = require("fs"), path = require("path");
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
const p = path.join(ROOT, "sw.js");
const block = `\n/* generated: every picture and every clip, so the whole site works on a plane.\n   Re-run scripts/gen-audio.py then scripts/sync-sw.js after adding content. */\nconst ASSETS = [\n${assets.map(f => `  '${f}',\n`).join("")}];\n`;
const src = fs.readFileSync(p, "utf8");
fs.writeFileSync(p, src.replace(/\n\/\* generated[\s\S]*?const ASSETS = \[[\s\S]*?\];\n/, block));
console.log(`sw.js now caches ${assets.length} assets`);
