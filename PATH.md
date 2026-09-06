# The Path — المَسَار

**Status: designed, not built.** This file is the design and the build notes.
Read `DESIGN.md` first (the six rules still hold, every one), then this.

Reza, 2026-09-06:

> "the site needs to have a flow when after they finish an activity there
> should be keep going, go back or finish for today option. there needs to
> be a flow. i want it to be sentence focused as well where it tries to teach
> sentences. it can do sentences, stories, videos, but it needs to be in the
> form of a sequence rather than the child moving back and forth. the process
> needs to be spaced repetition honing in key high vocabulary sentences. it
> needs to be a mix of quranic arabic (the shortest suras) and everyday
> language."

That is four decisions, and they change the shape of the site:

1. **The sentence is the unit.** Not the letter, not the word, not the book.
   Everything on the path exists to put a small set of high-frequency
   sentences into a child's ear and mouth, over and over, in different
   clothes.
2. **The site is a sequence, not a menu.** The child walks; the site decides
   what comes next. The six doors stay, but as the library, not the front.
3. **Spaced repetition on sentences.** The same Leitner engine the vocab door
   already uses, moved up one level from words to sentences.
4. **Two tracks braided together every day.** Everyday Arabic and Qur'anic
   Arabic (Al-Fatiha and the ten shortest surahs), never one without the
   other. A day always has both.

---

## 1. What the child sees

### The front page becomes one button

Today the home screen is six doors. On the path it is Lulu and one big
button: **هَيَّا نَمْشِي · Let's walk**, with three or four little icons under
it showing what today holds (🔁 💬 📖 📿). The six doors move below, smaller,
under **المَكْتَبَة · Explore**, so a parent or a child who wants a particular
book can still get there in one tap (rule 6). Nothing is removed.

### A walk is five to seven minutes

A walk is a fixed sequence of **stops**. Every stop is an existing screen;
the path only decides the order and what comes after.

| # | Stop | What happens | Screen used |
|---|---|---|---|
| 1 | **Hello** | Lulu says today's sentence, once. The child hears it before anything else. | new, tiny |
| 2 | **Again** 🔁 | Review: the sentences that are due today, at most four. Hear it, say it, tap ⭐ *I said it* or 🔁 *again*. | new, reuses the vocab flashcard look |
| 3 | **New** 💬📖🎬 | The next step of the current station: a sentence lesson, a story, a picture book, or a video. One per day. | existing sentence / story / reader / video screens |
| 4 | **Qur'an** 📿 | One ayah of the current surah: listen, word by word, meaning. One per day, always. | existing surah screen, one ayah |
| 5 | **Play** 🎲 | Swap a word in today's sentence (the frame drill), or listen-and-find with today's words. | existing frame step, or the book game |
| 6 | **Bye** 🌙 | Stars won today, Lulu says مَعَ السَّلَامَة. | new, tiny |

Stops 2 and 5 are skipped on a child's very first day (nothing to review, no
sentence owned yet). Stop 3 can be skipped when the parent taps *short walk*.

### After every stop: the choice

This is the screen Reza asked for. Full screen, Lulu, three big buttons and
nothing else:

| | Arabic | English | Does |
|---|---|---|---|
| ▶️ | هَيَّا نُكْمِل | Keep going | next stop |
| 🔁 | مَرَّة أُخْرَى | Do it again | same stop, from the start |
| 🌙 | كَفَى لِلْيَوْم | Finish for today | save, show stars, home |

Rules that follow from `DESIGN.md`:

- Every button speaks when tapped (rule 1). The three lines are pre-rendered
  clips like everything else.
- *Do it again* is never a punishment. It is the same button whether the
  child got everything or nothing. There is no "wrong" state to return from
  (rule 5).
- *Finish for today* never loses anything. The current stop is marked done
  if its end was reached, otherwise it is simply where tomorrow starts.
- No fourth button, no small text, no "are you sure". Three targets, each
  at least a quarter of the screen tall.

### Across days: stations on a road

The path is a list of **stations** (مَحَطَّات). A station is one small idea —
*I want*, *where is*, *who said* — carried by two to four **anchor
sentences**, plus the stories, books and videos that use those sentences,
plus a slice of the Qur'an track. A station takes three to five walks.

A station's steps are done **in order, one per day**, so a child meets the
sentence in a lesson on Monday, hears it inside a story on Tuesday, sees it
in a picture book on Wednesday, watches it in a video on Thursday, and swaps
words in it on Friday. Same sentence, five coats. That is rule 4, made into
a timetable.

When a station's last step is done the child sees the road: stepping stones,
the ones behind lit up, the next one glowing. Tap it and the next station
begins. The road is the only map on the site and it is a picture, not a list.

Stations follow the ladder in `DESIGN.md` §3. Station levels never go
down. Level 1 stations cannot contain اَلْ; sukoon arrives with Level 2;
shadda with Level 3; sun-letter اَلْ with Level 4; Level 5 is ayat and duas.
`scripts/test-path.js` enforces this on the actual data.

