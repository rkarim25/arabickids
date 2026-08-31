/* ————— Hikayat · three more books, built from the FREQUENCY data ——————————
   Reza, 2026-08-31: "build it based on frequency. make stories based on high
   probability usage" and "try to make stories funny and entertaining".

   The words are not chosen by taste. They come from the grown-up site's
   measured corpus (data/frequency.json — the whole Qur'an weighted 0.6 plus the
   site's everyday sentences), filtered to what a small child can actually use
   and say. These three books between them carry:

     في 216 · ما 98 · لا 95 · إلى 93 · أنا 80 · يوم 55 · هذا 53 · أين 43
     مع 36 · قال 34 · كل 33 · ماذا 30 · أريد 25 · أمي 24 · المسجد 19

   AND THEY HAVE A JOKE IN THEM. A greedy cat and a stolen shoe are not
   decoration: an Oxford Reading Tree book works because the child wants to know
   what happens, and a child who wants the next page reads the next page. The
   dua book is the exception and is deliberately gentle — humour would be wrong
   there, not merely different.
   ========================================================================= */
'use strict';

/* ═══════════════ 1. «مَاذَا تُرِيدُ؟» — Level 1 (Pink) ═══════════════════════
   Every word is harakat + long vowels only: not one sukoon, not one shadda, no
   اَلْ at all. The comedy is entirely in the pictures — Lulu asks for more and
   more, and ends up too round to move — because at Level 1 the language cannot
   carry a punchline and the illustration has to. */

function w1Kitchen(extra = '') {
  return `${room({ wall: '#E8F1E4', win: 620, rug: null })}
    <rect x="70" y="250" width="300" height="24" rx="8" fill="${C.woodD}"/>
    <rect x="80" y="274" width="280" height="108" fill="${C.wood}"/>
    <rect x="130" y="298" width="74" height="58" rx="6" fill="${C.boxL}"/>
    <rect x="236" y="298" width="74" height="58" rx="6" fill="${C.boxL}"/>
    ${extra}`;
}
function w1a() {   // مَاذَا تُرِيدُ؟
  return w1Kitchen(`${adam(560, 382, 'point', 1.0, true)}${catSit(300, 382, 0.8)}${qmarks(430, 190)}`);
}
function w1b() {   // أُرِيدُ سَمَكَة.
  return w1Kitchen(`${catSit(300, 382, 0.85)}
    <g transform="translate(470,330)">
      <ellipse cx="0" cy="0" rx="34" ry="20" fill="#7FB0D6"/>
      <path d="M 30,0 l 22,-14 v 28 Z" fill="#5E93BC"/>
      <circle cx="-14" cy="-5" r="4" fill="#fff"/><circle cx="-14" cy="-5" r="2" fill="#332A20"/>
    </g>${sparkle(560, 240, 0.9)}`);
}
function w1c() {   // أُرِيدُ دَجَاجَة.
  return w1Kitchen(`${catSit(300, 382, 0.9)}
    <g transform="translate(480,352)">
      <ellipse cx="0" cy="-22" rx="34" ry="26" fill="#F6F1E7"/>
      <circle cx="24" cy="-50" r="15" fill="#F6F1E7"/>
      <path d="M 37,-52 l 16,4 -16,5 Z" fill="${C.sun}"/>
      <circle cx="27" cy="-54" r="2.6" fill="#332A20"/>
      <path d="M 20,-64 q 5,-10 10,-2" fill="#E15554"/>
    </g>${sparkle(580, 250, 0.8)}`);
}
function w1d() {   // أُرِيدُ عَصِير!
  return w1Kitchen(`${catSit(300, 382, 0.95)}${cup(480, 356, 1.25, '#E8A33D')}
    ${sparkle(560, 246, 1)}${sparkle(210, 236, 0.7, '#2A9D8F')}`);
}
function w1e() {   // أُرِيدُ مَامَا!
  return w1Kitchen(`${mama(520, 382, 'open', 0.95, true)}${catSit(300, 382, 1.0)}
    ${heart(410, 210, 1.1)}`);
}
function w1f() {   // لُولُو كَبِيرَة!  — the payoff: an enormously round cat
  return `${room({ wall: '#FDF1DE', win: 640, rug: [400, 404] })}
    ${couch(220, 382)}${babaOnCouch(220, 382)}
    <g transform="translate(520,382) scale(1.9)">
      ${catSleep(0, -28, 1)}
    </g>
    ${zzz(600, 300, '#7A6A55', 1.1)}${heart(430, 200, 0.9)}`;
}
function w1End() {
  return w1Kitchen(`${adam(560, 382, 'hips', 1.0, true)}${mama(180, 382, 'down', 0.95)}
    <g transform="translate(380,382) scale(1.5)">${catSleep(0, -26, 1)}</g>
    ${heart(380, 200, 1.2)}${sparkle(240, 220, 0.8)}`);
}

