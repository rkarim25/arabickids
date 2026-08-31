/* Rewrite the ASSETS list in sw.js from what is actually on disk.
   cache.addAll() rejects the WHOLE install if one URL 404s, so a hand-kept
   list of 200 clips is a guaranteed outage. Run after gen-audio.py. */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const list = d => fs.existsSync(path.join(ROOT, d))
  ? fs.readdirSync(path.join(ROOT, d)).filter(f => !f.startsWith(".")).sort().map(f => d + "/" + f)
  : [];
const assets = [...list("pic"), ...list("audio")];
const p = path.join(ROOT, "sw.js");
const block = `\n/* generated: every picture and every clip, so the whole site works on a plane.\n   Re-run scripts/gen-audio.py then scripts/sync-sw.js after adding content. */\nconst ASSETS = [\n${assets.map(f => `  '${f}',\n`).join("")}];\n`;
const src = fs.readFileSync(p, "utf8");
fs.writeFileSync(p, src.replace(/\n\/\* generated[\s\S]*?const ASSETS = \[[\s\S]*?\];\n/, block));
console.log(`sw.js now caches ${assets.length} assets`);
