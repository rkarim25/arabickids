/* ————— Hikayat · the voice ————————————————————————————————————————————————
   Rule 1 is EAR FIRST, so this file matters more than any other. It was the
   weakest part of the site and Reza caught it: "the sounds also arent
   consistent, sometimes it tapers off."

   He was right, and the cause is not fixable by tuning: the browser's
   speechSynthesis truncates long words, changes voice and speed between
   devices, needs its voice list to have loaded before the first call, and on
   several Androids simply refuses to speak a lone Arabic letter. The parent
   site hit exactly this and solved it the same way — scripts/gen-audio.py
   renders every string the site can ever say to an mp3, once, and this plays
   the file.

   speechSynthesis stays, but only as a fallback for a clip that is missing.
   ========================================================================= */
'use strict';

let MANIFEST = null;
let manifestP = null;

function loadManifest() {
  if (!manifestP) {
    manifestP = fetch('data/audio-manifest.json')
      .then(r => r.json())
      .then(m => (MANIFEST = m))
      .catch(() => (MANIFEST = {}));       // offline first-run: fall back, don't break
  }
  return manifestP;
}
loadManifest();

/* MUST match norm() in scripts/gen-audio.py. If these two drift, every clip
   still exists and none of them can be found — which is worse than having no
   audio at all, because it fails silently. */
