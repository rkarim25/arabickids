# The Path — المَسَار

**Status: designed and seeded, engine not built.** This file is the design
and the build notes. Read `DESIGN.md` first (the six rules still hold, every
one), then this. The grown-ups screen on the site shows what is built and
what is next (`build-status.js`); keep it true.

Reza, 2026-09-06, first:

> "the site needs to have a flow when after they finish an activity there
> should be keep going, go back or finish for today option… it needs to be
> in the form of a sequence rather than the child moving back and forth. the
> process needs to be spaced repetition honing in key high vocabulary
> sentences. it needs to be a mix of quranic arabic (the shortest suras) and
> everyday language."

and then, sharpening it:

> "i want to primarily focus on sentence building rather than vocabulary. if
> my daughter can learn just a few arabic sentences that will be good enough
> and will help understand grammar naturally. the sentences need to be high
> frequency sentences or sentences which capture the core of the language.
> these sentences first need to appear in a story to help build context.
> between sentences and vocabulary and story there needs to be a good
> balance, a kid can't review a lot of words so it needs to change around.
> reading the same story again and again isn't going to be possible so when
> the story stream is there it should ask the kids if they want to repeat or
> do something else. the path shouldn't focus on one activity for more than
> 5 minutes. it needs to be attention grabbing."

That settles the design. Seven rules of the path:

1. **The sentence is the unit, and there are few of them.** Twenty core
   sentences (§2). A child who owns twelve of them has the grammar of the
   language in her mouth without ever hearing the word grammar.
2. **A sentence is met in a story first, always.** Nothing is drilled that
   the child has not already heard someone say inside a scene. Every
   station's first step is a story; the lesson on the same sentences comes
   the next day. `test-path.js` enforces the order.
3. **Rotate.** No two walks in a row have the same kind of new step. Story,
   then sentences, then play, then a few words, then a story again. Never
   more than four words in a vocab stop, never more than three sentences in
   a review.
4. **Long stories have checkpoints; the checkpoint nudges forward.** Reza:
   *"stories can be long but when reading a long story it should ask
   continue or do something else or repeat. i want the kids to keep going."*
   Every six lines, and at the end, Lulu asks — نُكْمِل؟ — with *keep going*
   as the big button and *repeat this bit* / *something else* smaller
   beside it. Stories are not shortened to fit; they are paced.
5. **Five minutes, hard.** No stop runs longer. At five minutes Lulu appears
   with the three-button choice, whatever the child is in the middle of. A
   whole walk is under ten.
6. **Every stop grabs.** A new colour, Lulu's one line spoken, a sound on
   entry, a star burst on exit. Tap counts stay small; a stop that is mostly
   listening is followed by one that is mostly tapping.
7. **Two tracks braided every day.** Everyday Arabic and Qur'anic Arabic
   (Al-Fatiha and the ten shortest surahs). A walk always has one ayah.

---

## 1. What the child sees

### The front page becomes one button

Today home is six doors. On the path it is Lulu and one big button —
**هَيَّا نَمْشِي · Let's walk** — with three or four little icons under it
showing what today holds (🔁 📖 📿 🎲). The six doors move below, smaller,
under **المَكْتَبَة · Explore**, so a parent or a child who wants a particular
book still gets there in one tap (rule 6). Nothing is removed.

### A walk (under ten minutes)

| # | Stop | Cap | What happens | Screen |
|---|---|---|---|---|
| 1 | **Hello** | 20 s | Lulu says today's sentence once. | new, tiny |
| 2 | **Again** 🔁 | 2 min | Review: the sentences due today, at most three. Hear it, say it, ⭐ *I said it* or 🔁 *again*. | new, reuses the flashcard look |
| 3 | **New** | 5 min | The next step of the station: a story, a sentence lesson, a play, a few words, a book, or a video. One per walk. | existing screens |
| 4 | **Qur'an** 📿 | 2 min | One ayah of the current surah: listen, word by word, meaning. Every walk. | existing surah screen |
| 5 | **Bye** 🌙 | 20 s | Stars won today, Lulu says مَعَ السَّلَامَة. | new, tiny |

Stop 2 is skipped on a child's very first day. A parent can tap *short walk*
to skip stop 3. The Qur'an stop is never skipped to save time.

### After every stop: the choice

