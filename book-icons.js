/* ————— Re-point the original books at the new pictures ————————————————————
   app.js defines «أَيْنَ الْقَمَر؟» and «أَيْنَ لُولُو؟» before letters.js has
   loaded, so their word cards were stuck with the old hand-drawn kit. This runs
   afterwards and swaps them.

   It also fixes mappings that were simply WRONG, which mattered more than the
   drawing quality ever did. In the Level 2 book, «مَطْبَخ» (kitchen) was
   illustrated with a loaf of bread, «غُرْفَة» (room) with a bed, and «وَ» (and)
   with an EYE. A child who cannot read takes the whole meaning from the
   picture — rule 2 — so a wrong picture does not merely look poor, it teaches
   the wrong word. Reza spotted it on the words page, 2026-08-31.

   The recurring CHARACTERS stay hand-drawn on purpose: Lulu, Adam, Baba and
   Maryam appear in every illustrated scene, and an emoji cat next to the drawn
   cat in the story would read as two different animals.
   ========================================================================= */
'use strict';

(function () {
  if (typeof BOOKS === 'undefined' || typeof LICONS === 'undefined') return;

  /* the relations and the new object pictures need names in the shared kit so
     the listening game can look them up by key */
  ['rel_in', 'rel_on', 'rel_under', 'rel_and', 'rel_who', 'rel_this',
   'rel_big', 'rel_small', 'rel_where', 'cat2', 'bed', 'chair', 'box',
   'kitchen', 'room', 'kitab', 'dar', 'qamar', 'najm', 'tayr', 'sahab',
   'layl', 'heart2'].forEach(k => { if (LICONS[k]) ICONS[k] = LICONS[k]; });

  /* word card pictures, by book id and Arabic word */
  const FIX = {
    'qamar-1': {
      'أَيْنَ': 'rel_where', 'قَمَر': 'qamar', 'نَجْم': 'najm', 'طَيْر': 'tayr',
      'سَحَاب': 'sahab', 'لَيْل': 'layl', 'هَذَا': 'rel_this', 'جَمِيل': 'heart2',
    },
    'lulu-1': {
      'أَيْنَ': 'rel_where', 'قِطَّة': 'cat2', 'سَرِير': 'bed', 'كُرْسِيّ': 'chair',
      'صُنْدُوق': 'box', 'تَحْتَ': 'rel_under', 'فَوْقَ': 'rel_on', 'فِي': 'rel_in',
    },
  };

  for (const b of BOOKS) {
    const map = FIX[b.id];
    if (!map) continue;
    for (const w of b.words) if (map[w.ar] && LICONS[map[w.ar]]) w.icon = LICONS[map[w.ar]];
  }

  /* the listening games in those two books referenced the old icon keys */
  const GAME = { moon: 'qamar', star: 'najm', bird2: 'tayr', cloud: 'sahab',
                 cat: 'cat2', bed: 'bed', chair: 'chair', box: 'box' };
  for (const b of BOOKS) {
    if (!FIX[b.id]) continue;
    for (const r of b.game || []) r.opts = r.opts.map(k => GAME[k] || k);
  }

  if (typeof renderShelf === 'function' && typeof document !== 'undefined'
      && document.querySelector && document.querySelector('#bookGrid')) renderShelf();
})();
