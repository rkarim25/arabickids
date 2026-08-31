/* ————— Hikayat · Level 0 — الأَصْوَات, the sounds ————————————————————————
   DESIGN.md rules 1–3: ear first, picture carries the meaning, no writing.

   A pre-reader does not learn a letter by drawing it. They learn that قَمَر
   *starts with a /q/ noise*, and only later that the noise has a shape. So the
   data here leads with the SOUND and a picture word that contains it; the glyph
   is shown because it is nice to see, never because it must be copied.

   Every keyword is a word that actually occurs in the Qur'an and that a
   three-year-old can recognise in a picture. Where no such word exists for a
   letter, an everyday word is used and `everyday: true` says so out loud rather
   than reaching for something obscure a child will never meet.
   ========================================================================= */
'use strict';

/* ---------- the pictures -------------------------------------------------
   Twemoji (CC-BY 4.0, github.com/jdecked/twemoji), vendored into pic/ so the
   site still works offline and prints. Attribution is in README.md and in the
   page footer.

   Hand-drawing these myself was the wrong call. Reza's verdict, 2026-08-31:
   "the diagrams are really bad" — and he was right. A picture a three-year-old
   cannot name at a glance fails rule 2 outright, because the picture IS the
   meaning; mine needed explaining, which means the card taught nothing.

   TWO are still hand-drawn, and deliberately: no emoji exists for تِين (Surah
   At-Tin) or هُدْهُد (the hoopoe of Surah An-Naml), and both words are worth
   keeping. The alternative was substituting a near-miss — an eagle standing in
   for a crow — which teaches a child the wrong animal. A specific drawing
   beats a confident wrong one. */

const LC = { sun: '#FFD166', purple: '#A98CD0', green: '#7BC08F', greenD: '#5FA777',
             ink: '#3B2A1F', white: '#FFFFFF', orange: '#D98E4A' };
const ic = inner => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const pic = (name, alt) => `<img class="tw" src="pic/${name}.svg" alt="${alt}">`;

/* key -> the English the alt text should say */
const TW = {
  ard: 'earth', bab: 'a door', thamar: 'fruit', jabal: 'a mountain',
  hoot: 'a whale', khubz: 'bread', dar: 'a house', dhib: 'a wolf',
  reeh: 'wind', zaytoon: 'olives', samaa: 'the sky', shams: 'the sun',
  salah: 'prayer', difda: 'a frog', tayr: 'a bird', dhill: 'shade',
  ayn: 'an eye', ghurab: 'a crow', feel: 'an elephant', qamar: 'the moon',
  kitab: 'a book', layl: 'night', maa: 'water', najm: 'a star',
  walad: 'a child', yad: 'a hand', sahab: 'a cloud', box: 'a box',
  bed: 'a bed', chair: 'a chair', cat2: 'a cat', kitchen: 'a kitchen',
  room: 'a room', heart2: 'love',
};

const LICONS = {};
for (const [k, alt] of Object.entries(TW)) LICONS[k] = pic(k, alt);

/* the two with no emoji */
LICONS.teen = ic(`<rect width="100" height="100" rx="22" fill="#EFE4F3"/>
  <path d="M50 34 C30 34 24 54 30 68 C35 82 65 82 70 68 C76 54 70 34 50 34 Z" fill="${LC.purple}"/>
  <path d="M50 34 C42 34 38 40 38 44 C44 40 56 40 62 44 C62 40 58 34 50 34 Z" fill="#7E63A8"/>
  <path d="M50 34 v-12" stroke="${LC.greenD}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="41" cy="22" rx="11" ry="6" fill="${LC.green}" transform="rotate(-20 41 22)"/>`);

LICONS.hudhud = ic(`<rect width="100" height="100" rx="22" fill="#EFF3E4"/>
  <ellipse cx="46" cy="62" rx="21" ry="16" fill="${LC.orange}"/>
  <circle cx="64" cy="48" r="11" fill="#E0A05F"/>
  <g fill="#C9762F"><path d="M58 38 l 2,-12 4,12 Z"/><path d="M64 36 l 2,-14 4,14 Z"/><path d="M70 38 l 3,-12 3,12 Z"/></g>
  <path d="M74 50 l 16,3 -16,4 Z" fill="${LC.ink}"/>
  <circle cx="66" cy="46" r="2.4" fill="${LC.ink}"/>
  <path d="M30 58 h26 v6 h-26 Z" fill="${LC.white}"/>
  <path d="M30 68 h26 v5 h-26 Z" fill="#2A2E38"/>
  <path d="M25 70 l -14,8 8,-14 Z" fill="#2A2E38"/>`);