const TASHKEEL = /[ً-ْٰـ]/g;
function normAr(s) {
  return String(s || '')
    .replace(TASHKEEL, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[؟،؛.!?]/g, '')
    .replace(/[^؀-ۿ\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/* One <audio> element, reused. Creating a new one per tap leaves a trail of
   half-loaded objects on a tablet and makes the next tap late. */
let EL = null;
function el() {
  if (!EL) { EL = new Audio(); EL.preload = 'auto'; }
  return EL;
}

let VOICE = null;
function pickVoice() {
  const vs = (window.speechSynthesis ? speechSynthesis.getVoices() : []) || [];
  const ar = vs.filter(v => v.lang && v.lang.toLowerCase().startsWith('ar'));
  VOICE = ar.find(v => /natural|online|neural/i.test(v.name)) || ar[0] || null;
}
if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

function fallback(text, rate) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(String(text).replace(/[؟?!،.]/g, ''));
  u.lang = 'ar-SA';
  if (VOICE) u.voice = VOICE;
  u.rate = 0.7 * (rate || 1);
  speechSynthesis.speak(u);
}

/* Play by manifest KEY, falling back to speaking `text` aloud.

   `rate` is a real playback rate, not a second recording. "Again, slowly" used
   to call this with the same key and no rate, so it played the identical file
   and slow sounded exactly like normal — Reza: "slowly and normal speed seems
   same". Slowing the element is better than rendering a second clip anyway: no
   extra megabytes, and preservesPitch keeps the voice from dropping into a
   growl, which would teach the wrong vowel colour. */
/* A PARENT'S RECORDING WINS. record.js loads whatever has been recorded on
   this device into window.RECORDINGS — a Map of the same manifest key to an
   object URL — and it is consulted first, here, in the one place every Arabic
   sound on the site already goes through. Nothing else had to change.

   It is deliberately a plain global read and not an import: audio.js is the
   first script on the page and must keep working with record.js absent, which
   is exactly what happens on a device where nothing has been recorded. */
function recordedURL(key) {
  const R = window.RECORDINGS;
  return (R && R.get) ? R.get(key) : null;
}

function playKey(key, text, rate) {
  const mine = recordedURL(key);
  if (mine) {
    const a = el();
    try { a.pause(); } catch (e) {}
    if (window.speechSynthesis) speechSynthesis.cancel();
    a.src = mine;
    a.currentTime = 0;
    a.preservesPitch = a.mozPreservesPitch = a.webkitPreservesPitch = true;
    a.playbackRate = rate || 1;
    const p = a.play();
    /* if the blob URL has gone stale, fall through to the generated clip
       rather than leaving the child with silence */
    if (p && p.catch) p.catch(() => playKeyRaw(key, text, rate));
    return;
  }
  playKeyRaw(key, text, rate);
}

/* The generated clip, ignoring any recording. The booth uses this for its
   "hear what it replaces" button; everything else should call playKey. */
function playKeyRaw(key, text, rate) {
  const go = () => {
    const stem = MANIFEST && MANIFEST[key];
    if (!stem) return fallback(text != null ? text : key, rate);
    const a = el();
    try { a.pause(); } catch (e) {}
    if (window.speechSynthesis) speechSynthesis.cancel();
    a.src = 'audio/' + stem + '.mp3';
    a.currentTime = 0;
    a.preservesPitch = a.mozPreservesPitch = a.webkitPreservesPitch = true;
    a.playbackRate = rate || 1;
    const p = a.play();
    if (p && p.catch) p.catch(() => fallback(text != null ? text : key, rate));
  };
  if (MANIFEST) go(); else loadManifest().then(go);
}

/* THE public API — everything the pages call.
   say()          any Arabic string (a word, a whole sentence)
   sayLetter()    the SOUND the letter makes: فَ, held for the ones you can hold.
                  This is what a pre-reader needs, and what Reza asked for —
                  "it makes the noise fff" — so the big glyph plays this, not
                  the letter's name.
   sayLetterName() what the letter is CALLED: فَاء */
const SLOW = 0.62;      // slow enough to hear each vowel, not so slow it slurs
function say(text) { playKey(normAr(text), text); }
/* the same clip, genuinely slower — for "again, slowly" and for a tapped word */
function saySlow(text) { playKey(normAr(text), text, SLOW); }

/* English, spoken. The site has to be listenable end to end — a child of four
   cannot read the meaning line, so it is read TO them. Falls back to the
   browser's English voice if a clip is missing. */
function normEn(s) { return String(s || '').replace(/\s+/g, ' ').trim().toLowerCase(); }
function sayEn(text) {
  const key = 'en:' + normEn(text);
  const go = () => {
    const stem = MANIFEST && MANIFEST[key];
    if (stem) {
      const a = el();
      try { a.pause(); } catch (e) {}
      a.src = 'audio/' + stem + '.mp3';
      a.currentTime = 0;
      const p = a.play();
      if (p && p.catch) p.catch(() => speakEn(text));
    } else speakEn(text);
  };
  if (MANIFEST) go(); else loadManifest().then(go);
}
function speakEn(text) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(String(text));
  u.lang = 'en-GB'; u.rate = 0.9;
  speechSynthesis.speak(u);
}
function sayLetter(l, rate) { playKey('snd:' + l, l, rate); }
function sayLetterSlow(l) { playKey('snd:' + l, l, SLOW); }
function sayLetterName(l, name) { playKey('nam:' + l, name || l); }

/* ————— HOW you listen ——————————————————————————————————————————————————
   Reza, 2026-08-31, two reports in a row: "listen to whole sura, repeats every
   ayat twice" and "have option of listening to arabic only or english only."

   Both are the same underlying mistake — the read-through modes had ONE shape
   baked into them, chosen by whoever wrote them, and no way out. Repeating
   every ayah twice was a real decision ("twice is what makes it stick") and it
   is genuinely right for memorising; it is wrong when you already know the
   surah and want to hear it through. Same with the English: a child who is
   getting it does not need the meaning after every single line, and a child
   who is lost needs nothing else.

   So it is a setting, it lives here because both the surah reader and the
   story reader need it, and it is remembered. Default stays BOTH and ONCE:
   both, because rule 2 says the meaning has to reach a child who cannot read
   it; once, because that is what he asked for and repeating is now one tap.  */
const LISTEN_KEY = 'hk:listen', REPEAT_KEY = 'hk:repeat';
const LISTEN_ORDER = ['both', 'ar', 'en'];
const LISTEN_LABEL = {
  both: { ar: 'عَرَبِيّ + English', en: 'Arabic, then the meaning' },
  ar:   { ar: 'عَرَبِيّ فَقَط',      en: 'Arabic only' },
  en:   { ar: 'English only',    en: 'The meaning only' },
};
function listenMode() {
  try { const v = localStorage.getItem(LISTEN_KEY); return LISTEN_ORDER.includes(v) ? v : 'both'; }
  catch (e) { return 'both'; }
}
function cycleListen() {
  const next = LISTEN_ORDER[(LISTEN_ORDER.indexOf(listenMode()) + 1) % LISTEN_ORDER.length];
  try { localStorage.setItem(LISTEN_KEY, next); } catch (e) {}
  return next;
}
const sayArabicToo = () => listenMode() !== 'en';
const sayEnglishToo = () => listenMode() !== 'ar';
/* how many times a line is read before moving on: 1 or 2 */
function repeatCount() {
  try { return localStorage.getItem(REPEAT_KEY) === '2' ? 2 : 1; } catch (e) { return 1; }
}
function cycleRepeat() {
  const next = repeatCount() === 1 ? 2 : 1;
  try { localStorage.setItem(REPEAT_KEY, String(next)); } catch (e) {}
  return next;
}

/* Play a file by PATH. The surah module needs this: its audio is a real
   reciter stored under audio/quran/, addressed by filename, and it must never
   fall back to synthesis — a TTS ayah would teach wrong madd and wrong waqf,
   which is worse than silence. So there is no fallback here on purpose. */
function playFile(src, rate) {
  const a = el();
  try { a.pause(); } catch (e) {}
  if (window.speechSynthesis) speechSynthesis.cancel();
  a.src = src;
  a.currentTime = 0;
  a.preservesPitch = a.mozPreservesPitch = a.webkitPreservesPitch = true;
  a.playbackRate = rate || 1;
  const p = a.play();
  if (p && p.catch) p.catch(() => {});
}

/* Warm the clip a tap is about to need, so the first sound is not late. */
function preload(text) {
  const stem = MANIFEST && MANIFEST[normAr(text)];
  if (stem) { const a = new Audio(); a.preload = 'auto'; a.src = 'audio/' + stem + '.mp3'; }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normAr };
}
