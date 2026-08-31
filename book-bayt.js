/* ————— «مَنْ فِي الْبَيْت؟» — Level 2 (Red أَحْمَر) ————————————————————————
   Who is in the house?

   The band's rules (DESIGN.md §3) are the whole design of this book, not a
   label put on afterwards:
     • 3–4 words a sentence
     • sukoon arrives — مَنْ، فَوْقَ، بَيْت، مَطْبَخ
     • the joining words فِي and وَ do the work
     • NO shadda and NO sun-letter اَلْ anywhere — so الصُّنْدُوق and الشَّمْس,
       which would be the obvious things to hide a cat in or under, are
       deliberately not here. They belong to Level 4.
   scripts/test-books.js fails the build if any of that slips.

   The pictures reuse the storybook kit in app.js — same house, same children,
   same cat as «أَيْنَ لُولُو؟», because a child meeting familiar characters in
   a harder book is reading, not starting again.
   ========================================================================= */
'use strict';

/* ---------- scenes ---------- */

function bHouse(extra = '') {
  return `<rect width="800" height="520" fill="#BDE3F0"/>
    <circle cx="132" cy="96" r="42" fill="${C.sun}"/>
    <ellipse cx="640" cy="110" rx="86" ry="34" fill="#FFFFFF" opacity=".9"/>
    <ellipse cx="580" cy="122" rx="56" ry="26" fill="#FFFFFF" opacity=".9"/>
    <rect y="404" width="800" height="116" fill="#7BC08F"/>
    <path d="M400 92 L640 252 H160 Z" fill="#C4574E"/>
    <rect x="196" y="252" width="408" height="154" fill="#F6F1E7"/>
    <rect x="368" y="304" width="72" height="102" rx="6" fill="${C.wood}"/>
    <circle cx="384" cy="356" r="6" fill="${C.sun}"/>
    <rect x="236" y="290" width="82" height="70" rx="8" fill="#FFFFFF"/>
    <rect x="242" y="296" width="70" height="58" rx="5" fill="${C.sky}"/>
    <rect x="490" y="290" width="82" height="70" rx="8" fill="#FFFFFF"/>
    <rect x="496" y="296" width="70" height="58" rx="5" fill="${C.sky}"/>
    ${plant(690, 404)}${extra}`;
}

function bCover() {
  return bHouse(`${catSit(150, 404, 0.9)}${sparkle(268, 150, 1.1)}${sparkle(556, 176, 0.8, '#FFFFFF')}`);
}
function b1() {   // مَنْ فِي الْبَيْت؟
  return bHouse(qmarks(400, 176));
}
function b2() {   // أَدَم فِي الْمَطْبَخ.
  return `${room({ wall: '#E8F1E4', win: 596, rug: null })}
    <rect x="90" y="250" width="300" height="26" rx="8" fill="${C.woodD}"/>
    <rect x="100" y="276" width="280" height="106" fill="${C.wood}"/>
    <rect x="150" y="300" width="76" height="58" rx="6" fill="${C.boxL}"/>
    <rect x="256" y="300" width="76" height="58" rx="6" fill="${C.boxL}"/>
    <rect x="420" y="248" width="118" height="134" rx="10" fill="#DCE3E8"/>
    <rect x="430" y="262" width="98" height="50" rx="6" fill="#B9C4CC"/>
    <circle cx="452" cy="336" r="9" fill="#8E9AA3"/>
    ${foodBowl(620, 382)}
    ${adam(250, 382, 'reach', 1.0)}
    ${sparkle(560, 190, 0.8)}`;
}
function b3() {   // مَرْيَم فِي الْغُرْفَة.
  return `${room({ wall: C.wallBed, win: 90, rug: [470, 402] })}
    ${bed(430, 382, 0.92)}
    ${teddy(300, 366, 0.8)}
    ${maryam(210, 382, 'clap', 1.0)}
    ${heart(268, 190, 0.9)}${sparkle(600, 176, 0.7)}`;
}
function b4() {   // وَأَيْنَ لُولُو؟
  return `${room({ wall: '#FDF1DE', win: 120, rug: [420, 402] })}
    ${couch(400, 382)}
    ${adam(170, 382, 'down', 0.95)}
    ${maryam(660, 382, 'point', 0.95, true)}
    ${qmarks(400, 168)}`;
}
function b5() {   // لُولُو فَوْقَ الْكِتَاب!
  return `${room({ wall: '#FDF1DE', win: 640, rug: [340, 404] })}
    ${chair(292, 382, 1.05)}
    <g transform="translate(300,262)">
      <rect x="-56" y="0" width="112" height="20" rx="5" fill="#2A9D8F"/>
      <rect x="-52" y="-14" width="104" height="16" rx="4" fill="#38B2A2"/>
      <rect x="-48" y="-26" width="96" height="14" rx="4" fill="#F2A5A5"/>
    </g>
    ${catSit(300, 222, 0.72)}
    ${sparkle(196, 190, 1)}${sparkle(452, 214, 0.75, '#2A9D8F')}
    ${adam(600, 382, 'point', 0.95, true)}`;
}
function b6() {   // أَدَم وَمَرْيَم وَلُولُو.
  return `${room({ wall: '#FDF1DE', win: 660, rug: [400, 404] })}
    ${couch(240, 382)}
    ${adam(330, 382, 'down', 0.95)}
    ${maryam(486, 382, 'clap', 0.95)}
    ${catSit(600, 382, 0.8, true)}
    ${heart(400, 158, 1.2)}${sparkle(180, 176, 0.8)}${sparkle(660, 190, 0.7, '#2A9D8F')}`;
}
function bEnd() {
  return bHouse(`${catSit(150, 404, 0.9)}${heart(400, 150, 1.3)}
    ${sparkle(240, 190, 0.9)}${sparkle(600, 170, 0.8, '#FFFFFF')}`);
}

