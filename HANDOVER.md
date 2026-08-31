# HANDOVER — Hikayat (the kids' site)

**Read this first, then `DESIGN.md`.** This file says where everything is and
what will bite you. DESIGN.md says *why* the site is the way it is, and its six
rules are not negotiable without asking Reza.

Live: **https://rkarim25.github.io/arabickids** · repo `rkarim25/arabickids`
Working copy: `C:\Users\Reza Karim\OneDrive\Arabic\Self learn\kids-books\`
(the folder IS the git repo; `origin` is set).

For **Reza** (37, time-poor) and his **two children, roughly 3–6**. Sister site
to the grown-up `rkarim25/arabiclanguage`, and deliberately nothing like it.

---

## 1. Before you touch anything

```bash
node scripts/test-books.js         # bands, pictures, offline cache, orphan modules
node scripts/test-letters.js       # 28 letters, forms, keywords, arc geometry
node scripts/test-sentences.js     # bands, one-word swaps, a clip for every line
node scripts/test-surahs.js        # Qur'an text vs source, right recitation per ayah
node scripts/test-stories-text.js  # no-picture stories
node scripts/test-qaida.js         # every mark, and one clip per cell
```

All six must pass. Then **always**:

```bash
node scripts/sync-sw.js
```

**If you skip that, your deploy is invisible.** It rewrites the service-worker
cache name AND stamps `?v=<hash>` onto every script/style URL in `index.html`.
GitHub Pages serves assets with `max-age=600`, so without the stamp the browser
runs the previous build for ten minutes and your fix looks broken. This wasted
two rounds of Reza's testing; do not let it happen again.

---

## 2. The shape of the site

Five doors, and five is the ceiling (DESIGN.md §2). A sixth replaces one.

| Door | What it is | Files |
|---|---|---|
| 🔊 **الأَصْوَات** | 28 letters, listen-and-find, harakat — **and القَاعِدَة**, the 9-step reading ladder | `letters.js`, `kids.js`, `qaida-ui.js`, `data/qaida.json` |
| 📖 **الكُتُب** | two shelves: **with pictures** and **بِلَا صُوَر** | `app.js`, `book-*.js`, `books-more.js`, `stories-text.js`, `text-story-ui.js` |
| 💬 **جُمَل** | sentence lessons, picture-free, frames + jokes | `sentences.js`, `sentence-ui.js` |
| 📿 **سُوَر** | Al-Fatiha + 10 shortest, **real reciter** | `surah-ui.js`, `surah-notes.js`, `surah-words.js`, `data/surahs.json` |
| 🖨 **اِطْبَعْ** | cut-out cards, mini books, poster | `print.js`, `print.css` |

Shared: `audio.js` (all playback), `sync.js` (Google sign-in + star sync),
`kit2.js` (extra figures), `book-icons.js` (picture corrections).

---

## 3. Content inventory

- **Qaida**: 9 stages, 592 cells, 469 clips.
- **Picture books**: 7, one at every band L1–L5.
- **No-picture stories**: 11 — 5 standalone + the 6-episode series
  **«لُولُو وَالْغُرَاب»** (Lulu vs the Crow), L2→L4.
- **Sentences**: 11 sets, 27 lessons, 10 frames, 10 jokes/riddles.
- **Surahs**: 11, 51 ayat, all with Alafasy recitation; 20 ayat have bespoke
  child notes, all 51 have child meanings and 175 child word-glosses.
- **Audio**: ~1,470 TTS clips + 267 real recitation files.

---

## 4. The traps, all of which have already bitten

1. **`sync-sw.js` or your deploy is invisible.** See §1.
2. **`norm()` strips tashkeel.** So بَ / بِ / بُ share one key. Qaida cells are
   keyed `q:<exact text>`. Never route Qaida audio through `normAr()`.
3. **Uthmani text orders marks shadda-then-fatha**; typing by hand gives the
   reverse. Identical to look at, not equal. `surah-words.js` looks up via
   **NFC**. 58 of 175 glosses silently missed before that.
4. **`❮` and `❯` are Bidi_Mirrored** — inside `dir="rtl"` the browser flips
   them, so forward pointed backwards. Use `←` `→` with `direction:ltr`.
5. **`ال` mid-word is not the article** — قَالَتْ, خَالَة. Match word-initially.
6. **Level 1 cannot contain اَلْ at all** — the article carries a sukoon on its
   lam, and L1 forbids sukoon.
7. **A speech engine cannot say a bare consonant.** Letter "sounds" are one
   clean syllable (فَ). Repeating it produced a stutter.
8. **`readdirSync` returns directories** — `audio/quran` once went into the
   cache list as a file and would have aborted the whole SW install.
9. **Browser-pane screenshots time out.** Use headless Chrome with a **Windows**
   path for `--screenshot`, and render ≥520px wide or RTL clips.
10. **Adding a module is three edits**: the file, `index.html`, and `sw.js`.
    `test-books.js` now fails if `index.html` does not load a shipped module —
    `qaida-ui.js` was written, styled, cached and never loaded.

---

## 5. Sign-in and sync

Google only, no OTP. `GOOGLE_CLIENT_ID` is compiled into `sync.js`
(project **Hikayat**, kept in **Testing** with Reza + Saba as test users).
**The client ID is public and safe to commit** — the worker's `ALLOWED_EMAILS`
is what controls access.

Emailed OTP is **impossible**: Cloudflare Email Sending needs an onboarded
domain and the account has zero zones.

Sync rides the grown-up site's worker `arabic-sync` (`/kids` GET+POST, added
2026-08-31, same origin so CORS already allowed). **Stars merge by MAX on both
client and server** — a child must never lose a star, and last-write-wins would
delete a session done offline elsewhere.

⚠ **Never verified end-to-end.** A real signed-in round trip needs Reza to sign
in on two devices. Ask him.

---

## 6. Regenerating content

```bash
node scripts/gen-qaida.js                       # data/qaida.json
node scripts/gen-surahs.js <path-to-arabiclanguage>   # data/surahs.json + fetches recitation
python scripts/gen-audio.py                     # every clip (incremental)
node scripts/sync-sw.js                         # ALWAYS LAST
```

Qur'an text is **copied** from the grown-up site's checked `verses.json` and
never retyped; `test-surahs.js` compares it character by character.

Changing the voice: edit `VOICE` / `EN_VOICE` in `gen-audio.py`, **delete the
affected clips** (filenames hash the text, not the voice), re-run.

---

## 7. What is still open

1. **Sync unverified** on two devices (§5).
2. **Ayah notes cover 20 of 51.** The rest have word-by-word, recitation and the
   meaning check, but no bespoke note.
3. **No real recorded letter audio.** No complete, freely-licensed 28-letter set
   exists (Commons has one 31s clip; Lingua Libre has alif but not baa/taa/jeem;
   published Qaida audio is copyrighted). Options: Reza records his own, or he
   points at a set he holds rights to.
4. **Adapting existing children's books.** Reza asked about Bunny vs Monkey and
   Peppa Pig — **both refused, and buying a copy does not change it**: a
   translation is a derivative work and that right stays with the publisher.
   Legitimate routes offered and not yet chosen: **African Storybook**
   (africanstorybook.org), **Global Digital Library** (digitallibrary.io),
   **StoryWeaver** — all CC-licensed, illustrated, published *to be* translated
   — plus public domain **كليلة ودمنة** and **جحا**.
5. **Level 3 and 5 picture books** are one each; the text shelf is thin at L1/L5.
