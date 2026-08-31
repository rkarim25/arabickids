/* ————— Hikayat · قِصَص بِلَا صُوَر — stories with no pictures ————————————————
   Reza, 2026-08-31: "expand with stories which are non picture as well in each
   of the reading levels."

   This is the step between a picture book and a real book, and it is the step
   where reading actually starts. In a picture book the illustration carries the
   meaning and the child can succeed without decoding a single word. Take the
   picture away and the words have to do the work — which is the whole point,
   and also why these cannot simply be the picture books with the art removed:
   nothing here relies on a scene to make sense.

   What replaces the picture is the EAR. Every line plays, every word is its own
   tap, the meaning is read aloud, and there is a listen-to-the-whole-thing mode
   for a child who wants to follow along rather than work.

   Same five bands as the shelf next door, and scripts/test-stories-text.js
   holds them to exactly the same rules. Level 1 has no sun-letter اَلْ, no
   shadda AND no sukoon — which means no اَلْ at all, since the article carries
   a sukoon on its lam. That is a hard constraint and it is why the Level 1
   story is short sentences about people in the room.

   Funny where funny belongs, and not in the last one.
   ========================================================================= */
'use strict';

const TEXT_STORIES = [
  {
    id: 'ts-ana',
    level: 1,
    title: 'أَنَا أَدَم',
    titleEn: 'I am Adam',
    blurb: 'A boy, his family, and one drink too many.',
    lines: [
      { ar: 'أَنَا أَدَم.', en: 'I am Adam.' },
      { ar: 'هَذِهِ مَامَا.', en: 'This is Mama.' },
      { ar: 'هَذَا بَابَا.', en: 'This is Baba.' },
      { ar: 'هَذِهِ لُولُو.', en: 'This is Lulu.' },
      { ar: 'لُولُو صَغِيرَة.', en: 'Lulu is small.' },
      { ar: 'أَنَا جَائِع.', en: 'I am hungry.' },
      { ar: 'أُرِيدُ مَاء.', en: 'I want water.' },
      { ar: 'هَذَا مَاء يَا أَدَم.', en: 'Here is water, Adam.' },
      { ar: 'وَأُرِيدُ عَصِير!', en: 'And I want juice!' },
      { ar: 'لَا يَا أَدَم!', en: 'No, Adam!' },
      { ar: 'أَنَا سَعِيد.', en: 'I am happy.' },
    ],
  },
  {
    id: 'ts-yawm',
    level: 2,
    title: 'يَوْم فِي الْبَيْت',
    titleEn: 'A day in the house',
    blurb: 'Everybody is somewhere. Lulu is somewhere else.',
    lines: [
      { ar: 'الْيَوْم أَدَم فِي الْبَيْت.', en: 'Today Adam is in the house.' },
      { ar: 'مَرْيَم فِي الْغُرْفَة.', en: 'Maryam is in the room.' },
      { ar: 'بَابَا فِي الْمَطْبَخ.', en: 'Baba is in the kitchen.' },
      { ar: 'وَأَيْنَ لُولُو؟', en: 'And where is Lulu?' },
      { ar: 'لُولُو فَوْقَ الْكِتَاب.', en: 'Lulu is on top of the book.' },
      { ar: 'لَا! لُولُو تَحْتَ الْمَائِدَة.', en: 'No! Lulu is under the table.' },
      { ar: 'لَا! لُولُو فَوْقَ بَابَا!', en: 'No! Lulu is on top of Baba!' },
      { ar: 'أَنَا لَسْتُ مَائِدَة!', en: 'I am not a table!' },
    ],
  },
  {
    id: 'ts-khubz',
    level: 3,
    title: 'مَنْ أَكَلَ الْخُبْز؟',
    titleEn: 'Who ate the bread?',
    blurb: 'Nobody did it. Somebody did it.',
    lines: [
      { ar: 'قَالَتْ أُمِّي: أَيْنَ الْخُبْز؟', en: 'Mama said: where is the bread?' },
      { ar: 'قَالَ أَدَم: مَا أَكَلْتُ الْخُبْز!', en: 'Adam said: I did not eat the bread!' },
      { ar: 'قَالَتْ مَرْيَم: وَلَا أَنَا!', en: 'Maryam said: nor did I!' },
      { ar: 'قَالَ بَابَا: وَلَا أَنَا!', en: 'Baba said: nor did I!' },
      { ar: 'نَظَرَتْ أُمِّي تَحْتَ الْمَائِدَة.', en: 'Mama looked under the table.' },
      { ar: 'لُولُو هُنَاكَ وَمَعَهَا الْخُبْز!', en: 'Lulu was there, and she had the bread!' },
      { ar: 'ضَحِكَ الْجَمِيع.', en: 'Everybody laughed.' },
    ],
  },
  {
    id: 'ts-suq',
    level: 4,
    title: 'يَوْم فِي السُّوق',
    titleEn: 'A day at the market',
    blurb: 'Mama said no to the chocolate. Mama bought the chocolate.',
    lines: [
      { ar: 'ذَهَبَ أَدَم مَعَ أُمِّهِ إِلَى السُّوقِ.', en: 'Adam went with his mother to the market.' },
      { ar: 'اِشْتَرَتْ أُمُّهُ الْخُبْزَ وَالسَّمَكَ وَالتُّفَّاحَ.', en: 'His mother bought bread, fish and apples.' },
      { ar: 'قَالَ أَدَم: أُرِيدُ الشُّوكُولَاتَة!', en: 'Adam said: I want the chocolate!' },
      { ar: 'قَالَتْ أُمُّهُ: لَا، السُّكَّرُ كَثِيرٌ.', en: 'His mother said: no, that is too much sugar.' },
      { ar: 'رَجَعَا إِلَى الْبَيْتِ وَفَتَحَ أَدَم الْحَقِيبَةَ.', en: 'They went home and Adam opened the bag.' },
      { ar: 'كَانَتِ الشُّوكُولَاتَةُ فِي الْحَقِيبَةِ!', en: 'The chocolate was in the bag!' },
      { ar: 'ضَحِكَتْ أُمُّهُ وَقَالَتْ: يَا أَدَم!', en: 'His mother laughed and said: oh, Adam!' },
    ],
  },
  {
    id: 'ts-nawm',
    level: 5,
    title: 'قَبْلَ النَّوْم',
    titleEn: 'Before sleep',
    blurb: 'The words they already know, said at the right moment.',
    /* No joke in this one, deliberately — the same reason the surah module has
       none. The duas and the ayah here are real and are quoted exactly. */
    lines: [
      { ar: 'جَاءَ اللَّيْلُ وَنَامَ أَدَم وَمَرْيَم.', en: 'Night came, and Adam and Maryam went to bed.' },
      { ar: 'قَالَتْ أُمُّهُمَا: مَاذَا نَقُولُ قَبْلَ النَّوْمِ؟', en: 'Their mother said: what do we say before sleep?' },
      { ar: 'قَالَ أَدَم: بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا.', en: 'Adam said: in Your name, O Allah, I die and I live.' },
      { ar: 'قَالَتْ مَرْيَم: وَأَقْرَأُ قُلْ هُوَ اللَّهُ أَحَدٌ.', en: 'Maryam said: and I read, say He is Allah, the One.' },
      { ar: 'قَرَآ مَعًا ثُمَّ نَامَا.', en: 'They read together, then they slept.' },
      { ar: 'وَفِي الصَّبَاحِ قَالَا: الْحَمْدُ لِلَّهِ.', en: 'And in the morning they said: all praise is for Allah.' },
    ],
  },
];

if (typeof module !== 'undefined' && module.exports) module.exports = { TEXT_STORIES };