/* ---------- the book ---------- */

const BOOK_BAYT = {
  id: 'bayt-2',
  level: 2,
  title: 'مَنْ فِي الْبَيْت؟',
  titleEn: 'Who is in the house?',
  tag: 'فِي · وَ · سُكُون — joining words',
  /* These were wrong, not merely ugly: kitchen was a loaf of bread, room was a
     bed, and "and" was an EYE. The picture carries the meaning here, so a wrong
     one teaches a wrong word. Fixed 2026-08-31. */
  words: [
    { ar: 'مَنْ',      en: 'who?',      icon: LICONS.rel_who },
    { ar: 'بَيْت',     en: 'a house',   icon: LICONS.dar },
    { ar: 'مَطْبَخ',   en: 'a kitchen', icon: LICONS.kitchen },
    { ar: 'غُرْفَة',   en: 'a room',    icon: LICONS.room },
    { ar: 'كِتَاب',    en: 'a book',    icon: LICONS.kitab },
    { ar: 'فَوْقَ',    en: 'on top of', icon: LICONS.rel_on },
    { ar: 'فِي',       en: 'in',        icon: LICONS.rel_in },
    { ar: 'وَ',        en: 'and',       icon: LICONS.rel_and },
  ],
  pages: [
    { type: 'cover', svg: bCover },
    { type: 'words' },
    { type: 'story', svg: b1, ar: [{ t: 'مَنْ' }, { t: 'فِي' }, { t: 'الْبَيْت؟' }], en: 'Who is in the house?' },
    { type: 'story', svg: b2, ar: [{ t: 'أَدَم' }, { t: 'فِي' }, { t: 'الْمَطْبَخ.' }], en: 'Adam is in the kitchen.' },
    { type: 'story', svg: b3, ar: [{ t: 'مَرْيَم' }, { t: 'فِي' }, { t: 'الْغُرْفَة.' }], en: 'Maryam is in the room.' },
    { type: 'story', svg: b4, ar: [{ t: 'وَأَيْنَ' }, { t: 'لُولُو؟' }], en: 'And where is Lulu?' },
    { type: 'story', svg: b5, ar: [{ t: 'لُولُو' }, { t: 'فَوْقَ' }, { t: 'الْكِتَاب!' }], en: 'Lulu is on top of the book!' },
    { type: 'story', svg: b6, ar: [{ t: 'أَدَم' }, { t: 'وَمَرْيَم' }, { t: 'وَلُولُو.' }], en: 'Adam and Maryam and Lulu.' },
    { type: 'game' },
    { type: 'end', svg: bEnd },
  ],
  game: [
    { say: 'بَيْت',   opts: ['dar', 'kitab', 'kitchen'], ans: 0 },
    { say: 'كِتَاب',  opts: ['kitchen', 'kitab', 'dar'], ans: 1 },
    { say: 'مَطْبَخ', opts: ['kitab', 'dar', 'kitchen'], ans: 2 },
  ],
};

/* Registered here rather than in app.js so the storybook engine stays unaware
   of Level 0 — this book borrows the letter pictures, and letters.js loads
   after app.js. Re-render so the shelf picks it up. */
if (typeof BOOKS !== 'undefined') {
  BOOKS.push(BOOK_BAYT);
  // only repaint when there is a shelf to paint — the test harness runs these
  // files with no DOM, and app.js guards its own boot the same way
  if (typeof renderShelf === 'function' && typeof document !== 'undefined'
      && document.querySelector && document.querySelector('#bookGrid')) {
    renderShelf();
  }
}
