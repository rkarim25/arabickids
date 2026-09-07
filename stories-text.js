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
    art: { dir: 'art', file: 'ana-adam.jpg' },
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
    art: { dir: 'art', file: 'bayt1-cover.jpg' },
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
    art: { dir: 'art', file: 'lulu-cover.jpg' },
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
    art: { dir: 'art', file: 'madha1-cover.jpg' },
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
    art: { dir: 'art', file: 'qamar1-cover.jpg' },
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


/* ————— THE SERIES: «لُولُو وَالْغُرَاب» ————————————————————————————————————————
   Reza, 2026-08-31: "i want something like bunny versus money series."

   He means Bunny vs Monkey — a recurring comic rivalry, one short escalating
   episode at a time, the same two characters losing their minds at each other
   forever. That FORMAT is a genre and worth stealing; the characters are not,
   so none of them appear here.

   The rivalry is built from two characters the site already owns: Lulu, the cat
   from the picture books, and الغُرَاب the crow, who is a Level 0 keyword and a
   Qur'anic word (Surah Al-Ma'idah). A cat who cannot fly against a bird who can
   is a rivalry that writes itself, and it needs no new vocabulary at all.

   THE RUNNING GAG, which is what makes a series a series: the crow always gets
   away, and Lulu always ends up somewhere ridiculous. Six episodes, climbing
   the bands, so a child who wants the next one has to read a slightly harder
   book to get it. That is the whole trick of a reading series.
   ========================================================================= */