/* ---------- the relations ------------------------------------------------
   فِي، فَوْقَ، تَحْتَ، وَ، مَنْ cannot be drawn as an OBJECT — that is what went
   wrong in the Level 2 book, where "and" was illustrated with an eye and
   "kitchen" with a loaf. A function word needs its RELATION drawn: the same
   ball and the same box every time, moved. Keeping the two props identical
   across the set is the point — the only thing that changes is the position,
   so the position is what the child reads. */
const BALL = (x, y) => `<circle cx="${x}" cy="${y}" r="13" fill="#E15554"/>
  <path d="M ${x - 9},${y - 5} q 9,-6 18,0" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
const TABLE = `<rect x="14" y="52" width="72" height="9" rx="4" fill="#B5764A"/>
  <rect x="20" y="61" width="8" height="30" fill="#8F5836"/><rect x="72" y="61" width="8" height="30" fill="#8F5836"/>`;
const CRATE = `<rect x="22" y="44" width="56" height="44" rx="5" fill="#C89A67"/>
  <rect x="22" y="44" width="56" height="15" rx="5" fill="#DBB88A"/>`;

LICONS.rel_in    = ic(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>${CRATE}${BALL(50, 68)}`);
LICONS.rel_on    = ic(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>${TABLE}${BALL(50, 39)}`);
LICONS.rel_under = ic(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>${TABLE}${BALL(50, 76)}`);
/* "and" = two things held together, not one thing */
LICONS.rel_and   = ic(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>
  <circle cx="30" cy="50" r="17" fill="#E15554"/><circle cx="70" cy="50" r="17" fill="#2A9D8F"/>
  <rect x="42" y="45" width="16" height="10" rx="5" fill="#7A6A55"/>`);
/* "who?" = a face you cannot see yet */
LICONS.rel_who   = ic(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>
  <circle cx="50" cy="44" r="22" fill="#C9BEDD"/>
  <path d="M22 88 a28 28 0 0 1 56 0 Z" fill="#C9BEDD"/>
  <text x="50" y="58" font-size="34" font-weight="800" text-anchor="middle" fill="#7A6A55"
        font-family="'Baloo Bhaijaan 2',sans-serif">؟</text>`);
/* "this" = a hand pointing at it */
LICONS.rel_this  = ic(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>
  <circle cx="62" cy="40" r="16" fill="#E15554"/>
  <path d="M14 62 h26 v14 h-26 Z" fill="#C98F66"/>
  <path d="M40 58 l 16,8 -16,8 Z" fill="#C98F66"/>`);
/* big / small: the SAME shape twice, only the size changes */
LICONS.rel_big   = ic(`<rect width="100" height="100" rx="22" fill="#EFE4F3"/>
  <circle cx="38" cy="54" r="30" fill="#2A9D8F"/><circle cx="80" cy="76" r="11" fill="#C9BEDD"/>`);
LICONS.rel_small = ic(`<rect width="100" height="100" rx="22" fill="#EFE4F3"/>
  <circle cx="66" cy="54" r="30" fill="#C9BEDD"/><circle cx="24" cy="76" r="11" fill="#2A9D8F"/>`);
/* "where?" = the box, empty, and a question */
LICONS.rel_where = ic(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>${CRATE}
  <text x="50" y="78" font-size="34" font-weight="800" text-anchor="middle" fill="#7A6A55"
        font-family="'Baloo Bhaijaan 2',sans-serif">؟</text>`);

/* ---------- the 28 letters -----------------------------------------------
   forms = [isolated, initial, medial, final]. `joins:false` marks the six
   letters that never connect to the letter AFTER them (ا د ذ ر ز و) — the
   thing that confuses every beginner, shown as a picture rather than a rule. */

