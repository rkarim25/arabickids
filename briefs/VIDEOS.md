# Video briefs — for the video AI (Google Flow / NotebookLM / any)

Six Kids Arabic TV episodes, each built on **one station's anchor
sentences** from the path (`PATH.md`, `data/path.json`). The show bible —
tone, characters, the two-part structure — is `NOTEBOOKLM_KIDS_ARABIC.md`;
this file only adds what each episode must contain and how it gets onto the
site. Episode 1 (Hello Bunny, `uhP3pEyKPec`) is live and is station s01's
video step; the six below fill the other stations.

## Rules that do not bend

- **30 to 45 seconds.** Part 1 story clip 12 to 15 s, Part 2 teaching
  spotlight 15 to 20 s, closing مَعَ السَّلَامَة.
- **The anchor sentences are said verbatim, slowly, twice** in Part 2 —
  once whole, once after the syllable break. Same tashkeel as the source.
- **On-screen Arabic is fully vowelled**, large, one line at a time. No
  transliteration anywhere on screen (DESIGN.md rule 3). English is spoken
  softly by the narrator as the anchor, not written.
- **Calm.** No sound effects louder than the voice, no shouting, no
  applause. Bluey, not Cocomelon.
- **The picture carries the meaning.** When the line is *Lulu is in the
  box*, the shot is Lulu getting into a box. One action per line.
- **Same cast, same clothes** as the character sheets. A child recognises
  Adam by his teal sweater.

## Delivery

1. `ep<N>_video.mp4` (1080p, 16:9) and `ep<N>_thumbnail.jpg` in the repo
   root (Ep1's are there as the pattern).
2. `python scripts/upload-youtube.py` uploads (unlisted is fine; the site
   embeds by id). It needs `client_secrets.json`, already present.
3. Verify the id against `https://www.youtube.com/oembed?url=https://youtu.be/<id>&format=json`
   — title and channel must come back. Record both in `videos.js`.
4. Add the tile to the right topic in `videos.js`, and the step
   `{ "type": "video", "ref": "<id>" }` to the station in `data/path.json`.
5. `node scripts/test-videos.js` · `node scripts/test-path.js` ·
   `node scripts/sync-sw.js`.

---

## Ep 2 · «مَاذَا تُرِيدُ؟» *What do you want?* — station s02 (Level 1)

**Anchors:** مَاذَا تُرِيدُ؟ · أُرِيدُ مَاء.
**Part 1 (story):** Adam at the kitchen table; Mama asks مَاذَا تُرِيدُ؟;
Adam: أُرِيدُ مَاء; Mama pours; Lulu appears, Mama asks the cat the same
question; Lulu looks at the fish. Narration in Arabic only.
**Part 2 (spotlight):** the two anchors, syllables: مَا · ذَا · تُ · رِي · دُ,
then أُ · رِي · دُ · مَاء. English, softly: *What do you want? I want water.*
One decodable extra: أُرِيدُ عَصِير. Close.
**Thumbnail:** Adam pointing at the jug, Lulu beside him.

## Ep 3 · «أَيْنَ لُولُو؟» *Where is Lulu?* — station s03 (Level 2)

**Anchors:** أَيْنَ لُولُو؟ · لُولُو فِي الْبَيْت.
**Part 1:** Maryam looks for Lulu: فِي الْمَطْبَخ؟ (no) · فِي الْغُرْفَة؟ (no) ·
فَوْقَ الْمَائِدَة؟ (no) · Baba points: لُولُو فِي الصُّنْدُوق! (the box, the
site's gag). One room per shot.
**Part 2:** أَيْ · نَ · لُو · لُو then لُو · لُو · فِي · الْ · بَيْت. English:
*Where is Lulu? Lulu is in the house.* Extra: لُولُو فِي الصُّنْدُوق.
**Thumbnail:** a cardboard box with two ears showing.

## Ep 4 · «مَنْ فِي الْبَيْت؟» *Who is in the house?* — station s04 (Level 2)

**Anchors:** مَنْ فِي الْبَيْت؟ · الْقَمَر جَمِيل.
**Part 1:** evening; a knock; Adam asks مَنْ فِي الْبَيْت؟ and each answer is
a family member at the door (Baba, Mama, Maryam, then Bunny with Monkey);
the last shot is the window and the moon: الْقَمَر جَمِيل.
**Part 2:** مَنْ · فِي · الْ · بَيْت, then الْ · قَ · مَر · جَ · مِيل. English:
*Who is in the house? The moon is beautiful.* Extra: لُولُو صَغِيرَة.
**Thumbnail:** four faces in a doorway, moon behind.

## Ep 5 · «هَلْ عِنْدَكَ مَاء؟» *Do you have water?* — station s05 (Level 2)

**Anchors:** عِنْدِي كِتَاب. · هَلْ عِنْدَكَ مَاء؟
**Part 1:** Bunny and Monkey on a walk; Bunny: عِنْدِي جَزَر; Monkey: عِنْدِي
مَوْز; the sun is hot; Monkey: هَلْ عِنْدَكَ مَاء؟; Bunny: مَا عِنْدِي مَاء;
Adam arrives with a bottle. Sharing, no drama.
**Part 2:** عِنْ · دِي · كِ · تَاب, then هَلْ · عِنْ · دَ · كَ · مَاء. English:
*I have a book. Do you have water?* Extra: عِنْدِي مَاء.
**Thumbnail:** Bunny and Monkey holding up a carrot and a banana.

## Ep 6 · «قَالَ بَابَا: هَيَّا» *Baba said: come on* — station s06 (Level 3)

**Anchors:** قَالَ بَابَا: هَيَّا. · أُحِبُّ أُمِّي.
**Part 1:** Friday morning; Baba at the door in his thobe: هَيَّا; Adam
puts on his shoes (the shoe from the Level 3 book is under Lulu — the gag);
they walk to the masjid; Adam turns back and waves: أُحِبُّ أُمِّي.
**Part 2:** قَا · لَ · بَا · بَا · هَيَّا (mark the shadda by saying it long),
then أُ · حِبْ · بُ · أُمْ · مِي. English: *Baba said: come on. I love my
mother.* Extra: قَالَتْ مَامَا: هَيَّا.
**Thumbnail:** Baba and Adam walking, the masjid ahead.

## Ep 7 · «بِسْمِ اللَّه» *Before we eat* — station s08 (Level 5)

**Anchors:** the first two lines of `ts-nawm` (read from `stories-text.js`),
plus بِسْمِ اللَّه and الْحَمْدُ لِلَّه as said in the book `yawmi-5`.
**Part 1:** the family's day in four beats — waking, eating, playing,
sleeping — each with its dua said once, gently. No ayah is sung and no ayah
is voiced by a character; if Al-Ikhlas is used, it is the real recitation
audio from the site (`audio/quran/`), over a still of the window and the
moon.
**Part 2:** بِسْ · مِ · الْ · لَاه, then الْ · حَمْ · دُ · لِلْ · لَاه. English:
*In the name of Allah. All praise is for Allah.* Close on the sleeping
house.
**Thumbnail:** the table, hands, a plate, Lulu under the chair.

---

## Checklist before saying an episode is done

- [ ] every anchor said verbatim, whole then in syllables, in Part 2
- [ ] on-screen Arabic fully vowelled, no Latin letters anywhere
- [ ] 30 to 45 s, one action per line, calm audio
- [ ] uploaded; oembed returns title and channel; both recorded in `videos.js`
- [ ] `data/path.json` step added; `test-videos.js` and `test-path.js` pass; `sync-sw.js` run
