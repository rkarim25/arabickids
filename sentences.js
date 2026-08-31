/* ————— Hikayat · جُمَل — the sentence lessons ————————————————————————————————
   Reza, 2026-08-31: "i want simple sentences to be created. which should be
   picture free… the same concept as the main website, but perhaps more child
   friendly and more explanation. the entire website should be auditory."
   And then, correcting me: "cant put picture in every stence dont think."

   He is right on both counts, and the second is the design. A picture can show
   a moon; it cannot show "Arabic has no word for is". Past single objects the
   picture stops carrying meaning and starts decorating, so these lessons drop
   it and put the whole load on the EAR — the Arabic spoken, the meaning spoken,
   and the explanation spoken. Nothing here needs reading, by anyone.

   The shape is the parent site's, which Reza chose deliberately: the sentence
   is the unit of study, and a lesson walks one sentence through
       hear it → what it means → how it works → say it → change a word.
   The fourth step is the one children actually learn from: swapping a single
   word in a sentence they already own is how a pattern becomes theirs, and it
   is much easier than building a sentence from nothing.

   Every sentence obeys its band (see DESIGN.md §3) — scripts/test-sentences.js
   holds them to it, exactly as the storybooks are held.
   ========================================================================= */
'use strict';

const SENTENCE_SETS = [
  {
    id: 'this',
    level: 1,
    title: 'هَذَا وَهَذِهِ',
    titleEn: 'This one, and that one',
    lessons: [
      {
        ar: 'هَذَا بَابَا.',
        en: 'This is Baba.',
        why: 'Arabic has no word for is. You just say: this… Baba. Two words, and you are done.',
        vary: [
          { ar: 'هَذَا أَدَم.', en: 'This is Adam.' },
          { ar: 'هَذَا كِتَاب.', en: 'This is a book.' },
        ],
      },
      {
        ar: 'هَذِهِ لُولُو.',
        en: 'This is Lulu.',
        why: 'For a girl, or a girl cat, this changes from hadha to hadhihi. Same word, a girl ending.',
        vary: [
          { ar: 'هَذِهِ مَامَا.', en: 'This is Mama.' },
          { ar: 'هَذِهِ دَار.', en: 'This is a house.' },
        ],
      },
    ],
  },
  {
    id: 'where',
    level: 2,
    title: 'أَيْنَ؟',
    titleEn: 'Where is it?',
    lessons: [
      {
        ar: 'لُولُو فِي الْبَيْت.',
        en: 'Lulu is in the house.',
        why: 'Fee means in. Put fee between two things and you have said where something is.',
        vary: [
          { ar: 'لُولُو فِي الْمَطْبَخ.', en: 'Lulu is in the kitchen.' },
          { ar: 'أَدَم فِي الْبَيْت.', en: 'Adam is in the house.' },
        ],
      },
      {
        ar: 'الْكِتَاب فَوْقَ الْمَائِدَة.',
        en: 'The book is on the table.',
        why: 'Fawqa means on top of. Its opposite is tahta, which means underneath.',
        vary: [
          { ar: 'الْكِتَاب تَحْتَ الْمَائِدَة.', en: 'The book is under the table.' },
          { ar: 'لُولُو فَوْقَ الْمَائِدَة.', en: 'Lulu is on the table.' },
        ],
      },
      {
        ar: 'أَيْنَ لُولُو؟',
        en: 'Where is Lulu?',
        why: 'Ayna means where. Put it first, and the whole sentence becomes a question.',
        vary: [
          { ar: 'أَيْنَ بَابَا؟', en: 'Where is Baba?' },
          { ar: 'أَيْنَ الْكِتَاب؟', en: 'Where is the book?' },
        ],
      },
    ],
  },
  {
    id: 'describe',
    level: 2,
    title: 'كَيْفَ هُوَ؟',
    titleEn: 'What is it like?',
    lessons: [
      {
        ar: 'الْقَمَر جَمِيل.',
        en: 'The moon is beautiful.',
        why: 'Again there is no is. The moon… beautiful. That is a whole sentence in Arabic.',
        vary: [
          { ar: 'الْبَيْت جَمِيل.', en: 'The house is beautiful.' },
          { ar: 'الْكِتَاب جَمِيل.', en: 'The book is beautiful.' },
        ],
      },
      {
        ar: 'لُولُو صَغِيرَة.',
        en: 'Lulu is small.',
        why: 'Lulu is a girl, so small gets a girl ending — a soft ah sound at the end. Listen for it: sagheerah.',
        vary: [
          { ar: 'لُولُو كَبِيرَة.', en: 'Lulu is big.' },
          { ar: 'مَامَا صَغِيرَة.', en: 'Mama is small.' },
        ],
      },
    ],
  },
  {
    id: 'who',
    level: 2,
    title: 'مَنْ؟',
    titleEn: 'Who is it?',
    lessons: [
      {
        ar: 'مَنْ فِي الْبَيْت؟',
        en: 'Who is in the house?',
        why: 'Man means who. It asks about a person, and ayna asks about a place.',
        vary: [
          { ar: 'مَنْ فِي الْمَطْبَخ؟', en: 'Who is in the kitchen?' },
          { ar: 'مَنْ فِي الْغُرْفَة؟', en: 'Who is in the room?' },
        ],
      },
      {
        ar: 'أَدَم وَمَرْيَم فِي الْبَيْت.',
        en: 'Adam and Maryam are in the house.',
        why: 'Wa means and, and it sticks onto the front of the next word instead of standing alone.',
        vary: [
          { ar: 'أَدَم وَمَرْيَم فِي الْمَطْبَخ.', en: 'Adam and Maryam are in the kitchen.' },
          { ar: 'بَابَا وَمَرْيَم فِي الْبَيْت.', en: 'Baba and Maryam are in the house.' },
        ],
      },
    ],
  },
];

/* flat list, for the engine and the tests */
const ALL_LESSONS = SENTENCE_SETS.flatMap(s => s.lessons.map(l => ({ ...l, set: s.id, level: s.level })));

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SENTENCE_SETS, ALL_LESSONS };
}
