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
node scripts/test-vocab.js         # categories, word integrity, manifest audio keys
node scripts/test-books.js         # bands, pictures, offline cache, orphan modules
node scripts/test-letters.js       # 28 letters, forms, keywords, arc geometry
node scripts/test-sentences.js     # bands, one-word swaps, a clip for every line
node scripts/test-surahs.js        # Qur'an text vs source, right recitation per ayah
node scripts/test-stories-text.js  # no-picture stories
node scripts/test-qaida.js         # every mark, and one clip per cell
node scripts/test-videos.js        # the strip embeds nothing until it is tapped
```

All eight must pass. Then **always**:

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

Six dedicated doors with clean URL hash routing (`#home`, `#shelf`, `#sounds`, `#vocab`, `#qaida`, `#sentences`, `#surahs`, `#print`). All popup-like `✕` close buttons have been replaced with dedicated back navigation headers.

| Door | What it is | Files |
|---|---|---|
| 🔊 **الأَصْوَات** | 28 letters, listen-and-find, harakat — **and القَاعِدَة**, the 9-step reading ladder | `letters.js`, `kids.js`, `qaida-ui.js`, `data/qaida.json` |
| 📖 **الكُتُب** | two shelves: **with pictures (8 books)** and **بِلَا صُوَر (23 stories)** | `app.js`, `book-*.js`, `books-more.js`, `stories-text.js`, `text-story-ui.js` |
| 🗂️ **المُفْرَدَات** | **Vocabulary & Spaced Repetition (SRS)**: 43 core words, Leitner 5-box daily queues, 3D flip cards | `vocab.js`, `vocab-ui.js` |
| 💬 **جُمَل** | sentence lessons, picture-free, frames + jokes | `sentences.js`, `sentence-ui.js` |
| 📿 **سُوَر** | Al-Fatiha + 10 shortest, **real reciter** | `surah-ui.js`, `surah-notes.js`, `surah-words.js`, `data/surahs.json` |
| 🖨 **اِطْبَعْ** | cut-out cards, mini books, poster | `print.js`, `print.css` |

Shared: `audio.js` (all playback), `audio-manifest.js` (instant offline map), `sync.js` (Google sign-in + star sync),
`kit2.js` (extra figures), `book-icons.js` (picture corrections),
`record.js` (the parent recording booth, behind the grown-ups screen),
`videos.js` (the YouTube strip at the foot of Sounds and Qaida).

---

## 3. Content inventory

- **Qaida**: 9 stages, 592 cells, 469 clips. Phonetic syllable mapping for isolated Harakat and Tanween.
- **Picture books**: 8 books, covering bands L1–L5:
  - L1: *Lulu is Small*, *What Do You Want?*
  - L2: *Where is the Moon?*, *Who is in the House?*, *The Rabbit & The Monkey*
  - L3: *Where is My Shoe?*
  - L4: *Where is Lulu?*
  - L5: *My Day (يَوْمِي)*
- **Vocabulary & SRS**: 43 core vocabulary items across 5 categories with Leitner 5-box intervals (1d, 2d, 4d, 7d, 14d) and interactive 3D flip flashcards.
- **No-picture stories**: 23 — 5 standalone, the 8-episode series
  **Lulu vs the Crow** L2 to L4, the 3-episode slapstick comedy series
  **Juha's Tales** L3 to L4, and 7 **Kalila wa Dimna** fables whose ep
  numbers follow the LADDER (ep1 = L1 … ep7 = L4).
  By level: L1 2, L2 4, L3 7, L4 9, L5 1.
- **Sentences**: 11 sets, 27 lessons, 10 frames, 10 jokes/riddles.
- **Surahs**: 11, 51 ayat, all with Alafasy recitation; **all 51** with bespoke child notes and child meanings.
- **Videos**: 8 curated videos across Letters, Harakat, and Words.
- **Audio**: 2,312 pre-rendered neural clips (`ar-SA-ZariyahNeural` for Arabic, `en-GB-MaisieNeural` for English) + 267 real recitation files. `data/audio-texts.json` and `audio-manifest.js` kept strictly synchronized.

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
    `test-books.js` now fails if `index.html` does not load a shipped module.
11. **The `?v=` hash changes every time `sync-sw.js` runs**, so a script that
    inserts a script tag by matching the literal old hash works once and fails
    the second time. Match `record\.js\?v=[a-f0-9]+` instead.
12. **A recorded clip beats a generated one, everywhere.** `playKey()` checks
    `window.RECORDINGS` first; `playKeyRaw()` is the only way past it and it
    exists solely so the booth can play what a recording replaces.
13. **Bash heredocs choke on this repo's Arabic.** Write the file with the Write
    tool or a Node script.
14. **A clip's filename hashes the KEY, not the text** (`stem = h(key)`), and
    the render is incremental — so changing WHAT a key says leaves the old
    audio in place forever. `data/audio-texts.json` stores every clip's spoken text and gen-audio
    re-renders anything whose text changed.
15. **Never route a bare SYLLABLE through `say()`.** Use `playKey('q:' + text, text)`.
16. **Do not put typographic apostrophes (’) in strings gen-audio must read.**
17. **Script Load Order in `index.html`**: UI helper modules (`vocab-ui.js`, `sentence-ui.js`, `qaida-ui.js`, etc.) MUST be loaded BEFORE `kids.js`. `kids.js` mounts the router and boot listener on `DOMContentLoaded`, so any UI function referenced during route handling must already be declared.
18. **Edge-TTS Abbreviation Expansion on Isolated Syllables**: Edge-TTS neural text normalizer expands isolated single letters like `ثَ` to abbreviations ("ya"), `رَ` to currencies ("Riyal"), or `صَ` to ("Safha"). To synthesize clean phonetics, synthesize open phonetic syllables (`ثَا`, `رَا`, `صَا`, `ثَنْ`) while mapping them to exact cell keys `q:ثَ`, `q:رَ`, `q:صَ`.
19. **Dual Manifest Synchronization**: Always write both `data/audio-manifest.json` AND `audio-manifest.js` (`window.AUDIO_MANIFEST`). `index.html` loads the JS manifest directly so audio works seamlessly in offline and `file://` environments without fetch CORS restrictions.

---

## 5. Sign-in and sync

Google only, no OTP. `GOOGLE_CLIENT_ID` is compiled into `sync.js`
(project **Hikayat**, kept in **Testing** with Reza + Saba as test users).
**The client ID is public and safe to commit** — the worker's `ALLOWED_EMAILS`
is what controls access.

Sync rides the grown-up site's worker `arabic-sync` (`/kids` GET+POST). **Stars merge by MAX on both
client and server** — a child must never lose a star.

---

## 6. Regenerating content

```bash
node scripts/gen-qaida.js                       # data/qaida.json
node scripts/gen-surahs.js <path-to-arabiclanguage>   # data/surahs.json + fetches recitation
python scripts/gen-audio.py                     # every clip (incremental)
node scripts/sync-sw.js                         # ALWAYS LAST
```

---

## 7. What is still open / Future Work

1. **Sync unverified on two physical devices**: Needs Reza signed in on a phone AND a tablet simultaneously.
2. **Recorded Parent Letters Audio**: Parent booth available in `record.js` for custom family recordings.
3. **Episode 2 & Season 1 Video Ingestion**: Integration scripts (`upload-youtube.py`) prepared for incoming Google Flow / NotebookLM video assets.
4. **Vocabulary & SRS Expansion**: Add story-specific flashcard sets as new storybooks are introduced.

