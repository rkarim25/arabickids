/* ————— Hikayat · more of the illustration kit ————————————————————————————
   Figures and places the frequency-built books need. Same primitives and same
   palette as app.js, so a child meets one consistent world rather than three
   drawing styles.

   Mama had to be drawn: أُمِّي is the 38th most frequent word in the measured
   corpus and the family is half of everything a small child says, yet the kit
   had a Baba and no mother. The masjid likewise — الْمَسْجِد is 53rd.
   ========================================================================= */
'use strict';

/* ---------- Mama ----------------------------------------------------------
   Built from the same parts as the other figures: a baseline at y, local
   origin at the feet, so she drops into any room() at 382 like everyone else. */
/* ---------- Mama ----------------------------------------------------------
   Built from the same parts as the other figures: a baseline at y, local
   origin at the feet, so she drops into any room() at 382 like everyone else. */
function mama(x, y, pose = 'down', s = 1, flip = false) {
  const A = `fill="none" stroke="${C.skin}" stroke-width="11" stroke-linecap="round"`;
  const hand = (hx, hy) => `<circle cx="${hx}" cy="${hy}" r="7.5" fill="${C.skin}"/>`;
  const arms = {
    down: `<path d="M -22,-104 Q -34,-86 -36,-66" ${A}/>${hand(-36, -64)}
           <path d="M 22,-104 Q 34,-86 36,-66" ${A}/>${hand(36, -64)}`,
    open: `<path d="M -22,-104 Q -44,-96 -58,-82" ${A}/>${hand(-60, -80)}
           <path d="M 22,-104 Q 44,-96 58,-82" ${A}/>${hand(60, -80)}`,
    point: `<path d="M -22,-104 Q -34,-86 -36,-66" ${A}/>${hand(-36, -64)}
            <path d="M 22,-104 Q 46,-110 64,-116" ${A}/>${hand(66, -116)}`,
    hold: `<path d="M -22,-104 Q -30,-84 -14,-74" ${A}/>${hand(-12, -73)}
           <path d="M 22,-104 Q 30,-84 14,-74" ${A}/>${hand(12, -73)}`,
  }[pose] || '';

  return g(x, y, s, flip, `
    ${shadow(0, 2, 42)}
    <path d="M -34,0 L -26,-96 h 52 L 34,0 Z" fill="#E76F51"/>
    <path d="M -26,-96 h 52 l 4,26 h -60 Z" fill="#D35F42"/>
    ${arms}
    <circle cx="0" cy="-124" r="26" fill="${C.skin}"/>
    <!-- elegant teal headscarf -->
    <path d="M -30,-126 a 30 30 0 0 1 60,0 q 6,34 -8,46 q -22,8 -44,0 q -14,-12 -8,-46 Z" fill="#2A9D8F"/>
    <path d="M -22,-132 a 22 22 0 0 1 44,0 q -22,-12 -44,0 Z" fill="#228377"/>
    <!-- eyes with catchlight -->
    <circle cx="-9" cy="-124" r="3.6" fill="#332A20"/><circle cx="-10" cy="-126" r="1.3" fill="#FFFFFF"/>
    <circle cx="9" cy="-124" r="3.6" fill="#332A20"/><circle cx="8" cy="-126" r="1.3" fill="#FFFFFF"/>
    <!-- warm smile & blush -->
    <circle cx="-15" cy="-118" r="3.5" fill="${C.pink}" opacity="0.6"/>
    <circle cx="15" cy="-118" r="3.5" fill="${C.pink}" opacity="0.6"/>
    <path d="M -7,-114 q 7,7 14,0" stroke="#332A20" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  `);
}

/* ---------- Baba (standing) ---------- */
function baba(x, y, pose = 'down', s = 1, flip = false) {
  const A = `fill="none" stroke="#F6F1E7" stroke-width="14" stroke-linecap="round"`;
  const hand = (hx, hy) => `<circle cx="${hx}" cy="${hy}" r="8.5" fill="${C.skin}"/>`;
  const arms = {
    down: `<path d="M -24,-108 Q -36,-88 -38,-66" ${A}/>${hand(-38, -64)}
           <path d="M 24,-108 Q 36,-88 38,-66" ${A}/>${hand(38, -64)}`,
    open: `<path d="M -24,-108 Q -46,-98 -62,-84" ${A}/>${hand(-64, -82)}
           <path d="M 24,-108 Q 46,-98 62,-84" ${A}/>${hand(64, -82)}`,
    hips: `<path d="M -24,-108 Q -42,-96 -34,-74" ${A}/>${hand(-33, -72)}
           <path d="M 24,-108 Q 42,-96 34,-74" ${A}/>${hand(33, -72)}`,
  }[pose] || '';
  return g(x, y, s, flip, `
    ${shadow(0, 2, 46)}
    <rect x="-24" y="-12" width="22" height="12" rx="6" fill="#5D6A77"/>
    <rect x="2" y="-12" width="22" height="12" rx="6" fill="#5D6A77"/>
    <rect x="-20" y="-56" width="16" height="48" rx="8" fill="#7D8C9E"/>
    <rect x="4" y="-56" width="16" height="48" rx="8" fill="#7D8C9E"/>
    <!-- thobe -->
    <path d="M -30,0 L -24,-112 h 48 L 30,0 Z" fill="#F6F1E7"/>
    <path d="M -24,-112 L 0,-98 L 24,-112" stroke="#E0D6C3" stroke-width="3" fill="none"/>
    ${arms}
    <circle cx="0" cy="-138" r="28" fill="${C.skin}"/>
    <!-- neat beard & hair -->
    <path d="M -28,-140 a 28 28 0 0 1 56,0 q -28,-16 -56,0 Z" fill="#5A4633"/>
    <path d="M -24,-132 q 24,36 48,0 q -6,34 -24,34 t -24,-34 Z" fill="#5A4633"/>
    <circle cx="-10" cy="-140" r="3.8" fill="#332A20"/><circle cx="-11" cy="-142" r="1.4" fill="#FFFFFF"/>
    <circle cx="10" cy="-140" r="3.8" fill="#332A20"/><circle cx="9" cy="-142" r="1.4" fill="#FFFFFF"/>
    <path d="M -6,-132 q 6,6 12,0" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  `);
}