const LETTERS = [
  { l: 'ا', name: 'أَلِف', sound: 'a',  forms: ['ا', 'ا', 'ـا', 'ـا'], joins: false, word: 'أَرْض',     en: 'earth',     icon: 'ard',     quran: 'الْأَرْض — البقرة ٢٢' },
  { l: 'ب', name: 'بَاء', sound: 'b',  forms: ['ب', 'بـ', 'ـبـ', 'ـب'], joins: true,  word: 'بَاب',     en: 'a door',    icon: 'bab',     quran: 'الْبَاب — البقرة ٥٨' },
  { l: 'ت', name: 'تَاء', sound: 't',  forms: ['ت', 'تـ', 'ـتـ', 'ـت'], joins: true,  word: 'تِين',     en: 'a fig',     icon: 'teen',    quran: 'وَالتِّين — التين ١' },
  { l: 'ث', name: 'ثَاء', sound: 'th', forms: ['ث', 'ثـ', 'ـثـ', 'ـث'], joins: true,  word: 'ثَمَر',    en: 'fruit',     icon: 'thamar',  quran: 'الثَّمَرَات — البقرة ٢٢' },
  { l: 'ج', name: 'جِيم', sound: 'j',  forms: ['ج', 'جـ', 'ـجـ', 'ـج'], joins: true,  word: 'جَبَل',    en: 'a mountain',icon: 'jabal',   quran: 'الْجِبَال — النبأ ٧' },
  { l: 'ح', name: 'حَاء', sound: 'ḥ',  forms: ['ح', 'حـ', 'ـحـ', 'ـح'], joins: true,  word: 'حُوت',     en: 'a whale',   icon: 'hoot',    quran: 'الْحُوت — الصافات ١٤٢' },
  { l: 'خ', name: 'خَاء', sound: 'kh', forms: ['خ', 'خـ', 'ـخـ', 'ـخ'], joins: true,  word: 'خُبْز',    en: 'bread',     icon: 'khubz',   quran: 'خُبْزًا — يوسف ٣٦' },
  { l: 'د', name: 'دَال', sound: 'd',  forms: ['د', 'د', 'ـد', 'ـد'],   joins: false, word: 'دَار',     en: 'a home',    icon: 'dar',     quran: 'الدَّار الْآخِرَة — العنكبوت ٦٤' },
  { l: 'ذ', name: 'ذَال', sound: 'dh', forms: ['ذ', 'ذ', 'ـذ', 'ـذ'],   joins: false, word: 'ذِئْب',    en: 'a wolf',    icon: 'dhib',    quran: 'الذِّئْب — يوسف ١٣' },
  { l: 'ر', name: 'رَاء', sound: 'r',  forms: ['ر', 'ر', 'ـر', 'ـر'],   joins: false, word: 'رِيح',     en: 'wind',      icon: 'reeh',    quran: 'الرِّيَاح — البقرة ١٦٤' },
  { l: 'ز', name: 'زَاي', sound: 'z',  forms: ['ز', 'ز', 'ـز', 'ـز'],   joins: false, word: 'زَيْتُون', en: 'olives',    icon: 'zaytoon', quran: 'وَالزَّيْتُون — التين ١' },
  { l: 'س', name: 'سِين', sound: 's',  forms: ['س', 'سـ', 'ـسـ', 'ـس'], joins: true,  word: 'سَمَاء',   en: 'the sky',   icon: 'samaa',   quran: 'السَّمَاء — البقرة ٢٢' },
  { l: 'ش', name: 'شِين', sound: 'sh', forms: ['ش', 'شـ', 'ـشـ', 'ـش'], joins: true,  word: 'شَمْس',    en: 'the sun',   icon: 'shams',   quran: 'الشَّمْس — الشمس ١' },
  { l: 'ص', name: 'صَاد', sound: 'ṣ',  forms: ['ص', 'صـ', 'ـصـ', 'ـص'], joins: true,  word: 'صَلَاة',   en: 'prayer',    icon: 'salah',   quran: 'الصَّلَاة — البقرة ٣' },
  { l: 'ض', name: 'ضَاد', sound: 'ḍ',  forms: ['ض', 'ضـ', 'ـضـ', 'ـض'], joins: true,  word: 'ضِفْدَع',  en: 'a frog',    icon: 'difda',   quran: 'الضَّفَادِع — الأعراف ١٣٣' },
  { l: 'ط', name: 'طَاء', sound: 'ṭ',  forms: ['ط', 'طـ', 'ـطـ', 'ـط'], joins: true,  word: 'طَيْر',    en: 'a bird',    icon: 'tayr',    quran: 'الطَّيْر — الفيل ٣' },
  { l: 'ظ', name: 'ظَاء', sound: 'ẓ',  forms: ['ظ', 'ظـ', 'ـظـ', 'ـظ'], joins: true,  word: 'ظِلّ',     en: 'shade',     icon: 'dhill',   quran: 'ظِلّ — الواقعة ٣٠' },
  { l: 'ع', name: 'عَيْن', sound: 'ʿa',forms: ['ع', 'عـ', 'ـعـ', 'ـع'], joins: true,  word: 'عَيْن',    en: 'an eye',    icon: 'ayn',     quran: 'عَيْن — الغاشية ١٢' },
  { l: 'غ', name: 'غَيْن', sound: 'gh',forms: ['غ', 'غـ', 'ـغـ', 'ـغ'], joins: true,  word: 'غُرَاب',   en: 'a crow',    icon: 'ghurab',  quran: 'غُرَابًا — المائدة ٣١' },
  { l: 'ف', name: 'فَاء', sound: 'f',  forms: ['ف', 'فـ', 'ـفـ', 'ـف'], joins: true,  word: 'فِيل',     en: 'an elephant',icon: 'feel',   quran: 'سُورَة الْفِيل ١٠٥' },
  { l: 'ق', name: 'قَاف', sound: 'q',  forms: ['ق', 'قـ', 'ـقـ', 'ـق'], joins: true,  word: 'قَمَر',    en: 'the moon',  icon: 'qamar',   quran: 'سُورَة الْقَمَر ٥٤' },
  { l: 'ك', name: 'كَاف', sound: 'k',  forms: ['ك', 'كـ', 'ـكـ', 'ـك'], joins: true,  word: 'كِتَاب',   en: 'a book',    icon: 'kitab',   quran: 'الْكِتَاب — البقرة ٢' },
  { l: 'ل', name: 'لَام', sound: 'l',  forms: ['ل', 'لـ', 'ـلـ', 'ـل'], joins: true,  word: 'لَيْل',    en: 'night',     icon: 'layl',    quran: 'سُورَة اللَّيْل ٩٢' },
  { l: 'م', name: 'مِيم', sound: 'm',  forms: ['م', 'مـ', 'ـمـ', 'ـم'], joins: true,  word: 'مَاء',     en: 'water',     icon: 'maa',     quran: 'مَاء — البقرة ٢٢' },
  { l: 'ن', name: 'نُون', sound: 'n',  forms: ['ن', 'نـ', 'ـنـ', 'ـن'], joins: true,  word: 'نَجْم',    en: 'a star',    icon: 'najm',    quran: 'سُورَة النَّجْم ٥٣' },
  { l: 'ه', name: 'هَاء', sound: 'h',  forms: ['ه', 'هـ', 'ـهـ', 'ـه'], joins: true,  word: 'هُدْهُد',  en: 'a hoopoe',  icon: 'hudhud',  quran: 'الْهُدْهُد — النمل ٢٠' },
  { l: 'و', name: 'وَاو', sound: 'w',  forms: ['و', 'و', 'ـو', 'ـو'],   joins: false, word: 'وَلَد',    en: 'a child',   icon: 'walad',   quran: 'وَلَد — مريم ٨٨' },
  { l: 'ي', name: 'يَاء', sound: 'y',  forms: ['ي', 'يـ', 'ـيـ', 'ـي'], joins: true,  word: 'يَد',      en: 'a hand',    icon: 'yad',     quran: 'يَد — الفتح ١٠' },
];

/* The three harakat, taught the only way that means anything at this age:
   the SAME letter making three different noises. */
const HARAKAT = [
  { mark: 'َ',  name: 'فَتْحَة', en: 'fatha',  says: 'a', demo: 'بَ' },
  { mark: 'ِ',  name: 'كَسْرَة', en: 'kasra',  says: 'i', demo: 'بِ' },
  { mark: 'ُ',  name: 'ضَمَّة',  name2: '', en: 'damma', says: 'u', demo: 'بُ' },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LETTERS, HARAKAT, LICONS };
}
