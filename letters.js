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

/* ---------- the relations & character icons ------------------------------
   Characters (Adam, Baba, Mama, Maryam, Lulu) and function words (this, in, on,
   under, who, where, big, small) are illustrated with rich, charming storybook
   drawings that a 3-year-old reads instantly at a glance. */

LICONS.adam = ic(`<rect width="100" height="100" rx="22" fill="#EBF5FB"/>
  <!-- body & shirt -->
  <path d="M 22,96 L 26,66 Q 50,60 74,66 L 78,96 Z" fill="#2A9D8F"/>
  <path d="M 38,66 Q 50,74 62,66" stroke="#FFFFFF" stroke-width="3.5" fill="none" opacity="0.9"/>
  <!-- neck & head -->
  <circle cx="50" cy="46" r="23" fill="#C98F66"/>
  <!-- curly hair puffs -->
  <path d="M 27,42 Q 50,20 73,42 Q 50,32 27,42 Z" fill="#3B2A1F"/>
  <circle cx="34" cy="28" r="8" fill="#3B2A1F"/><circle cx="50" cy="22" r="9" fill="#3B2A1F"/><circle cx="66" cy="28" r="8" fill="#3B2A1F"/>
  <circle cx="26" cy="38" r="7" fill="#3B2A1F"/><circle cx="74" cy="38" r="7" fill="#3B2A1F"/>
  <!-- facial features -->
  <circle cx="41" cy="46" r="3.8" fill="#332A20"/><circle cx="40" cy="44" r="1.4" fill="#FFFFFF"/>
  <circle cx="59" cy="46" r="3.8" fill="#332A20"/><circle cx="58" cy="44" r="1.4" fill="#FFFFFF"/>
  <circle cx="34" cy="52" r="3.8" fill="#F2A5A5" opacity="0.6"/>
  <circle cx="66" cy="52" r="3.8" fill="#F2A5A5" opacity="0.6"/>
  <path d="M 44,54 Q 50,61 56,54" stroke="#5A4633" stroke-width="2.8" fill="none" stroke-linecap="round"/>`);

LICONS.baba = ic(`<rect width="100" height="100" rx="22" fill="#FEF5E7"/>
  <!-- body & thobe collar -->
  <path d="M 22,96 L 26,66 Q 50,60 74,66 L 78,96 Z" fill="#F6F1E7"/>
  <path d="M 42,66 L 50,75 L 58,66" stroke="#E0D6C3" stroke-width="3" fill="none"/>
  <!-- head -->
  <circle cx="50" cy="44" r="23" fill="#C98F66"/>
  <!-- hair -->
  <path d="M 27,40 a 23 23 0 0 1 46,0 q -23,-14 -46,0 Z" fill="#4A3B2C"/>
  <!-- neat beard & moustache -->
  <path d="M 30,44 q 20,30 40,0 q -5,28 -20,28 t -20,-28 Z" fill="#4A3B2C"/>
  <circle cx="41" cy="42" r="3.6" fill="#332A20"/><circle cx="40" cy="40" r="1.3" fill="#FFFFFF"/>
  <circle cx="59" cy="42" r="3.6" fill="#332A20"/><circle cx="58" cy="40" r="1.3" fill="#FFFFFF"/>
  <path d="M 45,50 Q 50,55 55,50" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round"/>`);