---

## 2. Spaced repetition on sentences

The engine already exists in `vocab-ui.js`: five boxes, intervals 1 · 2 · 4 ·
7 · 14 days, ⭐ promotes, 🔁 drops to box 1, state per child in
`localStorage`. The path uses the same code on a different list.

**What is a card.** An anchor sentence. Not a word. Words are already covered
by the vocab door; the path's cards are whole sentences with their meaning
and their *why* line, because a sentence is what a child can actually say
back at dinner.

**What is the signal.** A three-year-old cannot be tested (rule 5). The
signal is the child, or the grown-up beside them, tapping ⭐ *I said it* or
🔁 *again*. The vocab door already does this and it is honest enough:
a sentence that keeps getting 🔁 stays in box 1 and keeps coming back, which
is the whole point.

**Which sentences.** Anchors are chosen by frequency, not taste — the same
rule as the sentence door. From the grown-up site's measured corpus
(`data/frequency.json`, Qur'an-weighted), the child-usable top of the list:

| word | count | word | count | word | count |
|---|---|---|---|---|---|
| أَنَا | 80 | هَذَا | 53 | هَلْ | 47 |
| أَيْنَ | 43 | مَعَ | 36 | قَالَ | 34 |
| مَاذَا | 30 | أُرِيدُ | 25 | أُمِّي | 24 |
| كَيْفَ | 22 | عِنْدِي | 21 | أُحِبُّ | 18 |
| هَذِهِ | 18 | شُكْرًا | 18 | لَذِيذ | 17 |

Every one of these already heads a sentence in `sentences.js`. Those 33
lessons are the first anchor set; nothing new needs writing or recording to
start. The Qur'an track uses the surah screen's own counted check (two
correct on separate visits = understood) rather than Leitner, because that
rule was chosen deliberately and it works.

**How review is built.** At the start of a walk: take every anchor whose
`nextReview` has passed, oldest first, cap at four. If fewer than two are
due, top up with the newest owned sentence so the review stop is never
empty after day one. New anchors enter box 1 the day their lesson is done.

**Sync.** Card state rides in the existing `/kids` payload as a `path`
field per child. Stars merge by MAX (unchanged). Card state merges **per
card by latest `lastReview`** — not MAX, because a box can legitimately go
down. That is one small change in the worker's `/kids` merge; note it in
`arabiclanguage/worker/src/index.js` when built.

---

## 3. The data: `data/path.json`

One file, hand-written, checked by `scripts/test-path.js`. Everything in it
is a **reference** to content that already exists — a lesson, a story, a
book, an ayah, a video — so there is nothing to keep in sync. A seed with
eight stations built entirely from current content is checked in.

```jsonc
{
  "version": 1,
  "stations": [
    {
      "id": "s01",
      "level": 1,
      "title": "أَنَا",
      "titleEn": "Me",
      "idea": "I can say who I am and what I want.",
      "anchors": ["lesson:me/0", "lesson:me/1", "lesson:this/0", "lesson:this/1"],
      "quran": ["1:1", "1:2"],
      "steps": [
        { "type": "sentences", "ref": "me" },
        { "type": "story",     "ref": "ts-ana" },
        { "type": "book",      "ref": "lulu-l1" },
        { "type": "video",     "ref": "uhP3pEyKPec" },
        { "type": "play",      "ref": "lesson:me/1" }
      ]
    }
  ]
}
```

| field | meaning |
|---|---|
| `anchors` | the sentences this station puts into the SRS. `lesson:<set>/<i>` points at `SENTENCE_SETS`; `line:<story>/<i>` at a line of a text story. The Arabic is read from there at runtime — never copied. |
| `quran` | ayah refs from `data/surahs.json`, in order. One per walk. When a station has fewer ayat than walks, the Qur'an stop reviews an earlier ayah instead. |
| `steps` | done in order, one per walk. Types: `sentences` (a whole set, `set.id`), `lesson` (one lesson), `story` (text story id), `book` (picture book id), `video` (YouTube id from `videos.js`), `ayah` (explicit ayah), `qaida` (stage id), `play` (frame drill on an anchor). |
| `level` | the band. Non-decreasing across stations. Every anchor's own level must be ≤ the station's. |

`test-path.js` fails on: an unknown ref of any type; a station level lower
than the one before; a station with no `quran` ref or no anchor; an anchor
above its station's band; a step ref used twice across the path; a `video`
ref that is not in `videos.js`.

---

## 4. Per-child state

`localStorage['hikayat-path-<kidId>']`:

```jsonc
{
  "station": "s02",          // current station id
  "step": 1,                 // index into that station's steps
  "quranAt": 3,              // index into that station's quran list
  "cards": {                 // Leitner state, same shape as vocab SRS
    "lesson:me/1": { "box": 2, "reviews": 3, "correct": 2, "lastReview": 0, "nextReview": 0 }
  },
  "walks": [{ "day": "2026-09-06", "stops": 5, "stars": 4 }],   // last 30 only
  "today": { "day": "2026-09-06", "plan": ["review", "step", "quran", "play"], "at": 2 }
}
```

`today` is rebuilt when the date changes; *Finish for today* keeps it, so
reopening the same day resumes at the same stop. Nothing about the child
leaves the device except this object and the star counts (see `sync.js`).

---

## 5. Build notes — what to build, in order

Each phase ships on its own and leaves the site working. Do not start phase
2 until phase 1 has been used by a real child for a few days.

### Phase 1 — the engine and the choice screen (one session)

- `path.js` (new): loads `data/path.json`, owns the per-child state, builds
  today's plan, exposes `startWalk()`, `pathNext()`, `pathAgain()`,
  `pathFinish()`, and `pathActive()`.
- `path-ui.js` (new): the Hello, Choice, Review, Road and Bye screens. All
  Arabic on them is spoken from pre-rendered clips — add the strings to
  `data/audio-texts.json` via the normal `gen-audio.py` run. The three
  choice lines are: هَيَّا نُكْمِل · مَرَّة أُخْرَى · كَفَى لِلْيَوْم.
- **Hook the ends.** Every activity already has a "done" moment where it
  calls `addStar`. When `pathActive()` is true, that moment renders the
  Choice screen instead of the module's own end screen:
  - `sentence-ui.js` `finishSet()`
  - `text-story-ui.js` at `addStar('ts:' + …)`
  - `app.js` the reader's `end` page
  - `surah-ui.js` after an ayah's check, `addStar(UKEY(a))`
  - `qaida-ui.js` at `addStar('qaida:' + …)`
  - `videos.js` when the player is closed
  - `vocab-ui.js` session end
  Do this with one call, `pathStopDone(key)`, that returns `false` when the
  path is not active so every module keeps its current behaviour otherwise.
- **Opening a step.** `openStep(step)` maps types to the openers that exist:
  `openSentences()` + `renderLesson()`, `openTextStory(id)`,
  `openReader(book)`, `openVideo(id)`, the surah screen's ayah view,
  `openQaida()`. None of these need changing; the path calls them.
- Three edits per new module (trap 10): the file, `index.html` **before
  `kids.js`** (trap 17), `sw.js`. `test-books.js` will tell you if you forget.
- New route `#walk`. Home's big button sets it. Refresh mid-walk lands on
  the Choice screen for the current stop, never mid-activity.
- `scripts/test-path.js` (already written) must pass.

### Phase 2 — home becomes the front of the path

- `renderHome()` in `kids.js`: Lulu, the big **هَيَّا نَمْشِي** button with
  today's stop icons, then the six doors smaller under المَكْتَبَة. Door
  handlers unchanged.
- The Road screen: a stepping-stone picture of the stations. Tap the glowing
  stone to begin the next station. Behind stones are lit; ahead are grey.
  It is reachable from home only after the first station is done.
- `DESIGN.md` §2: record that the doors are now the library.

### Phase 3 — the sentence review stop

- Reuse the vocab flashcard markup (`vocab-ui.js`) with a sentence on the
  front (52px Arabic, 🔊), the *why* line and English on the back, and the
  two buttons ⭐ / 🔁. Cap four per walk.
- Card state in the path object, not the vocab SRS object; the two lists
  must not share keys.
- The parent's grown-ups screen gets **Today's sentences**: the day's two to
  four anchors, Arabic and English, so they can be used at the table. That
  is where spaced repetition really happens, and it costs nothing.

### Phase 4 — sync the path

- `sync.js`: include `path` per child in the `/kids` body; take it back from
  the merged response.
- Worker `/kids`: merge `cards` per key by latest `lastReview`; take the
  larger `station`/`step` pair; union `walks`. Stars stay MAX.
- Then verify on two devices — the oldest open item on the site.

### Phase 5 — content for the thin stations

Stations 6 to 8 lean on text stories because the picture shelf is thin at
Levels 3 to 5, and only one video exists. The briefs are written:

- `briefs/STORYBOOKS.md` — six picture books, one per station gap, each
  built around that station's anchor sentences. For Antigravity.
- `briefs/VIDEOS.md` — six videos in the Kids Arabic TV format, each on a
  station's anchors. For the video AI, then `scripts/upload-youtube.py`.

When one lands: add it to the station's `steps`, run the suite, run
`sync-sw.js`.

---

## 6. What not to do

- Do not add a seventh door. The path is the front, not a door.
- Do not put the child's review on a timer, a streak, or a score. Stars go
  up; nothing else is shown to a child.
- Do not test. ⭐ *I said it* is a report, not a mark.
- Do not skip the Qur'an stop on a walk to make it shorter. Shorten the New
  stop instead. "A mix of Qur'anic and everyday" means every day.
- Do not copy sentence text into `path.json`. Reference it. Copies drift.
- Do not build phase 2 before a child has walked phase 1 for a few days and
  Reza has said whether the walk length is right.