Full screen, Lulu, three big buttons and nothing else. This is also what
appears when the five-minute cap lands.

| | Arabic | English | Does |
|---|---|---|---|
| ▶️ | هَيَّا نُكْمِل | Keep going | next stop |
| 🔁 | مَرَّة أُخْرَى | Do it again | same stop, from the start |
| 🌙 | كَفَى لِلْيَوْم | Finish for today | save, show stars, home |

- Every button speaks when tapped (rule 1); the three lines are clips.
- *Do it again* is never a punishment; there is no wrong state (rule 5).
- *Finish for today* loses nothing. A stop whose end was reached is done;
  otherwise it is where tomorrow starts.
- Three targets, each at least a quarter of the screen tall. No small text.

### Inside a long story: the checkpoint

Stories can be as long as they need to be. What changes is the pacing:
after every **six lines**, and again at the end, the reader pauses on a
checkpoint card with Lulu and three buttons — the first one big, the other
two half its size, because the point is momentum:

| | Arabic | English | Does |
|---|---|---|---|
| ▶️ | نُكْمِل! | Keep going | the next six lines |
| 🔁 | مَرَّة أُخْرَى | This bit again | replay the six lines just heard |
| ✨ | شَيْء آخَر | Something else | leave the story here, go to the next stop |

- A story left at *something else* remembers its line. Next time it comes
  round it offers to pick up where it stopped (the same card, with
  *keep going* meaning *from where we were*), so a long story is finished
  across two or three walks rather than abandoned.
- A story finished once is not forced again. When it reappears on the road
  it is the same checkpoint card at line one; *something else* costs
  nothing.
- The five-minute cap and the checkpoint are the same screen. Whichever
  comes first, the child sees Lulu and the big *keep going*.
- Picture books use the same card between pages, every four pages.

### Across days: stations on a road

The path is a list of **stations** (مَحَطَّات). A station is one small idea —
*I want*, *where is*, *who said* — carried by two to four **core
sentences**, the story they first appear in, the lesson that drills them, a
play that swaps a word in them, at most four words from the story, and a
slice of the Qur'an track. A station takes four to eight walks.

Steps are done in order, one per walk, so a child hears the sentence in a
story on Monday, learns it on Tuesday, swaps words in it on Wednesday, meets
its words on Thursday, hears it in a second story on Friday. Same sentence,
five coats. That is rule 4 of `DESIGN.md` made into a timetable.

When a station's last step is done the child sees the road: stepping
stones, the ones behind lit, the next one glowing. Tap it and the next
station begins. Stations never go down a level.

---

## 2. The twenty sentences

Chosen from the grown-up site's measured corpus (`data/frequency.json`,
Qur'an-weighted) and from what a three-to-six-year-old actually says at
home. Each carries one piece of grammar that the child absorbs by using the
sentence, never by being told. Each first appears in a story on the path.

**The first twelve** — own these and she can talk:

| # | Sentence | What it quietly teaches | First heard in | Drilled in |
|---|---|---|---|---|
| 1 | أَنَا هُنَا. | *I* + a word: no "am" | ts-ana | me/0 |
| 2 | هَذَا بَابَا. | *this* for a boy or a thing | ts-ana · lulu-jaia | this/0 |
| 3 | هَذِهِ لُولُو. | *this* for a girl | ts-ana · lulu-jaia | this/1 |
| 4 | أُرِيدُ مَاء. | verb + thing; the frame أُرِيدُ ___ | ts-ana · lulu-jaia | me/1 |
| 5 | مَاذَا تُرِيدُ؟ | a question word; *you* ends in -u | lulu-jaia · feel-dar | me/2 |
| 6 | لُولُو صَغِيرَة. | a girl-word takes a girl-ending | ts-ana · feel-dar | describe/1 |
| 7 | أَيْنَ لُولُو؟ | *where* | ts-yawm · ayna-mama | where/2 |
| 8 | لُولُو فِي الْبَيْت. | *in*, and the article | ayna-mama | where/0 |
| 9 | الْكِتَاب فَوْقَ الْمَائِدَة. | *on top of*; later *under* | ayna-mama | where/1 |
| 10 | مَنْ فِي الْبَيْت؟ | *who* | ts-yawm | who/0 |
| 11 | الْقَمَر جَمِيل. | thing + describing word | shams-qamar | describe/0 |
| 12 | عِنْدِي كِتَاب. | *I have* is "with me" | ayna-mama | have/0 |

