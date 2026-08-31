/* ————— Hikayat · child-friendly notes on the ayat ————————————————————————
   Reza, 2026-08-31: "there can be explanations for ayat again explaining the
   endings or conjugations, all in child friendly way."

   Every note is about ONE thing, and it is almost always an ENDING — because
   that is what Arabic does and what a child never notices on their own. The
   naa that means we at the front of a word and us at the back of it; the oo
   that means they; the ee that appears because a little word leaned on it.
   A child who starts hearing those endings is reading Arabic, not reciting
   sounds.

   Written by hand, kept short, and read aloud — never printed and left there.
   They avoid every grammar term: no genitive, no imperative, no pronoun
   suffix. "The naa at the end means us" is the same fact and a five-year-old
   can hold it.

   COVERAGE IS HONEST. Notes exist for Al-Fatiha and the four shortest surahs
   (20 ayat). The other seven surahs have the full word-by-word breakdown, the
   real recitation and the meaning check, but no bespoke note yet, and the UI
   simply does not offer the ✨ step for them rather than inventing filler.
   ========================================================================= */
'use strict';

const AYAH_NOTES = {
  /* ---- Al-Fatiha ---- */
  '1:1': 'Bismi means with the name. That little bi at the front means with, and it changes the ending of the next word to ee. Listen: bismi, not bismu.',
  '1:2': 'Al hamdu lillah. The lam inside lillahi means for. Every good thing there is, is for Allah.',
  '1:3': 'The same two names again, ar Rahman ar Raheem. Arabic repeats things on purpose, so that they sink in.',
  '1:4': 'Maaliki yawmi ad deen. Owner, of the day, of the judging. Three words leaning on each other, and each one ends in ee because of it.',
  '1:5': 'Iyyaka na budu. The na at the START of na budu means WE. Not I worship. We worship, all of us together.',
  '1:6': 'Ihdinaa. Now the naa is at the END, and there it means us. Guide us. The same little naa, in a different place, doing a different job.',
  '1:7': 'Alayhim means on them. That him on the end is the them. In Arabic the endings carry an enormous amount of the meaning.',

  /* ---- Al-Kawthar ---- */
  '108:1': 'A taynaaka. There are two people hiding in that one word. Naa means we, and ka on the end means you. We gave you.',
  '108:2': 'Fa salli. Salli is an order, so it is short and it starts straight in. Pray!',
  '108:3': 'Shaani aka. There is that ka again on the end, and here it means your. The one who dislikes you.',

  /* ---- Al-Asr ---- */
  '103:1': 'Wal asr. This wa is not the and you know. Here it is a promise word, like saying: by the time!',
  '103:2': 'Inna al insaana. Insaan ends in a here only because inna is sitting in front of it. A little word in front changes the ending behind.',
  '103:3': 'Aamanoo and amiloo both end in oo. That oo means THEY did it, lots of them, not just one person.',

  /* ---- An-Nasr ---- */
  '110:1': 'Idha means when. Not if, but when. It is going to happen.',
  '110:2': 'Yadkhuloona ends in oona. That ending means they are doing it right now, and there are many of them.',
  '110:3': 'Fa sabbih is an order again: praise! And in innahu, the hu on the end means he.',

  /* ---- Al-Ikhlas ---- */
  '112:1': 'Qul means SAY. It is an order, and it is only three letters long.',
  '112:2': 'Listen carefully: you say as Samad, not al Samad. The lam vanishes into the s. That happens with some letters and not others.',
  '112:3': 'Lam yalid. That little lam in front turns the whole thing into DID NOT. He did not have a child.',
  '112:4': 'Walam yakun. The same lam doing the same job. And ahad on the end means one, or anyone at all.',
};

/* Prompts: small variations that make a child THINK about the meaning rather
   than recognise a shape. Reza: "small prompts with small variations to help
   them learn the meaning." Each is answerable purely by ear. */
