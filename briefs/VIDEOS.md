# Video briefs — paste-ready prompts for the video AI

Reza, 2026-09-06: *"for any video briefs create notes so that I can ask AI
to make them."* Each episode below has a **Paste this** block. Copy it whole
into Google Flow, NotebookLM, or whichever video model; the block carries
the show bible, the cast, the structure and the script, so nothing else
needs to be attached. The rest of each section is for whoever puts the
finished video on the site.

Episode 1 (Hello Bunny, `uhP3pEyKPec`) is live and is station s01's video
step. Episodes 2 to 7 map to the other stations of `data/path.json`, one
each, on that station's core sentences.

## The show bible, in one block (it is inside every prompt)

> **Kids Arabic TV.** Calm, warm, unhurried (Mister Rogers, Bluey). Warm 3D
> Pixar-style animation, sunny home and garden. 30–45 seconds. Two parts:
> **Part 1 (12–15 s)** a tiny story with Arabic narration only, one action
> per line; **Part 2 (15–20 s)** a gentle spotlight: each target sentence
> said slowly twice, once whole and once broken into syllables, then one
> soft English line with its meaning, then مَعَ السَّلَامَة. On-screen Arabic
> is large and fully vowelled, one line at a time. **No Latin letters on
> screen, no transliteration, no sound effects louder than the voice, no
> shouting, no applause.** Cast, always identical: Adam (5, curly dark hair,
> teal crewneck sweater, blue trousers, red sneakers), Maryam (2, twin hair
> puffs with red bows, pink floral dress), Baba (tall, neat dark beard,
> white thobe), Mama (soft teal hijab, coral collar), Lulu (plump ginger
> tabby, emerald eyes, cream muzzle), Bunny (fluffy white, pink-lined ears,
> blue denim vest), Monkey (light brown, peach face, curly tail).

## Delivery, once a video exists

1. `ep<N>_video.mp4` (1080p 16:9) and `ep<N>_thumbnail.jpg` in the repo
   root, like Ep1's.
2. `python scripts/upload-youtube.py` (needs `client_secrets.json`, present).
3. Verify the id: `https://www.youtube.com/oembed?url=https://youtu.be/<id>&format=json`
   must return a title and channel; record both in `videos.js`.
4. Add the tile to `videos.js`, and `{ "type": "video", "ref": "<id>" }` as
   a late step of the station in `data/path.json` (not two videos in a row).
5. `node scripts/test-videos.js` · `node scripts/test-path.js` ·
   `node scripts/sync-sw.js` · move the episode out of *waiting* in
   `build-status.js`.

---

## Ep 2 · «مَاذَا تُرِيدُ؟» What do you want? — station s02 (Level 1)

Target sentences: مَاذَا تُرِيدُ؟ · أُرِيدُ مَاء. · فِيل كَبِير!
Thumbnail: Adam pointing at a water jug, the elephant's trunk in frame.

**Paste this:**

```
Make a 40-second children's animated video for "Kids Arabic TV".

STYLE: calm, warm, unhurried (like Mister Rogers or Bluey). Warm 3D Pixar-style animation, sunny kitchen. No sound effects louder than the voice, no shouting, no applause, no music with lyrics. On-screen Arabic text is large and FULLY VOWELLED, one line at a time. Absolutely no Latin letters on screen and no transliteration.

CAST (identical every time): Adam, a 5-year-old boy with curly dark hair, teal crewneck sweater, blue trousers, red sneakers. Mama, kind, soft teal hijab, coral collar. A gentle grey elephant, slightly too big for the room. Lulu, a plump ginger tabby cat with green eyes.

PART 1 (12–15 s) — the story, Arabic narration only, one action per line:
1. Adam sits at the kitchen table. Mama asks: مَاذَا تُرِيدُ؟
2. Adam points at the jug: أُرِيدُ مَاء.
3. Mama pours water. Adam drinks.
4. An elephant's head appears at the window. Mama asks it the same: مَاذَا تُرِيدُ؟
5. The elephant points its trunk at the jug: أُرِيدُ مَاء.
6. Adam laughs: فِيل كَبِير!

PART 2 (15–20 s) — the spotlight, slow and gentle, each sentence on screen alone:
- مَاذَا تُرِيدُ؟ said whole, then in syllables: مَا · ذَا · تُ · رِي · دُ ; then softly in English: "What do you want?"
- أُرِيدُ مَاء. said whole, then: أُ · رِي · دُ · مَاء ; English: "I want water."
- فِيل كَبِير! said whole, then: فِيل · كَ · بِير ; English: "A big elephant!"
- Close on Adam waving: مَعَ السَّلَامَة!

Narrator: warm adult female voice, Modern Standard Arabic with full tashkeel pronunciation, slow. English lines spoken quietly by the same narrator, never written on screen.
```

