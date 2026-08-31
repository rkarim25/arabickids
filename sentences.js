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

   BUILT ON FREQUENCY, not on taste. The words come from the grown-up site's
   measured corpus (data/frequency.json): أنا 80 · هل 47 · أين 43 · مع 36 ·
   ماذا 30 · أريد 25 · أمي 24 · كيف 22 · عندي 21 · أحب 18. Reza's standing
   rule, and it applies here more than anywhere: high frequency before
   completeness.

   THE FRAME, AND SAYING THE ENGLISH WORD ON PURPOSE
   Reza, 2026-08-31: "you can tell them if you dont know the word for pen just
   say urid pen and so on. this should remove some barriers to speaking more."

   That is the single most useful thing on this site. A child who has learned
   أُرِيدُ can ask for ANYTHING the moment they are allowed to put an English
   word in the hole — أُرِيدُ pen — and the alternative is not better Arabic, it
   is silence. So `frame` is a first-class field: a pattern, a hole, some Arabic
   words that fit it, and deliberately some English ones too, with the
   permission said out loud. Fluency comes from using a small number of frames
   constantly, not from waiting until the vocabulary is complete.
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
        frame: {
          pattern: 'هَذَا ___',
          say: 'This is ___',
          bridge: 'You can point at anything and say hadha. If you do not know the Arabic word yet, say the English one — hadha pen. People understand you, and that is what matters.',
          slots: [
            { ar: 'كِتَاب', en: 'a book' },
            { ar: 'بَاب', en: 'a door' },
            { ar: 'قَمَر', en: 'the moon' },
            { en: 'pen', english: true },
            { en: 'tractor', english: true },
          ],
        },
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
        frame: {
          pattern: '___ فِي ___',
          say: '___ is in ___',
          bridge: 'Two things and a fee in the middle. Either hole can be an English word if you are stuck — Lulu fee garden works perfectly.',
          slots: [
            { ar: 'لُولُو فِي الْمَطْبَخ', en: 'Lulu is in the kitchen' },
            { ar: 'بَابَا فِي الْبَيْت', en: 'Baba is in the house' },
            { en: 'Lulu fee garden', english: true },
          ],
        },
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
  {
    id: 'me',
    level: 1,
    title: 'أَنَا',
    titleEn: 'Me, and what I want',
    lessons: [
      {
        ar: 'أَنَا هُنَا.',
        en: 'I am here.',
        why: 'Ana means I. There is no word for am, so two words make a whole sentence.',
        frame: {
          pattern: 'أَنَا ___',
          say: 'I am ___',
          bridge: 'Ana plus one word says how you are or where you are. If the word will not come, use the English one. Ana hungry. Keep talking.',
          slots: [
            { ar: 'أَنَا سَعِيد', en: 'I am happy' },
            { ar: 'أَنَا صَغِير', en: 'I am small' },
            { en: 'ana hungry', english: true },
            { en: 'ana ready', english: true },
          ],
        },
        vary: [
          { ar: 'أَنَا سَعِيد.', en: 'I am happy.' },
          { ar: 'أَنَا صَغِير.', en: 'I am small.' },
        ],
      },
      {
        ar: 'أُرِيدُ مَاء.',
        en: 'I want water.',
        why: 'Ureedu means I want. It is one of the most useful words there is, because you can ask for anything at all with it.',
        frame: {
          pattern: 'أُرِيدُ ___',
          say: 'I want ___',
          bridge: 'This is the best one. Ureedu, and then anything. You do not know the Arabic for pen? Say ureedu pen. That is a real sentence and everybody will understand it.',
          slots: [
            { ar: 'أُرِيدُ مَاء', en: 'I want water' },
            { ar: 'أُرِيدُ كِتَاب', en: 'I want a book' },
            { ar: 'أُرِيدُ عَصِير', en: 'I want juice' },
            { en: 'ureedu pen', english: true },
            { en: 'ureedu banana', english: true },
            { en: 'ureedu my teddy', english: true },
          ],
        },
        vary: [
          { ar: 'أُرِيدُ كِتَاب.', en: 'I want a book.' },
          { ar: 'أُرِيدُ عَصِير.', en: 'I want juice.' },
        ],
      },
      {
        ar: 'مَاذَا تُرِيدُ؟',
        en: 'What do you want?',
        why: 'Madha means what. Ask it, and let the other person fill in the rest.',
        vary: [
          { ar: 'مَاذَا تَقُولُ؟', en: 'What are you saying?' },
          { ar: 'مَاذَا تَرَى؟', en: 'What do you see?' },
        ],
      },
    ],
  },
  {
    id: 'have',
    level: 2,
    title: 'عِنْدِي',
    titleEn: 'I have',
    lessons: [
      {
        ar: 'عِنْدِي كِتَاب.',
        en: 'I have a book.',
        why: 'Arabic has no verb for to have. Indee really means at me. So: at me, a book. Baba learned this one in his class too.',
        frame: {
          pattern: 'عِنْدِي ___',
          say: 'I have ___',
          bridge: 'Indee, and then the thing. An English word in the hole is fine. Indee bicycle. Say it now, and learn the Arabic word later.',
          slots: [
            { ar: 'عِنْدِي كِتَاب', en: 'I have a book' },
            { ar: 'عِنْدِي كُرَة', en: 'I have a ball' },
            { en: 'indee bicycle', english: true },
            { en: 'indee two brothers', english: true },
          ],
        },
        vary: [
          { ar: 'عِنْدِي كُرَة.', en: 'I have a ball.' },
          { ar: 'عِنْدِي بَيْت.', en: 'I have a house.' },
        ],
      },
      {
        ar: 'مَا عِنْدِي مَاء.',
        en: 'I do not have water.',
        why: 'Put ma in front of it and the whole thing turns into a no. Ma indee: not at me.',
        vary: [
          { ar: 'مَا عِنْدِي كِتَاب.', en: 'I do not have a book.' },
          { ar: 'مَا عِنْدِي كُرَة.', en: 'I do not have a ball.' },
        ],
      },
    ],
  },
  {
    id: 'ask',
    level: 2,
    title: 'هَلْ وَكَيْفَ',
    titleEn: 'Asking things',
    lessons: [
      {
        ar: 'كَيْفَ حَالُكَ؟',
        en: 'How are you?',
        why: 'Kayfa means how. This is the question you will say more often than any other in your whole life.',
        vary: [
          { ar: 'كَيْفَ حَالُكِ؟', en: 'How are you? To a girl.' },
          { ar: 'كَيْفَ حَالُهُ؟', en: 'How is he?' },
        ],
      },
      {
        ar: 'هَلْ عِنْدَكَ مَاء؟',
        en: 'Do you have water?',
        why: 'Hal is not a word you translate. Put it at the front and the sentence simply becomes a question.',
        frame: {
          pattern: 'هَلْ عِنْدَكَ ___؟',
          say: 'Do you have ___?',
          bridge: 'Hal indaka, and then anything. Hal indaka scissors? It works, and asking is always better than staying quiet.',
          slots: [
            { ar: 'هَلْ عِنْدَكَ مَاء؟', en: 'Do you have water?' },
            { ar: 'هَلْ عِنْدَكَ كِتَاب؟', en: 'Do you have a book?' },
            { en: 'hal indaka scissors', english: true },
          ],
        },
        vary: [
          { ar: 'هَلْ عِنْدَكَ كِتَاب؟', en: 'Do you have a book?' },
          { ar: 'هَلْ عِنْدَكَ كُرَة؟', en: 'Do you have a ball?' },
        ],
      },
    ],
  },
  {
    id: 'said',
    level: 3,
    title: 'قَالَ وَقَالَتْ',
    titleEn: 'He said, she said',
    lessons: [
      {
        ar: 'قَالَ بَابَا: هَيَّا.',
        en: 'Baba said: come on.',
        why: 'Qala is he said. Qalat is she said, with one little t on the end for a girl. Now you can tell anybody what anybody said.',
        frame: {
          pattern: 'قَالَ ___: ___',
          say: '___ said: ___',
          bridge: 'Qala, then who, then what they said. Anything can go in the second hole, English included. Qala Adam: I want my bike.',
          slots: [
            { ar: 'قَالَ بَابَا: هَيَّا', en: 'Baba said: come on' },
            { ar: 'قَالَتْ مَامَا: لَا', en: 'Mama said: no' },
            { en: 'qala Adam: I want my bike', english: true },
          ],
        },
        vary: [
          { ar: 'قَالَ أَدَم: هَيَّا.', en: 'Adam said: come on.' },
          { ar: 'قَالَ الْفِيل: هَيَّا.', en: 'The elephant said: come on.' },
        ],
      },
      {
        ar: 'أُحِبُّ أُمِّي.',
        en: 'I love my mother.',
        why: 'Uhibbu means I love. The little mark doubles the b, so you hold it a moment: u hib bu.',
        frame: {
          pattern: 'أُحِبُّ ___',
          say: 'I love ___',
          bridge: 'Uhibbu, and then whoever or whatever you love. Uhibbu chocolate is a perfectly good sentence.',
          slots: [
            { ar: 'أُحِبُّ أُمِّي', en: 'I love my mother' },
            { ar: 'أُحِبُّ لُولُو', en: 'I love Lulu' },
            { en: 'uhibbu chocolate', english: true },
            { en: 'uhibbu my school', english: true },
          ],
        },
        vary: [
          { ar: 'أُحِبُّ بَابَا.', en: 'I love Baba.' },
          { ar: 'أُحِبُّ لُولُو.', en: 'I love Lulu.' },
        ],
      },
    ],
  },
  {
    /* Reza, 2026-08-31: "even for the sentences make them funny. you can
       possible even do common child friendly arabic jokes to teach them
       arabic."

       Wordplay jokes need fluency the child does not have yet, and a joke you
       have to explain is not a joke. What DOES land at three to six is the
       absurd: something enormous in the wrong place. So every sentence here is
       silly on purpose AND is one of the frames they have already met — في،
       فوق، أريد، قال. The laugh does the drilling. */
    id: 'funny',
    level: 2,
    title: 'مُضْحِك!',
    titleEn: 'Silly sentences',
    lessons: [
      {
        ar: 'الْفِيل فِي الْبَيْت!',
        en: 'The elephant is in the house!',
        why: 'Exactly the same fee you already know. Only now there is an elephant in the living room. Silly sentences stick in your head far better than sensible ones.',
        frame: {
          pattern: '___ فِي الْبَيْت!',
          say: '___ is in the house!',
          bridge: 'Put anything at all in the front hole and see how silly you can make it. English is allowed. Dinosaur fee al-bayt!',
          slots: [
            { ar: 'الْفِيل فِي الْبَيْت', en: 'The elephant is in the house' },
            { ar: 'الْقَمَر فِي الْبَيْت', en: 'The moon is in the house' },
            { en: 'dinosaur fee al-bayt', english: true },
            { en: 'my teacher fee al-bayt', english: true },
          ],
        },
        vary: [
          { ar: 'الْفِيل فِي الْمَطْبَخ!', en: 'The elephant is in the kitchen!' },
          { ar: 'الْفِيل فِي الْغُرْفَة!', en: 'The elephant is in the room!' },
        ],
      },
      {
        ar: 'لُولُو فَوْقَ بَابَا!',
        en: 'Lulu is on top of Baba!',
        why: 'Fawqa means on top of. Lulu does this to Baba every single day, so it is worth knowing the word.',
        vary: [
          { ar: 'لُولُو فَوْقَ الْكِتَاب!', en: 'Lulu is on top of the book!' },
          { ar: 'لُولُو فَوْقَ مَامَا!', en: 'Lulu is on top of Mama!' },
        ],
      },
      {
        ar: 'أُرِيدُ فِيل!',
        en: 'I want an elephant!',
        why: 'You already know ureedu. Now ask for something ridiculous with it. The answer will be no, but the sentence is perfect.',
        vary: [
          { ar: 'أُرِيدُ قَمَر!', en: 'I want the moon!' },
          { ar: 'أُرِيدُ بَيْت!', en: 'I want a house!' },
        ],
      },
    ],
  },
  {
    id: 'funny3',
    level: 3,
    title: 'مَنْ قَالَ ذَلِك؟',
    titleEn: 'Who said THAT?',
    lessons: [
      {
        ar: 'قَالَ الْفِيل: أُرِيدُ عَصِير!',
        en: 'The elephant said: I want juice!',
        why: 'Two things you know, stuck together. Qala for he said, then ureedu for what he wanted. Animals can say anything you like.',
        frame: {
          pattern: 'قَالَ ___: أُرِيدُ ___!',
          say: 'The ___ said: I want ___!',
          bridge: 'Both holes are yours. Make the animal as silly as you can, and use an English word whenever you need one. Qala the crocodile: ureedu chips!',
          slots: [
            { ar: 'قَالَ الْفِيل: أُرِيدُ مَاء', en: 'The elephant said: I want water' },
            { ar: 'قَالَتْ لُولُو: أُرِيدُ سَمَكَة', en: 'Lulu said: I want a fish' },
            { en: 'qala the crocodile: ureedu chips', english: true },
            { en: 'qala the robot: ureedu battery', english: true },
          ],
        },
        vary: [
          { ar: 'قَالَ الْفِيل: أُرِيدُ مَاء!', en: 'The elephant said: I want water!' },
          { ar: 'قَالَ الْفِيل: أُرِيدُ كِتَاب!', en: 'The elephant said: I want a book!' },
        ],
      },
      {
        ar: 'مَاذَا قَالَ الْجِدَار لِلْجِدَار؟',
        en: 'What did the wall say to the wall?',
        why: 'A proper joke, and children tell this one in Arabic and in English. Qala means he said. Lil-jidar means to the wall.',
        joke: {
          setup: { ar: 'مَاذَا قَالَ الْجِدَار لِلْجِدَار؟', en: 'What did the wall say to the wall?' },
          punch: { ar: 'نَلْتَقِي عِنْدَ الزَّاوِيَة!', en: 'See you at the corner!' },
        },
        vary: [
          { ar: 'مَاذَا قَالَ الْوَلَد لِلْجِدَار؟', en: 'What did the boy say to the wall?' },
          { ar: 'مَاذَا قَالَ الْفِيل لِلْجِدَار؟', en: 'What did the elephant say to the wall?' },
        ],
      },
      {
        ar: 'لِمَاذَا الْفِيل كَبِير؟',
        en: 'Why is the elephant big?',
        why: 'Limadha means why. It is madha, what, with a li stuck on the front. Ask it about anything at all.',
        joke: {
          setup: { ar: 'لِمَاذَا الْفِيل كَبِير؟', en: 'Why is the elephant big?' },
          punch: { ar: 'لِأَنَّهُ أَكَلَ كَثِيرًا!', en: 'Because he ate a LOT!' },
        },
        vary: [
          { ar: 'لِمَاذَا الْقَمَر كَبِير؟', en: 'Why is the moon big?' },
          { ar: 'لِمَاذَا الْفِيل صَغِير؟', en: 'Why is the elephant small?' },
        ],
      },
      {
        ar: 'لَهُ أَوْرَاق وَلَيْسَ نَبَاتًا.',
        en: 'It has leaves and it is not a plant.',
        why: 'Awraaq means leaves — and in Arabic, just like in English, the pages of a book are called leaves too. That is the whole trick.',
        joke: {
          setup: { ar: 'لَهُ أَوْرَاق وَلَيْسَ نَبَاتًا. مَا هُوَ؟', en: 'It has leaves and is not a plant. What is it?' },
          punch: { ar: 'الْكِتَاب!', en: 'A book!' },
        },
        vary: [
          { ar: 'لَهُ أَوْرَاق وَلَيْسَ كِتَابًا.', en: 'It has leaves and is not a book.' },
          { ar: 'لَهُ أَبْوَاب وَلَيْسَ نَبَاتًا.', en: 'It has doors and is not a plant.' },
        ],
      },
      {
        ar: 'يَبْكِي بِلَا عُيُون.',
        en: 'It cries without any eyes.',
        why: 'Yabki means it cries. Something up in the sky cries all over you and has no eyes at all.',
        joke: {
          setup: { ar: 'يَبْكِي بِلَا عُيُون. مَا هُوَ؟', en: 'It cries without eyes. What is it?' },
          punch: { ar: 'سَحَاب!', en: 'A cloud!' },
        },
        vary: [
          { ar: 'يَبْكِي بِلَا صَوْت.', en: 'It cries without a sound.' },
          { ar: 'يَمْشِي بِلَا عُيُون.', en: 'It walks without eyes.' },
        ],
      },
      {
        ar: 'أُحِبُّ الْفِيل الْكَبِير.',
        en: 'I love the big elephant.',
        why: 'The describing word comes AFTER the thing in Arabic, the opposite way round from English. Not the big elephant, but the elephant the big.',
        vary: [
          { ar: 'أُحِبُّ الْقَمَر الْكَبِير.', en: 'I love the big moon.' },
          { ar: 'أُحِبُّ الْبَيْت الْكَبِير.', en: 'I love the big house.' },
        ],
      },
    ],
  },
  {
    /* Reza asked twice for jokes, so they get their own set rather than being
       sprinkled about: "in sentences, make some jokes using common words to
       teach arabic."

       Two kinds, and both are built ONLY from words already met.
         · silly answers — the humour is that the answer is absurd, which a
           three-year-old finds funny and an adult does not have to explain;
         · real Arabic riddles (ألغاز) — "it has teeth and does not eat" is a
           genuine children's riddle and it is a thousand years older than this
           website.
       Every joke reuses أَيْنَ، مَاذَا، فِي، مَا، هُوَ، لَهُ، لَا — top-100 words in the
       measured corpus. The laugh is the drill. */
    id: 'jokes',
    level: 2,
    title: 'نُكَت وَأَلْغَاز',
    titleEn: 'Jokes and riddles',
    lessons: [
      {
        ar: 'أَيْنَ بَابَا؟',
        en: 'Where is Baba?',
        why: 'You know ayna already. Now listen to the silly answer, and see if you can guess it before it comes.',
        joke: {
          setup: { ar: 'أَيْنَ بَابَا؟', en: 'Where is Baba?' },
          punch: { ar: 'تَحْتَ الْفِيل!', en: 'Under the elephant!' },
        },
        vary: [
          { ar: 'أَيْنَ مَامَا؟', en: 'Where is Mama?' },
          { ar: 'أَيْنَ لُولُو؟', en: 'Where is Lulu?' },
        ],
      },
      {
        ar: 'مَاذَا فِي الْمَطْبَخ؟',
        en: 'What is in the kitchen?',
        why: 'Madha fee. What is in. The answer should be bread or water. It is not.',
        joke: {
          setup: { ar: 'مَاذَا فِي الْمَطْبَخ؟', en: 'What is in the kitchen?' },
          punch: { ar: 'الْبَحْر!', en: 'The sea!' },
        },
        vary: [
          { ar: 'مَاذَا فِي الْبَيْت؟', en: 'What is in the house?' },
          { ar: 'مَاذَا فِي الْغُرْفَة؟', en: 'What is in the room?' },
        ],
      },
      {
        ar: 'بَيْت بِلَا بَاب.',
        en: 'A house with no door.',
        why: 'A riddle. Bila means without. A house with no door at all — what could it possibly be?',
        joke: {
          setup: { ar: 'بَيْت بِلَا بَاب. مَا هُوَ؟', en: 'A house with no door. What is it?' },
          punch: { ar: 'الْبَيْضَة!', en: 'An egg!' },
        },
        vary: [
          { ar: 'بَيْت بِلَا نَافِذَة.', en: 'A house with no window.' },
          { ar: 'كِتَاب بِلَا بَاب.', en: 'A book with no door.' },
        ],
      },
      {
        ar: 'يَكْتُب وَلَا يَقْرَأ.',
        en: 'It writes and it does not read.',
        why: 'Yaktub means it writes. Yaqra means it reads. Something writes all day long and has never read a single word.',
        joke: {
          setup: { ar: 'يَكْتُب وَلَا يَقْرَأ. مَا هُوَ؟', en: 'It writes and does not read. What is it?' },
          punch: { ar: 'الْقَلَم!', en: 'A pen!' },
        },
        vary: [
          { ar: 'يَكْتُب وَلَا يَأْكُل.', en: 'It writes and does not eat.' },
          { ar: 'يَكْتُب وَلَا يَنَام.', en: 'It writes and does not sleep.' },
        ],
      },
      {
        ar: 'لَهُ عَيْن وَلَا يَرَى.',
        en: 'It has an eye and it does not see.',
        why: 'This is a real Arabic riddle, and children have been asking each other this one for hundreds of years. Lahu means it has. Think before you tap!',
        joke: {
          setup: { ar: 'لَهُ عَيْن وَلَا يَرَى. مَا هُوَ؟', en: 'It has an eye and does not see. What is it?' },
          punch: { ar: 'الْإِبْرَة!', en: 'A needle!' },
        },
        vary: [
          { ar: 'لَهُ عَيْن وَلَا يَنَام.', en: 'It has an eye and does not sleep.' },
          { ar: 'لَهُ بَاب وَلَا يَرَى.', en: 'It has a door and does not see.' },
        ],
      },
      {
        ar: 'لَهُ أَسْنَان وَلَا يَأْكُل.',
        en: 'It has teeth and it does not eat.',
        why: 'Another old one. Asnaan means teeth. What has teeth, but never eats anything at all?',
        joke: {
          setup: { ar: 'لَهُ أَسْنَان وَلَا يَأْكُل. مَا هُوَ؟', en: 'It has teeth and does not eat. What is it?' },
          punch: { ar: 'الْمُشْط!', en: 'A comb!' },
        },
        vary: [
          { ar: 'لَهُ أَسْنَان وَلَا يَشْرَب.', en: 'It has teeth and does not drink.' },
          { ar: 'لَهُ بَيْت وَلَا يَأْكُل.', en: 'It has a house and does not eat.' },
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
