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
node scripts/test-path.js          # data/path.json references only real content, obeys the ladder
```

All nine must pass. Then **always**:

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

Grown-ups screen (`sync.js` → `renderParent`): sign-in, 📊 **diagnostics per child** (`diagnostics.js`, from tested data only), 🛠 **built / next / waiting** (`build-status.js` — update it in the same commit as the work), the 🎙 booth.

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
- **No-picture stories**: 29 — 5 standalone, **6 path stories** (2026-09-06,
  `PATH_STORIES`, each `art: 'pending'` until illustrated — see
  `briefs/STORYBOOKS.md`), the 8-episode series
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
20. **A Google pop-up sign-in cannot complete in the installed app or an in-app browser.** It renders, it is tapped, and nothing happens — no error anywhere. Use the redirect flow (`startGoogleRedirect`), which needs the site registered as a redirect URI (§5). Do not spend a session "debugging the button".
21. **The browser pane's `ref` clicks land in the wrong place on this RTL page** (a bounding-box offset), so a click that "did nothing" may have missed. Verify with `elementFromPoint` or drive the handler through `javascript_tool` instead.

---

## 5. Sign-in and sync

Google only, no OTP. `GOOGLE_CLIENT_ID` is compiled into `sync.js`
(project **Hikayat**, id `hikayat-507218`, kept in **Testing** with Reza +
Saba as test users). **The client ID is public and safe to commit** — the
worker's `ALLOWED_EMAILS` is what controls access.

**Two ways in (2026-09-06), one shown at a time.** Google's own button signs
in through a pop-up, and a pop-up never completes inside the installed
home-screen app or an in-app browser — that is why Reza "couldn't open sign
in". So `sync.js` also has a **redirect** sign-in: the page goes to Google,
comes back with the ID token in the URL fragment, `consumeGoogleRedirect()`
checks state + nonce, wipes the fragment before the router runs, and posts
the token to the worker's `/login` exactly as the pop-up did. The redirect is
the default where a pop-up is unreliable (`popupUnreliable()`), the pop-up in
a plain tab; one small link swaps them.

**The redirect needs one thing Google will not let a script do:**
`https://rkarim25.github.io/arabickids/` (trailing slash) must be an
*Authorised redirect URI* on the web client in Google Cloud → APIs & Services
→ Credentials. As of 2026-09-06 it is NOT, and Google answers
`Error 400: redirect_uri_mismatch`. Probe it without a browser:

```bash
curl -sL -A Mozilla "https://accounts.google.com/o/oauth2/v2/auth?client_id=958505787875-g5nfbudjoembmlfves8c794mvb3udqdr.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Frkarim25.github.io%2Farabickids%2F&response_type=id_token&scope=openid%20email&nonce=x" | grep -o redirect_uri_mismatch
```
No output means it is registered. The origin itself IS registered (the
`gsi/status` probe returns 200), which is why the button always rendered.

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

1. **THE PATH — designed, not built (2026-09-06).** Reza asked for a
   sequence instead of a menu: after every activity *keep going / do it again
   / finish for today*, sentence-focused, spaced repetition on high-frequency
   sentences, Qur'anic and everyday braided daily. Design + build notes in
   **`PATH.md`**; seed data `data/path.json` (8 stations, all existing
   content, `scripts/test-path.js` passes); briefs for the content it needs in
   `briefs/STORYBOOKS.md` (Antigravity) and `briefs/VIDEOS.md` (video AI).
   Build phase 1 first (engine + choice screen), then let a child use it
   before touching home.
2. **Redirect URI not registered** (§5). Reza adds
   `https://rkarim25.github.io/arabickids/` in Google Cloud; until then the
   pop-up is the only working sign-in, and only in a plain browser tab.
3. **Sync unverified on two physical devices**: needs Reza signed in on a
   phone AND a tablet. Blocked on 2 for the installed app.
4. **Recorded parent letter audio**: the booth in `record.js` is still empty.
5. **Episode 2 onwards**: `briefs/VIDEOS.md` has six episodes, one per
   station; `upload-youtube.py` is ready.
6. **Picture shelf thin at L3 / L4 / L5** (one book each): `briefs/STORYBOOKS.md`
   has six books, one per station gap.

