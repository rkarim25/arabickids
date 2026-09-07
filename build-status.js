/* ————— Hikayat · what is built, what is next ————————————————————————————————
   Reza, 2026-09-06: "always summarise what needs to be built and what has
   been built. Keep it in the grown up section."

   This is that summary, and it is rendered on the ⚙ For grown-ups screen
   (sync.js → renderBuildStatus). It is written by whichever AI last worked
   on the site, so it is only as honest as the last session. Rules:
   - Move an item from `next` to `built` in the SAME commit that builds it.
   - `waiting` is content another AI has to make (pictures, videos); the
     brief it needs is named so Reza can paste it into that AI.
   - Stories with `art: 'pending'` in stories-text.js are counted live, so
     that list never goes stale.
   - Keep each line under ~12 words. He reads this on a phone.
   ========================================================================= */
'use strict';

const BUILD_STATUS = {
  updated: '2026-09-07',
  built: [
    'Six doors: sounds + Qaida, books (8 with pictures, 29 without), vocab SRS, sentences, surahs, print',
    'All 51 ayat with real recitation, word by word, child notes',
    'Google sign-in: pop-up and redirect (redirect needs the URI registered — see next)',
    'The Path Phase 1 engine: path.js, path-ui.js, 5-min cap, 3-button choice, checkpoints',
    'Illustrations for the six path stories in watercolor style',
    'Recall log: sentence cloze challenges, book game accuracy, sound quiz logging',
    'Diagnostics v2: 20 core sentences accuracy, weak three list, 14-day activity dots',
  ],
  next: [
    'Reza: register https://rkarim25.github.io/arabickids/ as a redirect URI in Google Cloud (hikayat-507218)',
    'Path phase 2: home becomes one button (after a child has walked phase 1)',
    'Path phase 3: sentence review cards + today\'s sentences on this screen',
    'Path phase 4: path state and recall log sync; verify on two devices',
  ],
  waiting: [
    { what: 'Videos Ep 2–7, one per station', who: 'Google Flow / video AI', brief: 'briefs/VIDEOS.md (paste-ready prompts)' },
    { what: 'Parent letter recordings', who: 'Reza, in the 🎙 booth below', brief: 'record.js' },
  ],
};


if (typeof module !== 'undefined' && module.exports) module.exports = { BUILD_STATUS };
