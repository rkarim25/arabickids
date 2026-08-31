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
   path requires reading English — or reading anything at all.
2. **The picture carries the meaning, not a translation.** English exists on
   the page for the grown-up sitting next to them, set small and out of the
   way. A child who cannot read still gets everything.
3. **No writing. None.** Not tracing, not letter formation, not spelling.
   Recognition and sound only. (This matches Reza's own standing rule on the
   grown-up site: orthography is a tax on comprehension and speech.)
4. **Repetition with variation.** The same small set of words comes back across
   books, in new pictures. That is what makes a word stick at this age — not a
   longer word list.
5. **Play, never test.** Nothing is marked wrong in a way that stops the child.
   A wrong tap replays the sound and lets them try again, forever. There is no
   score to lose, only stars to collect.
6. **One tap to anywhere.** A four-year-old navigates by picture and colour.
   No menus of words, no small targets, no typing, ever.

## 2. What the child sees

Three ways in, and no more. The eleven-tab sprawl on the grown-up site happened
one reasonable addition at a time; this one starts with a hard cap.

| | | |
|---|---|---|
| 📖 **الكُتُب** Books | the story shelf, by colour band | the heart of it |
| 🔊 **الأَصْوَات** Sounds | hear a sound, tap the picture that has it | the way in to reading |
| 🖨 **اِطْبَعْ** Print | cards and mini-books to cut out | off the screen entirely |

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

## 5. Two children, two sets of stars

Profiles are a face and a colour, chosen by tapping — never a name typed in.
Progress is per child and lives in `localStorage`; nothing syncs, nothing is
uploaded, no account exists. A child's stars are their own and cannot be lost.

Switching child is one tap from the home screen.

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
node scripts/test-books.js      # band rules, page shapes, every word has a picture
node scripts/test-letters.js    # 28 letters, forms correct, keywords real
```

Both must pass. Then check it in a real browser at a phone width — that is
where it is actually used.