LICONS.mama = ic(`<rect width="100" height="100" rx="22" fill="#E8F8F5"/>
  <path d="M 22,96 L 26,68 Q 50,62 74,68 L 78,96 Z" fill="#E76F51"/>
  <!-- teal hijab draping -->
  <path d="M 22,46 Q 50,16 78,46 Q 84,76 72,86 Q 50,92 28,86 Q 16,76 22,46 Z" fill="#2A9D8F"/>
  <circle cx="50" cy="48" r="19" fill="#C98F66"/>
  <path d="M 31,46 Q 50,34 69,46 Q 50,30 31,46 Z" fill="#228377"/>
  <circle cx="43" cy="48" r="3.4" fill="#332A20"/><circle cx="42" cy="46" r="1.3" fill="#FFFFFF"/>
  <circle cx="57" cy="48" r="3.4" fill="#332A20"/><circle cx="56" cy="46" r="1.3" fill="#FFFFFF"/>
  <circle cx="36" cy="54" r="3.2" fill="#F2A5A5" opacity="0.6"/>
  <circle cx="64" cy="54" r="3.2" fill="#F2A5A5" opacity="0.6"/>
  <path d="M 45,56 Q 50,62 55,56" stroke="#332A20" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);

LICONS.maryam = ic(`<rect width="100" height="100" rx="22" fill="#FDF2F4"/>
  <path d="M 26,96 L 30,70 Q 50,64 70,70 L 74,96 Z" fill="#E76F51"/>
  <!-- twin hair puffs with red ribbons -->
  <circle cx="27" cy="38" r="11" fill="#3B2A1F"/><circle cx="27" cy="38" r="5.5" fill="#E15554"/>
  <circle cx="73" cy="38" r="11" fill="#3B2A1F"/><circle cx="73" cy="38" r="5.5" fill="#E15554"/>
  <circle cx="50" cy="52" r="22" fill="#C98F66"/>
  <path d="M 28,48 Q 50,28 72,48 Q 50,36 28,48 Z" fill="#3B2A1F"/>
  <circle cx="42" cy="52" r="3.6" fill="#332A20"/><circle cx="41" cy="50" r="1.3" fill="#FFFFFF"/>
  <circle cx="58" cy="52" r="3.6" fill="#332A20"/><circle cx="57" cy="50" r="1.3" fill="#FFFFFF"/>
  <circle cx="35" cy="58" r="3.8" fill="#F2A5A5" opacity="0.7"/>
  <circle cx="65" cy="58" r="3.8" fill="#F2A5A5" opacity="0.7"/>
  <path d="M 44,60 Q 50,66 56,60" stroke="#5A4633" stroke-width="2.6" fill="none" stroke-linecap="round"/>`);

LICONS.cat2 = ic(`<rect width="100" height="100" rx="22" fill="#FFF6EB"/>
  <!-- ears with pink interior -->
  <path d="M 26,38 L 18,14 L 42,26 Z" fill="#F49E4C"/><path d="M 27,34 L 22,20 L 37,28 Z" fill="#F2A5A5"/>
  <path d="M 74,38 L 82,14 L 58,26 Z" fill="#F49E4C"/><path d="M 73,34 L 78,20 L 63,28 Z" fill="#F2A5A5"/>
  <!-- round head -->
  <circle cx="50" cy="50" r="28" fill="#F49E4C"/>
  <!-- tabby forehead stripes -->
  <path d="M 42,26 q 2,6 0,10 M 50,24 q 0,7 0,11 M 58,26 q -2,6 0,10" stroke="#DE7F33" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <!-- emerald eyes -->
  <ellipse cx="38" cy="48" rx="7" ry="7.5" fill="#2A9D8F"/><ellipse cx="38" cy="48" rx="4.5" ry="6" fill="#1C4B3A"/><circle cx="36" cy="45" r="2.2" fill="#FFFFFF"/>
  <ellipse cx="62" cy="48" rx="7" ry="7.5" fill="#2A9D8F"/><ellipse cx="62" cy="48" rx="4.5" ry="6" fill="#1C4B3A"/><circle cx="60" cy="45" r="2.2" fill="#FFFFFF"/>
  <!-- cream muzzle -->
  <ellipse cx="43" cy="60" rx="10" ry="8" fill="#FFF8F0"/><ellipse cx="57" cy="60" rx="10" ry="8" fill="#FFF8F0"/>
  <!-- pink nose & mouth -->
  <polygon points="47,56 53,56 50,60" fill="#E76F51"/>
  <path d="M 50,60 q -3,5 -7,2 M 50,60 q 3,5 7,2" stroke="#5A4633" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- white whiskers -->
  <path d="M 33,59 h -14 M 34,63 l -13,4 M 67,59 h 14 M 66,63 l 13,4" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>`);

LICONS.rel_this = ic(`<rect width="100" height="100" rx="22" fill="#EBF5FB"/>
  <!-- glowing star -->
  <circle cx="70" cy="38" r="24" fill="#FFEAA7" opacity="0.45"/>
  <polygon points="70,20 75,32 88,34 79,43 82,56 70,49 58,56 61,43 52,34 65,32" fill="#FFD166"/>
  <polygon points="70,25 73,33 82,35 75,41 77,50 70,45 63,50 65,41 58,35 67,33" fill="#FFFDF0"/>
  <!-- hand pointing -->
  <g transform="translate(0, 8)">
    <path d="M 12,62 h 28 q 6,0 10,-4 l 18,-10 q 5,-3 2,-8 q -3,-5 -8,-2 l -16,8 h -8 v -6 q 0,-4 -4,-4 h -22 z" fill="#C98F66"/>
    <rect x="10" y="52" width="16" height="26" rx="6" fill="#2A9D8F"/>
  </g>`);

LICONS.rel_this_f = ic(`<rect width="100" height="100" rx="22" fill="#FDF2F4"/>
  <!-- blooming flower -->
  <circle cx="70" cy="38" r="22" fill="#FADBD8" opacity="0.4"/>
  <circle cx="70" cy="30" r="8" fill="#F2A5A5"/><circle cx="70" cy="46" r="8" fill="#F2A5A5"/>
  <circle cx="62" cy="38" r="8" fill="#F2A5A5"/><circle cx="78" cy="38" r="8" fill="#F2A5A5"/>
  <circle cx="70" cy="38" r="7" fill="#FFD166"/>
  <!-- hand offering flower -->
  <g transform="translate(0, 8)">
    <path d="M 12,62 h 28 q 6,0 10,-4 l 18,-10 q 5,-3 2,-8 q -3,-5 -8,-2 l -16,8 h -8 v -6 q 0,-4 -4,-4 h -22 z" fill="#C98F66"/>
    <rect x="10" y="52" width="16" height="26" rx="6" fill="#E76F51"/>
  </g>`);

LICONS.rel_want = ic(`<rect width="100" height="100" rx="22" fill="#FEF5E7"/>
  <circle cx="68" cy="36" r="22" fill="#FFEAA7" opacity="0.5"/>
  <polygon points="68,20 73,31 85,33 77,41 79,53 68,46 57,53 59,41 51,33 63,31" fill="#FFD166"/>
  <g transform="translate(0, 10)">
    <path d="M 14,64 h 26 q 6,0 12,-6 l 16,-12 q 4,-4 1,-8 q -3,-4 -8,-1 l -14,10 h -10 v -6 q 0,-4 -4,-4 h -19 z" fill="#C98F66"/>
    <rect x="12" y="54" width="16" height="24" rx="6" fill="#2A9D8F"/>
  </g>`);

LICONS.rel_big = ic(`<rect width="100" height="100" rx="22" fill="#E8F8F5"/>
  <!-- large friendly elephant -->
  <g transform="translate(38, 52) scale(0.95)">
    <ellipse cx="0" cy="0" rx="28" ry="24" fill="#6C7A89"/>
    <circle cx="-16" cy="-14" r="16" fill="#7D8C9E"/>
    <path d="M -26,-8 Q -38,-14 -32,-28 Q -28,-30 -24,-24 Q -28,-14 -18,-8 Z" fill="#6C7A89"/>
    <ellipse cx="-4" cy="-14" rx="10" ry="14" fill="#95A5A6"/>
    <circle cx="-20" cy="-18" r="2.5" fill="#FFFFFF"/><circle cx="-20" cy="-18" r="1.3" fill="#2C3E50"/>
    <rect x="-18" y="16" width="10" height="18" rx="4" fill="#5D6A77"/>
    <rect x="6" y="16" width="10" height="18" rx="4" fill="#5D6A77"/>
  </g>
  <!-- tiny chick for scale -->
  <g transform="translate(80, 72) scale(0.45)">
    <circle cx="0" cy="0" r="14" fill="#FFD166"/>
    <circle cx="-6" cy="-10" r="10" fill="#FFD166"/>
    <polygon points="-14,-10 -22,-8 -14,-6" fill="#E67E22"/>
    <circle cx="-8" cy="-12" r="2" fill="#332A20"/>
  </g>
  <path d="M 12,24 L 20,14 L 28,24 M 20,14 V 36" stroke="#2A9D8F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`);

LICONS.rel_small = ic(`<rect width="100" height="100" rx="22" fill="#FEF9E7"/>
  <!-- adult shoe outline for scale -->
  <g transform="translate(24, 48) opacity(0.3)">
    <path d="M 0,16 Q 10,-8 34,-8 H 54 Q 66,-8 74,4 L 84,16 Z" fill="#E15554"/>
    <rect x="-4" y="16" width="94" height="12" rx="5" fill="#7F8C8D"/>
  </g>
  <!-- cute tiny chick -->
  <g transform="translate(68, 62) scale(1.15)">
    <ellipse cx="0" cy="0" rx="14" ry="12" fill="#FFD166"/>
    <circle cx="-4" cy="-10" r="10" fill="#FFD166"/>
    <polygon points="-12,-10 -20,-8 -12,-6" fill="#E67E22"/>
    <circle cx="-6" cy="-12" r="2.5" fill="#332A20"/><circle cx="-7" cy="-13" r="0.8" fill="#FFFFFF"/>
    <path d="M 4,-2 Q 10,4 2,8 Z" fill="#F4B400"/>
    <path d="M -4,12 v 6 M 4,12 v 6" stroke="#E67E22" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <path d="M 88,26 L 80,36 L 72,26 M 80,36 V 14" stroke="#E67E22" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`);

LICONS.heart2 = ic(`<rect width="100" height="100" rx="22" fill="#FFF8F0"/>
  <circle cx="50" cy="48" r="32" fill="#FADBD8" opacity="0.6"/>
  <path d="M 50,74 C 20,54 12,32 26,20 C 38,10 46,20 50,26 C 54,20 62,10 74,20 C 88,32 80,54 50,74 Z" fill="#E74C3C"/>
  <path d="M 50,70 C 24,52 16,34 28,24 C 38,16 46,24 50,30 C 54,24 62,16 72,24 C 84,34 76,52 50,70 Z" fill="#FF6B6B" opacity="0.7"/>
  <circle cx="34" cy="28" r="4" fill="#FFFFFF" opacity="0.8"/>
  <path d="M 18,22 l 3,6 6,3 -6,3 -3,6 -3,-6 -6,-3 6,-3 z" fill="#FFD166"/>
  <path d="M 82,24 l 2.5,5 5,2.5 -5,2.5 -2.5,5 -2.5,-5 -5,-2.5 5,-2.5 z" fill="#FFD166"/>
  <path d="M 76,68 l 2,4 4,2 -4,2 -2,4 -2,-4 -4,-2 4,-2 z" fill="#2A9D8F"/>`);

LICONS.arnab = ic(`<rect width="100" height="100" rx="22" fill="#EBF5FB"/>
  <!-- bunny ears -->
  <ellipse cx="38" cy="24" rx="7" ry="18" fill="#FFFFFF" stroke="#E0E6ED" stroke-width="2"/>
  <ellipse cx="38" cy="24" rx="3.5" ry="13" fill="#FADBD8"/>
  <ellipse cx="62" cy="24" rx="7" ry="18" fill="#FFFFFF" stroke="#E0E6ED" stroke-width="2"/>
  <ellipse cx="62" cy="24" rx="3.5" ry="13" fill="#FADBD8"/>
  <!-- head & body -->
  <circle cx="50" cy="54" r="24" fill="#FFFFFF" stroke="#E0E6ED" stroke-width="2"/>
  <!-- eyes & cheeks -->
  <circle cx="41" cy="52" r="3.8" fill="#332A20"/><circle cx="40" cy="50" r="1.3" fill="#FFFFFF"/>
  <circle cx="59" cy="52" r="3.8" fill="#332A20"/><circle cx="58" cy="50" r="1.3" fill="#FFFFFF"/>
  <circle cx="34" cy="58" r="3.5" fill="#FADBD8"/>
  <circle cx="66" cy="58" r="3.5" fill="#FADBD8"/>
  <!-- nose & mouth -->
  <polygon points="48,58 52,58 50,61" fill="#E76F51"/>
  <path d="M 50,61 q -3,4 -6,1 M 50,61 q 3,4 6,1" stroke="#5A4633" stroke-width="1.8" fill="none"/>
  <!-- carrot held in paws -->
  <g transform="translate(50, 78) rotate(20) scale(0.6)">
    <polygon points="-8,0 8,0 0,36" fill="#F49E4C"/>
    <path d="M -4,0 l -6,-12 M 0,0 l 0,-14 M 4,0 l 6,-12" stroke="#48B38A" stroke-width="3" stroke-linecap="round"/>
  </g>`);

LICONS.qird = ic(`<rect width="100" height="100" rx="22" fill="#FEF5E7"/>
  <!-- monkey ears -->
  <circle cx="22" cy="46" r="12" fill="#8F5836"/>
  <circle cx="22" cy="46" r="7" fill="#FAD7A0"/>
  <circle cx="78" cy="46" r="12" fill="#8F5836"/>
  <circle cx="78" cy="46" r="7" fill="#FAD7A0"/>
  <!-- head -->
  <circle cx="50" cy="48" r="26" fill="#8F5836"/>
  <!-- peach face mask -->
  <ellipse cx="42" cy="44" rx="11" ry="12" fill="#FAD7A0"/>
  <ellipse cx="58" cy="44" rx="11" ry="12" fill="#FAD7A0"/>
  <ellipse cx="50" cy="56" rx="16" ry="13" fill="#FAD7A0"/>
  <!-- eyes -->
  <circle cx="42" cy="42" r="3.6" fill="#332A20"/><circle cx="41" cy="40" r="1.3" fill="#FFFFFF"/>
  <circle cx="58" cy="42" r="3.6" fill="#332A20"/><circle cx="57" cy="40" r="1.3" fill="#FFFFFF"/>
  <!-- nostrils & wide grin -->
  <circle cx="47" cy="52" r="1.5" fill="#8F5836"/><circle cx="53" cy="52" r="1.5" fill="#8F5836"/>
  <path d="M 40,58 Q 50,68 60,58" stroke="#8F5836" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);

LICONS.jazar = ic(`<rect width="100" height="100" rx="22" fill="#FEF9E7"/>
  <g transform="translate(50, 56) rotate(-25)">
    <!-- carrot body -->
    <path d="M -16,-18 Q 0,-24 16,-18 L 4,38 Q 0,42 -4,38 Z" fill="#F49E4C"/>
    <line x1="-10" y1="-6" x2="-2" y2="-6" stroke="#D97A2B" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="2" y1="8" x2="10" y2="8" stroke="#D97A2B" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="-6" y1="20" x2="2" y2="20" stroke="#D97A2B" stroke-width="2" stroke-linecap="round"/>
    <!-- green leafy top -->
    <path d="M -10,-20 Q -24,-38 -32,-42 Q -22,-30 -12,-24" fill="#48B38A"/>
    <path d="M 0,-22 Q 0,-44 0,-48 Q 6,-36 4,-22" fill="#388E6D"/>
    <path d="M 10,-20 Q 24,-38 32,-42 Q 22,-30 12,-24" fill="#48B38A"/>
  </g>`);

LICONS.mawz = ic(`<rect width="100" height="100" rx="22" fill="#FEF9E7"/>
  <g transform="translate(50, 52)">
    <!-- curved banana -->
    <path d="M -26,-28 Q 24,-34 32,24 Q 30,34 22,34 Q 10,20 -18,-18 Z" fill="#FFD166"/>
    <path d="M -26,-28 Q 22,-28 26,24 Q 28,16 6,-18 Z" fill="#FFE58F" opacity="0.6"/>
    <!-- stem & tip -->
    <rect x="-32" y="-34" width="8" height="8" rx="2" fill="#754425" transform="rotate(-20 -32 -34)"/>
    <circle cx="28" cy="30" r="3.5" fill="#754425"/>
  </g>`);

LICONS.rel_in = ic(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>
  <rect x="22" y="42" width="56" height="42" rx="6" fill="#8F5836"/>
  <circle cx="50" cy="56" r="14" fill="#E15554"/>
  <path d="M 42,50 Q 50,44 58,50" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M 18,52 L 24,84 H 76 L 82,52 Z" fill="#B5764A"/>
  <rect x="16" y="48" width="68" height="10" rx="4" fill="#C89A67"/>`);

LICONS.rel_on = ic(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>
  <rect x="14" y="56" width="72" height="10" rx="4" fill="#B5764A"/>
  <rect x="22" y="66" width="8" height="24" rx="2" fill="#8F5836"/>
  <rect x="70" y="66" width="8" height="24" rx="2" fill="#8F5836"/>
  <circle cx="50" cy="40" r="15" fill="#E15554"/>
  <path d="M 42,34 Q 50,28 58,34" stroke="#FFFFFF" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M 50,14 v 8 M 46,18 l 4,4 4,-4" stroke="#E15554" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`);

LICONS.rel_under = ic(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>
  <rect x="14" y="36" width="72" height="10" rx="4" fill="#B5764A"/>
  <rect x="22" y="46" width="8" height="42" rx="2" fill="#8F5836"/>
  <rect x="70" y="46" width="8" height="42" rx="2" fill="#8F5836"/>
  <circle cx="50" cy="68" r="14" fill="#E15554"/>
  <path d="M 42,62 Q 50,56 58,62" stroke="#FFFFFF" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M 50,50 v 8 M 46,54 l 4,4 4,-4" stroke="#E15554" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`);

LICONS.rel_and = ic(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>
  <circle cx="34" cy="50" r="18" fill="#E15554"/>
  <circle cx="30" cy="46" r="2.5" fill="#FFFFFF"/><circle cx="40" cy="46" r="2.5" fill="#FFFFFF"/>
  <path d="M 32,54 q 4,4 8,0" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="66" cy="50" r="18" fill="#2A9D8F"/>
  <circle cx="62" cy="46" r="2.5" fill="#FFFFFF"/><circle cx="72" cy="46" r="2.5" fill="#FFFFFF"/>
  <path d="M 64,54 q 4,4 8,0" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 44,50 h 12" stroke="#FFD166" stroke-width="6" stroke-linecap="round"/>`);

LICONS.rel_who = ic(`<rect width="100" height="100" rx="22" fill="#FEF9E7"/>
  <path d="M 20,24 h 60 q 12,0 12,12 v 24 q 0,12 -12,12 h -24 l -16,14 v -14 h -20 q -12,0 -12,-12 v -24 q 0,-12 12,-12 z" fill="#2A9D8F"/>
  <path d="M 22,26 h 56 q 10,0 10,10 v 22 q 0,10 -10,10 h -22 l -14,12 v -12 h -20 q -10,0 -10,-10 v -22 q 0,-10 10,-10 z" fill="#38B2A2"/>
  <circle cx="38" cy="46" r="4" fill="#FFFFFF"/><circle cx="62" cy="46" r="4" fill="#FFFFFF"/>
  <path d="M 44,52 Q 50,58 56,52" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/>`);

LICONS.rel_where = ic(`<rect width="100" height="100" rx="22" fill="#FEF5E7"/>
  <rect x="22" y="52" width="56" height="34" rx="6" fill="#C89A67"/>
  <rect x="20" y="48" width="60" height="10" rx="4" fill="#DBB88A"/>
  <g transform="translate(46, 36) rotate(-15)">
    <circle cx="0" cy="0" r="18" fill="#E8F4F8" stroke="#E76F51" stroke-width="5"/>
    <line x1="12" y1="12" x2="26" y2="26" stroke="#C4574E" stroke-width="6" stroke-linecap="round"/>
    <text x="0" y="7" font-size="22" font-weight="800" text-anchor="middle" fill="#E76F51" font-family="'Baloo Bhaijaan 2',sans-serif">؟</text>
  </g>`);

LICONS.sneaker = ic(`<rect width="100" height="100" rx="22" fill="#FEF5E7"/>
  <g transform="translate(24, 46)">
    <path d="M 4,6 q 0,-14 16,-14 h 12 q 6,0 9,6 l 4,8 q 14,1 17,8 h -56 q -2,-5 0,-8 z" fill="#E15554"/>
    <path d="M 2,14 h 60 q 4,0 4,5 q 0,5 -5,5 h -58 q -5,0 -5,-5 q 0,-5 4,-5 z" fill="#FFFFFF"/>
    <circle cx="24" cy="-2" r="2" fill="#fff"/><circle cx="32" cy="0" r="2" fill="#fff"/>
  </g>`);

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
