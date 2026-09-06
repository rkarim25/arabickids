# Storybook briefs — for Antigravity (or any AI building a picture book)

Six picture books, each written **around the anchor sentences of one
station** of the path (`PATH.md`, `data/path.json`). A book on the path is
not decoration: it is the day the child meets a sentence they already heard
in a lesson, now inside a scene. So the anchor sentences appear **verbatim**,
tashkeel and all, and the rest of the book is built from words the child
already has.

Read `DESIGN.md` before writing a word. Then this.

## The rules every book obeys

1. **Ear first.** Every page is spoken. The Arabic on the page is what the
   clip says, so it must be fully vowelled and exactly what a speech engine
   can say (trap 16: no typographic apostrophes; trap 7: no bare consonants).
2. **The picture carries the meaning.** A page's picture must let a child who
   reads nothing know what the sentence means. If the sentence is *Lulu is
   in the box*, the picture is Lulu in a box, nothing else competing. Function
   words get their **relation** drawn (the same ball, the same box, moved).
3. **No writing, no transliteration.** English is one small line for the
   grown-up.
4. **The band is a promise.** Level 1: harakat and long vowels only, **no
   sukoon, so no اَلْ at all**. Level 2: sukoon arrives, so فِي · مِنْ · وَ and
   the article. Level 3: shadda and tanween. Level 4: sun-letter اَلْ. Level
   5: real ayat and duas. `scripts/test-books.js` checks this on the text.
   If it fails, the text is wrong, not the test.
5. **Repetition with variation.** The book's own sentences are the anchors
   with one word swapped. Eight story pages, at most eight new words.
6. **A joke on the last story page.** Not random — the site's own running
   gags: Lulu under something, the elephant in the house, a plan that fails.
7. **Play, never test.** The game page is listen-and-find with three
   pictures; a wrong tap replays the sound.

## What to deliver

One file `book-<slug>.js` in the shape of `book-lulu1.js`:

```js
const BOOK_SLUG = {
  id: 'slug-<level>',            // e.g. 'jaia-1'
  level: 1,
  title: 'أَنَا جَائِع',
  titleEn: 'I am hungry',
  tag: 'حَرَكَات وَمَدّ فَقَط · harakat and long vowels only',
  words: [ { ar: 'مَاء', en: 'water', icon: I.maa }, … ],   // ≤ 8, each with a picture
  pages: [
    { type: 'cover', svg: cover },
    { type: 'words' },
    { type: 'story', svg: p1, ar: [{ t: 'أَنَا' }, { t: 'جَائِع.' }], en: 'I am hungry.' },
    …   // 8 story pages
    { type: 'game' },
    { type: 'end', svg: end },
  ],
  game: [ { say: 'مَاء', opts: ['k_maa', 'k_asir', 'k_khubz'], ans: 0 }, … ],   // 3 rounds
};
if (typeof BOOKS !== 'undefined') BOOKS.push(BOOK_SLUG);
```

- **Art**: one JPG per story page plus a cover, 1024 × 768, warm watercolor
  like `art/lulu1-cover.jpg`. Put them in `art/`, reference with
  `artIcon()` / the `art()` helper as `book-lulu1.js` does. Character sheets
  are in `NOTEBOOKLM_KIDS_ARABIC.md` §2 — same Adam, Maryam, Baba, Mama,
  Lulu, Bunny and Monkey every time.
- **Word pictures**: reuse `pic/` Twemoji or `ICONS` where the object exists.
  Draw only when no emoji is right (a near-miss teaches the wrong animal).
- **Register it** (trap 10): the file, `index.html` before `kids.js`, `sw.js`.
- **Audio**: `python scripts/gen-audio.py` renders every new string.
- **Then**: `node scripts/test-books.js`, all other suites,
  `node scripts/sync-sw.js`, and add `{ "type": "book", "ref": "<id>" }` to
  the station's `steps` in `data/path.json`; `node scripts/test-path.js`.

---

## Book 1 · «أَنَا جَائِع» *I am hungry* — Level 1 · station s01

**Anchors to include verbatim:** أَنَا هُنَا. · أُرِيدُ مَاء. · هَذَا بَابَا. · هَذِهِ لُولُو.
**Words (≤ 8):** أَنَا · هُنَا · أُرِيدُ · مَاء · عَصِير · لَبَن · جَائِع · لَذِيذ
**Band:** no sukoon, no اَلْ. That rules out most food words — مَوْز, خُبْز,
تَمْر all carry a sukoon, رُزّ and تُفَّاح a shadda — so the drinks carry the
book: **مَاء · عَصِير · لَبَن**. Check every word before drawing it.
**Pages:** Adam in the kitchen doorway (أَنَا هُنَا.) → Adam holding his tummy
(أَنَا جَائِع.) → Mama at the table (هَذِهِ مَامَا.) → Adam pointing at the
jug (أُرِيدُ مَاء.) → Adam with a cup, happy (مَاء لَذِيذ.) → Adam pointing
again (أُرِيدُ عَصِير.) → Baba arrives with juice (هَذَا بَابَا.) → **joke**:
Lulu drinking the juice first (هَذِهِ لُولُو!).
**Game:** say مَاء · عَصِير · لَبَن, three cups.

## Book 2 · «مَاذَا تُرِيدُ يَا فِيل؟» *What do you want, elephant?* — Level 1 · s02