const AYAH_PROMPTS = {
  '1:1': ['Which word in this ayah means the name?', 'Can you hear the word Allah?'],
  '1:2': ['Which word means all praise?', 'Who is the praise for?'],
  '1:4': ['Which word means day?', 'Who owns that day?'],
  '1:5': ['Does this ayah say I worship, or WE worship?', 'Which word means we ask for help?'],
  '1:6': ['Who is being guided — me, or us?', 'Which word means the straight path?'],
  '108:1': ['Who is the we in this ayah?', 'Who is the you?'],
  '103:1': ['Which word means the time?'],
  '103:3': ['Does the oo ending mean one person, or many?'],
  '112:1': ['What does qul tell you to do?', 'Which word means one?'],
  '112:3': ['Does this ayah say he had a child, or he did not?'],
  '110:1': ['Does idha mean if, or when?'],
};


/* ————— the meaning, for a child —————————————————————————————————————————
   The meanings that came with the text are adult tafsir: 24 words on average
   and up to 62, full of transliterated terms (al-alamin, iman, dunya). A child
   cannot hold that by ear, and the check step cannot ask anyone to choose
   between three paragraphs.

   So every ayah gets ONE short plain sentence. These are meanings, not
   translations of style: they say what the ayah says, in words a five-year-old
   already owns. The full adult meaning is still in the data as `en` for a
   parent who wants it. */
const AYAH_KID = {
  '1:1': 'With, or by, the name of Allah, the Most Kind, the Most Merciful.',
  '1:2': 'All praise is for Allah, the Lord of everything there is.',
  '1:3': 'The Most Kind, the Most Merciful.',
  '1:4': 'The Owner of the Day of Judgement.',
  '1:5': 'You alone we worship, and You alone we ask for help.',
  '1:6': 'Guide us along the straight path.',
  '1:7': 'The path of the people You were kind to, not the people who made You angry, and not the people who got lost.',
  '108:1': 'We have given you so much good.',
  '108:2': 'So pray to your Lord, and give.',
  '108:3': 'It is the one who hates you who is cut off.',
  '103:1': 'By the time!',
  '103:2': 'People really are losing.',
  '103:3': 'Except the ones who believe, and do good, and tell each other the truth, and tell each other to be patient.',
  '110:1': 'When the help of Allah comes, and the winning,',
  '110:2': 'and you see people coming into the religion of Allah in crowds,',
  '110:3': 'then praise your Lord and ask Him to forgive you. He always turns back to you.',
  '112:1': 'Say: He is Allah, the One.',
  '112:2': 'Allah, who needs nobody, and everybody needs Him.',
  '112:3': 'He did not have a child, and He was not born.',
  '112:4': 'And there is nobody at all like Him.',
  '113:1': 'Say: I ask the Lord of the morning light to keep me safe,',
  '113:2': 'from anything bad in everything He made,',
  '113:3': 'and from the bad in the dark when it comes,',
  '113:4': 'and from the bad of the people who blow on knots,',
  '113:5': 'and from the bad of a jealous person when he is jealous.',
  '106:1': 'Because Quraysh are used to their journeys,',
  '106:2': 'their journey in the winter and their journey in the summer,',
  '106:3': 'so let them worship the Lord of this House,',
  '106:4': 'who fed them so they are not hungry, and kept them safe so they are not afraid.',
  '105:1': 'Did you not see what your Lord did to the people of the elephant?',
  '105:2': 'Did He not make their plan go all wrong?',
  '105:3': 'And He sent birds against them, flock after flock,',
  '105:4': 'throwing stones of hard baked clay at them,',
  '105:5': 'and He made them like straw that has been eaten up.',
  '114:1': 'Say: I ask the Lord of the people to keep me safe,',
  '114:2': 'the King of the people,',
  '114:3': 'the God of the people,',
  '114:4': 'from the bad of the whisperer who hides away,',
  '114:5': 'the one who whispers inside the hearts of people,',
  '114:6': 'from the jinn, and from people.',
  '109:1': 'Say: O you who do not believe,',
  '109:2': 'I do not worship what you worship,',
  '109:3': 'and you do not worship what I worship,',
  '109:4': 'and I am never going to worship what you worship,',
  '109:5': 'and you are never going to worship what I worship.',
  '109:6': 'You have your religion, and I have mine.',
  '111:1': 'The hands of Abu Lahab will be ruined, and he is ruined.',
  '111:2': 'His money and everything he earned did not help him at all.',
  '111:3': 'He will burn in a fire full of flames,',
  '111:4': 'and his wife as well, the one who carried the firewood,',
  '111:5': 'with a rope of twisted fibre around her neck.',
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AYAH_NOTES, AYAH_PROMPTS, AYAH_KID };
}