## Ep 3 · «أَيْنَ لُولُو؟» Where is Lulu? — station s03 (Level 2)

Target sentences: أَيْنَ لُولُو؟ · لُولُو فِي الْبَيْت. · الْكِتَاب فَوْقَ الْمَائِدَة.
Thumbnail: a cardboard box with two ginger ears showing.

**Paste this:**

```
Make a 40-second children's animated video for "Kids Arabic TV".

STYLE: calm, warm, unhurried (Mister Rogers, Bluey). Warm 3D Pixar-style animation, a sunny family house with a kitchen, a bedroom and a hallway. No loud effects, no shouting, no applause. On-screen Arabic is large and FULLY VOWELLED, one line at a time. No Latin letters on screen, no transliteration.

CAST: Maryam, a 2-year-old girl with twin hair puffs tied with red bows and a pink floral dress. Baba, tall, neat dark beard, white thobe. Lulu, a plump ginger tabby cat with green eyes. A picture book on the kitchen table.

PART 1 (12–15 s), Arabic narration only, one action per line:
1. Maryam in the hallway, looking around: أَيْنَ لُولُو؟
2. She peeks into the kitchen. Only a book on the table: الْكِتَاب فَوْقَ الْمَائِدَة.
3. She peeks into the bedroom. Empty.
4. Baba points at a cardboard box with two ears poking out.
5. Lulu pops up. Maryam claps: لُولُو فِي الْبَيْت!

PART 2 (15–20 s), each sentence on screen alone, slow:
- أَيْنَ لُولُو؟ whole, then أَيْ · نَ · لُو · لُو ; English softly: "Where is Lulu?"
- لُولُو فِي الْبَيْت. whole, then لُو · لُو · فِي · الْ · بَيْت ; English: "Lulu is in the house."
- الْكِتَاب فَوْقَ الْمَائِدَة. whole, then الْ · كِ · تَاب · فَوْ · قَ · الْ · مَا · ئِ · دَة ; English: "The book is on the table."
- Close: Lulu in the box, Maryam waving: مَعَ السَّلَامَة!

Narrator: warm adult female voice, Modern Standard Arabic, full tashkeel, slow. English spoken quietly, never on screen.
```

## Ep 4 · «مَنْ فِي الْبَيْت؟» Who is in the house? — station s04 (Level 2)

Target sentences: مَنْ فِي الْبَيْت؟ · عِنْدِي كِتَاب. · هَلْ عِنْدَكَ مَاء؟
Thumbnail: four faces in a doorway, Bunny and Monkey at the back.

**Paste this:**

```
Make a 45-second children's animated video for "Kids Arabic TV".

STYLE: calm, warm, unhurried (Mister Rogers, Bluey). Warm 3D Pixar-style animation, late afternoon, a front door and a living room. No loud effects, no shouting, no applause. On-screen Arabic large and FULLY VOWELLED, one line at a time. No Latin letters on screen, no transliteration.

CAST: Adam (5, curly dark hair, teal sweater, blue trousers, red sneakers). Baba (tall, dark beard, white thobe). Mama (soft teal hijab, coral collar). Maryam (2, twin hair puffs, red bows, pink floral dress). Bunny (fluffy white rabbit, pink-lined ears, blue denim vest). Monkey (light brown, peach face, curly tail).

PART 1 (15 s), Arabic narration only, one action per line:
1. A knock. Adam at the door: مَنْ فِي الْبَيْت؟
2. He opens it: Baba. Then Mama. Then Maryam. Then Bunny and Monkey, waving.
3. Bunny holds up a small book: عِنْدِي كِتَاب.
4. Monkey, hot from walking, asks Adam: هَلْ عِنْدَكَ مَاء؟
5. Adam brings a cup. Everyone sits down together.

PART 2 (18 s), each sentence on screen alone, slow:
- مَنْ فِي الْبَيْت؟ whole, then مَنْ · فِي · الْ · بَيْت ; English softly: "Who is in the house?"
- عِنْدِي كِتَاب. whole, then عِنْ · دِي · كِ · تَاب ; English: "I have a book."
- هَلْ عِنْدَكَ مَاء؟ whole, then هَلْ · عِنْ · دَ · كَ · مَاء ; English: "Do you have water?"
- Close: all of them on the sofa: مَعَ السَّلَامَة!

Narrator: warm adult female voice, Modern Standard Arabic, full tashkeel, slow. English spoken quietly, never on screen.
```

