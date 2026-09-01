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
  return `<!-- warm wall with soft crown molding -->
    <rect width="800" height="382" fill="#FAF6EE"/>
    <rect width="800" height="14" fill="#E2D4BF"/>
    <rect y="14" width="800" height="6" fill="#D0C0A8"/>
    <!-- pastel mint wainscoting with wall panels -->
    <rect y="240" width="800" height="142" fill="#E2EEE7"/>
    <rect y="234" width="800" height="8" fill="#BED6C9"/>
    <!-- vertical wainscot panels -->
    <g fill="#D5E6DE">
      <rect x="25" y="250" width="95" height="112" rx="4"/>
      <rect x="135" y="250" width="95" height="112" rx="4"/>
      <rect x="245" y="250" width="95" height="112" rx="4"/>
      <rect x="355" y="250" width="95" height="112" rx="4"/>
      <rect x="465" y="250" width="95" height="112" rx="4"/>
      <rect x="575" y="250" width="95" height="112" rx="4"/>
      <rect x="685" y="250" width="95" height="112" rx="4"/>
    </g>
    <!-- skirting board -->
    <rect y="366" width="800" height="16" fill="#C8B8A0"/>
    <rect y="364" width="800" height="4" fill="#B0A088"/>
    <!-- warm hardwood floor -->
    <rect y="382" width="800" height="138" fill="#D99B62"/>
    <g stroke="#BE7E45" stroke-width="2" opacity="0.6">
      <line x1="0" y1="424" x2="800" y2="424"/>
      <line x1="0" y1="468" x2="800" y2="468"/>
      <line x1="0" y1="512" x2="800" y2="512"/>
      <line x1="160" y1="382" x2="160" y2="424"/><line x1="480" y1="382" x2="480" y2="424"/>
      <line x1="320" y1="424" x2="320" y2="468"/><line x1="640" y1="424" x2="640" y2="468"/>
      <line x1="180" y1="468" x2="180" y2="512"/><line x1="500" y1="468" x2="500" y2="512"/>
    </g>
    <!-- kitchen window -->
    ${windowAt(600, 50)}
    <!-- wall shelves with jars and tea kettle -->
    <g transform="translate(60, 80)">
      <rect width="280" height="12" rx="4" fill="#9E6840"/>
      <rect x="20" y="12" width="10" height="20" rx="2" fill="#7D4F2D"/>
      <rect x="250" y="12" width="10" height="20" rx="2" fill="#7D4F2D"/>
      <!-- jars -->
      <rect x="30" y="-32" width="26" height="32" rx="5" fill="#F4A261"/>
      <ellipse cx="43" cy="-32" rx="11" ry="3" fill="#E76F51"/>
      <rect x="70" y="-36" width="30" height="36" rx="5" fill="#2A9D8F"/>
      <circle cx="85" cy="-40" r="6" fill="#E76F51"/>
      <rect x="114" y="-28" width="24" height="28" rx="4" fill="#E9C46A"/>
      <!-- hanging copper pans -->
      <circle cx="170" cy="24" r="14" fill="#D9824C"/><circle cx="170" cy="24" r="10" fill="#BF6835"/><line x1="170" y1="12" x2="170" y2="10" stroke="#5A4633" stroke-width="3"/>
      <circle cx="210" cy="28" r="18" fill="#D9824C"/><circle cx="210" cy="28" r="14" fill="#BF6835"/><line x1="210" y1="12" x2="210" y2="10" stroke="#5A4633" stroke-width="3"/>
    </g>
    <!-- braided oval kitchen rug in center -->
    <ellipse cx="380" cy="436" rx="240" ry="48" fill="#FAF0E1"/>
    <ellipse cx="380" cy="436" rx="230" ry="42" fill="none" stroke="#E2C59D" stroke-width="4" stroke-dasharray="8,6"/>
    <ellipse cx="380" cy="436" rx="170" ry="30" fill="#F5DCBA" opacity="0.6"/>
    <!-- Lulu's food bowl in left corner -->
    <g transform="translate(100, 430)">
      ${shadow(0, 2, 26)}
      <ellipse cx="0" cy="0" rx="26" ry="10" fill="#E76F51"/>
      <ellipse cx="0" cy="-3" rx="22" ry="8" fill="#FFF2E0"/>
      <circle cx="-5" cy="-3" r="3" fill="#2A9D8F"/><circle cx="5" cy="-3" r="3" fill="#2A9D8F"/>
      <path d="M -7,-3 q 7,5 14,0" stroke="#2A9D8F" stroke-width="2" fill="none"/>
    </g>
    ${extra}`;
}

