# Hikayat حِكَايَات — the design contract

Arabic for little readers. Two children, roughly 3–6. Live at
**rkarim25.github.io/arabickids**.

Read this before changing anything. It is short on purpose.

---

## 1. The six rules

Reza set these, 2026-08-31: *"ideally i want it to be more auditory and visual
and less to no writing"* and *"it is meant to replicate how kids learn"*.

Children do not learn a language the way their father learns one. They hear it
for a long time before they say it, they get meaning from the picture and the
situation rather than from a translation, and they read whole familiar words
long before they can write a single letter. Everything here follows from that.

1. **Ear first, always.** Every screen makes a sound. Nothing in the child's
   path requires reading English — or reading anything at all. The audio is
   **pre-rendered files**, never the browser's live speech: `speechSynthesis`
   truncates words and changes between devices ("sometimes it tapers off"),
   which on an ear-first site is a broken feature rather than a rough edge.
   `scripts/gen-audio.py` renders every string the site can say. A letter's big
   glyph plays **the sound it makes**, not its name — that is what a pre-reader
   needs.
2. **The picture carries the meaning, not a translation.** English exists on
   the page for the grown-up sitting next to them, set small and out of the
   way. A child who cannot read still gets everything.
3. **No writing. None.** Not tracing, not letter formation, not spelling.
   Recognition and sound only. (This matches Reza's own standing rule on the
   grown-up site: orthography is a tax on comprehension and speech.)
   **And no transliteration either** — Reza asked, 2026-08-31, whether it
   "creates dependency". It does. At three to six a child is forming the
   letter–sound map, and Latin letters compete with Arabic ones at exactly the
   wrong moment; the eye goes to the script it knows and the Arabic never gets
   decoded. It is also redundant here, because the sound comes from the ear.
   This is the OPPOSITE of the grown-up site, where an English-literate adult
   explicitly wants transliteration in vocab tables. Different learner,
   opposite rule.
4. **Repetition with variation.** The same small set of words comes back across
   books, in new pictures. That is what makes a word stick at this age — not a
   longer word list.
5. **Play, never test.** Nothing is marked wrong in a way that stops the child.
   A wrong tap replays the sound and lets them try again, forever. There is no
   score to lose, only stars to collect.
6. **One tap to anywhere.** A four-year-old navigates by picture and colour.
   No menus of words, no small targets, no typing, ever.

## 2. What the child sees

Four ways in, and no more. The eleven-tab sprawl on the grown-up site happened
one reasonable addition at a time; this one starts with a hard cap.

| | | |
|---|---|---|
| 🔊 **الأَصْوَات** Sounds | hear a sound, tap the picture that has it | the way in to reading |
| 📖 **الكُتُب** Books | two shelves on one ladder: **with pictures**, and **without** | the heart of it |
| 💬 **جُمَل** Sentences | one sentence, five steps, **no pictures** | where it becomes language |
| 📿 **سُوَر** Surahs | Al-Fatiha + the ten shortest, **real recitation** | the reason for all of it |
| 🖨 **اِطْبَعْ** Print | cards and mini-books to cut out | off the screen entirely |

Five, not three. The cap has moved twice, both times on purpose and both times
recorded here rather than quietly: Reza asked for picture-free
sentence work on 2026-08-31 — *"the same concept as the main website, but
perhaps more child friendly and more explanation"* — and burying it inside
Books would have hidden the half of the site where the language actually
assembles. Then سُوَر, because understanding the Qur'an is the reason this
family is learning Arabic at all, and burying it would have been dishonest
about what the site is for. **Five is the ceiling. The next addition replaces
one of these.**

### The one place that breaks the site's own rules — and should
سُوَر is not funny, has no cartoon, and its audio is a real reciter rather than
the neural voice used everywhere else. Reza: *"while it cannot me made funny"* —
correct. Synthesised Qur'an would teach wrong madd and wrong waqf, so the ayah
and word clips are Mishary Rashid Alafasy, stored locally. The text is COPIED
from the grown-up site's checked `verses.json` by `scripts/gen-surahs.js` and
never retyped; `scripts/test-surahs.js` compares it character by character and
also checks that each ayah plays *its own* recitation, because the failure that
matters there is silent.

**The feedback loop is counted, not scored.** An ayah is "understood" after two
correct answers on separate visits — once is a guess between three. The count
only rises, so a bad morning cannot take an ayah away.

