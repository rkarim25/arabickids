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

/* ---------- the picture kit ----------------------------------------------
   Flat, cheerful, same palette as the storybooks. 100x100, no strokes finer
   than 3 — these get printed at card size and thin lines vanish. */

const LC = {
  sky: '#BDE3F0', sun: '#FFD166', sand: '#EFC28E', sea: '#5AA9D6',
  green: '#7BC08F', greenD: '#5FA777', red: '#E15554', pink: '#F2A5A5',
  brown: '#B5764A', brownD: '#8F5836', grey: '#9AA5AD', greyD: '#6E7A83',
  white: '#FFFFFF', ink: '#3B2A1F', purple: '#A98CD0', teal: '#2A9D8F',
  orange: '#F49E4C', night: '#2E3F63', gold: '#E8B54B', skin: '#C98F66',
};

const ic = inner => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const sky = (f = LC.sky) => `<rect width="100" height="100" rx="22" fill="${f}"/>`;
const grd = (y = 78, f = LC.green) => `<path d="M0 ${y} Q50 ${y - 12} 100 ${y} L100 100 L0 100 Z" fill="${f}"/>`;

const LICONS = {
  /* ا — أَرْض, the earth */
  ard: ic(`${sky()}${grd(64, LC.greenD)}${grd(74, LC.green)}
    <circle cx="26" cy="26" r="11" fill="${LC.sun}"/>
    <ellipse cx="62" cy="70" rx="13" ry="5" fill="${LC.brown}"/>
    <path d="M62 70 v-13" stroke="${LC.brownD}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="62" cy="52" r="10" fill="${LC.greenD}"/>`),

  /* ب — بَاب, a door */
  bab: ic(`${sky('#F6EBD8')}
    <rect x="26" y="20" width="48" height="70" rx="6" fill="${LC.brown}"/>
    <rect x="32" y="26" width="36" height="58" rx="4" fill="${LC.brownD}"/>
    <rect x="38" y="32" width="24" height="20" rx="3" fill="${LC.sun}" opacity=".55"/>
    <circle cx="63" cy="58" r="4.5" fill="${LC.gold}"/>`),

  /* ت — تِين, a fig */
  teen: ic(`${sky('#EFE4F3')}
    <path d="M50 34 C30 34 24 54 30 68 C35 82 65 82 70 68 C76 54 70 34 50 34 Z" fill="${LC.purple}"/>
    <path d="M50 34 C42 34 38 40 38 44 C44 40 56 40 62 44 C62 40 58 34 50 34 Z" fill="#7E63A8"/>
    <path d="M50 34 v-12" stroke="${LC.greenD}" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="41" cy="22" rx="11" ry="6" fill="${LC.green}" transform="rotate(-20 41 22)"/>`),

  /* ث — ثَمَر, fruit */
  thamar: ic(`${sky('#F6EBD8')}
    <circle cx="38" cy="58" r="19" fill="${LC.red}"/>
    <circle cx="64" cy="64" r="15" fill="${LC.orange}"/>
    <path d="M38 39 v-9" stroke="${LC.greenD}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="47" cy="31" rx="10" ry="5" fill="${LC.green}" transform="rotate(-18 47 31)"/>
    <path d="M31 52 q 5,-5 11,-3" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".8"/>`),

  /* ج — جَبَل, a mountain */
  jabal: ic(`${sky()}
    <path d="M4 84 L34 34 L54 62 L68 42 L96 84 Z" fill="${LC.greyD}"/>
    <path d="M34 34 L46 54 L34 58 L24 50 Z" fill="${LC.white}"/>
    <path d="M68 42 L76 54 L68 56 L61 50 Z" fill="${LC.white}"/>
    <path d="M0 84 h100 v16 h-100 Z" fill="${LC.green}"/>`),

  /* ح — حُوت, a whale */
  hoot: ic(`${sky()}
    <path d="M0 62 q 25,-9 50,0 t 50,0 v38 H0 Z" fill="${LC.sea}"/>
    <ellipse cx="46" cy="60" rx="30" ry="19" fill="#4E7FA8"/>
    <path d="M74 60 l 20,-14 v28 Z" fill="#4E7FA8"/>
    <circle cx="30" cy="54" r="4" fill="${LC.white}"/><circle cx="29" cy="54" r="2" fill="${LC.ink}"/>
    <path d="M22 66 q 8,5 17,2" stroke="#3D6787" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M44 41 q 3,-12 12,-15" stroke="${LC.white}" stroke-width="4" fill="none" stroke-linecap="round"/>`),

  /* خ — خُبْز, bread */
  khubz: ic(`${sky('#F6EBD8')}
    <path d="M20 62 q 0,-26 30,-26 t 30,26 q 0,18 -30,18 t -30,-18 Z" fill="${LC.gold}"/>
    <path d="M20 62 q 0,18 30,18 t 30,-18 q -30,10 -60,0 Z" fill="#C9962F"/>
    <path d="M36 50 q 6,-6 12,0 M56 48 q 6,-6 12,0" stroke="#C9962F" stroke-width="3.5" fill="none" stroke-linecap="round"/>`),

  /* د — دَار, a house */
  dar: ic(`${sky()}
    <path d="M50 20 L88 50 H12 Z" fill="${LC.red}"/>
    <rect x="22" y="50" width="56" height="38" fill="#F6EBD8"/>
    <rect x="42" y="62" width="18" height="26" rx="3" fill="${LC.brown}"/>
    <rect x="27" y="58" width="12" height="12" rx="2" fill="${LC.sky}"/>
    <rect x="63" y="58" width="12" height="12" rx="2" fill="${LC.sky}"/>
    ${grd(88, LC.green)}`),

  /* ذ — ذِئْب, a wolf */
  dhib: ic(`${sky('#DDE6EE')}
    <path d="M30 44 l -6,-16 14,7 Z" fill="${LC.greyD}"/>
    <path d="M70 44 l 6,-16 -14,7 Z" fill="${LC.greyD}"/>
    <ellipse cx="50" cy="58" rx="24" ry="21" fill="${LC.grey}"/>
    <path d="M50 62 l -13,14 q 13,7 26,0 Z" fill="#C3CCD3"/>
    <circle cx="40" cy="54" r="4" fill="${LC.ink}"/><circle cx="60" cy="54" r="4" fill="${LC.ink}"/>
    <ellipse cx="50" cy="72" rx="5" ry="4" fill="${LC.ink}"/>`),

  /* ر — رِيح, wind */
  reeh: ic(`${sky()}
    <path d="M14 38 h44 a9 9 0 1 0 -9,-9" stroke="${LC.white}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M10 56 h56 a9 9 0 1 1 -9,9" stroke="${LC.white}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M18 74 h32 a7 7 0 1 0 -7,-7" stroke="${LC.white}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".8"/>`),

  /* ز — زَيْتُون, olives */
  zaytoon: ic(`${sky('#EFF3E4')}
    <path d="M50 84 v-34" stroke="${LC.brownD}" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="34" cy="46" rx="15" ry="8" fill="${LC.greenD}" transform="rotate(-22 34 46)"/>
    <ellipse cx="66" cy="42" rx="15" ry="8" fill="${LC.green}" transform="rotate(20 66 42)"/>
    <ellipse cx="42" cy="60" rx="8" ry="10" fill="#4E6B3A"/>
    <ellipse cx="60" cy="62" rx="8" ry="10" fill="#6B8B4A"/>
    <ellipse cx="40" cy="57" rx="2.5" ry="3" fill="#fff" opacity=".5"/>`),

  /* س — سَمَاء, the sky */
  samaa: ic(`${sky('#9FD4EA')}
    <circle cx="72" cy="28" r="13" fill="${LC.sun}"/>
    <ellipse cx="36" cy="50" rx="22" ry="13" fill="${LC.white}"/>
    <ellipse cx="52" cy="46" rx="15" ry="11" fill="${LC.white}"/>
    <ellipse cx="62" cy="70" rx="18" ry="10" fill="${LC.white}" opacity=".85"/>`),

  /* ش — شَمْس, the sun */
  shams: ic(`${sky('#FCE9C0')}
    <g stroke="${LC.orange}" stroke-width="6" stroke-linecap="round">
      <path d="M50 10 v10 M50 80 v10 M10 50 h10 M80 50 h10
               M22 22 l7 7 M71 71 l7 7 M78 22 l-7 7 M29 71 l-7 7"/></g>
    <circle cx="50" cy="50" r="22" fill="${LC.sun}"/>
    <circle cx="43" cy="46" r="3" fill="${LC.ink}"/><circle cx="57" cy="46" r="3" fill="${LC.ink}"/>
    <path d="M42 57 q 8,7 16,0" stroke="${LC.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`),

  /* ص — صَلَاة, prayer */
  salah: ic(`${sky('#E8DFF3')}
    <path d="M30 88 h40 v-30 a20 20 0 0 0 -40,0 Z" fill="${LC.teal}"/>
    <path d="M36 88 h28 v-27 a14 14 0 0 0 -28,0 Z" fill="#F6F1E7"/>
    <path d="M50 26 v-8 M50 18 a5 5 0 1 1 0.01 0" stroke="${LC.gold}" stroke-width="3.5" fill="none"/>
    <circle cx="50" cy="52" r="7" fill="${LC.teal}" opacity=".35"/>`),

  /* ض — ضِفْدَع, a frog */
  difda: ic(`${sky('#DFF0E4')}
    <ellipse cx="50" cy="64" rx="28" ry="20" fill="${LC.green}"/>
    <circle cx="36" cy="42" r="11" fill="${LC.green}"/><circle cx="64" cy="42" r="11" fill="${LC.green}"/>
    <circle cx="36" cy="41" r="6" fill="${LC.white}"/><circle cx="64" cy="41" r="6" fill="${LC.white}"/>
    <circle cx="36" cy="42" r="3" fill="${LC.ink}"/><circle cx="64" cy="42" r="3" fill="${LC.ink}"/>
    <path d="M38 68 q 12,9 24,0" stroke="#4E8A5E" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="24" cy="80" rx="10" ry="5" fill="${LC.greenD}"/><ellipse cx="76" cy="80" rx="10" ry="5" fill="${LC.greenD}"/>`),

  /* ط — طَيْر, a bird */
  tayr: ic(`${sky()}
    <ellipse cx="48" cy="58" rx="22" ry="17" fill="${LC.teal}"/>
    <circle cx="68" cy="46" r="12" fill="${LC.teal}"/>
    <path d="M79 46 l 12,5 -12,5 Z" fill="${LC.sun}"/>
    <circle cx="71" cy="43" r="2.6" fill="${LC.ink}"/>
    <path d="M42 56 q 14,-10 26,2 q -14,10 -26,-2 Z" fill="#1F7F73"/>
    <path d="M28 66 l -14,10 8,-16 Z" fill="#1F7F73"/>`),

  /* ظ — ظِلّ, shade */
  dhill: ic(`${sky('#F4E8CE')}
    <circle cx="74" cy="24" r="11" fill="${LC.sun}"/>
    <path d="M40 80 v-30" stroke="${LC.brownD}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="40" cy="44" r="19" fill="${LC.greenD}"/>
    <circle cx="29" cy="52" r="12" fill="${LC.green}"/>
    <ellipse cx="26" cy="84" rx="30" ry="8" fill="#8E8069" opacity=".55"/>`),

  /* ع — عَيْن, an eye */
  ayn: ic(`${sky('#F6EBD8')}
    <path d="M12 52 q 38,-30 76,0 q -38,30 -76,0 Z" fill="${LC.white}" stroke="${LC.ink}" stroke-width="3.5"/>
    <circle cx="50" cy="52" r="14" fill="${LC.teal}"/>
    <circle cx="50" cy="52" r="6" fill="${LC.ink}"/>
    <circle cx="45" cy="47" r="3" fill="${LC.white}"/>
    <path d="M16 40 q 34,-22 68,0" stroke="${LC.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`),

  /* غ — غُرَاب, a crow */
  ghurab: ic(`${sky('#DDE6EE')}
    <ellipse cx="46" cy="60" rx="23" ry="18" fill="#3A3F4B"/>
    <circle cx="66" cy="46" r="12" fill="#3A3F4B"/>
    <path d="M77 45 l 14,4 -14,5 Z" fill="${LC.gold}"/>
    <circle cx="69" cy="43" r="2.6" fill="${LC.white}"/>
    <path d="M40 56 q 14,-9 25,3 q -14,9 -25,-3 Z" fill="#2A2E38"/>
    <path d="M26 68 l -15,9 9,-15 Z" fill="#2A2E38"/>`),

  /* ف — فِيل, an elephant */
  feel: ic(`${sky('#E6EDF2')}
    <ellipse cx="46" cy="58" rx="27" ry="22" fill="${LC.grey}"/>
    <ellipse cx="24" cy="52" rx="14" ry="16" fill="#8894A0"/>
    <path d="M70 62 q 16,4 14,20 q -1,8 -8,6 q -6,-2 -4,-9" fill="none" stroke="${LC.grey}" stroke-width="10" stroke-linecap="round"/>
    <circle cx="62" cy="48" r="3.4" fill="${LC.ink}"/>
    <rect x="32" y="76" width="10" height="12" rx="4" fill="#8894A0"/>
    <rect x="52" y="76" width="10" height="12" rx="4" fill="#8894A0"/>`),

  /* ق — قَمَر, the moon */
  qamar: ic(`${sky(LC.night)}
    <!-- crescent = a disc with a disc bitten out of it. The obvious two-arc
         path is a trap: the return arc needs a radius >= half the chord, and a
         smaller one is silently scaled up until the two arcs cancel and the
         moon disappears entirely. It did, for weeks. -->
    <circle cx="46" cy="50" r="30" fill="${LC.sun}"/>
    <circle cx="64" cy="42" r="26" fill="${LC.night}"/>
    <circle cx="24" cy="26" r="2.6" fill="#fff"/><circle cx="80" cy="70" r="2.4" fill="#fff"/>
    <circle cx="30" cy="72" r="2" fill="#fff"/>`),

  /* ك — كِتَاب, a book */
  kitab: ic(`${sky('#EFE4F3')}
    <path d="M50 30 q -18,-8 -34,-4 v44 q 16,-4 34,4 Z" fill="${LC.teal}"/>
    <path d="M50 30 q 18,-8 34,-4 v44 q -16,-4 -34,4 Z" fill="#38B2A2"/>
    <path d="M50 30 v44" stroke="#1F7F73" stroke-width="3.5"/>
    <path d="M24 40 h18 M24 50 h18 M58 40 h18 M58 50 h18" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".75"/>`),

  /* ل — لَيْل, night */
  layl: ic(`${sky(LC.night)}
    <circle cx="44" cy="48" r="28" fill="${LC.sun}"/>
    <circle cx="62" cy="40" r="24" fill="${LC.night}"/>
    <circle cx="26" cy="30" r="2.6" fill="#fff"/><circle cx="34" cy="60" r="2.2" fill="#fff"/>
    <circle cx="78" cy="66" r="2.6" fill="#fff"/><circle cx="22" cy="76" r="2" fill="#fff"/>
    <path d="M0 86 h100 v14 H0 Z" fill="#1C2740"/>`),

  /* م — مَاء, water */
  maa: ic(`${sky('#E6F4FA')}
    <path d="M50 16 C34 40 26 52 26 62 a24 24 0 0 0 48 0 C74 52 66 40 50 16 Z" fill="${LC.sea}"/>
    <path d="M40 58 a10 12 0 0 0 6 18" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".75"/>`),

  /* ن — نَجْم, a star */
  najm: ic(`${sky(LC.night)}
    <polygon points="50,20 58,42 82,42 62,56 70,78 50,64 30,78 38,56 18,42 42,42" fill="${LC.sun}"/>
    <circle cx="24" cy="72" r="2.4" fill="#fff"/><circle cx="80" cy="26" r="2.4" fill="#fff"/>`),

  /* ه — هُدْهُد, a hoopoe */
  hudhud: ic(`${sky('#EFF3E4')}
    <ellipse cx="46" cy="62" rx="21" ry="16" fill="#D98E4A"/>
    <circle cx="64" cy="48" r="11" fill="#E0A05F"/>
    <g fill="#C9762F">
      <path d="M58 38 l 2,-12 4,12 Z"/><path d="M64 36 l 2,-14 4,14 Z"/><path d="M70 38 l 3,-12 3,12 Z"/></g>
    <path d="M74 50 l 16,3 -16,4 Z" fill="${LC.ink}"/>
    <circle cx="66" cy="46" r="2.4" fill="${LC.ink}"/>
    <path d="M30 58 h26 v6 h-26 Z" fill="${LC.white}"/>
    <path d="M30 68 h26 v5 h-26 Z" fill="#2A2E38"/>
    <path d="M25 70 l -14,8 8,-14 Z" fill="#2A2E38"/>`),

  /* و — وَلَد, a child */
  walad: ic(`${sky('#F6EBD8')}
    <circle cx="50" cy="34" r="16" fill="${LC.skin}"/>
    <path d="M34 30 a16 16 0 0 1 32,0 q -16,-9 -32,0 Z" fill="#3B2A1F"/>
    <circle cx="44" cy="34" r="2.6" fill="${LC.ink}"/><circle cx="56" cy="34" r="2.6" fill="${LC.ink}"/>
    <path d="M44 42 q 6,5 12,0" stroke="${LC.ink}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M34 88 v-20 a16 16 0 0 1 32,0 v20 Z" fill="${LC.teal}"/>
    <path d="M34 72 l -10,10 M66 72 l 10,10" stroke="${LC.skin}" stroke-width="7" stroke-linecap="round"/>`),

  /* ي — يَد, a hand */
  yad: ic(`${sky('#FCE9C0')}
    <path d="M36 88 v-26 q -10,-2 -10,-12 q 0,-6 6,-6 q 5,0 7,6 v-22 q 0,-6 6,-6 t 6,6 v18
             q 0,-8 6,-8 t 6,8 v4 q 0,-7 6,-7 t 6,7 v22 q 0,16 -14,16 Z" fill="${LC.skin}" stroke="#A97652" stroke-width="3"/>`),
};

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