## Ep 5 · «قَالَ بَابَا: هَيَّا» Baba said: come on — station s05 (Level 3)

Target sentences: قَالَ بَابَا: هَيَّا. · قَالَتْ مَامَا: لَيْسَ أَنَا. · أُحِبُّ أُمِّي.
Thumbnail: Baba and Adam walking, the masjid ahead, Lulu on the wall.

**Paste this:**

```
Make a 45-second children's animated video for "Kids Arabic TV".

STYLE: calm, warm, unhurried (Mister Rogers, Bluey). Warm 3D Pixar-style animation, a Friday morning, a family house and a short street to a small masjid. No loud effects, no shouting, no applause. On-screen Arabic large and FULLY VOWELLED, one line at a time. No Latin letters on screen, no transliteration.

CAST: Adam (5, curly dark hair, teal sweater, blue trousers, red sneakers). Baba (tall, dark beard, white thobe). Mama (soft teal hijab, coral collar). Lulu (plump ginger tabby, green eyes).

PART 1 (15 s), Arabic narration only, one action per line:
1. A miaow from somewhere. Adam looks up. Mama, carrying a tray, shakes her head gently: قَالَتْ مَامَا: لَيْسَ أَنَا.
2. Lulu is sitting on Adam's shoe by the door.
3. Baba at the door, beckoning: قَالَ بَابَا: هَيَّا.
4. Adam lifts Lulu off the shoe, puts it on, runs back and hugs Mama: أُحِبُّ أُمِّي.
5. Baba and Adam walk to the masjid, Lulu watching from the wall.

PART 2 (18 s), each sentence on screen alone, slow:
- قَالَ بَابَا: هَيَّا. whole, then قَا · لَ · بَا · بَا · هَيْ · يَا (hold the doubled y) ; English softly: "Baba said: come on."
- قَالَتْ مَامَا: لَيْسَ أَنَا. whole, then قَا · لَتْ · مَا · مَا · لَيْ · سَ · أَ · نَا ; English: "Mama said: not me."
- أُحِبُّ أُمِّي. whole, then أُ · حِبْ · بُ · أُمْ · مِي ; English: "I love my mother."
- Close on the masjid door: مَعَ السَّلَامَة!

Narrator: warm adult female voice, Modern Standard Arabic, full tashkeel, slow. English spoken quietly, never on screen.
```

## Ep 6 · «الشَّمْسُ وَالْقَمَر» The sun and the moon — station s06 (Level 4)

Target sentences: الشَّمْسُ فِي السَّمَاءِ. · الْقَمَر جَمِيل. · جَاءَ اللَّيْلُ وَذَهَبَتِ الشَّمْسُ.
Thumbnail: the same rooftop twice, sun on the left half, moon on the right.

**Paste this:**

