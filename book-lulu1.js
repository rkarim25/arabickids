/* ————— «لُولُو صَغِيرَة» — Level 1 (Pink وَرْدِيّ) ————————————————————————————
   Lulu is small.

   WHY THIS BOOK EXISTS. When scripts/test-books.js was first run against the
   shelf on 2026-08-31 it failed both of the original books: «أَيْنَ الْقَمَر؟»
   and «أَيْنَ لُولُو؟» were both labelled Level 1, and neither one obeys Level
   1. The first is full of sukoon (لَيْل، أَيْنَ، نَجْم، طَيْر); the second adds
   shadda AND sun-letter اَلْ (السَّرِير، الصُّنْدُوق). Level 1 promises a parent
   "harakat and long vowels only — the early Qaida pages". That promise was not
   being kept, and nobody could see it, because the pages look lovely.

   Both were re-banded to where they actually sit. That left the bottom rung
   empty, so this book fills it properly: EVERY word is harakat plus a long
   vowel, there is not one sukoon, not one shadda and not a single اَلْ in the
   whole book. A child who has just met فَتْحَة، كَسْرَة، ضَمَّة and مَدّ can
   read every page of it alone.

   Two words a sentence. That is the point, not a shortcut.
   ========================================================================= */
'use strict';

/* ---------- pictures ---------- */

function l1Room(extra = '') {
  return `${room({ wall: '#FDF1DE', win: 620, rug: [400, 404] })}${extra}`;
}

function l1Cover() {
  return artScene('lulu1-cover.jpg', 'Lulu the cat sitting happily in the living room');
}
function l1a() {   // هَذَا أَدَم.
  return artScene('lulu1-1.jpg', 'Adam standing cheerfully in the living room');
}
function l1b() {   // هَذَا بَابَا.
  return artScene('lulu1-2.jpg', 'Baba sitting smiling on the couch');
}
function l1c() {   // هَذِهِ لُولُو.
  return artScene('lulu1-3.jpg', 'Lulu sitting upright and proud');
}
function l1d() {   // لُولُو صَغِيرَة.
  return artScene('lulu1-4.jpg', 'Tiny Lulu next to the big couch and Baba');
}
function l1e() {   // بَابَا كَبِير!
  return artScene('lulu1-5.jpg', 'Baba standing tall with tiny Lulu looking up');
}
function l1f() {   // لُولُو جَمِيلَة!
  return artScene('lulu1-6.jpg', 'Lulu looking sweet and lovely');
}
function l1End() {
  return artScene('lulu1-end.jpg', 'Lulu the cat at home');
}

/* ---------- small word-card pictures ---------- */
const L1I = {
  hadha:  icon(`<circle cx="50" cy="30" r="14" fill="#E15554"/>
    <rect x="44" y="52" width="12" height="30" rx="6" fill="${C.skin}"/>
    <circle cx="50" cy="88" r="13" fill="${C.skin}"/>
    <path d="M 36,80 q -6,-6 -2,-12" stroke="${C.skin}" stroke-width="8" fill="none" stroke-linecap="round"/>`),
  adam:   icon(`<circle cx="50" cy="52" r="30" fill="${C.skin}"/>
    <path d="M20 48 a30 30 0 0 1 60 0 q -30,-17 -60,0 Z" fill="${C.hair}"/>
    <circle cx="39" cy="52" r="4.4" fill="#332A20"/><circle cx="61" cy="52" r="4.4" fill="#332A20"/>
    <path d="M40 66 q 10,9 20,0" stroke="#332A20" stroke-width="4" fill="none" stroke-linecap="round"/>`),
  baba:   icon(`<circle cx="50" cy="46" r="26" fill="${C.skin}"/>
    <path d="M26 44 a24 24 0 0 1 48 0 q -24,-14 -48,0 Z" fill="${C.beard}"/>
    <path d="M28 52 q 22,34 44,0 q -6,32 -22,32 t -22,-32 Z" fill="${C.beard}"/>
    <circle cx="41" cy="46" r="4" fill="#332A20"/><circle cx="59" cy="46" r="4" fill="#332A20"/>`),
  saghira: icon(`<rect width="100" height="100" rx="22" fill="#EFE4F3"/>
    <circle cx="70" cy="56" r="26" fill="#C9BEDD"/>
    <circle cx="28" cy="70" r="12" fill="${C.shirt}"/>`),
  kabir:  icon(`<rect width="100" height="100" rx="22" fill="#EFE4F3"/>
    <circle cx="38" cy="54" r="30" fill="${C.shirt}"/>
    <circle cx="80" cy="76" r="11" fill="#C9BEDD"/>`),
};

/* ---------- the book ---------- */

const BOOK_LULU1 = {
  id: 'lulu-l1',
  level: 1,
  title: 'لُولُو صَغِيرَة',
  titleEn: 'Lulu is small',
  tag: 'حَرَكَات وَمَدّ فَقَط · harakat and long vowels only',
  words: [
    { ar: 'هَذَا',     en: 'this (boy)',  icon: LICONS.rel_this },
    { ar: 'هَذِهِ',    en: 'this (girl)', icon: LICONS.rel_this },
    { ar: 'أَدَم',     en: 'Adam',        icon: L1I.adam },
    { ar: 'بَابَا',    en: 'Baba',        icon: L1I.baba },
    { ar: 'لُولُو',    en: 'Lulu',        icon: ICONS.cat },
    { ar: 'صَغِيرَة',  en: 'small',       icon: LICONS.rel_small },
    { ar: 'كَبِير',    en: 'big',         icon: LICONS.rel_big },
    { ar: 'جَمِيلَة',  en: 'beautiful',   icon: LICONS.heart2 },
  ],
  pages: [
    { type: 'cover', svg: l1Cover },
    { type: 'words' },
    { type: 'story', svg: l1a, ar: [{ t: 'هَذَا' }, { t: 'أَدَم.' }], en: 'This is Adam.' },
    { type: 'story', svg: l1b, ar: [{ t: 'هَذَا' }, { t: 'بَابَا.' }], en: 'This is Baba.' },
    { type: 'story', svg: l1c, ar: [{ t: 'هَذِهِ' }, { t: 'لُولُو.' }], en: 'This is Lulu.' },
    { type: 'story', svg: l1d, ar: [{ t: 'لُولُو' }, { t: 'صَغِيرَة.' }], en: 'Lulu is small.' },
    { type: 'story', svg: l1e, ar: [{ t: 'بَابَا' }, { t: 'كَبِير!' }], en: 'Baba is big!' },
    { type: 'story', svg: l1f, ar: [{ t: 'لُولُو' }, { t: 'جَمِيلَة!' }], en: 'Lulu is beautiful!' },
    { type: 'game' },
    { type: 'end', svg: l1End },
  ],
  game: [
    { say: 'لُولُو',  opts: ['cat', 'l1baba', 'l1adam'], ans: 0 },
    { say: 'بَابَا',  opts: ['l1adam', 'l1baba', 'cat'], ans: 1 },
    { say: 'أَدَم',   opts: ['cat', 'l1baba', 'l1adam'], ans: 2 },
  ],
};

/* the game looks pictures up by key, so these need names in the shared kit */
ICONS.l1adam = L1I.adam;
ICONS.l1baba = L1I.baba;

if (typeof BOOKS !== 'undefined') {
  BOOKS.push(BOOK_LULU1);
  if (typeof renderShelf === 'function' && typeof document !== 'undefined'
      && document.querySelector && document.querySelector('#bookGrid')) {
    renderShelf();
  }
}