const SERIES_LULU = [
  {
    id: 'lg-1', level: 2, series: 'lulu-ghurab', ep: 1,
    title: 'الْغُرَاب وَالْخُبْز',
    titleEn: 'The crow and the bread',
    blurb: 'Episode 1. Lulu has bread. Lulu had bread.',
    lines: [
      { ar: 'لُولُو فِي الْمَطْبَخ.', en: 'Lulu is in the kitchen.' },
      { ar: 'عَلَى الْمَائِدَة خُبْز.', en: 'There is bread on the table.' },
      { ar: 'جَاءَ الْغُرَاب مِنَ الْبَاب.', en: 'The crow came in through the door.' },
      { ar: 'أَخَذَ الْخُبْز وَطَارَ!', en: 'It took the bread and flew off!' },
      { ar: 'لُولُو تَحْتَ الْمَائِدَة.', en: 'Lulu is under the table.' },
      { ar: 'وَالْغُرَاب فَوْقَ الْبَيْت.', en: 'And the crow is on top of the house.' },
    ],
  },
  {
    id: 'lg-2', level: 2, series: 'lulu-ghurab', ep: 2,
    title: 'لُولُو فَوْقَ الْبَاب',
    titleEn: 'Lulu on top of the door',
    blurb: 'Episode 2. A plan. A very bad plan.',
    lines: [
      { ar: 'عِنْدَ لُولُو أَكْل.', en: 'Lulu has some food.' },
      { ar: 'لُولُو فَوْقَ الْبَاب.', en: 'Lulu is on top of the door.' },
      { ar: 'الْغُرَاب تَحْتَ الْبَاب.', en: 'The crow is under the door.' },
      { ar: 'نَزَلَتْ لُولُو!', en: 'Lulu came down!' },
      { ar: 'وَطَارَ الْغُرَاب.', en: 'And the crow flew away.' },
      { ar: 'لُولُو فِي الْمَاء.', en: 'Lulu is in the water.' },
    ],
  },
  {
    id: 'lg-3', level: 3, series: 'lulu-ghurab', ep: 3,
    title: 'قَالَ الْغُرَاب',
    titleEn: 'The crow said',
    blurb: 'Episode 3. The crow talks. That is somehow worse.',
    lines: [
      { ar: 'قَالَ الْغُرَاب: أُحِبُّ الْخُبْز!', en: 'The crow said: I love bread!' },
      { ar: 'قَالَتْ لُولُو: هَذَا خُبْزِي!', en: 'Lulu said: that is MY bread!' },
      { ar: 'قَالَ الْغُرَاب: كَانَ خُبْزَكِ.', en: 'The crow said: it WAS your bread.' },
      { ar: 'قَفَزَتْ لُولُو فَوْقَ الْمَائِدَة.', en: 'Lulu jumped onto the table.' },
      { ar: 'طَارَ الْغُرَاب مِنَ الْبَاب.', en: 'The crow flew out of the door.' },
      { ar: 'وَقَعَتِ الْمَائِدَة عَلَى بَابَا.', en: 'The table fell on Baba.' },
      { ar: 'ضَحِكَ الْغُرَاب كَثِيرًا.', en: 'The crow laughed a lot.' },
    ],
  },
  {
    id: 'lg-4', level: 3, series: 'lulu-ghurab', ep: 4,
    title: 'صَدِيق؟',
    titleEn: 'A friend?',
    blurb: 'Episode 4. A truce. It lasts four lines.',
    lines: [
      { ar: 'قَالَ الْغُرَاب: هَيَّا نَكُونُ أَصْدِقَاء.', en: 'The crow said: let us be friends.' },
      { ar: 'قَالَتْ لُولُو: حَقًّا؟', en: 'Lulu said: really?' },
      { ar: 'قَالَ الْغُرَاب: نَعَمْ! هَذَا لَكِ.', en: 'The crow said: yes! This is for you.' },
      { ar: 'أَخَذَتْ لُولُو الْهَدِيَّة.', en: 'Lulu took the present.' },
      { ar: 'كَانَتِ الْهَدِيَّة حَجَرًا.', en: 'The present was a rock.' },
      { ar: 'وَأَخَذَ الْغُرَاب الْخُبْز.', en: 'And the crow took the bread.' },
    ],
  },
  {
    id: 'lg-5', level: 4, series: 'lulu-ghurab', ep: 5,
    title: 'الشَّجَرَة الطَّوِيلَة',
    titleEn: 'The tall tree',
    blurb: 'Episode 5. Lulu learns something about trees.',
    lines: [
      { ar: 'رَأَتْ لُولُو الْغُرَاب فَوْقَ الشَّجَرَةِ الطَّوِيلَةِ.', en: 'Lulu saw the crow at the top of the tall tree.' },
      { ar: 'قَالَتْ: الْيَوْمَ سَآخُذُ خُبْزِي!', en: 'She said: today I am getting my bread back!' },
      { ar: 'صَعِدَتْ لُولُو، وَصَعِدَتْ، وَصَعِدَتْ.', en: 'Lulu climbed, and climbed, and climbed.' },
      { ar: 'نَظَرَ الْغُرَاب إِلَيْهَا وَطَارَ إِلَى الشَّجَرَةِ الْأُخْرَى.', en: 'The crow looked at her and flew to the other tree.' },
      { ar: 'الْآنَ لُولُو فَوْقَ الشَّجَرَةِ وَلَا تَسْتَطِيعُ النُّزُولَ.', en: 'Now Lulu is up the tree and cannot get down.' },
      { ar: 'جَاءَ بَابَا بِالسُّلَّمِ، وَهُوَ لَيْسَ سَعِيدًا.', en: 'Baba came with the ladder, and he is not happy.' },
    ],
  },
  {
    id: 'lg-6', level: 4, series: 'lulu-ghurab', ep: 6,
    title: 'الْخُبْزُ الْأَخِير',
    titleEn: 'The last bread',
    blurb: 'Episode 6. Somebody finally wins. It is not either of them.',
    lines: [
      { ar: 'فِي الْمَطْبَخِ خُبْزَةٌ وَاحِدَةٌ فَقَط.', en: 'In the kitchen there is only one piece of bread.' },
      { ar: 'نَظَرَتْ لُولُو إِلَى الْغُرَابِ، وَنَظَرَ الْغُرَابُ إِلَى لُولُو.', en: 'Lulu looked at the crow, and the crow looked at Lulu.' },
      { ar: 'قَفَزَتْ لُولُو وَطَارَ الْغُرَابُ فِي نَفْسِ الْوَقْتِ.', en: 'Lulu jumped and the crow flew at the same moment.' },
      { ar: 'اِصْطَدَمَا فَوْقَ الْمَائِدَةِ وَوَقَعَا عَلَى الْأَرْضِ.', en: 'They crashed over the table and fell on the floor.' },
      { ar: 'وَقَفَ أَدَم وَأَكَلَ الْخُبْزَةَ الْأَخِيرَةَ.', en: 'Adam stood up and ate the last piece of bread.' },
      { ar: 'نَظَرَتْ لُولُو إِلَى الْغُرَابِ مَرَّةً أُخْرَى.', en: 'Lulu looked at the crow one more time.' },
      { ar: 'وَلِأَوَّلِ مَرَّةٍ، اِتَّفَقَا عَلَى شَيْءٍ.', en: 'And for the first time ever, they agreed about something.' },
    ],
  },
  {
    id: 'lg-7', level: 3, series: 'lulu-ghurab', ep: 7,
    title: 'الْغُرَابُ وَالْكَعْكَة',
    titleEn: 'The crow and the cake',
    blurb: 'Episode 7. Cake on the table. What could go wrong?',
    lines: [
      { ar: 'وَضَعَ بَابَا كَعْكَةً فَوْقَ الْمَائِدَةِ.', en: 'Baba put a cake on the table.' },
      { ar: 'جَاءَ الْغُرَابُ وَأَخَذَ الْكَعْكَةَ!', en: 'The crow came and took the cake!' },
      { ar: 'قَفَزَتْ لُولُو خَلْفَ الْغُرَابِ.', en: 'Lulu jumped after the crow.' },
      { ar: 'طَارَ الْغُرَابُ فَوْقَ الْمَاءِ.', en: 'The crow flew over the water.' },
      { ar: 'وَقَعَتْ لُولُو فِي الْمَاءِ!', en: 'Lulu fell into the water!' },
      { ar: 'أَكَلَ الْغُرَابُ الْكَعْكَةَ كُلَّهَا.', en: 'The crow ate the entire cake.' },
    ],
  },
  {
    id: 'lg-8', level: 4, series: 'lulu-ghurab', ep: 8,
    title: 'الْفَخُّ الْكَبِير',
    titleEn: 'The big trap',
    blurb: 'Episode 8. A box, a rope, and a cat inside.',
    lines: [
      { ar: 'وَضَعَتْ لُولُو صُنْدُوقًا صَغِيرًا فِي الْحَدِيقَةِ.', en: 'Lulu placed a small box in the garden.' },
      { ar: 'رَبَطَتْ حَبْلًا بِالصُّنْدُوقِ وَانْتَظَرَتْ خَلْفَ الشَّجَرَةِ.', en: 'She tied a rope to the box and waited behind the tree.' },
      { ar: 'جَاءَ الْغُرَابُ وَوَقَفَ فَوْقَ الصُّنْدُوقِ يَضْحَكُ!', en: 'The crow came and stood on top of the box laughing!' },
      { ar: 'سَحَبَتْ لُولُو الْحَبْلَ بِسُرْعَةٍ فَوَقَعَ الصُّنْدُوقُ عَلَيْهَا!', en: 'Lulu pulled the rope quickly and the box fell on her!' },
      { ar: 'طَارَ الْغُرَابُ فِي السَّمَاءِ سَعِيدًا.', en: 'The crow flew into the sky happily.' },
      { ar: 'بَقِيَتْ لُولُو دَاخِلَ الصُّنْدُوقِ وَحْدَهَا.', en: 'Lulu remained inside the box by herself.' },
    ],
  },
];

/* the series joins the shelf, in episode order after the standalone stories */
TEXT_STORIES.push(...SERIES_LULU);

/* ————— نَوَادِر جُحَا — Juha's classic slapstick tales ————————————————————————
   Juha (جحا) is the legendary Arabic folk comedy hero. His stories are funny,
   ironic, and have a clear moral punchline that children remember forever.
   ========================================================================= */