const BOOK_MADHA = {
  id: 'madha-1',
  level: 1,
  title: 'مَاذَا تُرِيدُ؟',
  titleEn: 'What do you want?',
  tag: 'أُرِيدُ · مَاذَا — the words you use most',
  words: [
    { ar: 'مَاذَا',   en: 'what?',     icon: LICONS.rel_who },
    { ar: 'أُرِيدُ',  en: 'I want',    icon: LICONS.rel_this },
    { ar: 'مَاء',     en: 'water',     icon: LICONS.maa },
    { ar: 'سَمَكَة',  en: 'a fish',    icon: LICONS.hoot },
    { ar: 'دَجَاجَة', en: 'a chicken', icon: LICONS.tayr },
    { ar: 'عَصِير',   en: 'juice',     icon: LICONS.thamar },
    { ar: 'مَامَا',   en: 'Mama',      icon: LICONS.walad },
    { ar: 'كَبِيرَة', en: 'big',       icon: LICONS.rel_big },
  ],
  pages: [
    { type: 'cover', svg: w1a },
    { type: 'words' },
    { type: 'story', svg: w1a, ar: [{ t: 'مَاذَا' }, { t: 'تُرِيدُ؟' }], en: 'What do you want?' },
    { type: 'story', svg: w1b, ar: [{ t: 'أُرِيدُ' }, { t: 'سَمَكَة.' }], en: 'I want a fish.' },
    { type: 'story', svg: w1c, ar: [{ t: 'أُرِيدُ' }, { t: 'دَجَاجَة.' }], en: 'I want a chicken.' },
    { type: 'story', svg: w1d, ar: [{ t: 'أُرِيدُ' }, { t: 'عَصِير!' }], en: 'I want juice!' },
    { type: 'story', svg: w1e, ar: [{ t: 'أُرِيدُ' }, { t: 'مَامَا!' }], en: 'I want Mama!' },
    { type: 'story', svg: w1f, ar: [{ t: 'لُولُو' }, { t: 'كَبِيرَة!' }], en: 'Lulu is BIG!' },
    { type: 'game' },
    { type: 'end', svg: w1End },
  ],
  game: [
    { say: 'مَاء',    opts: ['maa', 'hoot', 'tayr'], ans: 0 },
    { say: 'سَمَكَة', opts: ['tayr', 'hoot', 'maa'], ans: 1 },
    { say: 'عَصِير',  opts: ['maa', 'hoot', 'thamar'], ans: 2 },
  ],
};

/* ═══════════════ 2. «أَيْنَ حِذَائِي؟» — Level 3 (Yellow) ═══════════════════
   The empty rung. Level 3 is where characters start to SPEAK, so the book is
   built on قَالَ / قَالَتْ (34 in the corpus) and carries shadda (كُلِّ، أُمِّي)
   and tanween (مَكَانٍ) — but no sun-letter اَلْ, which is Level 4.
   The joke: everybody is ready for the masjid except Adam, and the cat is
   sitting on the missing shoe the whole time. */

function m3House(extra = '') {
  return `${room({ wall: '#FDF1DE', win: 660, rug: [420, 404] })}${extra}`;
}
function m3a() {   // قَالَتْ أُمِّي: هَيَّا إِلَى الْمَسْجِدِ!
  return m3House(`${mama(240, 382, 'point', 1.0, true)}${adam(560, 382, 'down', 0.95)}
    ${maryam(680, 382, 'up', 0.95)}${sparkle(400, 190, 0.9)}`);
}
function m3b() {   // قَالَ أَدَم: أَيْنَ حِذَائِي؟
  return m3House(`${adam(400, 382, 'wonder', 1.1)}${qmarks(400, 176)}
    ${sneaker(600, 382)}`);
}
function m3c() {   // بَحَثَ أَدَم فِي كُلِّ مَكَانٍ.
  return `${room({ wall: C.wallBed, win: 100, rug: null })}
    ${bed(430, 382, 0.9)}
    ${adam(230, 382, 'reach', 1.0)}
    ${box(650, 382, 0.8)}
    ${qmarks(560, 190)}${sparkle(180, 210, 0.7)}`;
}
function m3d() {   // قَالَتْ مَرْيَم: اُنْظُرْ! هُنَاكَ.
  return m3House(`${maryam(250, 382, 'point', 1.05, true)}
    ${adam(560, 382, 'wonder', 0.95)}${sparkle(410, 200, 1)}`);
}
function m3e() {   // الْحِذَاءُ مَعَ لُولُو!  — the gag
  return m3House(`${couch(380, 382)}
    ${catSit(430, 382, 0.95)}
    <g transform="translate(300,382)">${sneaker(0, 0)}</g>
    ${sparkle(240, 220, 0.9)}${heart(520, 214, 0.75)}`);
}
function m3f() {   // ضَحِكَتْ أُمِّي: هَيَّا بِنَا!
  return masjidScene(false) + `${mama(180, 404, 'open', 0.95)}
    ${adam(300, 404, 'hips', 0.9)}${maryam(390, 404, 'clap', 0.9)}
    ${heart(250, 250, 1)}${sparkle(660, 230, 0.8)}`;
}
function m3End() {
  return masjidScene(true) + `${mama(200, 404, 'down', 0.9)}
    ${adam(300, 404, 'down', 0.85)}${maryam(380, 404, 'clap', 0.85)}
    ${catSit(470, 404, 0.6)}${heart(300, 240, 1.1)}`;
}