**Anchors:** مَاذَا تُرِيدُ؟ · أُرِيدُ مَاء. · plus the first two lines of the text
story `kd-feel` (read them from `stories-text.js`; they are the anchors).
**Cast:** the elephant from the Kalila wa Dimna fable, Adam, Lulu.
**Words:** فِيل · كَبِير · صَغِير · مَاذَا · تُرِيدُ · أُرِيدُ · مَاء · دَار
**Band:** no sukoon, no اَلْ — so **دَار**, not بَيْت (sukoon on the ي), and
never الْفِيل. The Level 2 gag line الْفِيل فِي الْبَيْت cannot appear here;
its Level 1 cousin is **فِيل فِي دَار!**
**Pages:** an elephant at the door (هَذَا فِيل.); Adam asks مَاذَا تُرِيدُ؟;
the elephant wants water (أُرِيدُ مَاء.), then a house (أُرِيدُ دَار.), then
Lulu's cushion — each request a page with the same frame (repetition with
variation); Adam: فِيل كَبِير! Lulu: لُولُو صَغِيرَة. **Joke**: the elephant
squeezed into the house with Lulu on his head (فِيل فِي دَار!).
**Game:** big / small / elephant.

## Book 3 · «أَيْنَ مَامَا؟» *Where is Mama?* — Level 2 · s03

**Anchors:** لُولُو فِي الْبَيْت. · الْكِتَاب فَوْقَ الْمَائِدَة. · أَيْنَ لُولُو؟
**Words:** أَيْنَ · فِي · فَوْقَ · تَحْتَ · مَطْبَخ · غُرْفَة · سَرِير · مَامَا
**Band:** sukoon and اَلْ allowed; no shadda, no tanween, no sun-letter ال
(الْمَطْبَخ is fine — م is a moon letter; **السَّرِير is sun-letter, Level 4,
so say سَرِير without the article**).
**Pages:** Maryam wakes and asks أَيْنَ مَامَا؟; looks فِي الْمَطْبَخ (no);
فِي الْغُرْفَة (no); فَوْقَ سَرِير (no — Lulu is there: هَذِهِ لُولُو!); تَحْتَ
الْمَائِدَة (no — the book is there: الْكِتَاب فَوْقَ الْمَائِدَة.); Baba:
مَامَا فِي الْبَيْت!; last page **joke**: Mama was behind the door the whole
time, with Lulu.
**Game:** in / on / under with the same ball and box.

## Book 4 · «مَنْ قَالَ مِيَاو؟» *Who said miaow?* — Level 3 · s06

The Level 3 shelf has one book. This is the second.
**Anchors:** قَالَ بَابَا: هَيَّا. · أُحِبُّ أُمِّي. · قَالَ الْفِيل: أُرِيدُ عَصِير!
**Words:** قَالَ · قَالَتْ · مِيَاو · هَيَّا · أُحِبُّ · قِطَّة · بِنْت · وَلَد
**Band:** shadda and tanween now allowed (قِطَّة, أُحِبُّ, أُمِّي); still no
sun-letter اَلْ.
**Pages:** a sound in the night; each family member is asked and answers with
قَالَ / قَالَتْ; the elephant is asked and says he wants juice (the anchor,
verbatim); Baba says هَيَّا; **joke**: it was Maryam, saying miaow to Lulu.
Last line: أُحِبُّ أُمِّي.
**Game:** who said it — three faces.

## Book 5 · «الشَّمْسُ وَالْقَمَر» *The sun and the moon* — Level 4 · s07

The Level 4 shelf has one book. This is the second, and it exists to teach
the sun-letter article by ear: الشَّمْس · السَّمَاء · النَّجْم against الْقَمَر ·
الْبَيْت.
**Anchors:** the first two lines of `ts-suq` and the first line of `kd-arnab`
(read from `stories-text.js`).
**Words:** شَمْس · قَمَر · نَجْم · سَمَاء · لَيْل · صَبَاح · جَمِيل · كَبِير
**Pages:** morning, the sun (الشَّمْسُ فِي السَّمَاء.); the day at the market
(anchor lines); evening, the moon (الْقَمَرُ جَمِيل.); stars; **joke**: Lulu
asleep in the market basket the whole way home.
**Game:** sun / moon / star.

## Book 6 · «قَبْلَ النَّوْم» *Before sleep* — Level 5 · s08

The Level 5 shelf has one book (`yawmi-5`). This is the bedtime companion.
**Anchors:** the first two lines of `ts-nawm`, plus the duas already in
`yawmi-5` (reuse their exact text and clips: بِسْمِ اللَّه, الْحَمْدُ لِلَّه).
**Ayat:** the last page is Al-Ikhlas 112:1 with the **real recitation clip**
(`data/surahs.json` → `audio`), never TTS — this is the one place the rules
are broken on purpose, see `DESIGN.md`.
**Pages:** brushing teeth, pyjamas, Baba reads, Mama says the dua, the light
goes off, the moon in the window, Lulu on the bed, sleep. **Joke:** Lulu
snoring.
**Game:** the three bedtime objects.

---

## Checklist before saying a book is done

- [ ] every anchor sentence appears verbatim, tashkeel identical to the source
- [ ] `node scripts/test-books.js` passes (band, pictures, offline, module loaded)
- [ ] every page picture shows the meaning without the text
- [ ] the last story page is a joke the child can get from the picture
- [ ] `gen-audio.py` run; no clip falls through to `speechSynthesis`
- [ ] `sync-sw.js` run; `data/path.json` step added; `test-path.js` passes
- [ ] `HANDOVER.md` §3 counts updated