const JUHA = [
  {
    id: 'jh-1', level: 3, series: 'juha', ep: 1,
    title: 'جُحَا وَالْحِمَار',
    titleEn: 'Juha and the donkey',
    blurb: 'Episode 1. A father, a son, and a very confused donkey.',
    lines: [
      { ar: 'مَشَى جُحَا وَابْنُهُ مَعَ الْحِمَارِ.', en: 'Juha and his son walked with the donkey.' },
      { ar: 'قَالَ رَجُلٌ: لِمَاذَا لَا تَرْكَبَان؟', en: 'A man said: why do you not ride?' },
      { ar: 'رَكِبَ جُحَا وَابْنُهُ فَوْقَ الْحِمَارِ.', en: 'Juha and his son rode on the donkey.' },
      { ar: 'قَالَ رَجُلٌ: هَذَا ظُلْمٌ لِلْحِمَارِ!', en: 'A man said: this is cruel to the donkey!' },
      { ar: 'نَزَلَ جُحَا وَرَكِبَ ابْنُهُ فَقَط.', en: 'Juha got down and only his son rode.' },
      { ar: 'قَالَ رَجُلٌ: أَيْنَ أَدَبُ الْوَلَدِ؟', en: 'A man said: where are the boy’s manners?' },
      { ar: 'حَمَلَ جُحَا وَابْنُهُ الْحِمَارَ!', en: 'Juha and his son carried the donkey!' },
      { ar: 'ضَحِكَ الْجَمِيعُ فِي الْقَرْيَةِ كَثِيرًا.', en: 'Everyone in the village laughed a lot.' },
    ],
  },
  {
    id: 'jh-2', level: 3, series: 'juha', ep: 2,
    title: 'كِسَاءُ جُحَا',
    titleEn: "Juha's coat",
    blurb: 'Episode 2. Eat, my coat, eat!',
    lines: [
      { ar: 'ذَهَبَ جُحَا إِلَى وَلِيمَةٍ كَبِيرَةٍ.', en: 'Juha went to a big feast.' },
      { ar: 'مَا نَظَرَ أَحَدٌ إِلَى جُحَا.', en: 'Nobody looked at Juha.' },
      { ar: 'رَجَعَ جُحَا وَلَبِسَ كِسَاءً جَمِيلًا.', en: 'Juha went back and put on a fine coat.' },
      { ar: 'قَالَ الْقَوْمُ: أَهْلًا يَا جُحَا!', en: 'The people said: welcome, Juha!' },
      { ar: 'وَضَعَ جُحَا الْحِسَاءَ فِي كِسَائِهِ!', en: 'Juha poured the soup into his coat!' },
      { ar: 'قَالَ جُحَا: كُلْ يَا كِسَائِي!', en: 'Juha said: eat, my coat!' },
      { ar: 'الْإِكْرَامُ لَكَ لَا لِي!', en: 'The honor is for you, not me!' },
    ],
  },
  {
    id: 'jh-3', level: 4, series: 'juha', ep: 3,
    title: 'مِسْمَارُ جُحَا',
    titleEn: "Juha's nail",
    blurb: 'Episode 3. The house is sold. One nail is not.',
    lines: [
      { ar: 'بَاعَ جُحَا بَيْتَهُ إِلَى رَجُلٍ فِي السُّوقِ.', en: 'Juha sold his house to a man in the market.' },
      { ar: 'قَالَ جُحَا: هَذَا الْمِسْمَارُ فِي الْحَائِطِ لِي فَقَط.', en: 'Juha said: this nail in the wall belongs only to me.' },
      { ar: 'وَافَقَ الرَّجُلُ وَسَكَنَ فِي الْبَيْتِ الْجَدِيدِ.', en: 'The man agreed and lived in the new house.' },
      { ar: 'جَاءَ جُحَا كُلَّ يَوْمٍ لِيَرَى مِسْمَارَهُ.', en: 'Juha came every day to see his nail.' },
      { ar: 'عَلَّقَ جُحَا سَمَكَةً قَدِيمَةً عَلَى الْمِسْمَارِ!', en: 'Juha hung an old fish on the nail!' },
      { ar: 'غَضِبَ الرَّجُلُ وَتَرَكَ الْبَيْتَ لِجُحَا وَهَرَبَ.', en: 'The man became angry, left the house to Juha, and ran away.' },
      { ar: 'ضَحِكَ جُحَا وَأَخَذَ بَيْتَهُ مِنْ جَدِيدٍ.', en: 'Juha laughed and got his house back again.' },
    ],
  },
];

TEXT_STORIES.push(...JUHA);

/* ————— كَلِيلَة وَدِمْنَة — the library, finally chosen ————————————————————————
   Reza has asked twice about adapting books he already owns — Bunny vs Monkey,
   Peppa Pig — and the answer both times was no, and buying a copy does not
   change it: a translation is a derivative work and that right belongs to the
   publisher. So the open question was never "may we adapt something", it was
   "adapt WHAT". Chosen 2026-08-31: **كليلة ودمنة**.

   Why this and not African Storybook or StoryWeaver, which are also free:

   1. It is PUBLIC DOMAIN outright — Ibn al-Muqaffaʿ, eighth century. Not a
      licence to comply with, not an attribution string to keep correct
      forever, nothing that can be revoked. The CC libraries are excellent and
      remain the fallback, but every one of them carries obligations that a
      family site will eventually get wrong.
   2. It was WRITTEN IN ARABIC. Everything on those other shelves is a
      translation INTO Arabic, and it reads like one. These fables are the
      register the language actually tells stories in.
   3. The children will meet it again. It is the شَاهِد of Arabic prose the way
      Aesop is of English, and a child who already knows الأَرْنَب وَالأَسَد has
      somewhere to stand when they meet it at twelve.

   THE ADAPTATION RULE: the fable is kept, the sentences are ours. Ibn
   al-Muqaffaʿ's actual prose is far beyond Level 4 — long, subordinated, and
   unvowelled — so retelling is not laziness, it is the only way it fits a
   band. What is preserved is the plot, the animals and the moral, and the
   moral is always the last line, because that is how the book itself works.

   Level 4 for both: past-tense narration, sun-letter اَلْ, hamzat wasl. That
   is what classical Arabic story-telling is made of, and it is exactly the
   band it lands in. Level 5 stays what DESIGN.md promised it would be — ayat
   and duas — rather than being quietly filled with whatever came next.

   THREE MORE, ONE PER BAND (2026-08-31). Two fables at Level 4 made a shelf,
   not a collection — a child at Level 1 could see that كليلة ودمنة existed and
   could not read a word of it. So the collection now climbs: ep numbers follow
   the LADDER (1=L1 … 5=L4), which is why the first two were renumbered to 4
   and 5 rather than staying 1 and 2. A number on a card is a promise about
   what comes next, and it pointed the wrong way.

   LEVEL 1 IS THE HARD ONE and it shaped which fable could go there. No sukoon
   at Level 1 means NO اَلْ AT ALL — the article carries a sukoon on its lam —
   so an entire fable has to be told without one definite article in it. That
   rules out most of the book: الأَسَد وَالثَّوْر cannot even be named. What CAN be
   told is a scene with indefinite animals in it, so Level 1 gets the opening
   image of the Level 3 fable: an elephant, some water, and a moon that is not
   really there.

   AND THAT REPETITION IS THE POINT, not an accident — rule 4, repetition with
   variation. A three-year-old meets the elephant and the moon as eight tiny
   sentences; two bands later the same moon comes back with the hare who put it
   there, and the child already knows how that scene looks. It is the same trick
   the Lulu series uses, played across the ladder instead of across episodes.

   LEVEL 5 IS DELIBERATELY STILL EMPTY OF FABLES. DESIGN.md §3 promises that
   band is real ayat and duas — the bridge to the Mushaf — and filling it with
   a story because a story was what came next would quietly break the promise.
   That is Reza's rule to change, not this file's.
   ========================================================================= */
