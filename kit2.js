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
    <path d="M -34,0 L -26,-96 h 52 L 34,0 Z" fill="#6E7FA8"/>
    <path d="M -26,-96 h 52 l 4,26 h -60 Z" fill="#5D6C92"/>
    ${arms}
    <circle cx="0" cy="-124" r="26" fill="${C.skin}"/>
    <path d="M -30,-126 a 30 30 0 0 1 60,0 q 6,34 -8,44 q -22,8 -44,0 q -14,-10 -8,-44 Z" fill="#3E5FA0"/>
    <path d="M -22,-132 a 22 22 0 0 1 44,0 q -22,-12 -44,0 Z" fill="#34528C"/>
    <circle cx="-9" cy="-124" r="3.4" fill="#332A20"/><circle cx="9" cy="-124" r="3.4" fill="#332A20"/>
    <path d="M -8,-112 q 8,7 16,0" stroke="#332A20" stroke-width="3" fill="none" stroke-linecap="round"/>
  `);
}

/* ---------- a cup, and a plate of food ---------- */
function cup(x, y, s = 1, fill = '#7FB0D6') {
  return g(x, y, s, false, `
    ${shadow(0, 2, 22)}
    <path d="M -18,-40 h 36 l -4,38 h -28 Z" fill="#FFFFFF"/>
    <path d="M -15,-30 h 30 l -3,26 h -24 Z" fill="${fill}"/>
    <path d="M 18,-34 q 14,4 0,20" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
  `);
}
function plateOf(x, y, s = 1) {
  return g(x, y, s, false, `
    ${shadow(0, 2, 40)}
    <ellipse cx="0" cy="-4" rx="46" ry="13" fill="#FFFFFF"/>
    <ellipse cx="0" cy="-7" rx="36" ry="9" fill="#EFE6D4"/>
    <circle cx="-12" cy="-12" r="11" fill="#E15554"/>
    <circle cx="8" cy="-14" r="10" fill="${C.sun}"/>
    <circle cx="22" cy="-9" r="7" fill="#7BC08F"/>
  `);
}

/* ---------- the masjid ----------------------------------------------------
   Exterior, because that is how a child recognises it — a dome, a minaret and
   a crescent against the sky. */
function masjidScene(dusk = false) {
  const sky = dusk ? '#F3C77E' : '#BDE3F0';
  const wall = '#F6F1E7', wallD = '#E4DAC7', dome = '#2A9D8F', domeD = '#1F7F73';
  return `<rect width="800" height="520" fill="${sky}"/>
    ${dusk ? `<circle cx="120" cy="130" r="46" fill="#F2A5A5" opacity=".8"/>`
           : `<circle cx="120" cy="110" r="40" fill="${C.sun}"/>`}
    <ellipse cx="620" cy="120" rx="80" ry="30" fill="#FFFFFF" opacity=".85"/>
    <rect y="404" width="800" height="116" fill="#CBB994"/>
    <rect y="400" width="800" height="8" fill="#B8A67F"/>

    <rect x="596" y="150" width="46" height="254" fill="${wall}"/>
    <rect x="592" y="140" width="54" height="16" rx="6" fill="${wallD}"/>
    <path d="M 596,140 h 46 l -23,-34 Z" fill="${dome}"/>
    <path d="M 619,96 v -14 M 619,82 a 9 9 0 1 1 0.01 0" stroke="${C.sun}" stroke-width="4" fill="none"/>

    <rect x="180" y="230" width="380" height="174" fill="${wall}"/>
    <rect x="170" y="220" width="400" height="18" rx="7" fill="${wallD}"/>
    <path d="M 200,220 q 170,-150 340,0 Z" fill="${dome}"/>
    <path d="M 240,220 q 130,-108 260,0 Z" fill="${domeD}" opacity=".35"/>
    <path d="M 370,74 v -16 M 370,58 a 10 10 0 1 1 0.01 0" stroke="${C.sun}" stroke-width="5" fill="none"/>

    <path d="M 330,404 v -84 a 40 40 0 0 1 80,0 v 84 Z" fill="${C.woodD}"/>
    <path d="M 340,404 v -80 a 30 30 0 0 1 60,0 v 80 Z" fill="${C.wood}"/>
    <rect x="228" y="286" width="46" height="72" rx="23" fill="${C.sky}"/>
    <rect x="466" y="286" width="46" height="72" rx="23" fill="${C.sky}"/>`;
}