const BOOK_HIDHAA = {
  id: 'hidhaa-3',
  level: 3,
  title: 'أَيْنَ حِذَائِي؟',
  titleEn: 'Where is my shoe?',
  tag: 'قَالَ · قَالَتْ — people start to speak',
  words: [
    { ar: 'قَالَ',    en: 'he said',   icon: LICONS.rel_who },
    { ar: 'قَالَتْ',  en: 'she said',  icon: LICONS.rel_who },
    { ar: 'أُمِّي',   en: 'my mother', icon: LICONS.walad },
    { ar: 'حِذَاء',   en: 'a shoe',    icon: LICONS.rel_under },
    { ar: 'مَعَ',     en: 'with',      icon: LICONS.rel_and },
    { ar: 'إِلَى',    en: 'to',        icon: LICONS.rel_on },
    { ar: 'الْمَسْجِد', en: 'the masjid', icon: LICONS.salah },
    { ar: 'كُلّ',     en: 'every, all', icon: LICONS.rel_big },
  ],
  pages: [
    { type: 'cover', svg: m3b },
    { type: 'words' },
    { type: 'story', svg: m3a, ar: [{ t: 'قَالَتْ' }, { t: 'أُمِّي:' }, { t: 'هَيَّا' }, { t: 'إِلَى' }, { t: 'الْمَسْجِدِ!' }], en: 'Mama said: come on, to the masjid!' },
    { type: 'story', svg: m3b, ar: [{ t: 'قَالَ' }, { t: 'أَدَم:' }, { t: 'أَيْنَ' }, { t: 'حِذَائِي؟' }], en: 'Adam said: where is my shoe?' },
    { type: 'story', svg: m3c, ar: [{ t: 'بَحَثَ' }, { t: 'أَدَم' }, { t: 'فِي' }, { t: 'كُلِّ' }, { t: 'مَكَانٍ.' }], en: 'Adam looked everywhere.' },
    { type: 'story', svg: m3d, ar: [{ t: 'قَالَتْ' }, { t: 'مَرْيَم:' }, { t: 'اُنْظُرْ' }, { t: 'هُنَاكَ!' }], en: 'Maryam said: look over there!' },
    { type: 'story', svg: m3e, ar: [{ t: 'الْحِذَاءُ' }, { t: 'مَعَ' }, { t: 'لُولُو!', cls: 'no' }], en: 'The shoe is with Lulu!' },
    { type: 'story', svg: m3f, ar: [{ t: 'ضَحِكَتْ' }, { t: 'أُمِّي:' }, { t: 'هَيَّا' }, { t: 'بِنَا!' }], en: 'Mama laughed: off we go!' },
    { type: 'game' },
    { type: 'end', svg: m3End },
  ],
  game: [
    { say: 'الْمَسْجِد', opts: ['salah', 'dar', 'kitab'], ans: 0 },
    { say: 'أُمِّي',     opts: ['dar', 'walad', 'salah'], ans: 1 },
    { say: 'كِتَاب',    opts: ['salah', 'walad', 'kitab'], ans: 2 },
  ],
};

/* ═══════════════ 3. «يَوْمِي» — Level 5 (Blue) ═══════════════════════════════
   The top rung, and the point of the whole ladder: real words, said for real.
   يَوْم is the 11th most frequent word in the corpus.

   These are the short, well-known duas of an ordinary day (Hisn al-Muslim) —
   NOT invented, NOT paraphrased, and not shortened to fit a page. A child
   already hears these; the book simply lets them read what they are saying.
   No joke in this one, on purpose. */