const KALILA = [
  {
    id: 'kd-feel', level: 1, series: 'kalila', ep: 1,
    title: 'فِيل وَقَمَر',
    titleEn: 'An elephant and a moon',
    blurb: 'The biggest animal there is, frightened by something that is not there.',
    lines: [
      { ar: 'جَاءَ فِيل كَبِير.', en: 'A big elephant came.' },
      { ar: 'هُنَا مَاء قَلِيل.', en: 'Here there is a little water.' },
      { ar: 'شَرِبَ فِيل مَاء.', en: 'The elephant drank some water.' },
      { ar: 'نَظَرَ فِيل فِي مَاء.', en: 'The elephant looked into the water.' },
      { ar: 'رَأَى قَمَر صَغِير!', en: 'He saw a little moon!' },
      { ar: 'خَافَ فِيل كَبِير.', en: 'The big elephant was frightened.' },
      { ar: 'ذَهَبَ فِيل بَعِيدًا.', en: 'The elephant went far away.' },
      { ar: 'مَا كَانَ هُنَاكَ قَمَر.', en: 'There was no moon there at all.' },
    ],
  },
  {
    id: 'kd-hamama', level: 2, series: 'kalila', ep: 2,
    title: 'حَمَامَة وَفَأْر',
    titleEn: 'A dove and a mouse',
    blurb: 'Caught in a net, and let out by the smallest animal in the story.',
    lines: [
      { ar: 'طَارَتْ حَمَامَات كَثِيرَة.', en: 'Many doves were flying.' },
      { ar: 'نَزَلَتْ عَلَى حُبُوب.', en: 'They came down onto some grain.' },
      { ar: 'وَقَعَتْ فِي شَبَكَة!', en: 'They fell into a net!' },
      { ar: 'جَاءَ فَأْر صَغِير.', en: 'A little mouse came.' },
      { ar: 'قَطَعَ فَأْر شَبَكَة.', en: 'The mouse cut through the net.' },
      { ar: 'طَارَتِ الحَمَامَات مِنْ جَدِيد.', en: 'The doves flew away again.' },
      { ar: 'صَدِيق صَغِير يَنْفَعُ كَثِيرًا.', en: 'A small friend helps a great deal.' },
    ],
  },
  {
    id: 'kd-arnabfeel', level: 3, series: 'kalila', ep: 3,
    title: 'الأَرْنَب وَالفِيل',
    titleEn: 'The hare and the elephants',
    blurb: 'The elephants drank the whole spring. One hare sent them home.',
    lines: [
      { ar: 'جَاءَتِ الفِيَلَة إِلَى عَيْنِ الأَرَانِب.', en: 'The elephants came to the spring where the hares drink.' },
      { ar: 'شَرِبَتْ كُلَّ المَاء وَكَسَرَتْ كُلَّ شَيْء.', en: 'They drank all the water and broke everything.' },
      { ar: 'قَالَ أَرْنَب صَغِير: سَأَذْهَبُ إِلَيْهِمْ.', en: 'A little hare said: I will go to them.' },
      { ar: 'قَالَ لِلْفِيل: أَنَا رَسُولُ القَمَر!', en: 'He said to the elephant: I am the messenger of the moon!' },
      { ar: 'القَمَر غَاضِب، فَأَنْتُمْ شَرِبْتُمْ مَاءَهُ.', en: 'The moon is angry, because you drank his water.' },
      { ar: 'نَظَرَ الفِيل فِي المَاء فَرَأَى القَمَر.', en: 'The elephant looked in the water and saw the moon.' },
      { ar: 'لَمَسَ المَاءَ فَتَحَرَّكَ القَمَر.', en: 'He touched the water, and the moon moved.' },
      { ar: 'خَافَ الفِيل وَذَهَبَ بَعِيدًا.', en: 'The elephant was frightened and went far away.' },
      { ar: 'عَقْلُ أَرْنَبٍ غَلَبَ قُوَّةَ فِيل.', en: 'A clever hare beat a strong elephant.' },
    ],
  },
  {
    id: 'kd-arnab', level: 4, series: 'kalila', ep: 4,
    title: 'الأَرْنَبُ وَالأَسَد',
    titleEn: 'The hare and the lion',
    blurb: 'The smallest animal in the forest has the biggest idea.',
    lines: [
      { ar: 'كَانَ فِي الْغَابَةِ أَسَدٌ كَبِيرٌ يَأْكُلُ الْحَيَوَانَاتِ كُلَّ يَوْمٍ.', en: 'In the forest there was a big lion who ate the animals every day.' },
      { ar: 'قَالَتِ الْحَيَوَانَاتُ: نُرْسِلُ لَكَ وَاحِدًا كُلَّ يَوْمٍ وَاتْرُكْنَا.', en: 'The animals said: we will send you one every day, and leave us alone.' },
      { ar: 'وَفِي يَوْمٍ جَاءَ دَوْرُ أَرْنَبٍ صَغِيرٍ.', en: 'And one day it was a little hare’s turn.' },
      { ar: 'تَأَخَّرَ الْأَرْنَبُ فَغَضِبَ الْأَسَدُ غَضَبًا شَدِيدًا.', en: 'The hare came late, and the lion became very angry.' },
      { ar: 'قَالَ الْأَرْنَبُ: فِي الْبِئْرِ أَسَدٌ آخَرُ أَخَذَ طَعَامِي!', en: 'The hare said: there is another lion in the well and he took my food!' },
      { ar: 'نَظَرَ الْأَسَدُ فِي الْبِئْرِ فَرَأَى أَسَدًا يَنْظُرُ إِلَيْهِ.', en: 'The lion looked into the well and saw a lion looking back at him.' },
      { ar: 'قَفَزَ عَلَيْهِ فَوَقَعَ فِي الْمَاءِ.', en: 'He jumped at him, and fell into the water.' },
      { ar: 'رَجَعَ الْأَرْنَبُ الصَّغِيرُ وَفَرِحَتِ الْحَيَوَانَاتُ كُلُّهَا.', en: 'The little hare went back, and all the animals were happy.' },
      { ar: 'الْعَقْلُ أَقْوَى مِنَ الْقُوَّةِ.', en: 'A mind is stronger than strength.' },
    ],
  },
  {
    id: 'kd-sulahfa', level: 4, series: 'kalila', ep: 5,
    title: 'السُّلَحْفَاةُ وَالْبَطَّتَان',
    titleEn: 'The tortoise and the two ducks',
    blurb: 'She was told not to say a word. She said a word.',
    lines: [
      { ar: 'كَانَتْ سُلَحْفَاةٌ تَعِيشُ فِي بِرْكَةٍ مَعَ بَطَّتَيْنِ.', en: 'A tortoise lived in a pond with two ducks.' },
      { ar: 'جَفَّتِ الْبِرْكَةُ فَقَالَتِ الْبَطَّتَانِ: سَنَذْهَبُ إِلَى مَاءٍ آخَرَ.', en: 'The pond dried up, and the two ducks said: we are going to another water.' },
      { ar: 'قَالَتِ السُّلَحْفَاةُ: خُذَانِي مَعَكُمَا!', en: 'The tortoise said: take me with you!' },
      { ar: 'حَمَلَتَا عُودًا وَأَمْسَكَتْهُ السُّلَحْفَاةُ بِفَمِهَا وَطَارَتَا.', en: 'They carried a stick, the tortoise held it in her mouth, and they flew.' },
      { ar: 'قَالَتَا لَهَا: لَا تَتَكَلَّمِي أَبَدًا!', en: 'They said to her: do not speak, ever!' },
      { ar: 'رَآهَا النَّاسُ وَقَالُوا: اُنْظُرُوا! سُلَحْفَاةٌ تَطِيرُ!', en: 'People saw her and said: look! A flying tortoise!' },
      { ar: 'فَتَحَتِ السُّلَحْفَاةُ فَمَهَا لِتَرُدَّ عَلَيْهِمْ.', en: 'The tortoise opened her mouth to answer them.' },
      { ar: 'وَقَعَتْ عَلَى الْأَرْضِ.', en: 'She fell to the ground.' },
      { ar: 'مَنْ لَا يَسْمَعُ النَّصِيحَةَ يَقَعْ.', en: 'Whoever does not listen to good advice falls.' },
    ],
  },
  {
    id: 'kd-mutawwaqa', level: 4, series: 'kalila', ep: 6,
    title: 'الْحَمَامَةُ الْمُطَوَّقَة',
    titleEn: 'The collared dove',
    blurb: 'One bird is caught. A hundred birds flying together are free.',
    lines: [
      { ar: 'نَصَبَ الصَّيَّادُ شَبَكَتَهُ وَنَثَرَ عَلَيْهَا الْحَبَّ.', en: 'The hunter set his net and scattered grain over it.' },
      { ar: 'جَاءَتِ الْحَمَامَةُ الْمُطَوَّقَةُ مَعَ صَاحِبَاتِهَا فَوَقَعْنَ فِي الشَّبَكَةِ.', en: 'The collared dove came with her companions and they fell into the net.' },
      { ar: 'قَالَتِ الْمُطَوَّقَةُ: لَا تَطِرْ كُلُّ وَاحِدَةٍ وَحْدَهَا، بَلْ نَطِيرُ جَمِيعًا مَعًا!', en: 'The collared dove said: let no one fly alone, but let us all fly together!' },
      { ar: 'قَلَعْنَ الشَّبَكَةَ بِأَجْنِحَتِهِنَّ وَطِرْنَ فِي السَّمَاءِ كَطَائِرٍ وَاحِدٍ.', en: 'They pulled up the net with their wings and flew into the sky like one bird.' },
      { ar: 'ذَهَبْنَ إِلَى جُرَذٍ صَدِيقٍ فَقَطَعَ الشَّبَكَةَ بِأَسْنَانِهِ.', en: 'They went to a friendly rat who cut the net with his teeth.' },
      { ar: 'فِي الِاتِّحَادِ قُوَّةٌ وَنَجَاةٌ.', en: 'In unity there is strength and safety.' },
    ],
  },
  {
    id: 'kd-qird', level: 4, series: 'kalila', ep: 7,
    title: 'الْقِرْدُ وَالتِّمْسَاح',
    titleEn: 'The monkey and the crocodile',
    blurb: 'He was invited for dinner. He was meant to BE dinner.',
    lines: [
      { ar: 'كَانَ قِرْدٌ يَعِيشُ فَوْقَ شَجَرَةِ تِينٍ عَلَى شَاطِئِ النَّهْرِ.', en: 'A monkey lived in a fig tree on the river bank.' },
      { ar: 'صَادَقَ تِمْسَاحًا وَكَانَ يَرْمِي لَهُ مِنَ التِّينِ الْحُلْوِ.', en: 'He befriended a crocodile and threw sweet figs down to him.' },
      { ar: 'قَالَ التِّمْسَاحُ: تَعَالَ إِلَى بَيْتِي فِي الْجَزِيرَةِ لِتَرَى أَهْلِي.', en: 'The crocodile said: come to my house on the island to see my family.' },
      { ar: 'وَفِي وَسَطِ النَّهْرِ قَالَ: زَوْجَتِي تُرِيدُ قَلْبَكَ لِتَشْفَى!', en: 'And in the middle of the river he said: my wife needs your heart to be healed!' },
      { ar: 'قَالَ الْقِرْدُ: تَرَكْتُ قَلْبِي فَوْقَ الشَّجَرَةِ، فَلْنَرْجِعْ لِنَأْخُذَهُ!', en: 'The monkey said: I left my heart up in the tree, let us go back to get it!' },
      { ar: 'رَجَعَا إِلَى الشَّاطِئِ فَقَفَزَ الْقِرْدُ فَوْقَ الشَّجَرَةِ وَنَجَا.', en: 'They returned to the shore and the monkey jumped into the tree and was saved.' },
      { ar: 'حُسْنُ التَّصَرُّفِ يُنْقِذُ صَاحِبَهُ مِنَ الْهَلَاكِ.', en: 'Quick thinking saves a person from ruin.' },
    ],
  },
];
TEXT_STORIES.push(...KALILA);

