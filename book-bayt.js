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
    <!-- sky elements -->
    <circle cx="132" cy="96" r="48" fill="#FFEAA7" opacity="0.4"/>
    <circle cx="132" cy="96" r="38" fill="${C.sun}"/>
    <ellipse cx="650" cy="100" rx="90" ry="34" fill="#FFFFFF" opacity=".95"/>
    <ellipse cx="580" cy="116" rx="60" ry="28" fill="#FFFFFF" opacity=".95"/>
    <ellipse cx="710" cy="118" rx="50" ry="24" fill="#FFFFFF" opacity=".9"/>
    <!-- grass & garden -->
    <rect y="404" width="800" height="116" fill="#7BC08F"/>
    <rect y="400" width="800" height="6" fill="#68A87B"/>
    <!-- stepping stones -->
    <ellipse cx="400" cy="460" rx="36" ry="12" fill="#DFD8C8"/>
    <ellipse cx="380" cy="492" rx="40" ry="14" fill="#D3CCA8"/>
    <!-- chimney & smoke -->
    <rect x="230" y="110" width="36" height="70" fill="#A84640"/>
    <rect x="226" y="106" width="44" height="10" rx="3" fill="#8F3630"/>
    <ellipse cx="248" cy="90" rx="14" ry="10" fill="#FFFFFF" opacity="0.6"/>
    <ellipse cx="260" cy="70" rx="18" ry="12" fill="#FFFFFF" opacity="0.4"/>
    <!-- house body -->
    <rect x="196" y="252" width="408" height="154" fill="#FBF8F2"/>
    <!-- roof with tiles -->
    <path d="M400 84 L650 254 H150 Z" fill="#C4574E"/>
    <path d="M400 96 L630 252 H170 Z" fill="#D0635A" opacity="0.4"/>
    <line x1="260" y1="180" x2="540" y2="180" stroke="#A84640" stroke-width="4" opacity="0.6"/>
    <line x1="220" y1="216" x2="580" y2="216" stroke="#A84640" stroke-width="4" opacity="0.6"/>
    <!-- door & canopy -->
    <rect x="360" y="296" width="80" height="110" rx="8" fill="${C.wood}"/>
    <rect x="354" y="290" width="92" height="10" rx="4" fill="${C.woodD}"/>
    <rect x="372" y="308" width="24" height="40" rx="4" fill="${C.woodD}"/>
    <rect x="404" y="308" width="24" height="40" rx="4" fill="${C.woodD}"/>
    <circle cx="376" cy="360" r="5" fill="#FFD166"/>
    <!-- windows with flower boxes -->
    <g transform="translate(230,286)">
      <rect width="84" height="72" rx="8" fill="#FFFFFF"/>
      <rect x="6" y="6" width="72" height="60" rx="5" fill="${C.sky}"/>
      <rect x="38" y="6" width="8" height="60" fill="#FFFFFF"/>
      <rect x="6" y="32" width="72" height="8" fill="#FFFFFF"/>
      <rect x="-4" y="68" width="92" height="14" rx="4" fill="#8F5836"/>
      <circle cx="10" cy="68" r="8" fill="#E15554"/><circle cx="28" cy="66" r="7" fill="#FFD166"/>
      <circle cx="48" cy="68" r="8" fill="#F2A5A5"/><circle cx="68" cy="66" r="7" fill="#E15554"/>
      <circle cx="80" cy="68" r="7" fill="#FFD166"/>
    </g>
    <g transform="translate(486,286)">
      <rect width="84" height="72" rx="8" fill="#FFFFFF"/>
      <rect x="6" y="6" width="72" height="60" rx="5" fill="${C.sky}"/>
      <rect x="38" y="6" width="8" height="60" fill="#FFFFFF"/>
      <rect x="6" y="32" width="72" height="8" fill="#FFFFFF"/>
      <rect x="-4" y="68" width="92" height="14" rx="4" fill="#8F5836"/>
      <circle cx="10" cy="68" r="8" fill="#FFD166"/><circle cx="28" cy="66" r="7" fill="#E15554"/>
      <circle cx="48" cy="68" r="8" fill="#F2A5A5"/><circle cx="68" cy="66" r="7" fill="#FFD166"/>
      <circle cx="80" cy="68" r="7" fill="#E15554"/>
    </g>
    ${plant(700, 404)}
    <g transform="translate(100, 404)">${plant(0, 0)}</g>
    ${extra}`;
}

function bHouse(extra = '') {
  return `<rect width="800" height="520" fill="#BCE0EE"/>
    <!-- soft sun & fluffy clouds -->
    <circle cx="132" cy="96" r="48" fill="#FFEAA7" opacity="0.4"/>
    <circle cx="132" cy="96" r="38" fill="${C.sun}"/>
    <ellipse cx="650" cy="100" rx="90" ry="34" fill="#FFFFFF" opacity=".95"/>
    <ellipse cx="580" cy="116" rx="60" ry="28" fill="#FFFFFF" opacity=".95"/>
    <ellipse cx="710" cy="118" rx="50" ry="24" fill="#FFFFFF" opacity=".9"/>
    <!-- green rolling lawn -->
    <rect y="404" width="800" height="116" fill="#7BC08F"/>
    <rect y="400" width="800" height="6" fill="#68A87B"/>
    <!-- stone garden pathway -->
    <ellipse cx="400" cy="430" rx="28" ry="8" fill="#DFD8C8"/>
    <ellipse cx="410" cy="456" rx="34" ry="10" fill="#D3CCA8"/>
    <ellipse cx="390" cy="486" rx="40" ry="12" fill="#DFD8C8"/>
    <ellipse cx="406" cy="514" rx="46" ry="14" fill="#D3CCA8"/>
    <!-- brick chimney with smoke -->
    <rect x="230" y="100" width="40" height="80" fill="#A84640"/>
    <rect x="224" y="94" width="52" height="12" rx="4" fill="#8F3630"/>
    <ellipse cx="250" cy="76" rx="16" ry="12" fill="#FFFFFF" opacity="0.6"/>
    <ellipse cx="266" cy="54" rx="22" ry="14" fill="#FFFFFF" opacity="0.4"/>
    <!-- main cottage wall -->
    <rect x="180" y="240" width="440" height="166" rx="6" fill="#FAF6EE"/>
    <rect x="176" y="396" width="448" height="12" rx="2" fill="#D6CEBF"/>
    <!-- rustic red clay tile roof -->
    <path d="M400 70 L660 244 H140 Z" fill="#C4574E"/>
    <path d="M400 84 L640 242 H160 Z" fill="#D0635A" opacity="0.4"/>
    <line x1="240" y1="160" x2="560" y2="160" stroke="#A84640" stroke-width="4" opacity="0.6"/>
    <line x1="200" y1="200" x2="600" y2="200" stroke="#A84640" stroke-width="4" opacity="0.6"/>
    <!-- front wooden door & arched canopy -->
    <path d="M 354,280 Q 400,260 446,280 L 452,290 H 348 Z" fill="#8F5836"/>
    <rect x="360" y="290" width="80" height="116" rx="6" fill="${C.wood}"/>
    <rect x="372" y="304" width="24" height="42" rx="4" fill="${C.woodD}"/>
    <rect x="404" y="304" width="24" height="42" rx="4" fill="${C.woodD}"/>
    <circle cx="376" cy="356" r="5" fill="#FFD166"/>
    <!-- porch lantern -->
    <circle cx="456" cy="316" r="14" fill="#FFEAA7" opacity="0.6"/>
    <rect x="452" y="308" width="8" height="14" rx="2" fill="#E76F51"/>
    <!-- bay windows with blooming flowerboxes -->
    <g transform="translate(210,274)">
      <rect width="96" height="84" rx="8" fill="#FFFFFF"/>
      <rect x="6" y="6" width="84" height="72" rx="5" fill="${C.sky}"/>
      <rect x="44" y="6" width="8" height="72" fill="#FFFFFF"/>
      <rect x="6" y="38" width="84" height="8" fill="#FFFFFF"/>
      <rect x="-4" y="80" width="104" height="16" rx="5" fill="#8F5836"/>
      <circle cx="10" cy="80" r="9" fill="#E15554"/><circle cx="30" cy="78" r="8" fill="#FFD166"/>
      <circle cx="52" cy="80" r="9" fill="#F2A5A5"/><circle cx="74" cy="78" r="8" fill="#E15554"/>
      <circle cx="92" cy="80" r="8" fill="#FFD166"/>
    </g>
    <g transform="translate(494,274)">
      <rect width="96" height="84" rx="8" fill="#FFFFFF"/>
      <rect x="6" y="6" width="84" height="72" rx="5" fill="${C.sky}"/>
      <rect x="44" y="6" width="8" height="72" fill="#FFFFFF"/>
      <rect x="6" y="38" width="84" height="8" fill="#FFFFFF"/>
      <rect x="-4" y="80" width="104" height="16" rx="5" fill="#8F5836"/>
      <circle cx="10" cy="80" r="8" fill="#FFD166"/><circle cx="30" cy="78" r="9" fill="#E15554"/>
      <circle cx="52" cy="80" r="9" fill="#F2A5A5"/><circle cx="74" cy="78" r="8" fill="#FFD166"/>
      <circle cx="92" cy="80" r="8" fill="#E15554"/>
    </g>
    ${plant(710, 404)}
    <g transform="translate(90, 404)">${plant(0, 0)}</g>
    ${extra}`;
}

function bCover() {
  return artScene('bayt1-1.jpg', 'Stone cottage with flower garden');
}

function b1() {   // مَنْ فِي الْبَيْت؟
  return artScene('bayt1-1.jpg', 'Stone cottage with flower garden');
}

function b2() {   // أَدَم فِي الْمَطْبَخ.
  return artScene('bayt1-2.jpg', 'Adam reaching for an apple in the kitchen');
}

function b3() {   // مَرْيَم فِي الْغُرْفَة.
  return artScene('bayt1-3.jpg', 'Maryam playing with blocks in the bedroom');
}

function b4() {   // وَأَيْنَ لُولُو؟
  return artScene('bayt1-4.jpg', 'Baba searching under the armchair in the living room');
}

function b5() {   // لُولُو فَوْقَ الْكِتَاب!
  return artScene('bayt1-5.jpg', 'Lulu sitting proudly on the stack of children books');
}

function b6() {   // أَدَم وَمَرْيَم وَلُولُو.
  return artScene('bayt1-6.jpg', 'Baba, Adam, Maryam, and Lulu on the couch');
}

function bEnd() {
  return artScene('bayt1-end.jpg', 'Baba, Adam, Maryam, and Lulu at home');
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