### Two shelves, one ladder
Reza, 2026-08-31: *"expand with stories which are non picture as well in each of
the reading levels."* Inside Books there are now two shelves sharing the same
colour bands: illustrated picture books, and **قِصَص بِلَا صُوَر** — stories with no
pictures at all, one at every level.

That is the step where reading actually begins. In a picture book the
illustration carries the meaning and a child can succeed without decoding a
word; take it away and the words have to do the work. So these are not the
picture books with the art stripped off — nothing in them leans on a scene. What
replaces the picture is the ear: every line plays, every word is its own tap,
the meaning is read aloud, and ▶️ reads the whole story through, highlighting as
it goes.

They live inside Books rather than behind a sixth door, because five is the
ceiling (above) and a sixth door is where the sprawl starts.

**Pictures are for words, not for sentences.** *"cant put picture in every
stence dont think"* — correct, and it is now a rule. A picture can show a moon;
it cannot show "Arabic has no word for is". Word cards get a picture. Sentences
get the ear: the Arabic spoken, the meaning spoken, and the explanation spoken.

## 3. The ladder

Colour bands, mirroring how a Qaida progresses — but graded by **what the ear
and eye must do**, never by writing.

| | Band | The child can… |
|---|---|---|
| ٠ | **Sounds** أَصْوَات | hear a letter's sound and pick the picture that starts with it |
| ١ | **Pink** وَرْدِيّ | read 2–3 word sentences: harakat + long vowels, اَلْ قمرية only |
| ٢ | **Red** أَحْمَر | 3–4 words: sukoon arrives; فِي، مِنْ، وَ |
| ٣ | **Yellow** أَصْفَر | 4–5 words: shadda, tanween, characters speak (قَالَ) |
| ٤ | **Green** أَخْضَر | 6+ words: اَلْ شمسية, hamzat wasl |
| ٥ | **Blue** أَزْرَق | real short ayahs and duas — the bridge to the Mushaf |

**A book must respect its band.** No shadda and no sun-letter اَلْ in a Level 1
book, or the band means nothing. `scripts/test-books.js` enforces this.

## 4. The words are Qur'anic wherever they can be

Same purpose as the parent site: the vocabulary a child meets first should be
vocabulary they will meet again in the Qur'an. Every Level 0 keyword is a word
that occurs in the Qur'an and can be drawn for a three-year-old — فِيل، قَمَر،
نَجْم، هُدْهُد، ضِفْدَع. Where a word carries a reference, the card shows it —
for the parent, quietly.

Nothing is invented to fill a gap. If there is no good Qur'anic word for a
letter that a small child would recognise, an everyday word is used and marked
as such, rather than reaching for something obscure.

## 5. Two children, two sets of stars — and they follow the family

Profiles are a face and a colour, chosen by tapping — never a name typed in.
Switching child is one tap from the home screen.

**Sync (2026-08-31).** A grown-up signs in once per device, behind the dull
"⚙ For grown-ups" link on the picker, using the same email and sync code as the
grown-up site. The children never sign in and never type. Only a face id and a
star count leave the device — no name, no photo, no recording.

**Stars merge by MAX, never by last-write.** This falls straight out of rule 5.
If the tablet was used in the car and the phone at home, last-write-wins would
throw one of those sessions away and a child would watch stars vanish. Taking
the larger of two counts cannot lose anything, and since stars only ever go up
it is always right. The merge is done on the SERVER too (`worker /kids`), so two
devices syncing at once still cannot clobber each other.

## 6. Print means cut-out-and-play

Explicitly **not** worksheets — rule 3. What prints is what you can hold:

- **Picture-word cards** — cut up for snap, pairs, or "find the قَمَر".
- **A fold-up mini book** — one A4 sheet, folded into an eight-page copy of a
  story they already know, to keep in a bag.
- **A sound poster** — the letters with their pictures, for a wall.

Every printable is black-on-white friendly, has cut lines, and fits A4 without
a browser header eating it.

## 7. Before you deploy

```
node scripts/test-books.js      # band rules, page shapes, pictures that resolve
node scripts/test-letters.js    # 28 letters, forms correct, keywords real, sane geometry
node scripts/test-sentences.js  # bands, one-word swaps, and a clip for EVERY line
node scripts/test-surahs.js     # Qur'an text vs source, right recitation per ayah
node scripts/test-stories-text.js  # the no-picture stories: bands, and a clip for every line
python scripts/gen-audio.py     # after any new Arabic or English text
node scripts/sync-sw.js         # after gen-audio, so the offline cache matches
```

All five suites must pass. Then check it in a real browser at a phone width — that is
where it is actually used.