/* ————— the Path stories (2026-09-06) ——————————————————————————————————————
   Reza: "these sentences first need to appear in a story to help build
   context" and "for any stories with pictures build it out without the
   pictures and leave notes for AI to complete it."

   Six stories, one per station of the path (PATH.md §2), each carrying that
   station's core sentences VERBATIM so the child hears them in a scene the
   day before the lesson drills them. They were briefed as picture books
   (briefs/STORYBOOKS.md); the text is here now, on the no-picture shelf, and
   `art: 'pending'` marks each one until the pictures arrive. The per-line
   picture prompts are in the brief, not here, so gen-audio does not render
   them as clips.

   Long on purpose (Reza: "stories can be long") — the path reader pauses on
   a checkpoint every six lines with KEEP GOING as the big button.
   ========================================================================= */
const PATH_STORIES = [
  {
    id: 'lulu-jaia',
    level: 1,
    art: { dir: 'art/lulu-jaia', pages: 18 },
    title: 'لُولُو جَائِعَة',
    titleEn: 'Lulu is hungry',
    blurb: 'Lulu wants milk, then water, then juice, then Baba.',
    lines: [
      { ar: 'هَذِهِ لُولُو.', en: 'This is Lulu.' },
      { ar: 'لُولُو جَائِعَة.', en: 'Lulu is hungry.' },
      { ar: 'أَنَا هُنَا.', en: 'I am here.' },
      { ar: 'هَذَا أَدَم.', en: 'This is Adam.' },
      { ar: 'مَاذَا تُرِيدُ؟', en: 'What do you want?' },
      { ar: 'أُرِيدُ لَبَن.', en: 'I want milk.' },
      { ar: 'هَذَا لَبَن يَا لُولُو.', en: 'Here is milk, Lulu.' },
      { ar: 'لَبَن لَذِيذ!', en: 'Milk is tasty!' },
      { ar: 'أُرِيدُ مَاء.', en: 'I want water.' },
      { ar: 'هَذَا مَاء.', en: 'Here is water.' },
      { ar: 'وَأُرِيدُ عَصِير!', en: 'And I want juice!' },
      { ar: 'لَا يَا لُولُو!', en: 'No, Lulu!' },
      { ar: 'لَا عَصِير هُنَا.', en: 'There is no juice here.' },
      { ar: 'هَذَا بَابَا.', en: 'This is Baba.' },
      { ar: 'بَابَا كَبِير.', en: 'Baba is big.' },
      { ar: 'لُولُو صَغِيرَة.', en: 'Lulu is small.' },
      { ar: 'أُرِيدُ بَابَا!', en: 'I want Baba!' },
      { ar: 'لُولُو مَعَ بَابَا.', en: 'Lulu is with Baba.' },
    ],
  },
  {
    id: 'feel-dar',
    level: 1,
    art: { dir: 'art/feel-dar', pages: 17 },
    title: 'فِيل فِي دَار',
    titleEn: 'An elephant in a house',
    blurb: 'A big elephant wants a lot. Lulu wants an elephant.',
    lines: [
      { ar: 'هَذَا فِيل.', en: 'This is an elephant.' },
      { ar: 'فِيل كَبِير!', en: 'A big elephant!' },
      { ar: 'فِيل هُنَا.', en: 'The elephant is here.' },
      { ar: 'مَاذَا تُرِيدُ يَا فِيل؟', en: 'What do you want, elephant?' },
      { ar: 'أُرِيدُ مَاء.', en: 'I want water.' },
      { ar: 'هَذَا مَاء يَا فِيل.', en: 'Here is water, elephant.' },
      { ar: 'مَاء كَثِير!', en: 'A lot of water!' },
      { ar: 'أُرِيدُ دَار.', en: 'I want a house.' },
      { ar: 'هَذِهِ دَار.', en: 'This is a house.' },
      { ar: 'فِيل فِي دَار!', en: 'An elephant in a house!' },
      { ar: 'دَار صَغِيرَة.', en: 'A small house.' },
      { ar: 'فِيل كَبِير.', en: 'A big elephant.' },
      { ar: 'هَذِهِ لُولُو.', en: 'This is Lulu.' },
      { ar: 'لُولُو صَغِيرَة.', en: 'Lulu is small.' },
      { ar: 'مَاذَا تُرِيدُ يَا لُولُو؟', en: 'What do you want, Lulu?' },
      { ar: 'أُرِيدُ فِيل!', en: 'I want an elephant!' },
      { ar: 'فِيل مَعَ لُولُو.', en: 'The elephant is with Lulu.' },
    ],
  },
  {
    id: 'ayna-mama',
    level: 2,
    art: { dir: 'art/ayna-mama', pages: 18 },
    title: 'أَيْنَ مَامَا؟',
    titleEn: 'Where is Mama?',
    blurb: 'Maryam looks in every room. Mama is somewhere silly.',
    lines: [
      { ar: 'مَرْيَم فِي الْبَيْت.', en: 'Maryam is in the house.' },
      { ar: 'أَيْنَ مَامَا؟', en: 'Where is Mama?' },
      { ar: 'مَامَا فِي الْمَطْبَخ؟', en: 'Is Mama in the kitchen?' },
      { ar: 'لَا. أَدَم فِي الْمَطْبَخ.', en: 'No. Adam is in the kitchen.' },
      { ar: 'عِنْدِي كِتَاب.', en: 'I have a book.' },
      { ar: 'الْكِتَاب فَوْقَ الْمَائِدَة.', en: 'The book is on the table.' },
      { ar: 'مَامَا فِي الْغُرْفَة؟', en: 'Is Mama in the room?' },
      { ar: 'لَا. لُولُو فِي الْغُرْفَة.', en: 'No. Lulu is in the room.' },
      { ar: 'أَيْنَ لُولُو؟', en: 'Where is Lulu?' },
      { ar: 'لُولُو فَوْقَ سَرِير.', en: 'Lulu is on a bed.' },
      { ar: 'لُولُو فِي الْبَيْت.', en: 'Lulu is in the house.' },
      { ar: 'هَلْ عِنْدَكَ مَاء؟', en: 'Do you have water?' },
      { ar: 'مَا عِنْدِي مَاء.', en: 'I do not have water.' },
      { ar: 'مَامَا عِنْدَهَا مَاء!', en: 'Mama has water!' },
      { ar: 'مَامَا! أَيْنَ أَنْتِ؟', en: 'Mama! Where are you?' },
      { ar: 'هَذَا بَابَا.', en: 'This is Baba.' },
      { ar: 'مَامَا تَحْتَ الْمَائِدَة!', en: 'Mama is under the table!' },
      { ar: 'وَلُولُو تَحْتَ الْمَائِدَة!', en: 'And Lulu is under the table!' },
    ],
  },
  {
    id: 'man-qala',
    level: 3,
    art: { dir: 'art/man-qala', pages: 19 },
    title: 'مَنْ قَالَ مِيَاو؟',
    titleEn: 'Who said miaow?',
    blurb: 'A miaow in the house, and nobody did it. Somebody did it.',
    lines: [
      { ar: 'أَدَم فِي الْبَيْت.', en: 'Adam is in the house.' },
      { ar: 'كَيْفَ حَالُكَ؟', en: 'How are you?' },
      { ar: 'أَنَا سَعِيد.', en: 'I am happy.' },
      { ar: 'مِيَاو!', en: 'Miaow!' },
      { ar: 'مَنْ قَالَ مِيَاو؟', en: 'Who said miaow?' },
      { ar: 'قَالَ بَابَا: لَيْسَ أَنَا.', en: 'Baba said: not me.' },
      { ar: 'قَالَتْ مَامَا: لَيْسَ أَنَا.', en: 'Mama said: not me.' },
      { ar: 'مِيَاو! مِيَاو!', en: 'Miaow! Miaow!' },
      { ar: 'أَيْنَ لُولُو؟', en: 'Where is Lulu?' },
      { ar: 'لُولُو فِي صُنْدُوق؟ لَا.', en: 'Is Lulu in a box? No.' },
      { ar: 'قَالَ الْفِيل: أُرِيدُ عَصِير!', en: 'The elephant said: I want juice!' },
      { ar: 'لَيْسَ الْفِيل!', en: 'Not the elephant!' },
      { ar: 'قَالَ بَابَا: هَيَّا.', en: 'Baba said: come on.' },
      { ar: 'هَيَّا إِلَى الْغُرْفَة.', en: 'Come on, to the room.' },
      { ar: 'مِيَاو! هَذِهِ مَرْيَم!', en: 'Miaow! It is Maryam!' },
      { ar: 'مَرْيَم قَالَتْ مِيَاو!', en: 'Maryam said miaow!' },
      { ar: 'وَلُولُو قَالَتْ: مِيَاو.', en: 'And Lulu said: miaow.' },
      { ar: 'أُحِبُّ أُمِّي.', en: 'I love my mother.' },
      { ar: 'وَأُحِبُّ لُولُو!', en: 'And I love Lulu!' },
    ],
  },
  {
    id: 'shams-qamar',
    level: 4,
    art: { dir: 'art/shams-qamar', pages: 14 },
    title: 'الشَّمْسُ وَالْقَمَر',
    titleEn: 'The sun and the moon',
    blurb: 'A day at the market under the sun, and a night under the moon.',
    lines: [
      { ar: 'فِي الصَّبَاحِ الشَّمْسُ فِي السَّمَاءِ.', en: 'In the morning the sun is in the sky.' },
      { ar: 'قَالَ أَدَم: الشَّمْسُ كَبِيرَةٌ وَجَمِيلَةٌ.', en: 'Adam said: the sun is big and beautiful.' },
      { ar: 'ذَهَبَ أَدَم مَعَ بَابَا إِلَى السُّوقِ.', en: 'Adam went with Baba to the market.' },
      { ar: 'اِشْتَرَى بَابَا الْخُبْزَ وَالتُّفَّاحَ.', en: 'Baba bought the bread and the apples.' },
      { ar: 'قَالَ أَدَم: أُرِيدُ الْمَوْزَ!', en: 'Adam said: I want the bananas!' },
      { ar: 'قَالَ بَابَا: هَذَا الْمَوْزُ لَكَ يَا أَدَم.', en: 'Baba said: these bananas are for you, Adam.' },
      { ar: 'رَجَعَا إِلَى الْبَيْتِ وَالشَّمْسُ فَوْقَ الْجَبَلِ.', en: 'They went home, and the sun was over the mountain.' },
      { ar: 'جَاءَ اللَّيْلُ وَذَهَبَتِ الشَّمْسُ.', en: 'Night came and the sun went away.' },
      { ar: 'نَظَرَ أَدَم مِنَ الْبَابِ.', en: 'Adam looked out from the door.' },
      { ar: 'الْقَمَر جَمِيل.', en: 'The moon is beautiful.' },
      { ar: 'النُّجُومُ فِي السَّمَاءِ وَالْقَمَرُ مَعَهَا.', en: 'The stars are in the sky and the moon is with them.' },
      { ar: 'قَالَتْ مَرْيَم: أَيْنَ لُولُو؟', en: 'Maryam said: where is Lulu?' },
      { ar: 'لُولُو فِي السَّلَّةِ مَعَ الْمَوْزِ!', en: 'Lulu is in the basket with the bananas!' },
      { ar: 'نَامَ الْبَيْتُ تَحْتَ الْقَمَرِ.', en: 'The house slept under the moon.' },
    ],
  },
  {
    id: 'yawm-maryam',
    level: 5,
    art: { dir: 'art/yawm-maryam', pages: 14 },
    title: 'يَوْم مَرْيَم',
    titleEn: 'A day with Maryam',
    blurb: 'Morning, breakfast, play and bed, and the words that go with each.',
    lines: [
      { ar: 'فِي الصَّبَاحِ قَامَتْ مَرْيَم مِنَ النَّوْمِ.', en: 'In the morning Maryam got up from sleep.' },
      { ar: 'قَالَتْ مَامَا: مَاذَا نَقُولُ فِي الصَّبَاحِ؟', en: 'Mama said: what do we say in the morning?' },
      { ar: 'قَالَتْ مَرْيَم: الْحَمْدُ لِلَّهِ.', en: 'Maryam said: all praise is for Allah.' },
      { ar: 'جَلَسَتْ مَرْيَم مَعَ أَدَم لِلْفُطُورِ.', en: 'Maryam sat with Adam for breakfast.' },
      { ar: 'قَالَ أَدَم: مَاذَا نَقُولُ قَبْلَ الطَّعَامِ؟', en: 'Adam said: what do we say before food?' },
      { ar: 'قَالَتْ مَرْيَم: بِسْمِ اللَّهِ.', en: 'Maryam said: in the name of Allah.' },
      { ar: 'أَكَلَتْ مَرْيَم الْخُبْزَ وَشَرِبَتِ اللَّبَنَ.', en: 'Maryam ate the bread and drank the milk.' },
      { ar: 'وَبَعْدَ الطَّعَامِ قَالَتْ: الْحَمْدُ لِلَّهِ.', en: 'And after the food she said: all praise is for Allah.' },
      { ar: 'ذَهَبَ بَابَا إِلَى الْمَسْجِدِ وَقَالَ: هَيَّا يَا أَدَم.', en: 'Baba went to the masjid and said: come on, Adam.' },
      { ar: 'لَعِبَتْ مَرْيَم مَعَ لُولُو فِي الْبَيْتِ.', en: 'Maryam played with Lulu in the house.' },
      { ar: 'جَاءَ اللَّيْلُ وَقَالَتْ مَامَا: قَبْلَ النَّوْمِ نَقْرَأُ.', en: 'Night came and Mama said: before sleep we read.' },
      { ar: 'قَرَأَتْ مَرْيَم: قُلْ هُوَ اللَّهُ أَحَدٌ.', en: 'Maryam read: say, He is Allah, the One.' },
      { ar: 'نَامَتْ مَرْيَم وَنَامَتْ لُولُو فَوْقَ السَّرِيرِ.', en: 'Maryam slept, and Lulu slept on top of the bed.' },
      { ar: 'وَفِي الصَّبَاحِ قَالَتْ: الْحَمْدُ لِلَّهِ.', en: 'And in the morning she said: all praise is for Allah.' },
    ],
  },
];

