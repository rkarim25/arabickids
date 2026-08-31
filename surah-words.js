/* ————— Hikayat · what each Qur'an word means, said to a child ——————————————
   Reza, 2026-08-31: "make it all child friendly, so you will ahve to do
   specific text to explain the words to the kid."

   He is right that cleaning up the grown-up glosses was not enough. Stripping
   the brackets out of "the ones brought under wrath" or "sound feminine plural
   ending" still leaves something no five-year-old can use. Those were written
   for an adult studying morphology, and no amount of tidying turns them into
   child language — they have to be written again.

   So every distinct word gets its own short line, in words a small child
   already owns. Rules used throughout:
     · four words or fewer wherever the meaning survives it;
     · no grammar vocabulary at all — no accusative, no plural ending, no
       particle. If an ending matters it is explained in surah-notes.js, out
       loud, as a story about the sound;
     · say what it MEANS here, not everything it could mean elsewhere;
     · the same word gets the same words every time, so repetition does its job.

   The full adult gloss is still in data/surahs.json as `en` for a parent.
   ========================================================================= */
'use strict';

const QWORD = {
  /* ---- Al-Fatiha ---- */
  'بِسۡمِ': 'with, or by, the name',
  'ٱللَّهِ': 'Allah',
  'ٱلرَّحۡمَٰنِ': 'the Most Kind',
  'ٱلرَّحِيمِ': 'the Most Merciful',
  'ٱلۡحَمۡدُ': 'all the praise',
  'لِلَّهِ': 'is for Allah',
  'رَبِّ': 'the Lord and Carer of',
  'ٱلۡعَٰلَمِينَ': 'everything there is',
  'مَٰلِكِ': 'the Owner of',
  'يَوۡمِ': 'the day',
  'ٱلدِّينِ': 'of judging',
  'إِيَّاكَ': 'You alone',
  'نَعۡبُدُ': 'we worship',
  'وَإِيَّاكَ': 'and You alone',
  'نَسۡتَعِينُ': 'we ask for help',
  'ٱهۡدِنَا': 'guide us',
  'ٱلصِّرَٰطَ': 'the path',
  'ٱلۡمُسۡتَقِيمَ': 'the straight one',
  'صِرَٰطَ': 'the path of',
  'ٱلَّذِينَ': 'the people who',
  'أَنۡعَمۡتَ': 'You were kind to',
  'عَلَيۡهِمۡ': 'them',
  'غَيۡرِ': 'not',
  'ٱلۡمَغۡضُوبِ': 'the ones You were angry with',
  'وَلَا': 'and not',
  'ٱلضَّآلِّينَ': 'the ones who got lost',

  /* ---- Al-Kawthar ---- */
  'إِنَّآ': 'we really have',
  'أَعۡطَيۡنَٰكَ': 'given you',
  'ٱلۡكَوۡثَرَ': 'so much good',
  'فَصَلِّ': 'so pray',
  'لِرَبِّكَ': 'to your Lord',
  'وَٱنۡحَرۡ': 'and give',
  'إِنَّ': 'really',
  'شَانِئَكَ': 'the one who hates you',
  'هُوَ': 'he is',
  'ٱلۡأَبۡتَرُ': 'the one cut off',

  /* ---- Al-Asr ---- */
  'وَٱلۡعَصۡرِ': 'by the time',
  'ٱلۡإِنسَٰنَ': 'people',
  'لَفِي': 'are really in',
  'خُسۡرٍ': 'losing',
  'إِلَّا': 'except',
  'ٱلَّذِينَ ءَ': 'the people who',
  'امَنُواْ': 'believed',
  'وَ': 'and',
  'عَمِلُواْ': 'they did',
  'ٱلصَّٰلِحَٰتِ': 'good things',
  'وَتَوَاصَوۡاْ': 'and they told each other',
  'بِٱلۡحَقِّ': 'the truth',
  'وَتَوَاصَوۡاْ بِٱلصَّبۡرِ': 'and they told each other to be patient',

  /* ---- An-Nasr ---- */
  'إِذَا': 'when',
  'جَآءَ': 'comes',
  'نَصۡرُ': 'the help of',
  'وَٱلۡفَتۡحُ': 'and the winning',
  'وَرَأَيۡتَ': 'and you see',
  'ٱلنَّاسَ': 'the people',
  'يَدۡخُلُونَ': 'coming in',
  'فِي': 'into',
  'دِينِ': 'the religion of',
  'أَفۡوَاجٗا': 'in crowds',
  'فَسَبِّحۡ': 'so praise',
  'بِحَمۡدِ': 'with the praise of',
  'رَبِّكَ': 'your Lord',
  'وَٱسۡتَغۡفِرۡهُۚ': 'and ask Him to forgive',
  'إِنَّهُۥ': 'He really',
  'كَانَ': 'has always been',
  'تَوَّابَۢا': 'the One who accepts',

  /* ---- Al-Ikhlas ---- */
  'قُلۡ': 'say',
  'ٱللَّهُ': 'Allah',
  'أَحَدٌ': 'is One',
  'ٱلصَّمَدُ': 'needs nobody, and everybody needs Him',
  'لَمۡ': 'did not',
  'يَلِدۡ': 'have a child',
  'وَلَمۡ': 'and was not',
  'يُولَدۡ': 'born',
  'يَكُن': 'there is',
  'لَّهُۥ': 'like Him',
  'كُفُوًا': 'the same as Him',
  'أَحَدُۢ': 'anybody',

  /* ---- Al-Falaq ---- */
  'أَعُوذُ': 'I ask to be kept safe',
  'بِرَبِّ': 'by the Lord of',
  'ٱلۡفَلَقِ': 'the morning light',
  'مِن': 'from',
  'شَرِّ': 'the bad in',
  'مَا': 'what',
  'خَلَقَ': 'He made',
  'وَمِن': 'and from',
  'غَاسِقٍ': 'the dark',
  'وَقَبَ': 'when it comes',
  'ٱلنَّفَّٰثَٰتِ': 'the ones who blow',
  'ٱلۡعُقَدِ': 'on knots',
  'حَاسِدٍ': 'a jealous person',
  'حَسَدَ': 'when he is jealous',

  /* ---- Quraysh ---- */
  'لِإِيلَٰفِ': 'because they are used to',
  'قُرَيۡشٍ': 'Quraysh',
  'إِۦلَٰفِهِمۡ': 'they are used to',
  'رِحۡلَةَ': 'the journey of',
  'ٱلشِّتَآءِ': 'the winter',
  'وَٱلصَّيۡفِ': 'and the summer',
  'فَلۡيَعۡبُدُواْ': 'so let them worship',
  'رَبَّ': 'the Lord of',
  'هَٰذَا': 'this',
  'ٱلۡبَيۡتِ': 'House',
  'ٱلَّذِيٓ': 'the One who',
  'أَطۡعَمَهُم': 'fed them',
  'مِّن': 'from',
  'جُوعٖ': 'being hungry',
  'وَءَامَنَهُم': 'and kept them safe',
  'مِّنۡ': 'from',
  'خَوۡفِۭ': 'being afraid',

  /* ---- Al-Fil ---- */
  'أَلَمۡ': 'did you not',
  'تَرَ': 'see',
  'كَيۡفَ': 'how',
  'فَعَلَ': 'did',
  'رَبُّكَ': 'your Lord',
  'بِأَصۡحَٰبِ': 'to the people of',
  'ٱلۡفِيلِ': 'the elephant',
  'يَجۡعَلۡ': 'make',
  'كَيۡدَهُمۡ': 'their plan',
  'تَضۡلِيلٖ': 'go all wrong',
  'وَأَرۡسَلَ': 'and He sent',
  'طَيۡرًا': 'birds',
  'أَبَابِيلَ': 'flock after flock',
  'تَرۡمِيهِم': 'throwing at them',
  'بِحِجَارَةٖ': 'stones',
  'سِجِّيلٖ': 'of hard baked clay',
  'فَجَعَلَهُمۡ': 'so He made them',
  'كَعَصۡفٖ': 'like straw',
  'مَّأۡكُولِۭ': 'that has been eaten',

  /* ---- An-Nas ---- */
  'ٱلنَّاسِ': 'of the people',
  'مَلِكِ': 'the King',
  'إِلَٰهِ': 'the God',
  'ٱلۡوَسۡوَاسِ': 'the whisperer',
  'ٱلۡخَنَّاسِ': 'who hides away',
  'ٱلَّذِي': 'the one who',
  'يُوَسۡوِسُ': 'whispers',
  'صُدُورِ': 'in the hearts of',
  'مِنَ': 'from',
  'ٱلۡجِنَّةِ': 'the jinn',
  'وَٱلنَّاسِ': 'and people',

  /* ---- Al-Kafirun ---- */
  'يَٰٓأَيُّهَا': 'O you',
  'ٱلۡكَٰفِرُونَ': 'who do not believe',
  'لَآ': 'not',
  'أَعۡبُدُ': 'I worship',
  'تَعۡبُدُونَ': 'you worship',
  'وَلَآ': 'and not',
  'أَنتُمۡ': 'you are',
  'عَٰبِدُونَ': 'going to worship',
  'مَآ': 'what',
  'أَنَا۠': 'I am',
  'عَابِدٞ': 'going to worship',
  'مَّا': 'what',
  'عَبَدتُّمۡ': 'you worship',
  'مَآ أَعۡبُدُ': 'what I worship',
  'لَكُمۡ': 'you have',
  'دِينُكُمۡ': 'your religion',
  'وَلِيَ': 'and I have mine',

  /* ---- Al-Masad ---- */
  'تَبَّتۡ': 'will be ruined',
  'يَدَآ': 'the two hands of',
  'أَبِي': 'Abu',
  'لَهَبٖ': 'Lahab',
  'وَتَبَّ': 'and he is ruined',
  'أَغۡنَىٰ': 'helped',
  'عَنۡهُ': 'him',
  'مَالُهُۥ': 'his money',
  'وَمَا': 'and what',
  'كَسَبَ': 'he earned',
  'سَيَصۡلَىٰ': 'he will burn in',
  'نَارٗا': 'a fire',
  'ذَاتَ': 'full of',
  'وَٱمۡرَأَتُهُۥ': 'and his wife',
  'حَمَّالَةَ': 'the carrier of',
  'ٱلۡحَطَبِ': 'the firewood',
  'جِيدِهَا': 'her neck',
  'حَبۡلٞ': 'a rope',
  'مَّسَدِۭ': 'of twisted fibre',
};

/* LOOK IT UP THROUGH HERE, never QWORD[word] directly.

   Uthmani text orders its combining marks shadda-then-fatha; typing the same
   word by hand produces fatha-then-shadda. The two strings look identical,
   print identically, and are not equal — 58 of these 175 silently missed on
   the first run. NFC puts the marks in canonical order and they match. */
const QWORD_NFC = new Map(Object.entries(QWORD).map(([k, v]) => [k.normalize('NFC'), v]));
function qword(ar) {
  return QWORD_NFC.get(String(ar || '').normalize('NFC')) || null;
}

if (typeof module !== 'undefined' && module.exports) module.exports = { QWORD, qword };