function kitchenTable(foodSvg = '') {
  return `<g transform="translate(480, 382)">
    ${shadow(0, 4, 150)}
    <!-- table legs -->
    <rect x="-140" y="-120" width="18" height="120" rx="4" fill="#8F5836"/>
    <rect x="122" y="-120" width="18" height="120" rx="4" fill="#8F5836"/>
    <rect x="-110" y="-110" width="14" height="110" rx="3" fill="#754425"/>
    <rect x="96" y="-110" width="14" height="110" rx="3" fill="#754425"/>
    <!-- tabletop -->
    <rect x="-160" y="-136" width="320" height="24" rx="8" fill="#B5764A"/>
    <rect x="-156" y="-140" width="312" height="8" rx="4" fill="#C8895C"/>
    <!-- checkered tablecloth runner -->
    <rect x="-110" y="-140" width="220" height="30" rx="4" fill="#FFFFFF"/>
    <g fill="#F2A5A5" opacity="0.6">
      <rect x="-100" y="-140" width="20" height="28"/>
      <rect x="-60" y="-140" width="20" height="28"/>
      <rect x="-20" y="-140" width="20" height="28"/>
      <rect x="20" y="-140" width="20" height="28"/>
      <rect x="60" y="-140" width="20" height="28"/>
    </g>
    <!-- food on table -->
    <g transform="translate(0, -140)">${foodSvg}</g>
  </g>`;
}

function w1Cover() {
  return artScene('madha1-cover.jpg', 'Sunlit kitchen with dining table');
}

function w1a() {   // مَاذَا تُرِيدُ؟
  return artScene('madha1-cover.jpg', 'Sunlit kitchen with dining table');
}

function w1b() {   // أُرِيدُ سَمَكَة.
  return artScene('madha1-1.jpg', 'Grilled fish platter with lemon on the table');
}

function w1c() {   // أُرِيدُ دَجَاجَة.
  return artScene('madha1-2.jpg', 'Mama serving golden roasted chicken in the kitchen');
}

function w1d() {   // أُرِيدُ عَصِير!
  return artScene('madha1-3.jpg', 'Tall glass of fresh orange juice with straw on the table');
}

function w1e() {   // أُرِيدُ مَامَا!
  return artScene('madha1-2.jpg', 'Mama smiling warmly in the kitchen');
}

function w1f() {   // لُولُو كَبِيرَة!
  return artScene('madha1-4.jpg', 'Plump fluffy ginger tabby cat Lulu on the rug');
}

function w1End() {
  return artScene('madha1-end.jpg', 'Plump fluffy Lulu content in the kitchen');
}