TEXT_STORIES.push(...PATH_STORIES);

/* Assign rich watercolor covers to all series and fables */
for (const s of SERIES_LULU) if (!s.art) s.art = { dir: 'art', file: 'lulu-ghurab.jpg' };
for (const s of JUHA) if (!s.art) s.art = { dir: 'art', file: 'juha.jpg' };
for (const s of KALILA) if (!s.art) s.art = { dir: 'art', file: 'kalila.jpg' };

function getStoryCover(s) {
  if (!s) return 'art/bayt1-cover.jpg';
  if (s.art) {
    if (s.art.file) return `${s.art.dir}/${s.art.file}`;
    if (s.art.dir) return `${s.art.dir}/cover.jpg`;
  }
  if (s.series === 'lulu-ghurab') return 'art/lulu-ghurab.jpg';
  if (s.series === 'juha') return 'art/juha.jpg';
  if (s.series === 'kalila') return 'art/kalila.jpg';
  return 'art/bayt1-cover.jpg';
}

/* what a series is called, for the shelf heading */
const SERIES_META = {
  'lulu-ghurab': { title: 'لُولُو وَالْغُرَاب', titleEn: 'Lulu and the Crow', icon: '🐱🐦‍⬛' },
  'juha': { title: 'نَوَادِر جُحَا', titleEn: "Juha's Tales", icon: '👳‍♂️🫏', label: 'funny Arabic tales' },
  /* label overrides "a series" — Kalila is a BOOK of separate fables, not six
     episodes of one running joke, and calling it a series would be a small lie
     to a child who later picks the real thing up. */
  'kalila': { title: 'كَلِيلَة وَدِمْنَة', titleEn: 'Kalila wa Dimna', icon: '🦁🐇', label: 'old fables, retold' },
};

if (typeof renderShelf === 'function' && typeof document !== 'undefined'
    && document.querySelector && document.querySelector('#bookGrid')) renderShelf();

if (typeof module !== 'undefined' && module.exports)
  module.exports = { TEXT_STORIES, SERIES_LULU, JUHA, KALILA, PATH_STORIES, SERIES_META, getStoryCover };