```
Make a 45-second children's animated video for "Kids Arabic TV".

STYLE: calm, warm, unhurried (Mister Rogers, Bluey). Warm 3D Pixar-style animation. Two halves of one day: a sunny market morning and a starry night at home. No loud effects, no shouting, no applause. On-screen Arabic large and FULLY VOWELLED, one line at a time. No Latin letters on screen, no transliteration.

CAST: Adam (5, curly dark hair, teal sweater, blue trousers, red sneakers). Baba (tall, dark beard, white thobe). Maryam (2, twin hair puffs, red bows, pink floral dress). Lulu (plump ginger tabby, green eyes). A market basket with bananas.

PART 1 (15 s), Arabic narration only, one action per line:
1. Morning, a big warm sun over the rooftops: الشَّمْسُ فِي السَّمَاءِ.
2. Adam and Baba at a market stall; Baba hands Adam bananas.
3. Walking home, the sun low over a mountain.
4. The same skyline turns dark blue: جَاءَ اللَّيْلُ وَذَهَبَتِ الشَّمْسُ.
5. Adam at the open door looks up at a full moon: الْقَمَر جَمِيل.
6. Maryam finds Lulu asleep in the basket among the bananas.

PART 2 (18 s), each sentence on screen alone, slow; make the sun letters audible (the lam of الْ disappears into the doubled ش, س, ل):
- الشَّمْسُ فِي السَّمَاءِ. whole, then اشْ · شَمْ · سُ · فِسْ · سَ · مَاء ; English softly: "The sun is in the sky."
- الْقَمَر جَمِيل. whole, then الْ · قَ · مَر · جَ · مِيل ; English: "The moon is beautiful."
- جَاءَ اللَّيْلُ وَذَهَبَتِ الشَّمْسُ. whole, then جَا · ءَ · الْ · لَيْ · لُ · وَ · ذَ · هَ · بَ · تِشْ · شَمْ · سُ ; English: "Night came and the sun went away."
- Close on the moon over the house: مَعَ السَّلَامَة!

Narrator: warm adult female voice, Modern Standard Arabic, full tashkeel, slow. English spoken quietly, never on screen.
```

## Ep 7 · «بِسْمِ اللَّه» Before we eat — station s07 (Level 5)

Target sentences: بِسْمِ اللَّهِ. · الْحَمْدُ لِلَّهِ. · قَبْلَ النَّوْمِ نَقْرَأُ.
Thumbnail: the breakfast table, small hands, a plate, Lulu under the chair.
**Rule for this one:** no ayah is sung or voiced by a character. If the
video shows the bedtime reading, it shows the open book and the lamp, and
the audio there is silence or the real recitation file from
`audio/quran/` supplied separately — never a synthetic voice reading
Qur'an.

**Paste this:**

```
Make a 45-second children's animated video for "Kids Arabic TV".

STYLE: calm, warm, unhurried (Mister Rogers, Bluey). Warm 3D Pixar-style animation, one family's day: morning bedroom, breakfast table, a rug with toys, bedtime. No loud effects, no shouting, no applause, no singing. On-screen Arabic large and FULLY VOWELLED, one line at a time. No Latin letters on screen, no transliteration. Do NOT voice any Quran verse; at bedtime show the open book and the lamp with soft ambient sound only.

CAST: Maryam (2, twin hair puffs, red bows, pink floral dress). Adam (5, curly dark hair, teal sweater). Mama (soft teal hijab, coral collar). Baba (tall, dark beard, white thobe). Lulu (plump ginger tabby, green eyes).

PART 1 (15 s), Arabic narration only, one quiet action per line:
1. Maryam sits up in bed in the morning light and says softly: الْحَمْدُ لِلَّهِ.
2. Breakfast. Maryam, hands still over her plate: بِسْمِ اللَّهِ. Then she eats bread and drinks milk.
3. Plate empty, she smiles: الْحَمْدُ لِلَّهِ.
4. Evening. Mama with a small book at the bedside: قَبْلَ النَّوْمِ نَقْرَأُ. The open book, the lamp, quiet.
5. Maryam asleep, Lulu curled on the blanket.

PART 2 (18 s), each sentence on screen alone, slow:
- بِسْمِ اللَّهِ. whole, then بِسْ · مِلْ · لَاه ; English softly: "In the name of Allah."
- الْحَمْدُ لِلَّهِ. whole, then الْ · حَمْ · دُ · لِلْ · لَاه ; English: "All praise is for Allah."
- قَبْلَ النَّوْمِ نَقْرَأُ. whole, then قَبْ · لَنْ · نَوْ · مِ · نَقْ · رَ · أُ ; English: "Before sleep, we read."
- Close on the sleeping house, one window lit: مَعَ السَّلَامَة!

Narrator: warm adult female voice, Modern Standard Arabic, full tashkeel, slow and gentle. English spoken quietly, never on screen.
```

---

## Checklist before saying an episode is done

- [ ] every target sentence said whole, then in syllables, in Part 2
- [ ] on-screen Arabic fully vowelled; no Latin letters anywhere
- [ ] 30 to 45 s, one action per line, calm audio; Ep 7 voices no ayah
- [ ] uploaded; oembed returns title and channel; both recorded in `videos.js`
- [ ] `data/path.json` step added (not next to another video); `test-videos.js` and `test-path.js` pass; `sync-sw.js` run; `build-status.js` updated