**The next eight** — the language opens up:

| # | Sentence | Teaches | First heard in | Drilled in |
|---|---|---|---|---|
| 13 | مَا عِنْدِي مَاء. | *not* in front | ayna-mama | have/1 |
| 14 | هَلْ عِنْدَكَ مَاء؟ | yes/no question; *you* = -ka | ayna-mama | ask/1 |
| 15 | كَيْفَ حَالُكَ؟ | *how*; the greeting | man-qala | ask/0 |
| 16 | قَالَ بَابَا: هَيَّا. | a past verb; reported speech | man-qala | said/0 |
| 17 | قَالَتْ مَامَا: لَيْسَ أَنَا. | the *she* ending -at | man-qala | (play) |
| 18 | أُحِبُّ أُمِّي. | verb + *my* | man-qala | said/1 |
| 19 | بِسْمِ اللَّهِ. | before eating — Qur'anic and daily | yawm-maryam | (surah 1:1) |
| 20 | الْحَمْدُ لِلَّهِ. | after — Qur'anic and daily | yawm-maryam · ts-nawm | (surah 1:2) |

The Qur'an track runs beside these: Al-Fatiha one ayah a day, then Ikhlas,
Kawthar, Asr, Nasr, Falaq, Quraysh, Fil, Nas, Kafirun, Masad. Sentences 19
and 20 are where the two tracks touch.

Words are not the unit. A vocab stop is at most four words, all from the
story just heard, and it exists so the sentences have things to be about.

---

## 2b. Recall at every stop, and what the grown-up sees

Reza, 2026-09-06: *"i want the site to be highly focused on activating
recall so everything needs to be test based… i also want diagnostics on how
the kid is doing. it needs to be built around testing."*

So a stop is never just listening. Each kind of stop ends with a retrieval
the site can score, sized for a pre-reader:

| Stop | The recall (all by ear and picture, never by reading) | Scored as |
|---|---|---|
| Story checkpoint | after six lines, two questions: *who wanted milk?* (tap a face) · *what did Lulu say?* (tap one of three 🔊 buttons) | right / wrong per question |
| Sentence lesson | the **cloze**: the sentence plays with one word missing, the child taps the missing word from three pictures or three 🔊 | right / wrong |
| Review card | front = picture + English spoken; the child **says** the Arabic; then 🔊 reveals it; grown-up or child taps ⭐ *said it* / 🔁 | said / not (self-report, marked as such) |
| Play (swap a word) | *say "I want ___" with the banana* — 🔊 reveal, ⭐ / 🔁 | said / not |
| Vocab | picture → tap the word you hear (3 choices), then word → tap the picture | right / wrong |
| Ayah | the existing check: hear the ayah, tap its meaning among three | right / wrong (2 = understood) |
| Book | the existing listen-and-find game — **must start recording answers** | right / wrong |

Rules that keep this rule 5, not a school:

- The first attempt is what is scored. A wrong tap replays the sound and the
  child tries again until right; only the first tap goes into the log.
- The child sees stars and Lulu. The child never sees a number, a
  percentage, a tick-versus-cross tally, or a streak.
- Three choices, never more. Two of the three are always things she has met.

**The recall log.** Every scored answer appends `{ k, ok, t }` to
`localStorage['hikayat-recall-<kidId>']` — `k` the item key
(`lesson:me/1`, `word:qitta`, `q:1:1`, `line:ts-ana/6`), `ok` true/false,
`t` the time. Capped at the last 2,000 entries. It syncs with the path
state. `diagnostics.js` reads it.

**The grown-ups panel** (📊, built 2026-09-06, v1) shows per child, from
what has actually been tested: recall this week (right of asked), ayat
understood of 51 and the ones one tap away, words met and accuracy and the
Leitner boxes, shaky words, sentence sets, stories heard to the end, Qaida
stages, stars. It says plainly what is not measured yet. v2, when the log
exists: per-sentence accuracy for the twenty sentences, a *weak three* list,
and the last 14 days as a row of dots.

## 3. Spaced repetition on sentences