const BOOK_MADHA = {
  id: 'madha-1',
  level: 1,
  title: 'مَاذَا تُرِيدُ؟',
  titleEn: 'What do you want?',
  tag: 'أُرِيدُ · مَاذَا — the words you use most',
  words: [
    { ar: 'مَاذَا',   en: 'what?',     icon: LICONS.rel_who },
    { ar: 'أُرِيدُ',  en: 'I want',    icon: LICONS.rel_want },
    { ar: 'مَاء',     en: 'water',     icon: LICONS.maa },
    { ar: 'سَمَكَة',  en: 'a fish',    icon: LICONS.hoot },
    { ar: 'دَجَاجَة', en: 'a chicken', icon: LICONS.tayr },
    { ar: 'عَصِير',   en: 'juice',     icon: LICONS.thamar },
    { ar: 'مَامَا',   en: 'Mama',      icon: LICONS.mama },
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
  return `${room({ wall: '#FDF5E8', win: 660, rug: [420, 410] })}
    <!-- wall clock with swinging pendulum -->
    <g transform="translate(180, 100)">
      <rect x="-30" y="0" width="60" height="96" rx="8" fill="#8F5836"/>
      <circle cx="0" cy="38" r="24" fill="#FFFFFF"/>
      <circle cx="0" cy="38" r="20" fill="#FFF8F0"/>
      <line x1="0" y1="38" x2="0" y2="24" stroke="${C.dark}" stroke-width="3" stroke-linecap="round"/>
      <line x1="0" y1="38" x2="10" y2="44" stroke="${C.dark}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="0" cy="38" r="3" fill="${C.dark}"/>
      <line x1="0" y1="64" x2="6" y2="86" stroke="#FFD166" stroke-width="3"/>
      <circle cx="6" cy="86" r="6" fill="#FFD166"/>
    </g>
    <!-- framed landscape art -->
    <g transform="translate(360, 90)">
      <rect width="90" height="68" rx="6" fill="${C.woodD}"/>
      <rect x="6" y="6" width="78" height="56" rx="4" fill="#FFF8F0"/>
      ${heart(45, 24, 0.9, '#F2A5A5')}
    </g>
    ${extra}`;
}

function m3a() {   // قَالَتْ أُمِّي: هَيَّا إِلَى الْمَسْجِدِ!
  return artScene('hidhaa1-1.jpg', 'Adam looking for his missing shoe');
}

function m3b() {   // قَالَ أَدَم: أَيْنَ حِذَائِي؟
  return artScene('hidhaa1-1.jpg', 'Adam scratching head with one shoe on');
}

function m3c() {   // بَحَثَ أَدَم فِي كُلِّ مَكَانٍ.
  return artScene('hidhaa1-1.jpg', 'Adam searching everywhere for his shoe');
}

function m3d() {   // قَالَتْ مَرْيَم: اُنْظُرْ! هُنَاكَ.
  return artScene('hidhaa1-4.jpg', 'Maryam pointing at Lulu on the shoe');
}

function m3e() {   // الْحِذَاءُ مَعَ لُولُو!
  return artScene('hidhaa1-4.jpg', 'Lulu sitting proudly on top of the red sneaker');
}

function m3f() {   // ضَحِكَتْ أُمِّي: هَيَّا بِنَا!
  return artScene('hidhaa1-5.jpg', 'Walking happily to the masjid with Baba and Maryam');
}

function m3End() {
  return artScene('hidhaa1-end.jpg', 'Family walking to the masjid together');
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
    { ar: 'أُمِّي',   en: 'my mother', icon: LICONS.mama },
    { ar: 'حِذَاء',   en: 'a shoe',    icon: LICONS.sneaker },
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
  return artScene('yawmi1-1.jpg', 'Morning sunrise in bedroom');
}

function d5Food() {
  return artScene('yawmi1-2.jpg', 'Breakfast table saying Bismillah');
}

function d5Thanks() {
  return artScene('yawmi1-3.jpg', 'After food saying Alhamdulillah');
}

function d5Night() {
  return artScene('yawmi1-4.jpg', 'Bedtime starlit room before sleep');
}

function d5End() {
  return artScene('yawmi1-end.jpg', 'Nighttime stars and peaceful sleep');
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

/* ═══════════════ 4. «الْأَرْنَبُ وَالْقِرْد» — Level 2 (Red) ═══════════════════
   A hilarious comic-style story in the spirit of Bunny vs Monkey!
   Fast, funny slapstick with simple 3-4 word sentences for new readers.
   Features sukoon and moon letters: الْأَرْنَب، الْقِرْد، الْمَوْز، الْجَزَر. */

function meadowBg(extra = '') {
  return `<rect width="800" height="520" fill="#BDE0FE"/>
    <!-- bright sun & cartoon clouds -->
    <circle cx="120" cy="90" r="48" fill="#FFEAA7" opacity="0.4"/>
    <circle cx="120" cy="90" r="38" fill="${C.sun}"/>
    <ellipse cx="640" cy="80" rx="70" ry="24" fill="#FFFFFF" opacity="0.95"/>
    <ellipse cx="590" cy="95" rx="50" ry="20" fill="#FFFFFF" opacity="0.95"/>
    <ellipse cx="360" cy="60" rx="60" ry="20" fill="#FFFFFF" opacity="0.9"/>
    <!-- green rolling hills -->
    <path d="M 0,340 Q 240,280 480,330 T 800,310 L 800,520 L 0,520 Z" fill="#88D49E"/>
    <path d="M 0,380 Q 360,340 800,380 L 800,520 L 0,520 Z" fill="#6BCB77"/>
    <!-- tree on right side with vines -->
    <g transform="translate(680, 260)">
      <path d="M -30,120 Q -10,0 20,-60 Q 60,0 70,120 Z" fill="#8F5836"/>
      <!-- lush foliage -->
      <circle cx="10" cy="-90" r="70" fill="#2E7D32"/>
      <circle cx="-30" cy="-110" r="50" fill="#388E3C"/>
      <circle cx="50" cy="-110" r="50" fill="#43A047"/>
      <circle cx="10" cy="-130" r="46" fill="#4CAF50"/>
      <!-- leafy branch extending into scene -->
      <path d="M -20,-40 Q -120,-60 -200,-30" stroke="#754425" stroke-width="18" fill="none" stroke-linecap="round"/>
      <ellipse cx="-160" cy="-35" rx="14" ry="8" fill="#4CAF50" transform="rotate(-20 -160 -35)"/>
      <ellipse cx="-120" cy="-55" rx="14" ry="8" fill="#4CAF50" transform="rotate(30 -120 -55)"/>
      <!-- hanging vine -->
      <path d="M -180,-30 Q -210,40 -170,80" stroke="#388E3C" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>
    <!-- wildflowers -->
    <g fill="#FFD166"><circle cx="80" cy="450" r="6"/><circle cx="180" cy="470" r="5"/><circle cx="320" cy="460" r="6"/><circle cx="440" cy="480" r="5"/></g>
    <g fill="#E15554"><circle cx="120" cy="470" r="5"/><circle cx="260" cy="480" r="6"/><circle cx="380" cy="450" r="5"/></g>
    ${extra}`;
}

function bunnyFigure(x, y, pose = 'stand', s = 1, flip = false) {
  const arm = `fill="#FFFFFF" stroke="#D0DBE5" stroke-width="3"`;
  let arms = `<ellipse cx="-16" cy="-24" rx="7" ry="12" ${arm}/><ellipse cx="16" cy="-24" rx="7" ry="12" ${arm}/>`;
  let prop = '';
  if (pose === 'carrot') {
    arms = `<ellipse cx="-12" cy="-26" rx="8" ry="10" ${arm} transform="rotate(20 -12 -26)"/>
            <ellipse cx="12" cy="-26" rx="8" ry="10" ${arm} transform="rotate(-20 12 -26)"/>`;
    prop = `<g transform="translate(0, -22) rotate(15) scale(0.9)">
      <polygon points="-8,0 8,0 0,36" fill="#F49E4C"/>
      <path d="M -4,0 l -6,-12 M 0,0 l 0,-14 M 4,0 l 6,-12" stroke="#388E3C" stroke-width="3" stroke-linecap="round"/>
    </g>`;
  } else if (pose === 'shock') {
    arms = `<ellipse cx="-24" cy="-44" rx="7" ry="14" ${arm} transform="rotate(-30 -24 -44)"/>
            <ellipse cx="24" cy="-44" rx="7" ry="14" ${arm} transform="rotate(30 24 -44)"/>`;
  } else if (pose === 'run') {
    arms = `<ellipse cx="-22" cy="-20" rx="14" ry="6" ${arm} transform="rotate(20 -22 -20)"/>
            <ellipse cx="22" cy="-28" rx="14" ry="6" ${arm} transform="rotate(-20 22 -28)"/>`;
  }
  return g(x, y, s, flip, `
    ${shadow(0, 2, 38)}
    <!-- fluffy tail -->
    <circle cx="-28" cy="-18" r="10" fill="#FFFFFF" stroke="#D0DBE5" stroke-width="2"/>
    <!-- feet -->
    <ellipse cx="-16" cy="-4" rx="12" ry="7" fill="#FFFFFF" stroke="#D0DBE5" stroke-width="2"/>
    <ellipse cx="16" cy="-4" rx="12" ry="7" fill="#FFFFFF" stroke="#D0DBE5" stroke-width="2"/>
    <!-- body -->
    <ellipse cx="0" cy="-24" rx="26" ry="22" fill="#FFFFFF" stroke="#D0DBE5" stroke-width="2.5"/>
    <ellipse cx="0" cy="-22" rx="18" ry="15" fill="#F8FAFC"/>
    <!-- ears -->
    <g transform="translate(0, -68)">
      <ellipse cx="-14" cy="-22" rx="8" ry="24" fill="#FFFFFF" stroke="#D0DBE5" stroke-width="2.5" transform="rotate(-10 -14 -22)"/>
      <ellipse cx="-14" cy="-22" rx="4" ry="17" fill="#FADBD8" transform="rotate(-10 -14 -22)"/>
      <ellipse cx="14" cy="-22" rx="8" ry="24" fill="#FFFFFF" stroke="#D0DBE5" stroke-width="2.5" transform="rotate(10 14 -22)"/>
      <ellipse cx="14" cy="-22" rx="4" ry="17" fill="#FADBD8" transform="rotate(10 14 -22)"/>
    </g>
    <!-- head -->
    <circle cx="0" cy="-56" r="24" fill="#FFFFFF" stroke="#D0DBE5" stroke-width="2.5"/>
    <!-- eyes -->
    ${pose === 'shock' ? `
      <circle cx="-9" cy="-58" r="6" fill="#332A20"/><circle cx="-10" cy="-60" r="2.5" fill="#FFFFFF"/>
      <circle cx="9" cy="-58" r="6" fill="#332A20"/><circle cx="8" cy="-60" r="2.5" fill="#FFFFFF"/>
      <ellipse cx="0" cy="-46" rx="4" ry="7" fill="#E76F51"/>
    ` : pose === 'laugh' ? `
      <path d="M -13,-58 q 5,-6 10,0" stroke="#332A20" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 3,-58 q 5,-6 10,0" stroke="#332A20" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M -7,-48 q 7,8 14,0" stroke="#5A4633" stroke-width="3" fill="#E76F51" stroke-linecap="round"/>
    ` : `
      <circle cx="-8" cy="-58" r="4.2" fill="#332A20"/><circle cx="-9" cy="-60" r="1.5" fill="#FFFFFF"/>
      <circle cx="8" cy="-58" r="4.2" fill="#332A20"/><circle cx="7" cy="-60" r="1.5" fill="#FFFFFF"/>
      <path d="M -6,-48 q 6,5 12,0" stroke="#5A4633" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    `}
    <!-- cheeks & nose -->
    <circle cx="-15" cy="-50" r="4" fill="#FADBD8"/>
    <circle cx="15" cy="-50" r="4" fill="#FADBD8"/>
    <polygon points="-3,-52 3,-52 0,-49" fill="#E76F51"/>
    ${arms}
    ${prop}
  `);
}

function monkeyFigure(x, y, pose = 'hang', s = 1, flip = false) {
  let body = '';
  if (pose === 'hang') {
    body = `
      <!-- tail wrapped around branch above -->
      <path d="M 0,30 Q -30,0 -20,-40 Q -10,-80 20,-70 Q 30,-50 10,-40" stroke="#8F5836" stroke-width="9" fill="none" stroke-linecap="round"/>
      <!-- hanging body upside down -->
      <ellipse cx="0" cy="20" rx="20" ry="24" fill="#8F5836"/>
      <ellipse cx="0" cy="20" rx="14" ry="17" fill="#FAD7A0"/>
      <!-- arms waving -->
      <path d="M -16,10 Q -36,0 -44,-16" stroke="#8F5836" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M 16,10 Q 36,20 46,36" stroke="#8F5836" stroke-width="8" fill="none" stroke-linecap="round"/>
      <!-- head -->
      <g transform="translate(0, 56)">
        <circle cx="-20" cy="-2" r="9" fill="#8F5836"/><circle cx="-20" cy="-2" r="5" fill="#FAD7A0"/>
        <circle cx="20" cy="-2" r="9" fill="#8F5836"/><circle cx="20" cy="-2" r="5" fill="#FAD7A0"/>
        <circle cx="0" cy="0" r="22" fill="#8F5836"/>
        <ellipse cx="-7" cy="-3" rx="9" ry="10" fill="#FAD7A0"/>
        <ellipse cx="7" cy="-3" rx="9" ry="10" fill="#FAD7A0"/>
        <ellipse cx="0" cy="7" rx="13" ry="10" fill="#FAD7A0"/>
        <circle cx="-7" cy="-4" r="3.6" fill="#332A20"/><circle cx="-8" cy="-6" r="1.3" fill="#FFFFFF"/>
        <circle cx="7" cy="-4" r="3.6" fill="#332A20"/><circle cx="6" cy="-6" r="1.3" fill="#FFFFFF"/>
        <path d="M -8,8 Q 0,16 8,8" stroke="#8F5836" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>
      <!-- holding banana -->
      <g transform="translate(50, 40) rotate(-20) scale(0.8)">
        <path d="M -16,-20 Q 14,-24 20,16 Q 18,22 14,22 Q 6,12 -12,-12 Z" fill="#FFD166"/>
      </g>`;
  } else {
    body = `
      ${shadow(0, 2, 40)}
      <!-- curly tail -->
      <path d="M -18,-24 Q -48,-30 -44,-60 Q -38,-80 -18,-70" stroke="#8F5836" stroke-width="8" fill="none" stroke-linecap="round"/>
      <!-- legs -->
      <ellipse cx="-12" cy="-4" rx="8" ry="12" fill="#8F5836"/>
      <ellipse cx="12" cy="-4" rx="8" ry="12" fill="#8F5836"/>
      <!-- body -->
      <ellipse cx="0" cy="-26" rx="22" ry="24" fill="#8F5836"/>
      <ellipse cx="0" cy="-24" rx="15" ry="17" fill="#FAD7A0"/>
      <!-- head -->
      <g transform="translate(0, -60)">
        <circle cx="-22" cy="0" r="10" fill="#8F5836"/><circle cx="-22" cy="0" r="5.5" fill="#FAD7A0"/>
        <circle cx="22" cy="0" r="10" fill="#8F5836"/><circle cx="22" cy="0" r="5.5" fill="#FAD7A0"/>
        <circle cx="0" cy="0" r="23" fill="#8F5836"/>
        <ellipse cx="-7" cy="-3" rx="9" ry="10" fill="#FAD7A0"/>
        <ellipse cx="7" cy="-3" rx="9" ry="10" fill="#FAD7A0"/>
        <ellipse cx="0" cy="8" rx="14" ry="11" fill="#FAD7A0"/>
        <circle cx="-7" cy="-4" r="3.6" fill="#332A20"/><circle cx="-8" cy="-6" r="1.3" fill="#FFFFFF"/>
        <circle cx="7" cy="-4" r="3.6" fill="#332A20"/><circle cx="6" cy="-6" r="1.3" fill="#FFFFFF"/>
        <path d="M -8,8 Q 0,18 8,8" stroke="#8F5836" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>
      <!-- arms -->
      <path d="M -16,-34 Q -32,-30 -38,-16" stroke="#8F5836" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M 16,-34 Q 32,-30 38,-16" stroke="#8F5836" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  }
  return g(x, y, s, flip, body);
}

function bmCover() {
  return artScene('arnab1-cover.jpg', 'Bunny and Monkey in the meadow');
}

function bm1() {   // هَذَا أَرْنَبٌ لَطِيف.
  return artScene('arnab1-1.jpg', 'Bunny munching a carrot in the meadow');
}

function bm2() {   // وَهَذَا قِرْدٌ مَرِح!
  return artScene('arnab1-2.jpg', 'Monkey hanging upside down with a banana');
}

function bm3() {   // الْقِرْدُ مَعَهُ مَوْزٌ كَبِير.
  return artScene('arnab1-3.jpg', 'Monkey holding a giant banana');
}

function bm4() {   // أَخَذَ الْقِرْدُ جَزَرَ الْأَرْنَب!
  return artScene('arnab1-4.jpg', 'Monkey snatching the carrot from Bunny');
}

function bm5() {   // الْأَرْنَبُ يَجْرِي وَرَاءَ الْقِرْد!
  return artScene('arnab1-5.jpg', 'Bunny chasing Monkey through the flower garden');
}

function bm6() {   // أَكَلَ الْقِرْدُ مَوْزًا وَأَعْطَى الْجَزَر.
  return artScene('arnab1-6.jpg', 'Monkey eating banana and giving the carrot back to Bunny');
}

function bm7() {   // ضَحِكَ الْأَرْنَبُ وَالْقِرْد!
  return artScene('arnab1-7.jpg', 'Bunny and Monkey laughing together under the rainbow');
}

function bmEnd() {
  return artScene('arnab1-end.jpg', 'Bunny and Monkey best friends under the rainbow');
}

const BOOK_ARNAB = {
  id: 'arnab-2',
  level: 2,
  title: 'الْأَرْنَبُ وَالْقِرْد',
  titleEn: 'Bunny and Monkey',
  tag: 'أَرْنَب · قِرْد — a funny comic story',
  words: [
    { ar: 'أَرْنَب',  en: 'a bunny',   icon: LICONS.arnab },
    { ar: 'قِرْد',    en: 'a monkey',  icon: LICONS.qird },
    { ar: 'جَزَر',    en: 'a carrot',  icon: LICONS.jazar },
    { ar: 'مَوْز',    en: 'a banana',  icon: LICONS.mawz },
    { ar: 'أَكَلَ',   en: 'he ate',    icon: LICONS.khubz },
    { ar: 'ضَحِكَ',  en: 'he laughed', icon: LICONS.heart2 },
    { ar: 'يَجْرِي',  en: 'he runs',   icon: LICONS.sneaker },
    { ar: 'كَبِير',   en: 'big',       icon: LICONS.rel_big },
  ],
  pages: [
    { type: 'cover', svg: bmCover },
    { type: 'words' },
    { type: 'story', svg: bm1, ar: [{ t: 'هَذَا' }, { t: 'أَرْنَبٌ' }, { t: 'لَطِيف.' }], en: 'This is a gentle bunny.' },
    { type: 'story', svg: bm2, ar: [{ t: 'وَهَذَا' }, { t: 'قِرْدٌ' }, { t: 'مَرِح!' }], en: 'And this is a playful monkey!' },
    { type: 'story', svg: bm3, ar: [{ t: 'الْقِرْدُ' }, { t: 'مَعَهُ' }, { t: 'مَوْزٌ' }, { t: 'كَبِير.' }], en: 'The monkey has a big banana.' },
    { type: 'story', svg: bm4, ar: [{ t: 'أَخَذَ' }, { t: 'الْقِرْدُ' }, { t: 'جَزَرَ' }, { t: 'الْأَرْنَب!' }], en: 'The monkey took the bunny\'s carrot!' },
    { type: 'story', svg: bm5, ar: [{ t: 'الْأَرْنَبُ' }, { t: 'يَجْرِي' }, { t: 'وَرَاءَ' }, { t: 'الْقِرْد!' }], en: 'The bunny runs after the monkey!' },
    { type: 'story', svg: bm6, ar: [{ t: 'أَكَلَ' }, { t: 'الْقِرْدُ' }, { t: 'مَوْزًا' }, { t: 'وَأَعْطَى' }, { t: 'الْجَزَر.' }], en: 'The monkey ate a banana and gave the carrot.' },
    { type: 'story', svg: bm7, ar: [{ t: 'ضَحِكَ' }, { t: 'الْأَرْنَبُ' }, { t: 'وَالْقِرْد!' }], en: 'The bunny and the monkey laughed!' },
    { type: 'game' },
    { type: 'end', svg: bmEnd },
  ],
  game: [
    { say: 'أَرْنَب', opts: ['arnab', 'qird', 'jazar'], ans: 0 },
    { say: 'قِرْد',   opts: ['jazar', 'qird', 'mawz'], ans: 1 },
    { say: 'مَوْز',   opts: ['arnab', 'qird', 'mawz'], ans: 2 },
  ],
};

if (typeof BOOKS !== 'undefined') {
  BOOKS.push(BOOK_MADHA, BOOK_HIDHAA, BOOK_YAWMI, BOOK_ARNAB);
  if (typeof renderShelf === 'function' && typeof document !== 'undefined'
      && document.querySelector && document.querySelector('#bookGrid')) renderShelf();
}
