/* test-path.js — data/path.json only references content that exists, and the
   stations obey the ladder AND the path's own rules (PATH.md §4):
     · a station's sentences are heard in a story before they are drilled
     · no two steps of the same kind in a row (rotate)
     · a vocab stop is at most four words
   No network, no DOM. Reads the content modules the way the other suites do
   and the book / video ids straight out of the source files. */
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

const P = JSON.parse(read('data/path.json'));
const { SENTENCE_SETS } = require(path.join(root, 'sentences.js'));
const { TEXT_STORIES } = require(path.join(root, 'stories-text.js'));
const { VOCAB_WORDS } = require(path.join(root, 'vocab.js'));
const SUR = JSON.parse(read('data/surahs.json'));
const QAIDA = JSON.parse(read('data/qaida.json'));

const sets = new Map(SENTENCE_SETS.map(s => [s.id, s]));
const stories = new Map(TEXT_STORIES.map(s => [s.id, s]));
const words = new Set(VOCAB_WORDS.map(w => w.id));
const ayat = new Map();
for (const s of SUR.surahs) for (const a of s.ayat) ayat.set(a.ref, a);
const stages = new Set(QAIDA.stages.map(s => s.id));

const ids = (file, re) => Array.from(read(file).matchAll(re), m => m[1]);
const books = new Set(['app.js', 'book-lulu1.js', 'book-bayt.js', 'books-more.js']
  .flatMap(f => ids(f, /^\s{2}id:\s*'([a-z0-9-]+)'/gm)));
const videos = new Set(ids('videos.js', /\bid:\s*'([A-Za-z0-9_-]{11})'/g));

let fails = 0;
const fail = (m) => { fails++; console.log('  ✗ ' + m); };

/* a ref resolves to {ar, level} */
function anchor(ref) {
  const [kind, rest] = ref.split(':');
  const [id, i] = (rest || '').split('/');
  if (kind === 'lesson') {
    const s = sets.get(id); const L = s && s.lessons[+i];
    return L ? { ar: L.ar, level: s.level } : null;
  }
  if (kind === 'line') {
    const s = stories.get(id); const L = s && s.lines[+i];
    return L ? { ar: L.ar, level: s.level } : null;
  }
  return null;
}

function stepOk(st) {
  switch (st.type) {
    case 'sentences': return sets.has(st.ref);
    case 'lesson': { const [id, i] = st.ref.split('/'); const s = sets.get(id); return !!(s && s.lessons[+i]); }
    case 'story': return stories.has(st.ref);
    case 'book': return books.has(st.ref);
    case 'video': return videos.has(st.ref);
    case 'ayah': return ayat.has(st.ref);
    case 'qaida': return stages.has(st.ref);
    case 'play': return !!anchor(st.ref);
    case 'vocab': { const w = st.ref.split(','); return w.length >= 1 && w.length <= 4 && w.every(x => words.has(x)); }
    default: return false;
  }
}

function stepLevel(st) {
  if (st.type === 'sentences') return sets.get(st.ref).level;
  if (st.type === 'lesson') return sets.get(st.ref.split('/')[0]).level;
  if (st.type === 'story') return stories.get(st.ref).level;
  if (st.type === 'play') return anchor(st.ref).level;
  return null; /* books carry their level in JS objects; videos, ayat and qaida have none */
}

const STORY = new Set(['story', 'book']);
const DRILL = new Set(['sentences', 'lesson']);

console.log('path v' + P.version + ': ' + P.stations.length + ' stations');
let prev = 0;
const seen = new Map();
const seenIds = new Set();
for (const s of P.stations) {
  if (seenIds.has(s.id)) fail(s.id + ': duplicate station id');
  seenIds.add(s.id);
  if (!(s.level >= 1 && s.level <= 5)) fail(s.id + ': level must be 1..5');
  if (s.level < prev) fail(s.id + ': level ' + s.level + ' is below the station before it (' + prev + ')');
  prev = s.level;
  if (!s.title || !s.titleEn) fail(s.id + ': needs title and titleEn');
  if (!Array.isArray(s.anchors) || !s.anchors.length) fail(s.id + ': no anchors');
  if ((s.anchors || []).length > 4) fail(s.id + ': ' + s.anchors.length + ' anchors — a station carries at most four sentences');
  if (!Array.isArray(s.quran) || !s.quran.length) fail(s.id + ': no quran refs — every station braids both tracks');
  if (!Array.isArray(s.steps) || !s.steps.length) fail(s.id + ': no steps');

  for (const a of s.anchors || []) {
    const r = anchor(a);
    if (!r) { fail(s.id + ': anchor ' + a + ' does not resolve'); continue; }
    if (r.level > s.level) fail(s.id + ': anchor ' + a + ' is L' + r.level + ' inside an L' + s.level + ' station');
    /* trap 6: the article's lam carries a sukoon, and Level 1 forbids sukoon */
    if (s.level === 1 && /(^|\s|وَ)ا[َ]?ل[ْ]/.test(r.ar.normalize('NFC'))) fail(s.id + ': L1 anchor carries اَلْ: ' + r.ar);
  }
  for (const q of s.quran || []) if (!ayat.has(q)) fail(s.id + ': ayah ' + q + ' not in data/surahs.json');

  let heardStory = false, lastType = null;
  for (const st of s.steps || []) {
    if (!stepOk(st)) { fail(s.id + ': step ' + st.type + ':' + st.ref + ' does not resolve'); lastType = st.type; continue; }
    const key = st.type + ':' + st.ref;
    if (seen.has(key)) fail(s.id + ': step ' + key + ' already used in ' + seen.get(key));
    seen.set(key, s.id);
    const lv = stepLevel(st);
    if (lv !== null && lv > s.level) fail(s.id + ': step ' + key + ' is L' + lv + ' inside an L' + s.level + ' station');
    if (STORY.has(st.type)) heardStory = true;
    if (DRILL.has(st.type) && !heardStory) fail(s.id + ': ' + key + ' drills sentences before any story has been heard — a sentence is met in a story first');
    if (st.type === lastType) fail(s.id + ': two ' + st.type + ' steps in a row (' + key + ') — rotate');
    lastType = st.type;
  }
  if (!(s.steps || []).length || !STORY.has(s.steps[0].type)) fail(s.id + ': the first step must be a story or a book');
  const kinds = new Set((s.steps || []).map(x => x.type));
  if (!kinds.has('sentences') && !kinds.has('lesson') && !kinds.has('play')) fail(s.id + ': no sentence work at all');
}

/* every ayah on the path exactly once */
const allQ = P.stations.flatMap(s => s.quran);
const dup = allQ.filter((q, i) => allQ.indexOf(q) !== i);
if (dup.length) fail('ayat listed twice: ' + dup.join(' '));
console.log('  quran track covers ' + allQ.length + ' of ' + ayat.size + ' ayat');
console.log('  anchors: ' + P.stations.reduce((n, s) => n + s.anchors.length, 0)
  + ' · steps: ' + P.stations.reduce((n, s) => n + s.steps.length, 0));

if (fails) { console.log('test-path: ' + fails + ' problem(s)'); process.exit(1); }
console.log('test-path: OK');