/* ---------- a cup, and a plate of food ---------- */
function cup(x, y, s = 1, fill = '#7FB0D6') {
  return g(x, y, s, false, `
    ${shadow(0, 2, 22)}
    <path d="M -18,-40 h 36 l -4,38 h -28 Z" fill="#FFFFFF"/>
    <path d="M -15,-30 h 30 l -3,26 h -24 Z" fill="${fill}"/>
    <path d="M 18,-34 q 14,4 0,20" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
    <line x1="-8" y1="-30" x2="-8" y2="-6" stroke="#FFFFFF" stroke-width="2" opacity="0.4"/>
  `);
}
function plateOf(x, y, s = 1) {
  return g(x, y, s, false, `
    ${shadow(0, 2, 40)}
    <ellipse cx="0" cy="-4" rx="48" ry="14" fill="#FFFFFF"/>
    <ellipse cx="0" cy="-6" rx="42" ry="11" fill="#FFF8F0"/>
    <ellipse cx="0" cy="-8" rx="36" ry="9" fill="#EFE6D4"/>
    <!-- fruits & treats -->
    <circle cx="-14" cy="-12" r="10" fill="#E15554"/>
    <circle cx="6" cy="-14" r="9" fill="${C.sun}"/>
    <circle cx="20" cy="-10" r="7" fill="#7BC08F"/>
    <circle cx="-3" cy="-10" r="6" fill="#F49E4C"/>
  `);
}

/* ---------- the masjid ----------------------------------------------------
   Exterior, because that is how a child recognises it — a dome, a minaret and
   a crescent against the sky. */
function masjidScene(dusk = false) {
  const sky = dusk ? '#F3C77E' : '#BDE3F0';
  const wall = '#FBF8F2', wallD = '#E8E0D0', dome = '#2A9D8F', domeD = '#1F7F73';
  return `<rect width="800" height="520" fill="${sky}"/>
    ${dusk ? `<circle cx="120" cy="130" r="54" fill="#F2A5A5" opacity=".4"/>
              <circle cx="120" cy="130" r="42" fill="#F49E4C" opacity=".9"/>`
           : `<circle cx="120" cy="110" r="48" fill="#FFEAA7" opacity=".4"/>
              <circle cx="120" cy="110" r="38" fill="${C.sun}"/>`}
    <ellipse cx="620" cy="120" rx="90" ry="34" fill="#FFFFFF" opacity=".9"/>
    <ellipse cx="540" cy="136" rx="60" ry="26" fill="#FFFFFF" opacity=".9"/>
    <rect y="404" width="800" height="116" fill="#7BC08F"/>
    <rect y="400" width="800" height="6" fill="#68A87B"/>

    <!-- minaret -->
    <rect x="596" y="140" width="46" height="264" fill="${wall}"/>
    <rect x="592" y="130" width="54" height="16" rx="6" fill="${wallD}"/>
    <rect x="606" y="180" width="26" height="40" rx="13" fill="${C.sky}"/>
    <rect x="606" y="260" width="26" height="40" rx="13" fill="${C.sky}"/>
    <path d="M 596,130 h 46 l -23,-36 Z" fill="${dome}"/>
    <path d="M 619,86 v -14 M 619,72 a 9 9 0 1 1 0.01 0" stroke="${C.sun}" stroke-width="4" fill="none"/>

    <!-- main building & dome -->
    <rect x="180" y="230" width="380" height="174" fill="${wall}"/>
    <rect x="170" y="220" width="400" height="18" rx="7" fill="${wallD}"/>
    <path d="M 200,220 q 170,-160 340,0 Z" fill="${dome}"/>
    <path d="M 230,220 q 140,-120 280,0 Z" fill="${domeD}" opacity=".35"/>
    <path d="M 370,68 v -16 M 370,52 a 11 11 0 1 1 0.01 0" stroke="${C.sun}" stroke-width="5" fill="none"/>

    <!-- grand arched entrance -->
    <path d="M 320,404 v -94 a 50 50 0 0 1 100,0 v 94 Z" fill="${C.woodD}"/>
    <path d="M 330,404 v -90 a 40 40 0 0 1 80,0 v 90 Z" fill="${C.wood}"/>
    <!-- arched windows -->
    <path d="M 224,350 v -40 a 22 22 0 0 1 44,0 v 40 Z" fill="${C.sky}"/>
    <path d="M 472,350 v -40 a 22 22 0 0 1 44,0 v 40 Z" fill="${C.sky}"/>`;
}
