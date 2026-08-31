# حِكَايَات · Hikayat

**Arabic for little readers.** Listen, look, play. No writing.

Live at **https://rkarim25.github.io/arabickids**

Built for two children, roughly 3–6. Sister site to the grown-up
[Arabic site](https://rkarim25.github.io/arabiclanguage), and deliberately
nothing like it: a four-year-old does not learn a language the way their father
does.

---

## Start here

**[HANDOVER.md](HANDOVER.md)** — where everything is, the ten traps that have
already caused real bugs, and what is still open. Read it before touching
anything. In a fresh chat, run the **`/run-arabic-kids`** skill and it does this
for you.

**[DESIGN.md](DESIGN.md)** is the contract — six rules, the ladder, and what
"print" is allowed to mean. Read it before changing anything. The short version:

1. Ear first. Every screen makes a sound.
2. The picture carries the meaning, not a translation.
3. **No writing.** Not tracing, not letter formation. Recognition and sound only.
4. Repetition with variation.
5. Play, never test — a wrong tap replays the sound, forever.
6. One tap to anywhere, no typing, ever.

## What is here

| | |
|---|---|
| 🔊 **الأَصْوَات** | 28 letters with Qur'anic keywords, listen-and-find, harakat — **and القَاعِدَة**, the full nine-step reading ladder: letters → shapes → harakat → tanween → mudood → sukoon → shadda → the two lams → real Qur'anic words read by Alafasy. |
| 📿 **سُوَر** | Al-Fatiha and the ten shortest, 51 ayat, **real recitation** ayah and word by word, with child-written meanings and a counted comprehension check. |
| 💬 **جُمَل** | Picture-free sentence lessons: hear it, what it means, how it works, say it, change a word — plus frames that let a child slot an English word in, and ten jokes and riddles. |
| 📖 **الكُتُب** | Two shelves on one ladder: seven **picture books**, and **قِصَص بِلَا صُوَر** — no-picture stories at every level, including the six-episode series «لُولُو وَالْغُرَاب». |
| 🖨 **اِطْبَعْ** | Picture-word cards (two of each, for pairs), a fold-and-staple mini book of any story, and a wall poster of all 28 sounds. |
| 🦊 **Children** | Tap a face to be you. Stars are per-child, on the device, and can never be lost. Nothing is uploaded; there is no account. |

Works offline (service worker), installs to a home screen, and is built for a
phone held sideways by someone small.

## The files

```
index.html      the four screens
app.js          illustration kit + the storybook reader   (the original engine)
letters.js      Level 0: 28 letters, their forms, keywords and pictures
book-lulu1.js   «لُولُو صَغِيرَة»    Level 1
book-bayt.js    «مَنْ فِي الْبَيْت؟»  Level 2
kids.js         children, home, the sounds screens, Lulu the companion
print.js        the printables
style.css / kids.css / print.css
sw.js           offline cache — every file the page loads must be listed here
```

## Before you deploy

```bash
node scripts/test-books.js         # bands, pictures, offline cache, orphan modules
node scripts/test-letters.js       # 28 letters, forms, keywords, arc geometry
node scripts/test-sentences.js     # bands, one-word swaps, a clip for every line
node scripts/test-surahs.js        # Qur'an text vs source, right recitation per ayah
node scripts/test-stories-text.js  # the no-picture stories
node scripts/test-qaida.js         # every mark, and one clip per cell
node scripts/sync-sw.js            # ALWAYS — or the deploy is invisible
```

All six must pass, then look at it in a real browser at phone width.

**`sync-sw.js` is not optional.** GitHub Pages caches assets for ten minutes, so
without the `?v=` stamp it writes, your fix is live on the server and invisible
in the browser — which is indistinguishable from it not working.

These tests are not ceremony. On the day they were written they caught three
things nobody could see:

- **Both original books were mislabelled Level 1** and neither obeyed Level 1 —
  one was full of sukoon, the other had shadda and sun-letter اَلْ. The colour
  band is a promise to a parent about what their child can decode alone, and it
  was quietly false. Both were re-banded; a real Level 1 book was written to
  fill the empty bottom rung.
- **Two icons used a colour that does not exist** in the palette and shipped as
  `fill="undefined"`.
- **The crescent moon was not being drawn at all.** It was two SVG arcs whose
  return radius was smaller than half the chord, which the spec silently scales
  up until the two arcs cancel — so قَمَر, on a site built around Qur'anic
  words, was an empty night sky. `test-letters.js` now checks arc geometry.

The lesson each time: the page still looked lovely. Run the tests.
