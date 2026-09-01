/* ————— Hikayat — Arabic picture books for little readers ————— */
'use strict';

/* ================= 1. Illustration kit (SVG helpers) ================= */

const C = {
  wall: '#FDF1DE', wallBed: '#F2E7F6', floor: '#EFC28E', floorLine: '#E0AC72',
  rug: '#8FBFB0', rugD: '#6FA898',
  cat: '#F49E4C', catD: '#DE7F33', catL: '#FBD9AC', pink: '#F2A5A5',
  skin: '#C98F66', hair: '#3B2A1F',
  shirt: '#2A9D8F', pants: '#33587B', shoe: '#4A4A4A',
  dress: '#E76F51',
  thobe: '#F6F1E7', beard: '#5A4633',
  wood: '#B5764A', woodD: '#8F5836',
  box: '#C89A67', boxD: '#A87C4C', boxL: '#DBB88A',
  blanket: '#7FB0D6', pillow: '#FFE9B8',
  couch: '#C4574E', couchD: '#A84640', cushion: '#E5A03F',
  sky: '#BDE3F0', sun: '#FFD166', dark: '#5A4633',
};

const FONT = `font-family="'Baloo Bhaijaan 2', sans-serif"`;

function g(x, y, s, flip, inner) {
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s} ${s})">${inner}</g>`;
}
function shadow(x, y, rx) {
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.22}" fill="#00000012"/>`;
}
/* ————— painted scenes ————————————————————————————————————————————————————
   Reza generates these in Gemini and drops the file in art/; this puts one on
   a page. It returns SVG rather than an <img> on purpose: every page in the
   reader goes through svgWrap(p.svg()), the thumbnails on the shelf go through
   the same call, and an <image> inside that viewBox means NOTHING else in the
   reader has to know whether a scene was drawn or painted. Vector scenes and
   painted ones can sit in the same book.

   WHY PAINTED AT ALL. The hand-drawn scenes have been the weakest thing on the
   site every time Reza has looked at them — "the diagrams are really bad" in
   July, "baba... looks very bad" on 2026-08-31. A painted scene is simply
   better at the one job rule 2 gives it: carrying the meaning on its own, to a
   child who cannot read a word of the page.

   The backing rect is the cream the art is painted on, so the letterbox at the
   sides of a 4:3 image in a 800x520 frame is invisible. preserveAspectRatio is
   "meet", never "slice": slice would crop, and on these scenes the thing that
   gets cropped is the top of the window or the toys on the floor — detail a
   child looks AT. Better a seamless margin than a cropped picture.

   Not in the service worker's CORE list, deliberately, and the same reasoning
   as the Qur'an audio: the shell must install fast and small. sw.js runtime-
   caches every same-origin file it serves, so a scene is offline from the
   first time it is seen, and a shelf of forty paintings never has to be
   downloaded before a child can open the first book. */
function artScene(file, alt) {
  return `<rect width="800" height="520" fill="#EAD7BD"/>
    <image href="art/${file}" x="0" y="0" width="800" height="520"
      preserveAspectRatio="xMidYMid meet"><title>${alt}</title></image>`;
}

