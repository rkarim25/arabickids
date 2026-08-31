# حِكَايَات · Hikayat

**Arabic for little readers.** Listen, look, play. No writing.

Live at **https://rkarim25.github.io/arabickids**

Built for two children, roughly 3–6. Sister site to the grown-up
[Arabic site](https://rkarim25.github.io/arabiclanguage), and deliberately
nothing like it: a four-year-old does not learn a language the way their father
does.

---

## Start here

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
| 🔊 **الأَصْوَات** | 28 letters, each with a Qur'anic keyword you can draw for a three-year-old. Meet-the-letters, listen-and-find, and one letter making its three haraka noises. |
| 📖 **الكُتُب** | Four picture books on a five-band ladder, with tap-a-word audio and a listening game. |
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
node scripts/test-books.js     # band rules, page shapes, broken colours, the offline cache
node scripts/test-letters.js   # 28 letters, correct forms, real keywords, sane geometry
```

Both must pass, then look at it in a real browser at phone width.

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