The engine already exists in `vocab-ui.js`: five boxes, intervals 1 · 2 · 4 ·
7 · 14 days, ⭐ promotes, 🔁 drops to box 1, state per child in
`localStorage`. The path uses the same code on the twenty sentences.

- **A card is a sentence** with its meaning and *why* line.
- **The signal** is ⭐ *I said it* / 🔁 *again* — the child or the grown-up
  beside her. A report, not a mark (rule 5).
- **A sentence enters the deck the day its lesson is done**, which is the
  day after it was heard in a story.
- **Review is capped at three** per walk, oldest due first. If fewer than
  two are due, top up with the newest owned sentence so the stop is never
  empty after day one.
- **Stories have their own light pool**: a finished story is offered again
  after 14 days, once, through the *again? / something else* question.
- The Qur'an track uses the surah screen's counted check (two correct on
  separate visits = understood), which was chosen deliberately and works.

**Sync.** Card state rides in the existing `/kids` payload as a `path`
field per child. Stars merge by MAX (unchanged). Cards merge **per card by
latest `lastReview`**, not MAX, because a box can legitimately go down. One
small change in the worker's `/kids` merge
(`arabiclanguage/worker/src/index.js`) when built.

---

## 4. The data: `data/path.json`

One file, hand-written, checked by `scripts/test-path.js`. Everything in it
is a **reference** to content that exists — a lesson, a story, a book, an
ayah, a video, a few word ids — so there is nothing to keep in sync.

```jsonc
{
  "version": 2,
  "stations": [
    {
      "id": "s01", "level": 1,
      "title": "أَنَا", "titleEn": "Me",
      "idea": "I can say who I am, who this is, and that I want water.",
      "anchors": ["lesson:me/0", "lesson:this/0", "lesson:this/1", "lesson:me/1"],
      "quran": ["1:1", "1:2"],
      "steps": [
        { "type": "story",     "ref": "ts-ana" },          // first: hear them in a story
        { "type": "sentences", "ref": "me" },              // then: the lesson
        { "type": "play",      "ref": "lesson:me/1" },     // swap a word
        { "type": "vocab",     "ref": "maa,aseer,qitta" }, // ≤ 4 words from the story
        { "type": "story",     "ref": "lulu-jaia" },       // a second story, same sentences
        { "type": "sentences", "ref": "this" },
        { "type": "book",      "ref": "lulu-l1" },
        { "type": "video",     "ref": "uhP3pEyKPec" }
      ]
    }
  ]
}
```

| field | meaning |
|---|---|
| `anchors` | the station's core sentences. `lesson:<set>/<i>` points at `SENTENCE_SETS`; `line:<story>/<i>` at a line of a text story. The Arabic is read from there at runtime, never copied. |
| `quran` | ayah refs from `data/surahs.json`, one per walk. When a station has fewer ayat than walks, the Qur'an stop reviews an earlier one. |
| `steps` | done in order, one per walk. Types: `story` (text story id), `book` (picture book id), `sentences` (a whole set), `lesson` (`set/i`), `play` (frame drill on an anchor), `vocab` (≤ 4 word ids from `vocab.js`, comma-separated), `video` (YouTube id in `videos.js`), `ayah`, `qaida` (stage id). |
| `level` | the band. Non-decreasing across stations. Every anchor's level ≤ the station's. |

`test-path.js` fails on: an unknown ref of any type; a level lower than the
station before; no `quran` or no anchor; an anchor above band; اَلْ in a
Level 1 anchor; a step used twice; a `vocab` step with more than four words;
**a `sentences`/`lesson` step before any `story`/`book` step in the same
station**; two steps of the same type in a row.

---

## 5. Per-child state

`localStorage['hikayat-path-<kidId>']`:

```jsonc
{
  "station": "s02", "step": 1, "quranAt": 3,
  "cards":  { "lesson:me/1": { "box": 2, "reviews": 3, "correct": 2, "lastReview": 0, "nextReview": 0 } },
  "heard":  { "ts-ana": { "times": 2, "last": 0, "at": 0 } },   // stories: finishes, and the line a checkpoint left off at
  "walks":  [{ "day": "2026-09-06", "stops": 5, "stars": 4 }],   // last 30
  "today":  { "day": "2026-09-06", "plan": ["review", "step", "quran"], "at": 1, "startedAt": 0 }
}
```