function artIcon(file, alt) {
  const cid = 'c_' + file.replace(/[^a-z0-9]/gi, '_');
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="${cid}"><rect width="100" height="100" rx="16"/></clipPath>
    <image href="art/${file}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" clip-path="url(#${cid})"><title>${alt || ''}</title></image>
  </svg>`;
}

function svgWrap(inner) {
  return `<svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

function room({ wall = C.wall, win = 570, rug = null, plantAt = null } = {}) {
  let s = `<rect width="800" height="382" fill="${wall}"/>
  <rect y="0" width="800" height="14" fill="#0000000A"/>
  <rect y="366" width="800" height="16" fill="#00000008"/>
  <rect y="382" width="800" height="138" fill="${C.floor}"/>
  <line x1="0" y1="416" x2="800" y2="416" stroke="${C.floorLine}" stroke-width="2" opacity="0.6"/>
  <line x1="0" y1="456" x2="800" y2="456" stroke="${C.floorLine}" stroke-width="2" opacity="0.6"/>
  <line x1="0" y1="496" x2="800" y2="496" stroke="${C.floorLine}" stroke-width="2" opacity="0.6"/>
  <rect y="378" width="800" height="8" fill="${C.floorLine}"/>`;
  if (win !== null) s += windowAt(win, 66);
  if (rug) s += `<ellipse cx="${rug[0]}" cy="${rug[1]}" rx="170" ry="36" fill="${C.rug}"/>
                 <ellipse cx="${rug[0]}" cy="${rug[1]}" rx="162" ry="30" fill="none" stroke="${C.rugD}" stroke-width="3" stroke-dasharray="6,6"/>
                 <ellipse cx="${rug[0]}" cy="${rug[1]}" rx="124" ry="24" fill="${C.rugD}"/>`;
  if (plantAt) s += plant(plantAt[0], plantAt[1]);
  return s;
}
function windowAt(x, y) {
  return `<g transform="translate(${x},${y})">
    <rect x="-18" y="-20" width="176" height="6" rx="3" fill="${C.woodD}"/>
    <circle cx="-18" cy="-17" r="6" fill="${C.woodD}"/><circle cx="158" cy="-17" r="6" fill="${C.woodD}"/>
    <path d="M -14,-14 Q 4,50 -10,120 Q -4,50 6,-14 Z" fill="#F09CB1" opacity="0.85"/>
    <path d="M 154,-14 Q 136,50 150,120 Q 144,50 134,-14 Z" fill="#F09CB1" opacity="0.85"/>
    <rect x="-8" y="-8" width="156" height="136" rx="14" fill="#FFFFFF"/>
    <rect width="140" height="120" rx="8" fill="${C.sky}"/>
    <circle cx="36" cy="32" r="22" fill="#FFEAA7" opacity="0.4"/>
    <circle cx="36" cy="32" r="17" fill="${C.sun}"/>
    <path d="M 48,76 q 16,-14 32,0 q 16,-14 32,0" stroke="#FFFFFF" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M 18,92 q 14,-10 28,0" stroke="#FFFFFF" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.7"/>
    <rect x="66" width="8" height="120" fill="#FFFFFF"/>
    <rect y="56" width="140" height="8" fill="#FFFFFF"/>
    <rect x="-14" y="118" width="168" height="10" rx="4" fill="#FFFFFF"/>
  </g>`;
}
function plant(x, y) {
  return `<g transform="translate(${x},${y})">
    ${shadow(0, 2, 34)}
    <ellipse cx="-16" cy="-64" rx="14" ry="32" fill="#4B8B60" transform="rotate(-26 -16 -64)"/>
    <ellipse cx="16" cy="-64" rx="14" ry="32" fill="#4B8B60" transform="rotate(26 16 -64)"/>
    <ellipse cx="-8" cy="-72" rx="12" ry="32" fill="#5FA777" transform="rotate(-12 -8 -72)"/>
    <ellipse cx="8" cy="-72" rx="12" ry="32" fill="#5FA777" transform="rotate(12 8 -72)"/>
    <ellipse cx="0" cy="-80" rx="14" ry="36" fill="#7BC08F"/>
    <path d="M -28,-34 h 56 l -8,38 h -40 z" fill="#C96F4A"/>
    <rect x="-32" y="-42" width="64" height="12" rx="6" fill="#B65E3C"/>
  </g>`;
}

/* ————— Lulu the cat ————— */
function catSit(x, y, s = 1, flip = false) {
  return g(x, y, s, flip, `
    <path d="M 40,26 Q 82,20 84,-18 Q 85,-42 66,-50" fill="none" stroke="${C.cat}" stroke-width="15" stroke-linecap="round"/>
    <circle cx="66" cy="-50" r="9" fill="${C.catD}"/>
    <ellipse cx="0" cy="12" rx="46" ry="42" fill="${C.cat}"/>
    <ellipse cx="0" cy="24" rx="26" ry="23" fill="${C.catL}"/>
    <path d="M -40,-6 q 9,7 0,15" stroke="${C.catD}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M 40,-6 q -9,7 0,15" stroke="${C.catD}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <g transform="translate(0,-56)">${catFace()}</g>
    <ellipse cx="-17" cy="50" rx="13" ry="9" fill="${C.cat}"/>
    <ellipse cx="17" cy="50" rx="13" ry="9" fill="${C.cat}"/>
  `);
}
function catFace(awake = true) {
  const eyes = awake
    ? `<ellipse cx="-13" cy="-2" rx="7.5" ry="8" fill="#48B38A"/>
       <ellipse cx="-13" cy="-2" rx="5" ry="7" fill="#1C4B3A"/>
       <circle cx="-15" cy="-4" r="2.5" fill="#FFFFFF"/>
       <circle cx="-11" cy="1" r="1.2" fill="#FFFFFF"/>
       <ellipse cx="13" cy="-2" rx="7.5" ry="8" fill="#48B38A"/>
       <ellipse cx="13" cy="-2" rx="5" ry="7" fill="#1C4B3A"/>
       <circle cx="11" cy="-4" r="2.5" fill="#FFFFFF"/>
       <circle cx="15" cy="1" r="1.2" fill="#FFFFFF"/>`
    : `<path d="M -18,-1 q 5,6 10,0 M 8,-1 q 5,6 10,0" stroke="${C.dark}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return `
    <path d="M -28,-12 L -42,-44 L -10,-26 Z" fill="${C.cat}"/>
    <path d="M -26,-16 L -35,-36 L -15,-24 Z" fill="${C.pink}"/>
    <path d="M 28,-12 L 42,-44 L 10,-26 Z" fill="${C.cat}"/>
    <path d="M 26,-16 L 35,-36 L 15,-24 Z" fill="${C.pink}"/>
    <circle r="34" fill="${C.cat}"/>
    <ellipse cx="-10" cy="14" rx="14" ry="11" fill="#FFF2E0"/>
    <ellipse cx="10" cy="14" rx="14" ry="11" fill="#FFF2E0"/>
    <path d="M -11,-31 q 3,7 0,11 M 0,-33 q 0,9 0,14 M 11,-31 q -3,7 0,11" stroke="${C.catD}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    ${eyes}
    <path d="M -4,9 L 4,9 L 0,14 Z" fill="#E37B9B"/>
    <path d="M 0,14 q -4,6 -9,3 M 0,14 q 4,6 9,3" stroke="${C.dark}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M -20,13 h -16 M -19,18 l -15,4 M 20,13 h 16 M 19,18 l 15,4" stroke="${C.dark}" stroke-width="2" stroke-linecap="round"/>`;
}
function catSleep(x, y, s = 1, flip = false) {
  return g(x, y, s, flip, `
    <ellipse cx="0" cy="0" rx="50" ry="31" fill="${C.cat}"/>
    <path d="M -14,-14 q 12,5 0,13 M 16,-16 q 12,5 0,13" stroke="${C.catD}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M -48,12 Q -14,36 32,26 Q 54,21 50,4" fill="none" stroke="${C.cat}" stroke-width="13" stroke-linecap="round"/>
    <circle cx="50" cy="4" r="8" fill="${C.catD}"/>
    <g transform="translate(-22,-10) scale(.8)">${catFace(false)}</g>
  `);
}
function catPeek(x, y, s = 1) {
  return g(x, y, s, false, `
    <g transform="translate(0,-30)">${catFace()}</g>
    <ellipse cx="-26" cy="2" rx="11" ry="7" fill="${C.cat}"/>
    <ellipse cx="26" cy="2" rx="11" ry="7" fill="${C.cat}"/>
  `);
}
function tailMystery(x, y) {
  return `<g transform="translate(${x},${y})">
    <path d="M 0,0 q -8,-42 22,-60 q 22,-14 14,-38" fill="none" stroke="${C.cat}" stroke-width="14" stroke-linecap="round"/>
    <circle cx="36" cy="-98" r="9" fill="${C.catD}"/>
  </g>`;
}

/* ————— Night kit (for Quran-word night stories) ————— */
const N = {
  sky: '#232D4B', ground: '#3A4D45', groundLine: '#2F3F38',
  house: '#1C233B', roof: '#151C30', winlit: '#FFD166',
  cloud: '#CBD6EB', moon: '#FFF4D0', moonD: '#E8DCB0', starY: '#FFE58F',
};
function nightBase(stars = 14) {
  let s = `<rect width="800" height="380" fill="${N.sky}"/>
    <circle cx="200" cy="80" r="140" fill="#2E3A5F" opacity="0.5"/>
    <circle cx="600" cy="120" r="160" fill="#2E3A5F" opacity="0.4"/>
    <rect y="380" width="800" height="140" fill="${N.ground}"/>
    <rect y="376" width="800" height="8" fill="${N.groundLine}"/>`;
  const pts = [[60,60],[140,120],[220,50],[300,150],[380,80],[460,40],[540,130],[620,70],[700,120],[750,50],[100,220],[500,210],[660,220],[240,230],[420,250],[720,260]];
  for (let i = 0; i < Math.min(stars, pts.length); i++) {
    const sz = (i % 3 === 0) ? 3.5 : (i % 2 === 0 ? 2.5 : 1.8);
    s += `<circle cx="${pts[i][0]}" cy="${pts[i][1]}" r="${sz}" fill="#FFFFFF" opacity="0.9"/>`;
    if (i % 4 === 0) s += sparkle(pts[i][0], pts[i][1], 0.5, N.starY);
  }
  return s;
}
function houseSil(x, y, s = 1) {
  return g(x, y, s, false, `
    <rect x="-90" y="-150" width="180" height="150" rx="8" fill="${N.house}"/>
    <path d="M -104,-150 L 0,-224 L 104,-150 Z" fill="${N.roof}"/>
    <rect x="-62" y="-122" width="52" height="52" rx="10" fill="#FFEAA7" opacity="0.3"/>
    <rect x="-58" y="-118" width="44" height="44" rx="8" fill="${N.winlit}"/>
    <path d="M -58,-96 h 44 M -36,-118 v 44" stroke="${N.house}" stroke-width="4"/>
    <rect x="16" y="-74" width="40" height="74" rx="6" fill="#151C30"/>
    <circle cx="24" cy="-36" r="4" fill="${N.winlit}"/>
  `);
}
function moonFull(x, y, r = 52) {
  return `<circle cx="${x}" cy="${y}" r="${r * 2.2}" fill="${N.moon}" opacity="0.08"/>
    <circle cx="${x}" cy="${y}" r="${r * 1.5}" fill="${N.moon}" opacity="0.16"/>
    <circle cx="${x}" cy="${y}" r="${r * 1.15}" fill="${N.moon}" opacity="0.25"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${N.moon}"/>
    <circle cx="${x - r * .32}" cy="${y - r * .2}" r="${r * .18}" fill="${N.moonD}" opacity="0.7"/>
    <circle cx="${x + r * .28}" cy="${y + r * .28}" r="${r * .14}" fill="${N.moonD}" opacity="0.7"/>
    <circle cx="${x + r * .15}" cy="${y - r * .4}" r="${r * .1}" fill="${N.moonD}" opacity="0.7"/>`;
}
function cloudP(x, y, s = 1, fill = N.cloud) {
  return g(x, y, s, false, `
    <ellipse cx="0" cy="0" rx="78" ry="34" fill="${fill}" opacity="0.95"/>
    <circle cx="-42" cy="-16" r="30" fill="${fill}" opacity="0.95"/>
    <circle cx="6" cy="-28" r="38" fill="${fill}" opacity="0.95"/>
    <circle cx="48" cy="-12" r="26" fill="${fill}" opacity="0.95"/>
    <ellipse cx="-10" cy="-6" rx="60" ry="24" fill="#FFFFFF" opacity="0.4"/>
  `);
}
const STAR_PTS = '0,-32 7.6,-10.5 30.4,-9.9 12.4,4 18.8,25.9 0,13 -18.8,25.9 -12.4,4 -30.4,-9.9 -7.6,-10.5';
function bigStar(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})">
    <circle cx="0" cy="0" r="36" fill="${N.starY}" opacity="0.2"/>
    <polygon points="${STAR_PTS}" fill="${N.starY}"/>
    <polygon points="${STAR_PTS}" fill="#FFFBF0" transform="scale(.48)"/>
  </g>`;
}
function bird(x, y, s = 1, flip = false) {
  return g(x, y, s, flip, `
    <path d="M -6,-6 Q -34,-30 -56,-22 Q -36,-8 -22,2 Z" fill="#B8C8E8"/>
    <ellipse cx="0" cy="0" rx="26" ry="15" fill="#E8EEF9"/>
    <path d="M 8,-8 Q 36,-32 58,-24 Q 38,-10 24,0 Z" fill="#B8C8E8"/>
    <path d="M -24,2 Q -34,8 -40,6" stroke="#B8C8E8" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="24" cy="-4" r="11" fill="#E8EEF9"/>
    <polygon points="33,-5 44,-1 33,2" fill="#F4A83B"/>
    <circle cx="27" cy="-6" r="2.4" fill="#333"/><circle cx="26" cy="-7" r="0.9" fill="#FFF"/>
  `);
}
function heart(x, y, s = 1, fill = '#F2A5A5') {
  return `<path transform="translate(${x},${y}) scale(${s})" fill="${fill}"
    d="M 0,6 C -8,-6 -22,0 -22,10 C -22,22 -8,28 0,36 C 8,28 22,22 22,10 C 22,0 8,-6 0,6 Z"/>`;
}

/* ————— Adam (boy, ~5) ————— */
function adam(x, y, pose = 'down', s = 1, flip = false) {
  const A = `fill="none" stroke="${C.shirt}" stroke-width="13" stroke-linecap="round"`;
  const hand = (hx, hy) => `<circle cx="${hx}" cy="${hy}" r="9" fill="${C.skin}"/>`;
  const arms = {
    down: `<path d="M -20,-96 Q -30,-80 -32,-62" ${A}/>${hand(-32, -60)}
           <path d="M 20,-96 Q 30,-80 32,-62" ${A}/>${hand(32, -60)}`,
    wonder: `<path d="M -20,-96 Q -38,-104 -46,-122" ${A}/>${hand(-47, -124)}
             <path d="M 20,-96 Q 38,-104 46,-122" ${A}/>${hand(47, -124)}`,
    hips: `<path d="M -20,-96 Q -37,-88 -30,-70" ${A}/>${hand(-29, -68)}
           <path d="M 20,-96 Q 37,-88 30,-70" ${A}/>${hand(29, -68)}`,
    point: `<path d="M -20,-96 Q -30,-80 -32,-62" ${A}/>${hand(-32, -60)}
            <path d="M 20,-96 Q 40,-102 58,-106" ${A}/>${hand(60, -106)}`,
    scratch: `<path d="M -20,-96 Q -30,-80 -32,-62" ${A}/>${hand(-32, -60)}
              <path d="M 20,-96 Q 36,-120 24,-140" ${A}/>${hand(22, -142)}`,
    pointup: `<path d="M -20,-96 Q -30,-80 -32,-62" ${A}/>${hand(-32, -60)}
              <path d="M 20,-96 Q 36,-118 46,-136" ${A}/>${hand(48, -138)}`,
    reach: `<path d="M -18,-92 Q 18,-86 50,-78" ${A}/>${hand(52, -78)}
            <path d="M 20,-96 Q 46,-88 60,-80" ${A}/>${hand(62, -80)}`,
    open: `<path d="M -20,-96 Q -42,-88 -54,-72" ${A}/>${hand(-56, -70)}
           <path d="M 20,-96 Q 42,-88 54,-72" ${A}/>${hand(56, -70)}`,
  }[pose] || '';
  return g(x, y, s, flip, `
    ${shadow(0, 2, 40)}
    <rect x="-22" y="-12" width="22" height="12" rx="6" fill="${C.shoe}"/>
    <rect x="0" y="-12" width="22" height="12" rx="6" fill="${C.shoe}"/>
    <rect x="-22" y="-4" width="22" height="4" rx="2" fill="#FFFFFF"/>
    <rect x="0" y="-4" width="22" height="4" rx="2" fill="#FFFFFF"/>
    <rect x="-18" y="-54" width="15" height="46" rx="7" fill="${C.pants}"/>
    <rect x="3" y="-54" width="15" height="46" rx="7" fill="${C.pants}"/>
    <rect x="-25" y="-112" width="50" height="64" rx="18" fill="${C.shirt}"/>
    <path d="M -10,-112 Q 0,-102 10,-112" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="0.8"/>
    ${arms}
    <circle cx="0" cy="-134" r="27" fill="${C.skin}"/>
    <path d="M -27,-136 q 0,-27 27,-27 q 27,0 27,27 q -12,-11 -27,-11 q -14,0 -27,11 z" fill="${C.hair}"/>
    <circle cx="-16" cy="-154" r="9" fill="${C.hair}"/>
    <circle cx="0" cy="-160" r="10" fill="${C.hair}"/>
    <circle cx="16" cy="-154" r="9" fill="${C.hair}"/>
    <circle cx="-9" cy="-136" r="4.2" fill="#332A20"/><circle cx="-10" cy="-138" r="1.5" fill="#FFFFFF"/>
    <circle cx="9" cy="-136" r="4.2" fill="#332A20"/><circle cx="8" cy="-138" r="1.5" fill="#FFFFFF"/>
    <circle cx="-16" cy="-128" r="4" fill="${C.pink}" opacity="0.5"/>
    <circle cx="16" cy="-128" r="4" fill="${C.pink}" opacity="0.5"/>
    <path d="M -7,-124 q 7,8 14,0" stroke="${C.dark}" stroke-width="3" fill="none" stroke-linecap="round"/>
  `);
}

/* ————— Maryam (toddler) ————— */
function maryam(x, y, pose = 'clap', s = 1, flip = false) {
  const A = `fill="none" stroke="${C.dress}" stroke-width="11" stroke-linecap="round"`;
  const hand = (hx, hy) => `<circle cx="${hx}" cy="${hy}" r="7" fill="${C.skin}"/>`;
  const arms = {
    clap: `<path d="M -13,-58 Q -26,-72 -32,-88" ${A}/>${hand(-33, -90)}
           <path d="M 13,-58 Q 26,-72 32,-88" ${A}/>${hand(33, -90)}`,
    point: `<path d="M -13,-58 Q -20,-46 -20,-36" ${A}/>${hand(-20, -34)}
            <path d="M 13,-58 Q 30,-66 45,-73" ${A}/>${hand(47, -74)}`,
    up: `<path d="M -13,-58 Q -20,-46 -20,-36" ${A}/>${hand(-20, -34)}
         <path d="M 13,-58 Q 26,-78 32,-98" ${A}/>${hand(33, -100)}`,
  }[pose];
  return g(x, y, s, flip, `
    ${shadow(0, 2, 32)}
    <rect x="-14" y="-10" width="13" height="10" rx="5" fill="#B03A2E"/>
    <rect x="1" y="-10" width="13" height="10" rx="5" fill="#B03A2E"/>
    <rect x="-14" y="-3" width="13" height="3" rx="1.5" fill="#FFFFFF"/>
    <rect x="1" y="-3" width="13" height="3" rx="1.5" fill="#FFFFFF"/>
    <rect x="-11" y="-26" width="9" height="18" rx="4.5" fill="${C.skin}"/>
    <rect x="2" y="-26" width="9" height="18" rx="4.5" fill="${C.skin}"/>
    <path d="M -15,-64 h 30 l 12,42 q -27,10 -54,0 z" fill="${C.dress}"/>
    <circle cx="-6" cy="-46" r="2" fill="#FFFFFF" opacity="0.6"/><circle cx="6" cy="-46" r="2" fill="#FFFFFF" opacity="0.6"/>
    <circle cx="-12" cy="-34" r="2" fill="#FFFFFF" opacity="0.6"/><circle cx="0" cy="-34" r="2" fill="#FFFFFF" opacity="0.6"/><circle cx="12" cy="-34" r="2" fill="#FFFFFF" opacity="0.6"/>
    ${arms}
    <circle cx="-26" cy="-88" r="11" fill="${C.hair}"/><circle cx="-26" cy="-88" r="5" fill="#E15554"/>
    <circle cx="26" cy="-88" r="11" fill="${C.hair}"/><circle cx="26" cy="-88" r="5" fill="#E15554"/>
    <circle cx="0" cy="-82" r="22" fill="${C.skin}"/>
    <path d="M -22,-84 q 0,-22 22,-22 q 22,0 22,22 q -9,-9 -22,-9 q -13,0 -22,9 z" fill="${C.hair}"/>
    <circle cx="-8" cy="-84" r="3.6" fill="#332A20"/><circle cx="-9" cy="-86" r="1.3" fill="#FFFFFF"/>
    <circle cx="8" cy="-84" r="3.6" fill="#332A20"/><circle cx="7" cy="-86" r="1.3" fill="#FFFFFF"/>
    <circle cx="-14" cy="-76" r="4" fill="${C.pink}" opacity=".7"/>
    <circle cx="14" cy="-76" r="4" fill="${C.pink}" opacity=".7"/>
    <path d="M -5,-74 q 5,6 10,0" stroke="${C.dark}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  `);
}

/* ————— Furniture & props ————— */
function bed(x, y, s = 1) {
  return g(x, y, s, false, `
    <rect x="8" y="-30" width="16" height="30" rx="5" fill="${C.woodD}"/>
    <rect x="286" y="-30" width="16" height="30" rx="5" fill="${C.woodD}"/>
    <rect x="20" y="-28" width="270" height="24" fill="#00000014"/>
    ${sneaker(140, -18)}
    <rect x="0" y="-64" width="310" height="36" rx="11" fill="${C.wood}"/>
    <rect x="288" y="-176" width="26" height="146" rx="12" fill="${C.wood}"/>
    <rect x="4" y="-88" width="292" height="28" rx="12" fill="#FFFFFF"/>
    <path d="M 6,-88 H 206 V -60 q -10,10 -22,4 q -12,8 -22,0 q -12,8 -22,0 q -12,8 -22,0 q -12,8 -22,0 q -12,8 -22,0 q -12,8 -22,0 q -14,6 -18,-4 z" fill="${C.blanket}"/>
    <!-- subtle star pattern on blanket -->
    <path d="M 40,-74 l 2,4 4,1 -3,3 1,4 -4,-2 -4,2 1,-4 -3,-3 4,-1 z" fill="#FFFFFF" opacity="0.5"/>
    <path d="M 90,-74 l 2,4 4,1 -3,3 1,4 -4,-2 -4,2 1,-4 -3,-3 4,-1 z" fill="#FFFFFF" opacity="0.5"/>
    <path d="M 140,-74 l 2,4 4,1 -3,3 1,4 -4,-2 -4,2 1,-4 -3,-3 4,-1 z" fill="#FFFFFF" opacity="0.5"/>
    <rect x="220" y="-108" width="66" height="26" rx="13" fill="${C.pillow}"/>
    <path d="M 230,-96 q 22,6 46,0" stroke="#E8CE93" stroke-width="2" fill="none" opacity="0.6"/>
  `);
}
function sneaker(x, y) {
  return `<g transform="translate(${x},${y})">
    <path d="M 2,0 q 0,-12 12,-12 h 10 q 5,0 7,5 l 3,7 q 12,1 14,7 h -46 q -2,-4 0,-7 z" fill="#E15554"/>
    <path d="M 0,7 h 48 q 3,0 3,4 q 0,4 -4,4 h -46 q -4,0 -4,-4 q 0,-4 3,-4 z" fill="#FFFFFF"/>
    <circle cx="18" cy="-6" r="1.8" fill="#fff"/><circle cx="24" cy="-4" r="1.8" fill="#fff"/>
  </g>`;
}
function chair(x, y, s = 1) {
  return g(x, y, s, false, `
    <rect x="14" y="-152" width="13" height="70" rx="6" fill="${C.wood}"/>
    <rect x="101" y="-152" width="13" height="70" rx="6" fill="${C.wood}"/>
    <rect x="18" y="-146" width="92" height="12" rx="6" fill="${C.woodD}"/>
    <rect x="18" y="-122" width="92" height="12" rx="6" fill="${C.woodD}"/>
    <rect x="0" y="-84" width="128" height="16" rx="8" fill="${C.wood}"/>
    <rect x="6" y="-88" width="116" height="8" rx="4" fill="${C.cushion}"/>
    <rect x="16" y="-68" width="13" height="68" rx="5" fill="${C.wood}"/>
    <rect x="99" y="-68" width="13" height="68" rx="5" fill="${C.wood}"/>
  `);
}
function teddy(x, y, s = 1) {
  return g(x, y, s, false, `
    <ellipse cx="-15" cy="-7" rx="10" ry="7" fill="#8A5A3B"/>
    <ellipse cx="15" cy="-7" rx="10" ry="7" fill="#8A5A3B"/>
    <ellipse cx="0" cy="-24" rx="20" ry="22" fill="#9C6B47"/>
    <ellipse cx="0" cy="-20" rx="11" ry="13" fill="#C79A72"/>
    <ellipse cx="-19" cy="-28" rx="7" ry="12" fill="#8A5A3B"/>
    <ellipse cx="19" cy="-28" rx="7" ry="12" fill="#8A5A3B"/>
    <circle cx="-13" cy="-66" r="7" fill="#9C6B47"/><circle cx="-13" cy="-66" r="3.5" fill="#C79A72"/>
    <circle cx="13" cy="-66" r="7" fill="#9C6B47"/><circle cx="13" cy="-66" r="3.5" fill="#C79A72"/>
    <circle cx="0" cy="-54" r="17" fill="#9C6B47"/>
    <ellipse cx="0" cy="-48" rx="8" ry="6" fill="#C79A72"/>
    <circle cx="0" cy="-51" r="2.6" fill="#4A3623"/>
    <circle cx="-6.5" cy="-58" r="2.4" fill="#332A20"/><circle cx="-7" cy="-59" r="0.8" fill="#FFF"/>
    <circle cx="6.5" cy="-58" r="2.4" fill="#332A20"/><circle cx="6" cy="-59" r="0.8" fill="#FFF"/>
    <rect x="-8" y="-38" width="16" height="4" rx="2" fill="#E15554"/>
  `);
}
function box(x, y, s = 1, { ball = false } = {}) {
  return g(x, y, s, false, `
    ${shadow(0, 4, 105)}
    <polygon points="-90,-112 -118,-134 -108,-148 -78,-126" fill="${C.boxD}"/>
    <polygon points="90,-112 118,-134 108,-148 78,-126" fill="${C.boxD}"/>
    <rect x="-68" y="-130" width="136" height="20" rx="5" fill="${C.boxD}"/>
    <rect x="-88" y="-120" width="176" height="32" rx="6" fill="#6E4E2E"/>
    <!-- toys peeking out -->
    <rect x="-40" y="-132" width="22" height="22" rx="4" fill="#2A9D8F"/>
    <polygon points="20,-118 32,-140 44,-118" fill="#FFD166"/>
    ${ball ? `<circle cx="0" cy="-122" r="30" fill="#E15554"/>
              <path d="M -27,-134 q 27,-16 54,0" stroke="#FFFFFF" stroke-width="6" fill="none" stroke-linecap="round"/>` : ''}
    <rect x="-95" y="-110" width="190" height="110" rx="9" fill="${C.box}"/>
    <rect x="-95" y="-110" width="190" height="34" rx="9" fill="${C.boxL}"/>
    <rect x="-10" y="-74" width="20" height="74" fill="${C.boxD}" opacity=".45"/>
  `);
}
function basket(x, y, s = 1) {
  return g(x, y, s, false, `
    ${shadow(0, 3, 82)}
    <path d="M -72,-44 Q -66,2 0,2 Q 66,2 72,-44 Z" fill="#C98A5B"/>
    <path d="M -58,-28 Q 0,-10 58,-28 M -48,-13 Q 0,2 48,-13" stroke="#A8703F" stroke-width="4" fill="none"/>
    <ellipse cx="0" cy="-44" rx="64" ry="14" fill="${C.rug}"/>
    <rect x="-76" y="-53" width="152" height="14" rx="7" fill="#A8703F"/>
  `);
}
function couch(x, y, s = 1) {
  return g(x, y, s, false, `
    <rect x="14" y="-14" width="22" height="14" rx="5" fill="${C.woodD}"/>
    <rect x="324" y="-14" width="22" height="14" rx="5" fill="${C.woodD}"/>
    <rect x="0" y="-150" width="360" height="140" rx="24" fill="${C.couchD}"/>
    <rect x="18" y="-86" width="158" height="44" rx="17" fill="${C.couch}"/>
    <rect x="184" y="-86" width="158" height="44" rx="17" fill="${C.couch}"/>
    <!-- cushion buttons -->
    <circle cx="97" cy="-64" r="4" fill="${C.couchD}"/><circle cx="263" cy="-64" r="4" fill="${C.couchD}"/>
    <rect x="-16" y="-110" width="48" height="100" rx="20" fill="${C.couch}"/>
    <rect x="328" y="-110" width="48" height="100" rx="20" fill="${C.couch}"/>
    <rect x="36" y="-124" width="44" height="44" rx="11" fill="${C.cushion}" transform="rotate(-8 58 -102)"/>
    <circle cx="58" cy="-102" r="3" fill="#C8842E"/>
  `);
}
/* Baba asleep on the couch, head on the RIGHT armrest.

   Reza, 2026-08-31: "cabn we not make baba a bit clear, looks very bad." He
   was right, and the reason is worth writing down because it is the same fault
   as the icons he rejected in July: the drawing had all the PARTS and none of
   the READING. A white bar, a disc of face floating clear of it, and two skin
   blobs at the far end that could have been anything. Nothing connected, so the
   eye had to assemble a man out of components instead of just seeing one.

   What fixes it is not more detail, it is the things that say ASLEEP ON A SOFA
   before you look at any of it: a pillow under the head, a blanket over the
   legs, feet sticking out of the end of the blanket, and a neck actually
   joining the head to a body. A three-year-old reads that shape instantly and
   never has to be told, which is rule 2 — the picture carries the meaning.

   Drawn back-to-front on purpose: pillow, then body, then head over the top of
   both, so every seam is hidden by the piece in front of it. */
function babaOnCouch(x, y, s = 1) {
  return g(x, y, s, false, `
    <!-- pillow on the armrest, so the head has something to rest ON -->
    <rect x="292" y="-128" width="78" height="34" rx="16" fill="${C.pillow}"/>
    <path d="M 300,-112 q 30,7 62,0" stroke="#E8CE93" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- feet first, poking out of the blanket at the far end -->
    <ellipse cx="106" cy="-110" rx="16" ry="12" fill="${C.skin}"/>
    <ellipse cx="104" cy="-88" rx="16" ry="12" fill="${C.skin}"/>
    <path d="M 96,-116 q 5,-5 11,0 M 94,-94 q 5,-5 11,0" stroke="#A9744F" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- the body: one unbroken shape from shoulder to ankle -->
    <rect x="108" y="-124" width="186" height="52" rx="26" fill="${C.thobe}"/>
    <circle cx="278" cy="-108" r="29" fill="${C.thobe}"/>

    <!-- blanket over the legs. Also hides the join at the ankles, which is the
         hardest thing to draw and the least worth drawing -->
    <rect x="118" y="-126" width="112" height="56" rx="18" fill="${C.blanket}"/>
    <rect x="118" y="-126" width="112" height="13" rx="6" fill="#9CC4E2"/>
    <path d="M 150,-70 v -56 M 190,-70 v -56" stroke="#6E9EC4" stroke-width="3" fill="none" opacity=".5"/>

    <!-- an arm lying along him, hand resting next to the cat -->
    <path d="M 276,-92 Q 258,-74 236,-78" stroke="${C.thobe}" stroke-width="21" fill="none" stroke-linecap="round"/>
    <circle cx="233" cy="-79" r="11" fill="${C.skin}"/>

    <!-- the cat, asleep on him, which is the joke the story keeps making -->
    ${catSleep(243, -137, 0.55)}

    <!-- neck, then head over the top of it -->
    <rect x="292" y="-120" width="20" height="22" rx="9" fill="${C.skin}"/>
    <circle cx="326" cy="-110" r="30" fill="${C.skin}"/>
    <!-- hair: a cap over the crown, on the pillow side -->
    <path d="M 300,-118 q 4,-24 27,-24 q 25,0 28,25 q -13,-11 -28,-11 q -17,0 -27,10 z" fill="${C.hair}"/>
    <!-- beard along the jaw -->
    <path d="M 302,-104 q 2,26 24,26 q 24,0 26,-26 q -12,9 -25,9 q -13,0 -25,-9 z" fill="${C.beard}"/>
    <!-- closed eyes, and eyebrows above them, so it reads as SLEEPING -->
    <path d="M 309,-112 q 6,6 12,0 M 331,-112 q 6,6 12,0" stroke="${C.dark}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 309,-122 q 6,-4 12,-1 M 331,-123 q 6,-3 12,1" stroke="${C.hair}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
    <circle cx="326" cy="-103" r="4.5" fill="#B87F5A"/>
    <path d="M 317,-94 q 9,6 18,0" stroke="${C.beard}" stroke-width="3.5" fill="none" stroke-linecap="round"/>

    ${zzz(368, -170, '#8FA3C7')}
    ${zzz(250, -178, C.catD, 0.65)}
  `);
}
function zzz(x, y, color, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})" ${FONT} fill="${color}" font-weight="800">
    <text x="0" y="0" font-size="36">Z</text>
    <text x="24" y="-26" font-size="27">z</text>
    <text x="42" y="-46" font-size="20">z</text>
  </g>`;
}
function qmarks(x, y) {
  return `<g transform="translate(${x},${y})" ${FONT} font-weight="800">
    <text x="0" y="0" font-size="64" fill="${C.dress}" transform="rotate(-10)">؟</text>
    <text x="-58" y="-28" font-size="42" fill="${C.shirt}" transform="rotate(8 -58 -28)">؟</text>
    <text x="52" y="-38" font-size="34" fill="#D9A400">؟</text>
  </g>`;
}
function sparkle(x, y, s = 1, color = '#FFD166') {
  return `<path transform="translate(${x},${y}) scale(${s})" d="M 0,-12 L 3,-3 L 12,0 L 3,3 L 0,12 L -3,3 L -12,0 L -3,-3 Z" fill="${color}"/>`;
}
function foodBowl(x, y) {
  return `<g transform="translate(${x},${y})">
    ${shadow(0, 4, 34)}
    <path d="M -30,-16 Q -26,2 0,2 Q 26,2 30,-16 Z" fill="#E15554"/>
    <ellipse cx="0" cy="-16" rx="30" ry="8" fill="#C43F3E"/>
  </g>`;
}

/* ================= 2. Scenes ================= */

function sceneCover() {
  return artScene('lulu-cover.jpg', 'Lulu the cat peeking out of a toy box in the living room');
}
function scene1() {
  return artScene('lulu-1.jpg', 'Adam looking around the living room wondering where Lulu is');
}
function scene2() {
  return artScene('lulu-2.jpg', 'Adam looking under the bed in the bedroom');
}
function scene3() {
  return artScene('lulu-3.jpg', 'Adam and Maryam looking around an armchair with a teddy bear');
}
function scene4() {
  return artScene('lulu-4.jpg', 'Adam looking inside an open toy box with Maryam');
}
function scene5() {
  return artScene('lulu-5.jpg', 'Adam puzzled and Maryam pointing towards the couch where Lulu is hidden');
}
/* The first painted scene (2026-08-31). It replaces a vector version that was
   redrawn once already the same day and still was not good enough. The
   painting says "asleep on the sofa with the cat on him" instantly, which is
   the entire job of this page — its words are لُولُو فَوْقَ بَابَا. */
function scene6() {
  return artScene('baba-couch.webp',
    'Baba asleep on the couch with Lulu the cat curled up on top of him');
}
function sceneEnd() {
  return artScene('lulu-end.jpg', 'Lulu the cat curled up asleep in her basket');
}

/* ————— «أين القمر؟» night scenes ————— */
function qCover() {
  return artScene('qamar1-cover.jpg', 'Crescent moon over quiet village at night');
}
function q1() { // لَيْل.
  return artScene('qamar1-1.jpg', 'Quiet night over village');
}
function q2() { // أَيْنَ الْقَمَر؟
  return artScene('qamar1-1.jpg', 'Where is the moon?');
}
function q3() { // هَذَا نَجْم.
  return artScene('qamar1-2.jpg', 'Twinkling stars in night sky');
}
function q4() { // هَذَا طَيْر.
  return artScene('qamar1-3.jpg', 'Little bird singing to the crescent moon');
}
function q5() { // هَذَا سَحَاب!
  return artScene('qamar1-4.jpg', 'Soft clouds drifting past the moon');
}
function q6() { // الْقَمَر هُنَا!
  return artScene('qamar1-5.jpg', 'The moon is here, glowing full and bright');
}
function q7() { // الْقَمَر جَمِيل!
  return artScene('qamar1-6.jpg', 'The moon is beautiful in the flower garden');
}
function qEnd() {
  return artScene('qamar1-end.jpg', 'Goodnight under the peaceful moon and stars');
}

/* ————— Mini icons for word cards & game (viewBox 0 0 100 100) ————— */
function icon(inner) { return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`; }
const ICONS = {
  cat: icon(`<rect width="100" height="100" rx="22" fill="#FFF6EB"/>
    <path d="M 26,38 L 18,14 L 42,26 Z" fill="${C.cat}"/><path d="M 27,34 L 22,20 L 37,28 Z" fill="${C.pink}"/>
    <path d="M 74,38 L 82,14 L 58,26 Z" fill="${C.cat}"/><path d="M 73,34 L 78,20 L 63,28 Z" fill="${C.pink}"/>
    <circle cx="50" cy="50" r="28" fill="${C.cat}"/>
    <ellipse cx="42" cy="60" rx="11" ry="9" fill="#FFF2E0"/><ellipse cx="58" cy="60" rx="11" ry="9" fill="#FFF2E0"/>
    <path d="M 42,26 q 2,6 0,10 M 50,24 q 0,7 0,11 M 58,26 q -2,6 0,10" stroke="${C.catD}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="39" cy="48" rx="6.5" ry="7" fill="#48B38A"/><ellipse cx="39" cy="48" rx="4.5" ry="6" fill="#1C4B3A"/><circle cx="37" cy="46" r="2" fill="#FFFFFF"/>
    <ellipse cx="61" cy="48" rx="6.5" ry="7" fill="#48B38A"/><ellipse cx="61" cy="48" rx="4.5" ry="6" fill="#1C4B3A"/><circle cx="59" cy="46" r="2" fill="#FFFFFF"/>
    <path d="M 47,56 L 53,56 L 50,60 Z" fill="#E37B9B"/>
    <path d="M 50,60 q -3,5 -7,2 M 50,60 q 3,5 7,2" stroke="${C.dark}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M 33,59 h -14 M 34,63 l -13,4 M 67,59 h 14 M 66,63 l 13,4" stroke="${C.dark}" stroke-width="1.8" stroke-linecap="round"/>`),
  bed: icon(`<rect width="100" height="100" rx="22" fill="#F2E7F6"/>
    <g transform="translate(8,76) scale(.27)">${bed(0, 0)}</g>`),
  chair: icon(`<rect width="100" height="100" rx="22" fill="#FEF5E7"/>
    <g transform="translate(30,86) scale(.4)">${chair(0, 0)}</g>`),
  box: icon(`<rect width="100" height="100" rx="22" fill="#FEF5E7"/>
    <g transform="translate(50,80) scale(.36)">${box(0, 0)}</g>`),
  where: icon(`<rect width="100" height="100" rx="22" fill="#FEF5E7"/>
    <rect x="22" y="52" width="56" height="34" rx="6" fill="${C.box}"/>
    <rect x="20" y="48" width="60" height="10" rx="4" fill="${C.boxL}"/>
    <g transform="translate(46, 36) rotate(-15)">
      <circle cx="0" cy="0" r="18" fill="#E8F4F8" stroke="#E76F51" stroke-width="5"/>
      <line x1="12" y1="12" x2="26" y2="26" stroke="#C4574E" stroke-width="6" stroke-linecap="round"/>
      <text x="0" y="7" font-size="22" font-weight="800" text-anchor="middle" fill="#E76F51" ${FONT}>؟</text>
    </g>`),
  under: icon(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>
    <rect x="14" y="36" width="72" height="10" rx="4" fill="${C.wood}"/>
    <rect x="22" y="46" width="8" height="42" rx="2" fill="${C.woodD}"/>
    <rect x="70" y="46" width="8" height="42" rx="2" fill="${C.woodD}"/>
    <circle cx="50" cy="68" r="14" fill="#E15554"/>
    <path d="M 42,62 Q 50,56 58,62" stroke="#FFFFFF" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M 50,50 v 8 M 46,54 l 4,4 4,-4" stroke="#E15554" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  on: icon(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>
    <rect x="14" y="56" width="72" height="10" rx="4" fill="${C.wood}"/>
    <rect x="22" y="66" width="8" height="24" rx="2" fill="${C.woodD}"/>
    <rect x="70" y="66" width="8" height="24" rx="2" fill="${C.woodD}"/>
    <circle cx="50" cy="40" r="15" fill="#E15554"/>
    <path d="M 42,34 Q 50,28 58,34" stroke="#FFFFFF" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M 50,14 v 8 M 46,18 l 4,4 4,-4" stroke="#E15554" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  inside: icon(`<rect width="100" height="100" rx="22" fill="#F6EBD8"/>
    <rect x="22" y="42" width="56" height="42" rx="6" fill="${C.woodD}"/>
    <circle cx="50" cy="56" r="14" fill="#E15554"/>
    <path d="M 42,50 Q 50,44 58,50" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 18,52 L 24,84 H 76 L 82,52 Z" fill="${C.wood}"/>
    <rect x="16" y="48" width="68" height="10" rx="4" fill="${C.box}"/>`),
  moon: icon(`<rect width="100" height="100" rx="22" fill="${N.sky}"/>
    <circle cx="26" cy="26" r="2.5" fill="#fff" opacity=".8"/><circle cx="78" cy="70" r="2.5" fill="#fff" opacity=".8"/>
    ${moonFull(50, 50, 27)}`),
  star: icon(`<rect width="100" height="100" rx="22" fill="${N.sky}"/>
    <circle cx="22" cy="72" r="2.5" fill="#fff" opacity=".8"/><circle cx="80" cy="26" r="2.5" fill="#fff" opacity=".8"/>
    ${bigStar(50, 52, 1.05)}`),
  cloud: icon(`<rect width="100" height="100" rx="22" fill="${N.sky}"/>
    <circle cx="24" cy="24" r="2.5" fill="#fff" opacity=".8"/><circle cx="80" cy="76" r="2.5" fill="#fff" opacity=".8"/>
    ${cloudP(50, 58, 0.52)}`),
  night: icon(`<rect width="100" height="100" rx="22" fill="${N.sky}"/>
    <circle cx="46" cy="50" r="30" fill="${N.starY}"/>
    <circle cx="64" cy="42" r="26" fill="${N.sky}"/>
    <circle cx="70" cy="34" r="3" fill="#fff"/><circle cx="78" cy="56" r="2.4" fill="#fff"/><circle cx="26" cy="28" r="2.4" fill="#fff"/>`),
  bird2: icon(`<rect width="100" height="100" rx="22" fill="${C.sky}"/>${bird(48, 52, 0.85)}`),
  this_: icon(`<rect width="100" height="100" rx="22" fill="#EBF5FB"/>
    <circle cx="70" cy="38" r="22" fill="#FFEAA7" opacity="0.4"/>
    <polygon points="70,22 75,33 87,35 78,43 81,55 70,48 59,55 62,43 53,35 65,33" fill="#FFD166"/>
    <polygon points="70,26 73,34 82,35 75,41 77,50 70,45 63,50 65,41 58,35 67,34" fill="#FFF8DC"/>
    <g transform="translate(0, 8)">
      <path d="M 12,62 h 28 q 6,0 10,-4 l 18,-10 q 5,-3 2,-8 q -3,-5 -8,-2 l -16,8 h -8 v -6 q 0,-4 -4,-4 h -22 z" fill="${C.skin}"/>
      <rect x="10" y="52" width="16" height="26" rx="6" fill="${C.shirt}"/>
    </g>`),
  jamil: icon(`<rect width="100" height="100" rx="22" fill="#FFF8F0"/>
    <circle cx="50" cy="48" r="32" fill="#FADBD8" opacity="0.6"/>
    <path d="M 50,74 C 20,54 12,32 26,20 C 38,10 46,20 50,26 C 54,20 62,10 74,20 C 88,32 80,54 50,74 Z" fill="#E74C3C"/>
    <path d="M 50,70 C 24,52 16,34 28,24 C 38,16 46,24 50,30 C 54,24 62,16 72,24 C 84,34 76,52 50,70 Z" fill="#FF6B6B" opacity="0.7"/>
    <circle cx="34" cy="28" r="4" fill="#FFFFFF" opacity="0.8"/>
    <path d="M 18,22 l 3,6 6,3 -6,3 -3,6 -3,-6 -6,-3 6,-3 z" fill="#FFD166"/>
    <path d="M 82,24 l 2.5,5 5,2.5 -5,2.5 -2.5,5 -2.5,-5 -5,-2.5 5,-2.5 z" fill="#FFD166"/>
    <path d="M 76,68 l 2,4 4,2 -4,2 -2,4 -2,-4 -4,-2 4,-2 z" fill="#2A9D8F"/>`),
};

/* ================= 3. Levels & books ================= */

const AR_NUM = ['٠', '١', '٢', '٣', '٤', '٥'];

/* The reading ladder — mirrors Qaida progression, like Oxford Reading Tree colour bands */
const LEVELS = [
  { n: 1, color: '#F09CB1', ink: '#7C2D46', name: 'وَرْدِيّ', nameEn: 'Pink',
    title: 'كَلِمَاتِي الأُولَى', titleEn: 'My first words',
    desc: 'جُمَل مِنْ ٢–٣ كَلِمَات بِالْحَرَكَاتِ فَقَط',
    descEn: '2–3 word sentences · fatha, kasra, damma + long vowels (ا و ي) — matches the early Qaida pages',
    skills: ['فَتْحَة كَسْرَة ضَمَّة', 'مَدّ: ا و ي', 'اَلْ قَمَرِيَّة'] },
  { n: 2, color: '#E15554', ink: '#FFFFFF', name: 'أَحْمَر', nameEn: 'Red',
    title: 'جُمَل صَغِيرَة', titleEn: 'Little sentences',
    desc: '٣–٤ كَلِمَات · سُكُون · فِي وَمِنْ وَ',
    descEn: '3–4 word sentences · sukoon arrives · joining words فِي، مِنْ، وَ',
    skills: ['سُكُون', 'فِي · مِنْ · وَ', 'أَسْئِلَة وَأَجْوِبَة'] },
  { n: 3, color: '#FFD166', ink: '#7A5A12', name: 'أَصْفَر', nameEn: 'Yellow',
    title: 'قِصَص أَطْوَل', titleEn: 'Longer stories',
    desc: '٤–٥ كَلِمَات · شَدَّة وَتَنْوِين',
    descEn: '4–5 word sentences · shadda & tanween · characters start to speak (قَالَ / قَالَتْ)',
    skills: ['شَدَّة', 'تَنْوِين', 'قَالَ / قَالَتْ'] },
  { n: 4, color: '#7DCEA0', ink: '#1E5E40', name: 'أَخْضَر', nameEn: 'Green',
    title: 'أَقْرَأُ وَحْدِي', titleEn: 'I read by myself',
    desc: 'جُمَل أَطْوَل · اَلْ الشَّمْسِيَّة',
    descEn: '6+ word sentences · sun-letter اَلْ (الشَّمْس، النَّجْم) · hamzat wasl',
    skills: ['اَلْ شَمْسِيَّة', 'هَمْزَة وَصْل', 'فِقْرَات قَصِيرَة'] },
  { n: 5, color: '#7FB0D6', ink: '#1F4E79', name: 'أَزْرَق', nameEn: 'Blue',
    title: 'مِنَ الْقُرْآن', titleEn: 'Into the Quran',
    desc: 'آيَات قَصِيرَة حَقِيقِيَّة وَأَدْعِيَة',
    descEn: 'Real short ayahs and duas she already knows — the bridge to reading the Mushaf itself',
    skills: ['آيَات قَصِيرَة', 'أَدْعِيَة', 'تَجْوِيد بَسِيط'] },
];

/* «أين القمر؟» — Level 2, Quranic words.
   RE-BANDED 2026-08-31, from 1 to 2. It was labelled Level 1, but لَيْل، أَيْنَ،
   نَجْم and طَيْر are all sukoon, and Level 1 promises harakat and long vowels
   only. It sits exactly on Level 2 — sukoon, no shadda, moon-letter اَلْ — so
   that is where it goes. scripts/test-books.js now enforces this. */
const BOOK_QAMAR = {
  id: 'qamar-1',
  level: 2,
  title: 'أَيْنَ الْقَمَر؟',
  titleEn: 'Where is the moon?',
  tag: 'كَلِمَات مِنَ الْقُرْآن · Quran words',
  words: [
    { ar: 'أَيْنَ', en: 'where?', icon: ICONS.where, quran: 'أَيْنَ الْمَفَرّ؟ — الْقِيَامَة' },
    { ar: 'قَمَر', en: 'moon', icon: ICONS.moon, quran: 'سُورَة الْقَمَر ٥٤' },
    { ar: 'نَجْم', en: 'star', icon: ICONS.star, quran: 'سُورَة النَّجْم ٥٣' },
    { ar: 'طَيْر', en: 'bird', icon: ICONS.bird2, quran: 'سُورَة الْفِيل ١٠٥' },
    { ar: 'سَحَاب', en: 'cloud', icon: ICONS.cloud, quran: 'الْبَقَرَة ١٦٤' },
    { ar: 'لَيْل', en: 'night', icon: ICONS.night, quran: 'سُورَة اللَّيْل ٩٢' },
    { ar: 'هَذَا', en: 'this', icon: ICONS.this_, quran: 'هَذَا رَبِّي — الأَنْعَام ٧٦' },
    { ar: 'جَمِيل', en: 'beautiful', icon: ICONS.jamil, quran: 'فَصَبْرٌ جَمِيلٌ — يُوسُف' },
  ],
  pages: [
    { type: 'cover', svg: qCover },
    { type: 'words' },
    { type: 'story', svg: q1, ar: [{ t: 'لَيْل.' }], en: 'Night.' },
    { type: 'story', svg: q2, ar: [{ t: 'أَيْنَ' }, { t: 'الْقَمَر؟' }], en: 'Where is the moon?' },
    { type: 'story', svg: q3, ar: [{ t: 'هَذَا' }, { t: 'نَجْم.' }], en: 'This is a star.' },
    { type: 'story', svg: q4, ar: [{ t: 'هَذَا' }, { t: 'طَيْر.' }], en: 'This is a bird.' },
    { type: 'story', svg: q5, ar: [{ t: 'هَذَا' }, { t: 'سَحَاب!' }], en: 'This is a cloud!' },
    { type: 'story', svg: q6, ar: [{ t: 'الْقَمَر' }, { t: 'هُنَا!', cls: 'no' }], en: 'The moon is here!' },
    { type: 'story', svg: q7, ar: [{ t: 'الْقَمَر' }, { t: 'جَمِيل!' }], en: 'The moon is beautiful!' },
    { type: 'game' },
    { type: 'end', svg: qEnd },
  ],
  game: [
    { say: 'قَمَر', opts: ['moon', 'star', 'cloud'], ans: 0 },
    { say: 'نَجْم', opts: ['bird2', 'star', 'moon'], ans: 1 },
    { say: 'طَيْر', opts: ['cloud', 'moon', 'bird2'], ans: 2 },
  ],
};

/* «أين لولو؟» — Level 4, everyday words.
   RE-BANDED 2026-08-31, from 1 to 4. This one carries السَّرِير and الصُّنْدُوق:
   sun-letter اَلْ with the shadda that comes with it, which is the skill that
   DEFINES Level 4. It is a short, gentle book and it still reads as one — the
   band is a promise about what a child can decode unaided, not about how long
   the sentences are. */
const BOOK_LULU = {
  id: 'lulu-1',
  level: 4,
  title: 'أَيْنَ لُولُو؟',
  titleEn: 'Where is Lulu?',
  tag: 'كَلِمَات الْبَيْت · everyday words',
  words: [
    { ar: 'أَيْنَ', en: 'where?', icon: ICONS.where },
    { ar: 'قِطَّة', en: 'cat', icon: ICONS.cat },
    { ar: 'سَرِير', en: 'bed', icon: ICONS.bed },
    { ar: 'كُرْسِيّ', en: 'chair', icon: ICONS.chair },
    { ar: 'صُنْدُوق', en: 'box', icon: ICONS.box },
    { ar: 'تَحْتَ', en: 'under', icon: ICONS.under },
    { ar: 'فَوْقَ', en: 'on top of', icon: ICONS.on },
    { ar: 'فِي', en: 'in', icon: ICONS.inside },
  ],
  pages: [
    { type: 'cover', svg: sceneCover },
    { type: 'words' },
    { type: 'story', svg: scene1, ar: [{ t: 'أَيْنَ' }, { t: 'لُولُو؟' }], en: 'Where is Lulu?' },
    { type: 'story', svg: scene2, ar: [{ t: 'لُولُو' }, { t: 'تَحْتَ' }, { t: 'السَّرِيرِ؟' }, { t: 'لَا!', cls: 'no' }], en: 'Is Lulu under the bed? No!' },
    { type: 'story', svg: scene3, ar: [{ t: 'لُولُو' }, { t: 'فَوْقَ' }, { t: 'الْكُرْسِيِّ؟' }, { t: 'لَا!', cls: 'no' }], en: 'Is Lulu on the chair? No!' },
    { type: 'story', svg: scene4, ar: [{ t: 'لُولُو' }, { t: 'فِي' }, { t: 'الصُّنْدُوقِ؟' }, { t: 'لَا!', cls: 'no' }], en: 'Is Lulu in the box? No!' },
    { type: 'story', svg: scene5, ar: [{ t: 'أَيْنَ' }, { t: 'لُولُو؟' }, { t: 'أَيْنَ؟' }], en: 'Where is Lulu? Where?' },
    { type: 'story', svg: scene6, ar: [{ t: 'لُولُو' }, { t: 'هُنَا!' }, { t: 'لُولُو' }, { t: 'فَوْقَ' }, { t: 'بَابَا!' }], en: 'Lulu is here! Lulu is on top of Baba!' },
    { type: 'game' },
    { type: 'end', svg: sceneEnd },
  ],
  game: [
    { say: 'قِطَّة', opts: ['cat', 'bed', 'box'], ans: 0 },
    { say: 'سَرِير', opts: ['chair', 'bed', 'cat'], ans: 1 },
    { say: 'صُنْدُوق', opts: ['bed', 'chair', 'box'], ans: 2 },
  ],
};

const BOOKS = [BOOK_QAMAR, BOOK_LULU];
let BOOK = BOOKS[0];   // book currently open in the reader

/* ================= 4. Audio ================= */
/* say(), sayLetter() and sayLetterName() now live in audio.js, which plays
   PRE-RENDERED mp3s instead of asking the browser to speak. speechSynthesis
   truncated words and varied by device — "sometimes it tapers off" — which on
   an ear-first site is a broken feature, not a rough edge. audio.js keeps
   speechSynthesis only as a fallback for a missing clip, and must load first. */
function stripSay(t) { return String(t).replace(/[؟?!،.]/g, ''); }

let AC = null;
function tone(freqs, dur = 0.14) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = AC.createOscillator(), gn = AC.createGain();
      o.type = 'sine'; o.frequency.value = f;
      gn.gain.setValueAtTime(0.18, AC.currentTime + i * dur);
      gn.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + (i + 1) * dur + 0.08);
      o.connect(gn); gn.connect(AC.destination);
      o.start(AC.currentTime + i * dur); o.stop(AC.currentTime + (i + 1) * dur + 0.1);
    });
  } catch (e) { /* no audio context — fine */ }
}
const chimeGood = () => tone([523, 659, 784]);
const chimeBad = () => tone([196], 0.22);

/* ================= 5. Shelf ================= */

const $ = sel => document.querySelector(sel);

let shelfLevel = 1;

/* Two kinds of book on the same ladder. Reza, 2026-08-31: "expand with stories
   which are non picture as well in each of the reading levels." They share the
   colour bands because they are the same reading skill — the difference is only
   whether an illustration is there to help. */
let shelfKind = 'pic';        // 'pic' | 'text'

function renderShelf() {
  const lv = LEVELS[shelfLevel - 1];

  $('#levels').innerHTML = LEVELS.map(l => {
    const active = l.n === shelfLevel;
    return `<button class="level-pill sel ${active ? 'active' : ''}" data-n="${l.n}"
      style="${active ? `background:${l.color};color:${l.ink};box-shadow:0 3px 0 rgba(0,0,0,.18)` : ''}">
      <span class="dot" style="background:${l.color}"></span>${AR_NUM[l.n]} ${l.name}</button>`;
  }).join('');
  $('#levels').querySelectorAll('.level-pill').forEach(p =>
    p.addEventListener('click', () => { shelfLevel = +p.dataset.n; renderShelf(); }));

  const books = BOOKS.filter(b => b.level === shelfLevel);
  $('#levelInfo').innerHTML = `
    <div class="level-info" style="--band:${lv.color}">
      <div class="li-head">
        <span class="band-chip" style="background:${lv.color};color:${lv.ink}">المستوى ${AR_NUM[lv.n]} · ${lv.nameEn}</span>
        <b class="li-title">${lv.title}</b><small class="li-title-en">${lv.titleEn}</small>
      </div>
      <p class="li-desc">${lv.desc}</p>
      <p class="li-desc-en">${lv.descEn}</p>
      <div class="skills">${lv.skills.map(s => `<span class="skill-chip">${s}</span>`).join('')}</div>
    </div>`;

  /* the picture / no-picture switch */
  const kindRow = document.getElementById('shelfKind');
  if (kindRow) {
    kindRow.innerHTML = `
      <button class="mode ${shelfKind === 'pic' ? 'on' : ''}" data-k="pic">🖼️ مَعَ صُوَر<small>With pictures</small></button>
      <button class="mode ${shelfKind === 'text' ? 'on' : ''}" data-k="text">📄 بِلَا صُوَر<small>No pictures — just reading</small></button>`;
    kindRow.querySelectorAll('.mode').forEach(b => b.addEventListener('click', () => {
      shelfKind = b.dataset.k; renderShelf();
    }));
  }

  if (shelfKind === 'text') return renderTextShelf(lv);

  $('#bookGrid').innerHTML = books.length ? books.map((b, i) => `
    <button class="book-card" data-i="${BOOKS.indexOf(b)}">
      <span class="spine" style="background:${lv.color}"></span>
      <div class="thumb">${svgWrap(b.pages[0].svg())}</div>
      <div class="meta">
        <div class="t">${b.title}</div>
        <div class="s s-en">${b.titleEn}</div>
        <div class="s">${b.tag}</div>
        <span class="chip" style="background:${lv.color};color:${lv.ink}">المستوى ${AR_NUM[b.level]} · ${lv.name}</span>
      </div>
    </button>`).join('')
    : `<div class="coming-soon">📚 كُتُب هَذَا الْمُسْتَوَى قَرِيبًا!<small>Books for this level are coming soon — finish the earlier shelves first!</small></div>`;
  $('#bookGrid').querySelectorAll('.book-card').forEach(card =>
    card.addEventListener('click', () => openReader(BOOKS[+card.dataset.i])));
}

/* The no-picture shelf. Deliberately typographic: a card here shows the title,
   what the story is about, and nothing else, because there is no cover art and
   pretending otherwise with a big empty box would look broken. */
function renderTextShelf(lv) {
  const all = (typeof TEXT_STORIES !== 'undefined' ? TEXT_STORIES : [])
    .filter(s => s.level === shelfLevel);
  const meta = (typeof SERIES_META !== 'undefined') ? SERIES_META : {};

  /* Standalone stories first, then each SERIES under its own heading with the
     episodes numbered. A series only works if it looks like one — a child has
     to be able to see that there is an episode 4 and that they have not read
     it yet. */
  const solo = all.filter(s => !s.series);
  const bySeries = new Map();
  for (const s of all.filter(x => x.series)) {
    if (!bySeries.has(s.series)) bySeries.set(s.series, []);
    bySeries.get(s.series).push(s);
  }

  const card = s => `
    <button class="text-card" data-id="${s.id}" style="border-right-color:${lv.color}">
      ${s.ep ? `<span class="tc-ep">${s.ep}</span>` : ''}
      <div class="tc-t">${s.title}</div>
      <div class="tc-en">${s.titleEn}</div>
      <div class="tc-blurb">${s.blurb}</div>
      <div class="tc-meta">${s.lines.length} سُطُور · no pictures</div>
    </button>`;

  let html = solo.map(card).join('');
  for (const [key, eps] of bySeries) {
    const m = meta[key] || { title: key, titleEn: '', icon: '📚' };
    eps.sort((a, b) => (a.ep || 0) - (b.ep || 0));
    html += `<div class="series-head">
        <span class="sh-ic">${m.icon}</span>
        <span class="sh-t">${m.title}</span>
        <span class="sh-en">${m.titleEn} · ${m.label || 'a series'}</span>
      </div>` + eps.map(card).join('');
  }

  $('#bookGrid').innerHTML = html ||
    `<div class="coming-soon">📄 قِصَص بِلَا صُوَر قَرِيبًا!<small>No-picture stories for this level are coming soon.</small></div>`;
  $('#bookGrid').querySelectorAll('.text-card').forEach(c =>
    c.addEventListener('click', () => openTextStory(c.dataset.id)));
}

/* ================= 6. Reader ================= */

let pageIdx = 0;
let gameState = null;

function openReader(book) {
  BOOK = book || BOOKS[0];
  pageIdx = 0;
  $('#reader').classList.remove('hidden');
  $('#shelf').classList.add('hidden');
  renderPage();
}
function closeReader() {
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  $('#reader').classList.add('hidden');
  $('#shelf').classList.remove('hidden');
  location.hash = '#shelf';
}
function go(delta) {
  const n = pageIdx + delta;
  if (n < 0 || n >= BOOK.pages.length) return;
  pageIdx = n;
  renderPage();
}

function renderPage() {
  const p = BOOK.pages[pageIdx];
  const host = $('#pageHost');
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  gameState = null;

  if ($('#readerTitleBar')) {
    $('#readerTitleBar').innerHTML = `<b>${BOOK.title}</b><small>${BOOK.titleEn}</small>`;
  }
  if ($('#readerPageInd')) {
    $('#readerPageInd').innerHTML = `<span>صفحة ${pageIdx + 1} من ${BOOK.pages.length}</span>`;
  }

  const lv = LEVELS[BOOK.level - 1];

  if (p.type === 'cover') {
    host.innerHTML = `
      <div class="page cover">
        <div class="scene">${svgWrap(p.svg())}</div>
        <div class="cover-text">
          <span class="chip" style="background:${lv.color};color:${lv.ink}">المستوى ${AR_NUM[BOOK.level]} · ${lv.name} ${lv.nameEn}</span>
          <h2 class="book-title" id="coverTitle">${BOOK.title}</h2>
          <p class="en">${BOOK.titleEn} — tap words to hear them!</p>
          <button class="big-btn" id="startBtn">اِفْتَحِ الْكِتَاب 📖 Open the book</button>
        </div>
      </div>`;
    $('#coverTitle').addEventListener('click', () => say(stripSay(BOOK.title)));
    $('#startBtn').addEventListener('click', () => { say(stripSay(BOOK.title)); go(1); });
  }

  else if (p.type === 'words') {
    host.innerHTML = `
      <div class="page words">
        <h2 class="page-head">كَلِمَاتُ الْقِصَّة
          <span class="en-inline">Words to practise — tap each one to hear it!</span></h2>
        <div class="word-grid">
          ${BOOK.words.map((w, i) => `
            <button class="word-card" data-i="${i}">
              <span class="icon">${w.icon}</span>
              <span class="ar">${w.ar}</span>
              <span class="en">${w.en}</span>
              ${w.quran ? `<span class="qr">✦ ${w.quran}</span>` : ''}
            </button>`).join('')}
        </div>
      </div>`;
    host.querySelectorAll('.word-card').forEach(card => {
      card.addEventListener('click', () => {
        const w = BOOK.words[+card.dataset.i];
        say(w.ar);
        card.classList.remove('said'); void card.offsetWidth; card.classList.add('said');
      });
    });
  }

  else if (p.type === 'story') {
    const line = p.ar.map(w => w.t).join(' ');
    host.innerHTML = `
      <div class="page story">
        <div class="scene" id="sceneTap">${svgWrap(p.svg())}</div>
        <div class="textbar">
          <p class="ar-line">
            <button class="speak-btn" id="sayLine">🔊</button>
            ${p.ar.map((w, i) => `<span class="w ${w.cls || ''}" data-i="${i}">${w.t}</span>`).join(' ')}
          </p>
          <p class="en">${p.en}</p>
        </div>
      </div>`;
    const speakLine = () => say(line);
    $('#sayLine').addEventListener('click', speakLine);
    $('#sceneTap').addEventListener('click', speakLine);
    host.querySelectorAll('.ar-line .w').forEach(el => {
      el.addEventListener('click', ev => {
        ev.stopPropagation();
        say(stripSay(p.ar[+el.dataset.i].t));
        host.querySelectorAll('.w.said').forEach(x => x.classList.remove('said'));
        el.classList.add('said');
        setTimeout(() => el.classList.remove('said'), 700);
      });
    });
    setTimeout(speakLine, 450);
  }

  else if (p.type === 'game') {
    host.innerHTML = `
      <div class="page game">
        <h2 class="page-head">🎈 اِسْمَعْ وَالْمَسْ!
          <span class="en-inline">Listen… then tap the right picture</span></h2>
        <button class="big-speaker" id="gameSpeak">🔊</button>
        <div class="game-cards" id="gameCards"></div>
        <div class="game-progress" id="gameProg"></div>
      </div>`;
    gameState = { round: 0, stars: 0 };
    $('#gameSpeak').addEventListener('click', () => say(BOOK.game[gameState.round].say));
    renderRound();
  }

  else if (p.type === 'end') {
    host.innerHTML = `
      <div class="page end">
        <div class="scene">${svgWrap(p.svg())}</div>
        <div class="textbar">
          <p class="ar-line big">النِّهَايَة 🌟</p>
          <p class="en">The End — Talk together: where was Lulu hiding?</p>
          <button class="big-btn" id="againBtn">🔁 مَرَّة أُخْرَى · Read again</button>
        </div>
      </div>`;
    $('#againBtn').addEventListener('click', () => { pageIdx = 0; renderPage(); });
    setTimeout(() => say('النِّهَايَة'), 400);
  }

  // nav + dots
  $('#prevBtn').toggleAttribute('disabled', pageIdx === 0);
  $('#nextBtn').toggleAttribute('disabled', pageIdx === BOOK.pages.length - 1);
  $('#nextBtn').classList.toggle('pulse', pageIdx === 0);
  $('#dots').innerHTML = BOOK.pages.map((_, i) => `<i class="${i === pageIdx ? 'on' : ''}"></i>`).join('');
}

function renderRound() {
  const r = BOOK.game[gameState.round];
  const cards = $('#gameCards');
  /* A picture may come from the storybook kit OR from the Level 0 letter kit —
     Level 2 books reuse the letter pictures so a child meets the same drawing
     of a بَيْت in both places. Look in both, and never render "undefined". */
  const pic = k => (ICONS[k] || (typeof LICONS !== 'undefined' && LICONS[k]) || '');
  cards.innerHTML = r.opts.map((k, i) =>
    `<button class="game-card" data-i="${i}">${pic(k)}</button>`).join('');
  $('#gameProg').innerHTML = BOOK.game.map((_, i) =>
    `<span class="${i < gameState.stars ? 'got' : 'not'}">★</span>`).join('');
  cards.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
      if (+card.dataset.i === r.ans) {
        card.classList.add('correct');
        chimeGood();
        gameState.stars++;
        setTimeout(() => {
          if (gameState.round < BOOK.game.length - 1) {
            gameState.round++;
            renderRound();
            setTimeout(() => say(BOOK.game[gameState.round].say), 350);
          } else {
            finishGame();
          }
        }, 900);
      } else {
        card.classList.add('wrong');
        chimeBad();
        setTimeout(() => { card.classList.remove('wrong'); say(r.say); }, 450);
      }
    });
  });
  setTimeout(() => say(r.say), 500);
}
function finishGame() {
  $('#gameProg').innerHTML = BOOK.game.map(() => `<span class="got">★</span>`).join('');
  const done = document.createElement('div');
  done.className = 'game-done';
  done.innerHTML = `مُمْتَاز! 🌟🌟🌟<small>Excellent! Amazing listening!</small>`;
  $('#pageHost').appendChild(done);
  say('مُمْتَاز');
  chimeGood();
  setTimeout(() => go(1), 2200);
}

/* ————— navigation events ————— */
if ($('#reader')) {
$('#closeBtn').addEventListener('click', closeReader);
$('#nextBtn').addEventListener('click', () => go(1));
$('#prevBtn').addEventListener('click', () => go(-1));
document.addEventListener('keydown', e => {
  if ($('#reader').classList.contains('hidden')) return;
  if (e.key === 'ArrowLeft') go(1);      // RTL: forward is leftwards
  if (e.key === 'ArrowRight') go(-1);
  if (e.key === 'Escape') closeReader();
});
let touchX = null;
document.addEventListener('pointerdown', e => { touchX = e.clientX; });
document.addEventListener('pointerup', e => {
  if (touchX === null || $('#reader').classList.contains('hidden')) return;
  const dx = e.clientX - touchX;
  if (Math.abs(dx) > 70) (dx > 0 ? go(1) : go(-1)); // physical RTL page flip
  touchX = null;
});

renderShelf();
const hashPage = location.hash.match(/^#(?:b(\d+))?p(\d+)$/);
if (hashPage) {
  openReader(BOOKS[+(hashPage[1] || 0)] || BOOKS[0]);
  pageIdx = Math.min(+hashPage[2], BOOK.pages.length - 1);
  renderPage();
}
}
