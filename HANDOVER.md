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
node scripts/test-videos.js        # the strip embeds nothing until it is tapped
```

All seven must pass. Then **always**:

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
`kit2.js` (extra figures), `book-icons.js` (picture corrections),
`record.js` (the parent recording booth, behind the grown-ups screen),
`videos.js` (the YouTube strip at the foot of Sounds and Qaida).

---

## 3. Content inventory

- **Qaida**: 9 stages, 592 cells, 469 clips.
- **Picture books**: 7, one at every band L1–L5.
- **No-picture stories**: 13 — 5 standalone, the 6-episode series
  **Lulu vs the Crow** L2 to L4, and 2 **Kalila wa Dimna** fables at L4.
  By level: L1 1, L2 3, L3 3, L4 5, L5 1.
- **Sentences**: 11 sets, 27 lessons, 10 frames, 10 jokes/riddles.
- **Surahs**: 11, 51 ayat, all with Alafasy recitation; **all 51** now have a
  bespoke child note, plus child meanings and 175 child word-glosses.
- **Videos**: 7, across 3 topics, every id verified live 2026-08-31.
- **Audio**: 1,609 TTS clips + 267 real recitation files.

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
    `qaida-ui.js` was written, styled, cached and never loaded. It caught
    `record.js` the same way on 2026-08-31.
11. **The `?v=` hash changes every time `sync-sw.js` runs**, so a script that
    inserts a script tag by matching the literal old hash works once and fails
    the second time. Match `record\.js\?v=[a-f0-9]+` instead.
12. **A recorded clip beats a generated one, everywhere.** `playKey()` checks
    `window.RECORDINGS` first; `playKeyRaw()` is the only way past it and it
    exists solely so the booth can play what a recording replaces.
13. **Bash heredocs choke on this repo's Arabic.** Two attempts at
    `cat > file <<'EOF'` with RTL content died with "unexpected EOF". Write the
    file with the Write tool, or a node script, and stop fighting it.

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

1. **Sync unverified** on two devices (§5). The oldest open item, and it cannot
   be closed from here — it needs Reza signed in on a phone AND a tablet. Ask
   every time; do not let it quietly start looking done.
2. **No letter audio has actually been RECORDED yet.** The booth that makes it
   possible shipped 2026-08-31 (`record.js`), but it is empty until Reza spends
   three minutes in it, and until then the letters still play the neural voice.
   Ask whether he has done a pass. When he has, the clips want committing to
   `audio/rec/` — the booth's Save all writes an `index.json` beside them — so
   they reach every device instead of living in one browser.
3. **The video ids cannot be tested.** All 7 were checked against YouTube's
   oembed endpoint on 2026-08-31 and every one was live. They will rot: a
   channel deletes, an upload goes private. `videos.js` records each one's real
   title and channel so a dead tile is identifiable rather than just grey.
   Re-check by hand every few months.
4. **Ayah notes: DONE**, all 51 (2026-08-31). Listed only so nobody
   reintroduces the gap by trusting an old copy of this file.
5. **Picture books are now the thin shelf** — 7 of them, one each at L3, L4 and
   L5, against 13 text stories. The text shelf is thin at L1 (1) and L5 (1).
6. **More كليلة ودمنة.** The library question is settled (the reasoning is in
   `stories-text.js`) and two fables are in at L4. The obvious next two are
   the collared dove and the monkey and the crocodile. African Storybook,
   Global Digital Library and StoryWeaver stay the CC-licensed fallback if he
   ever wants illustrated source material; **Bunny vs Monkey and Peppa Pig stay
   refused**, and buying a copy does not change it.