function d5Morning() {
  return `${room({ wall: '#FDF1DE', win: 620, rug: null })}
    ${bed(300, 382, 0.95)}
    ${adam(560, 382, 'reach', 0.95, true)}
    <circle cx="660" cy="120" r="40" fill="${C.sun}"/>${sparkle(470, 200, 0.9)}`;
}
function d5Food() {
  return `${room({ wall: '#E8F1E4', win: 120, rug: null })}
    <rect x="240" y="300" width="330" height="16" rx="6" fill="${C.woodD}"/>
    <rect x="270" y="316" width="14" height="66" fill="${C.wood}"/>
    <rect x="526" y="316" width="14" height="66" fill="${C.wood}"/>
    ${plateOf(400, 300, 1.05)}
    ${adam(200, 382, 'down', 0.95)}${maryam(640, 382, 'clap', 0.9, true)}
    ${sparkle(400, 200, 0.8)}`;
}
function d5Thanks() {
  return `${room({ wall: '#E8F1E4', win: 120, rug: null })}
    <rect x="240" y="300" width="330" height="16" rx="6" fill="${C.woodD}"/>
    <rect x="270" y="316" width="14" height="66" fill="${C.wood}"/>
    <rect x="526" y="316" width="14" height="66" fill="${C.wood}"/>
    <ellipse cx="400" cy="296" rx="46" ry="13" fill="#FFFFFF"/>
    ${adam(200, 382, 'hips', 0.95)}${mama(640, 382, 'open', 0.95, true)}
    ${heart(400, 200, 1.1)}`;
}
function d5Night() {
  return `${room({ wall: C.wallBed, win: 640, rug: null })}
    ${bed(360, 382, 1.05)}
    <g transform="translate(430,300)">${catSleep(0, 0, 0.7)}</g>
    ${zzz(560, 250, '#7A6A55', 1)}
    ${sparkle(200, 200, 0.7)}`;
}
function d5End() {
  return nightBase(16) + `${houseSil(400, 380, 0.9)}${moonFull(650, 120, 44)}
    ${bigStar(160, 150, 0.8)}${bigStar(240, 230, 0.5)}`;
}

const BOOK_YAWMI = {
  id: 'yawmi-5',
  level: 5,
  title: 'يَوْمِي',
  titleEn: 'My day',
  tag: 'أَذْكَار الْيَوْم · the duas you already say',
  words: [
    { ar: 'يَوْم',        en: 'a day',        icon: LICONS.shams },
    { ar: 'الصَّبَاح',    en: 'the morning',  icon: LICONS.shams },
    { ar: 'الطَّعَام',    en: 'the food',     icon: LICONS.khubz },
    { ar: 'النَّوْم',     en: 'sleep',        icon: LICONS.layl },
    { ar: 'أَقُولُ',      en: 'I say',        icon: LICONS.rel_who },
    { ar: 'قَبْلَ',       en: 'before',       icon: LICONS.rel_under },
    { ar: 'بَعْدَ',       en: 'after',        icon: LICONS.rel_on },
    { ar: 'الْحَمْدُ لِلَّهِ', en: 'all praise is for Allah', icon: LICONS.heart2 },
  ],
  pages: [
    { type: 'cover', svg: d5Morning },
    { type: 'words' },
    { type: 'story', svg: d5Morning, ar: [{ t: 'فِي' }, { t: 'الصَّبَاحِ' }, { t: 'أَقُولُ:' }, { t: 'الْحَمْدُ' }, { t: 'لِلَّهِ.' }], en: 'In the morning I say: all praise is for Allah.' },
    { type: 'story', svg: d5Food, ar: [{ t: 'قَبْلَ' }, { t: 'الطَّعَامِ' }, { t: 'أَقُولُ:' }, { t: 'بِسْمِ' }, { t: 'اللَّهِ.' }], en: 'Before food I say: in the name of Allah.' },
    { type: 'story', svg: d5Thanks, ar: [{ t: 'بَعْدَ' }, { t: 'الطَّعَامِ' }, { t: 'أَقُولُ:' }, { t: 'الْحَمْدُ' }, { t: 'لِلَّهِ.' }], en: 'After food I say: all praise is for Allah.' },
    { type: 'story', svg: d5Night, ar: [{ t: 'قَبْلَ' }, { t: 'النَّوْمِ' }, { t: 'أَقُولُ:' }, { t: 'بِاسْمِكَ' }, { t: 'اللَّهُمَّ' }, { t: 'أَمُوتُ' }, { t: 'وَأَحْيَا.' }], en: 'Before sleep I say: in Your name, O Allah, I die and I live.' },
    { type: 'game' },
    { type: 'end', svg: d5End },
  ],
  game: [
    { say: 'الصَّبَاح', opts: ['shams', 'layl', 'khubz'], ans: 0 },
    { say: 'النَّوْم',  opts: ['khubz', 'layl', 'shams'], ans: 1 },
    { say: 'الطَّعَام', opts: ['layl', 'shams', 'khubz'], ans: 2 },
  ],
};

if (typeof BOOKS !== 'undefined') {
  BOOKS.push(BOOK_MADHA, BOOK_HIDHAA, BOOK_YAWMI);
  if (typeof renderShelf === 'function' && typeof document !== 'undefined'
      && document.querySelector && document.querySelector('#bookGrid')) renderShelf();
}
