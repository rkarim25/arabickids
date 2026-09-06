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
  updated: '2026-09-06',
  built: [
    'Six doors: sounds + Qaida, books (8 with pictures, 29 without), vocab SRS, sentences, surahs, print',
    'All 51 ayat with real recitation, word by word, child notes',
    'Google sign-in: pop-up and redirect (redirect needs the URI registered — see next)',
    'The Path designed: PATH.md, data/path.json (7 stations), test-path.js',
    'Twenty core sentences chosen, each heard in a story before it is drilled',
    'Six new picture-free stories carrying those sentences, with audio',
    'This screen: diagnostics per child (v1, from vocab, surah and star data) and this list',
  ],
  next: [
    'Reza: register https://rkarim25.github.io/arabickids/ as a redirect URI in Google Cloud (hikayat-507218)',
    'Path phase 1: engine, keep-going / again / finish, the checkpoint every six story lines, the 5-minute cap',
    'Recall at every stop: cloze after a lesson, two questions at a story checkpoint, and the recall log (PATH.md §2b)',
    'Picture-book games and listen-and-find: record right/wrong so they count',
    'Diagnostics v2: per-sentence accuracy for the twenty sentences, weak three, last 14 days',
    'Path phase 2: home becomes one button (after a child has walked phase 1)',
    'Path phase 3: sentence review cards + today\'s sentences on this screen',
    'Path phase 4: path state and recall log sync; verify on two devices',
  ],
  waiting: [
    { what: 'Pictures for the six new stories', who: 'Antigravity (or any image AI)', brief: 'briefs/STORYBOOKS.md' },
    { what: 'Videos Ep 2–7, one per station', who: 'Google Flow / video AI', brief: 'briefs/VIDEOS.md (paste-ready prompts)' },
    { what: 'Parent letter recordings', who: 'Reza, in the 🎙 booth below', brief: 'record.js' },
  ],
};

if (typeof module !== 'undefined' && module.exports) module.exports = { BUILD_STATUS };