`today` is rebuilt when the date changes; *Finish for today* keeps it, so
reopening the same day resumes at the same stop. Nothing about the child
leaves the device except this object and the star counts.

---

## 6. Build notes — in order, each shipping alone

### Phase 1 — engine, choice screen, story question, five-minute cap

- `path.js` (new): loads `data/path.json`, owns per-child state, builds
  today's plan with the rotation rule, exposes `startWalk()`, `pathNext()`,
  `pathAgain()`, `pathFinish()`, `pathActive()`, and the cap timer
  (`setTimeout` 5 min on stop entry → choice screen).
- `path-ui.js` (new): Hello, Choice, Checkpoint, Review, Road, Bye. All
  Arabic spoken from clips — add the strings to the harvest by writing them
  as `ar: '…'` / `en: '…'` fields so `gen-audio.py` picks them up. Lines:
  هَيَّا نُكْمِل · مَرَّة أُخْرَى · كَفَى لِلْيَوْم · نُكْمِل! · شَيْء آخَر ·
  هَيَّا نَمْشِي · مَعَ السَّلَامَة.
- **The checkpoint inside stories.** `text-story-ui.js` renders lines as a
  list with ▶️ read-through; when the path is active, insert the checkpoint
  card after every sixth line (and `app.js` reader: every fourth page) and
  stop the read-through there until *keep going* is tapped. Record the line
  reached in `heard[id].at` on *something else*.
- **Hook the ends** with one call, `pathStopDone(key)`, that returns `false`
  when the path is not active so every module keeps its behaviour:
  `sentence-ui.js` `finishSet()` · `text-story-ui.js` at `addStar('ts:'…)` ·
  `app.js` reader `end` page · `surah-ui.js` after `addStar(UKEY(a))` ·
  `qaida-ui.js` at `addStar('qaida:'…)` · `videos.js` on close ·
  `vocab-ui.js` session end.
- `openStep(step)` maps types to existing openers: `openTextStory(id)`,
  `openReader(book)`, `openSentences()`+`renderLesson()`, the surah screen's
  ayah view, `openVocab()` with a word filter (new, small), `openVideo(id)`,
  `openQaida()`.
- Three edits per new module: file, `index.html` **before `kids.js`**,
  `sw.js`. Route `#walk`. Refresh mid-walk lands on the Choice screen.
- `build-status.js`: move "engine" from *next* to *built*.

### Phase 2 — home becomes the front of the path

`renderHome()`: Lulu, the big هَيَّا نَمْشِي button with today's icons, then
the six doors smaller under المَكْتَبَة. The Road screen. Not before a child
has walked phase 1 for a few days and Reza has said the length is right.

### Phase 3 — the review stop and the parent card

Sentence flashcards (front: 52px Arabic + 🔊; back: *why* + English), ⭐/🔁,
cap three. Card state in the path object, not the vocab SRS object. The
grown-ups screen shows **today's sentences** in Arabic and English, so they
get said at the table — that is where the repetition really happens.

### Phase 4 — sync the path

`sync.js` sends `path` per child in `/kids`; the worker merges cards by
latest `lastReview`, takes the further `station`/`step`, unions `walks`.
Then verify on two devices.

### Phase 5 — pictures and videos

The six briefed books are **written as picture-free stories** already
(`stories-text.js`, ids `lulu-jaia`, `feel-dar`, `ayna-mama`, `man-qala`,
`shams-qamar`, `yawm-maryam`, each with `art: 'pending'`). What remains is
art: `briefs/STORYBOOKS.md` has a per-line picture prompt for each. Videos:
`briefs/VIDEOS.md` has a paste-ready prompt per episode. When one lands, add
its step to the station and run the suite.

---

## 7. What not to do

- Do not add a seventh door. The path is the front, not a door.
- Do not drill a sentence the child has not heard in a story. The test will
  stop you; do not weaken the test.
- Do not put more than four words in a vocab stop or three sentences in a
  review, and do not schedule two stops of the same kind in a row.
- Do not let a stop run past five minutes. The cap is the design, not a bug.
- Do not put the child's review on a timer, a streak, or a score.
- Do not skip the Qur'an stop to make a walk shorter.
- Do not copy sentence text into `path.json`. Reference it.
- Do not touch home before phase 1 has been used by a child.
