# Hikayat — AI & Developer Master Reference Manual

> **Purpose:** This document is the comprehensive, self-contained master reference for any AI agent (or human engineer) working on **Hikayat** (the children's Arabic learning platform). Read this document to understand the pedagogical philosophy, software architecture, content ladders, audio pipelines, testing suites, and development traps.

---

## 1. Executive Summary & Persona

* **Live Site:** `https://rkarim25.github.io/arabickids`
* **Repository:** `rkarim25/arabickids`
* **Working Directory:** `C:\Users\Reza Karim\OneDrive\Arabic\Self learn\kids-books\`
* **Target Users:** **Reza** (father, developer, time-poor) and his **two young children (approx. ages 3–6)**.
* **Sister Site:** `rkarim25/arabiclanguage` (the grown-up Arabic grammar site — keep the two completely separated in tone and complexity).

---

## 2. The 6 Immutable Design Principles (`DESIGN.md`)

These six rules are non-negotiable. Every feature, screen, and story must strictly adhere to them:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. EAR FIRST, ALWAYS       │ Every screen makes sound. Every word is       │
│                            │ tappable. Pre-generated neural audio only.    │
├────────────────────────────┼───────────────────────────────────────────────┤
│ 2. PICTURE CARRIES MEANING │ A 3-year-old who cannot read Arabic or        │
│                            │ English must understand the sentence from the │
│                            │ illustration alone.                           │
├────────────────────────────┼───────────────────────────────────────────────┤
│ 3. NO WRITING, NO TYPING   │ Never ask a child to write, spell, or type.   │
├────────────────────────────┼───────────────────────────────────────────────┤
│ 4. NO TRANSLITERATION      │ No romanized phonetic Arabic ("kitab",        │
│                            │ "shams"). Pure Arabic script with harakat.    │
├────────────────────────────┼───────────────────────────────────────────────┤
│ 5. PLAY, NEVER TEST        │ No error buzzers, red crosses, or grading.    │
│                            │ Gentle hints, animations, and sound feedback. │
├────────────────────────────┼───────────────────────────────────────────────┤
│ 6. FIVE DOORS CEILING      │ The home screen has exactly 5 doors. Never    │
│                            │ add a 6th door (a new feature replaces one).  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. The 5-Level Reading Ladder (Content Bands)

Content is strictly banded into 5 distinct pedagogical levels. The test suite automatically verifies these constraints:

| Level | Color | Name | Phonetic & Grammatical Rules | Sentence Limit | Examples |
|---|---|---|---|---|---|
| **Level 1** | 🌸 Pink | Single Vowels | Only short vowels (fatha, damma, kasra) & long vowels (alif, waw, yaa). **NO SUKOON. NO SHADDA. NO `اَلْ`**. | Max 5 words | `«لُولُو صَغِيرَة»`, `«مَاذَا تُرِيدُ؟»` |
| **Level 2** | 🍊 Orange | Sukoon | Introduces **Sukoon** (سُكُون) and joining prepositions (`فِي`, `وَ`, `مِنْ`). No shadda, no sun-letter `ال`. | Max 5 words | `«أَيْنَ الْقَمَر؟»`, `«مَنْ فِي الْبَيْت؟»` |
| **Level 3** | 🍋 Yellow | Shadda & Speech | Introduces **Shadda** (شَدَّة) and direct character dialogue (`قَالَ` / `قَالَتْ`). No sun-letter `ال`. | Max 6 words | `«أَيْنَ حِذَائِي؟»`, `«نَوَادِر جُحَا»` (Ep 1-2) |
| **Level 4** | 🍏 Green | Sun Letters | Introduces **Sun Letters with Assimilated Lam** (`اَلشَّمْس`, `اَلرَّجُل`). Richer sentences and vocabulary. | Max 12 words | `«أَيْنَ لُولُو؟»`, `«كَلِيلَة وَدِمْنَة»` (Ep 1-7) |
| **Level 5** | 🔷 Blue | Quran & Duas | Authentic Quranic verses and authentic morning/evening duas (*Hisn al-Muslim*). Real reciters. | Max 12 words | `«يَوْمِي»`, `«دُعَاء»`, Ayat |

---

## 4. The 5 Doors Architecture

```
                               ┌───────────────┐
                               │   HIKAYAT     │
                               │ (index.html)  │
                               └───────┬───────┘
         ┌──────────────┬──────────────┼──────────────┬──────────────┐
         ▼              ▼              ▼              ▼              ▼
   🔊 الأَصْوَات      📖 الكُتُب       💬 جُمَل       📿 سُوَر       🖨 اِطْبَعْ
  (Sounds & Qaida)   (Storybooks)   (Sentences)     (Surahs)     (Printables)
```

### 1. 🔊 **الأَصْوَات** (*The Sounds & Qaida*)
* **Files:** `letters.js`, `kids.js`, `qaida-ui.js`, `data/qaida.json`
* **Features:** 28 alphabet cards with letter forms (isolated, initial, medial, final), listen-and-find interactive sound games, 3 harakat practice grid, and the **9-stage Qaida reading ladder** (Letters → Shapes → Harakat → Tanween → Mudood → Sukoon → Shadda → Sun/Moon Lam → 95 Real Quranic Words).
* **Audio:** Real reciter audio for Quranic words (`audio/quran/`), exact-match syllable keys (`q:<syllable>`) for practice cells.

### 2. 📖 **الكُتُب** (*The Books*)
* **Files:** `app.js`, `book-lulu1.js`, `book-bayt.js`, `books-more.js`, `stories-text.js`, `text-story-ui.js`
* **Features:**
  * **Shelf 1 (With Pictures - 7 Books):** Level 1 to Level 5 illustrated picture storybooks with interactive sound pages, vocabulary cards, and end-of-book listening games.
  * **Shelf 2 (Without Pictures - 23 Stories):** Pure text readers for developing reading fluency across 4 popular series:
    1. «نَوَادِر جُحَا» (*Juha's Tales* - 3 episodes, L3–L4)
    2. «لُولُو وَالْغُرَاب» (*Lulu vs the Crow* - 8 episodes, L2–L4)
    3. «كَلِيلَة وَدِمْنَة» (*Kalila wa Dimna Fables* - 7 episodes, L1–L4)
    4. Standalone stories (*The Big Cat, The Small Fish*, etc.)

### 3. 💬 **جُمَل** (*Sentences*)
* **Files:** `sentences.js`, `sentence-ui.js`
* **Features:** 11 sentence sets containing 27 picture-free sentence lessons, 10 sentence frames, and 10 jokes/riddles. Each lesson teaches a sentence pattern with one-word variations to reinforce syntax.

### 4. 📿 **سُوَر** (*Surahs*)
* **Files:** `surah-ui.js`, `surah-notes.js`, `surah-words.js`, `data/surahs.json`
* **Features:** Surah Al-Fatiha + 10 shortest Surahs (51 total ayat). Every ayah plays verse-by-verse recitation by **Mishary Rashid Alafasy**, accompanied by child-friendly explanations, word-by-word vocabulary breakdowns (175 words), and interactive comprehension check questions.

### 5. 🖨 **اِطْبَعْ** (*Printables*)
* **Files:** `print.js`, `print.css`
* **Features:** Print-and-fold mini booklets, alphabet flashcards, cut-out matching games, and classroom posters.

---

## 5. Technology Stack & Key File Map

Hikayat is intentionally built with **zero external framework bloat** (pure modern Vanilla JavaScript, CSS, and SVG) so it runs with blazing speed, operates 100% offline, and requires no complicated bundlers.

```
kids-books/
├── index.html               # Single-page shell loading all 19 JavaScript modules
├── style.css                # Primary styles, typography, responsive layout
├── sw.js                    # Offline Service Worker cache manifest (2,300+ assets)
│
├── audio.js                 # Unified audio playback engine (playKey, playRecitation)
├── app.js                   # Main application router, shared SVG illustration kit, L2 & L4 books
├── kit2.js                  # Secondary illustration primitives (Mama, Masjid, Food)
├── letters.js               # 28 Alphabet definitions, letter forms, keyword icons
├── sentences.js             # Sentence sets, sentence frames, jokes, and riddles
├── stories-text.js          # 23 no-picture text stories with word-level audio
├── surah-notes.js           # Child-friendly notes & thinking prompts for all 51 ayat
├── surah-words.js           # 175 word glosses for Quranic vocabulary
├── sync.js                  # Cloudflare Worker / Google OAuth star synchronizer
├── record.js                # In-app parent recording booth for custom voiceovers
├── videos.js                # Curated privacy-enhanced YouTube video strip (nocookie)
│
├── data/
│   ├── audio-manifest.json  # Manifest mapping text keys to MP3 filenames
│   ├── audio-texts.json     # Exact spoken text corresponding to each key hash
│   ├── qaida.json           # 9-stage Qaida curriculum database
│   └── surahs.json          # Checked Quranic text & ayah audio metadata
│
└── scripts/
    ├── gen-audio.py         # Automated Edge-TTS neural speech synthesizer
    ├── sync-sw.js           # Service Worker cache builder & URL version stamper
    ├── test-books.js        # Test Suite 1: Books, level bands, SVG rendering
    ├── test-letters.js      # Test Suite 2: 28 letters, forms, harakat grid
    ├── test-sentences.js    # Test Suite 3: Sentence lessons & variation rules
    ├── test-surahs.js       # Test Suite 4: Surah text integrity & recitation mapping
    ├── test-stories-text.js # Test Suite 5: 23 text stories & audio coverage
    ├── test-qaida.js        # Test Suite 6: Qaida marks, cells, and clips
    └── test-videos.js       # Test Suite 7: Video privacy & iframe isolation
```

---

## 6. Audio Generation Pipeline

Hikayat features **100% automated neural voice synthesis** via Microsoft Edge TTS, requiring zero manual parent voiceover recording:

* **Engine:** `scripts/gen-audio.py`
* **Arabic Voice:** `ar-SA-HamedNeural` (clean, expressive classical Arabic)
* **English Voice:** `en-GB-MaisieNeural` (warm, natural British English for translations)

### Running the Generator:
```powershell
python scripts/gen-audio.py
```

### How Key Hashing Works:
1. Every spoken phrase is assigned a unique key (e.g. `w:كِتَاب`, `s:هَذَا بَيْتٌ`, `q:بَ`).
2. The generator computes a short SHA256 hex stem for the key (`stem = h(key)`).
3. The generated file is saved to `audio/<stem>.mp3`.
4. `data/audio-texts.json` records the exact text associated with each key. If the underlying Arabic text is ever updated, `gen-audio.py` automatically detects the change and re-synthesizes the clip.

---

## 7. Step-by-Step Content Addition Workflows

### How to Add a New Text Story:
1. Open `stories-text.js`.
2. Determine the story's level band (L1 to L5) and ensure sentence length and vocabulary respect the level constraints.
3. Add the story object to `TEXT_STORIES`:
   ```javascript
   {
     id: 'story-slug',
     level: 3,
     title: 'عُنْوَانُ الْقِصَّة',
     titleEn: 'Story Title',
     blurb: 'Short 1-sentence English description.',
     lines: [
       { ar: 'السَّطْرُ الأَوَّلُ مَعَ حَرَكَاتٍ كَامِلَةٍ.', en: 'First line translation.' },
       { ar: 'السَّطْرُ الثَّانِي.', en: 'Second line translation.' }
     ]
   }
   ```
4. Run `python scripts/gen-audio.py` to synthesize the new audio clips.
5. Run `node scripts/test-stories-text.js` to verify level compliance.
6. Run `node scripts/sync-sw.js` to update the offline cache.

---

## 8. Verification & Cache Sync Protocol

Whenever any code, content, or asset is touched, execute this verification sequence:

```powershell
# 1. Run all 7 test suites
node scripts/test-books.js
node scripts/test-letters.js
node scripts/test-sentences.js
node scripts/test-surahs.js
node scripts/test-stories-text.js
node scripts/test-qaida.js
node scripts/test-videos.js

# 2. Re-sync Service Worker cache and stamp index.html versions
node scripts/sync-sw.js
```

---

## 9. The 16 Known Traps & Gotchas

1. **Skipping `sync-sw.js`:** Without running this script, GitHub Pages serves cached assets for 10 minutes (`max-age=600`), making your deploy appear broken.
2. **Routing Qaida audio through `normAr()`:** `normAr()` strips vowels. Cells like `بَ`, `بِ`, `بُ` collapse into `ب`. Use `playKey('q:' + text)`.
3. **Typing Quranic text manually:** Never type Quranic text by hand. Always copy from checked sources (`data/surahs.json`).
4. **Using `❮` and `❯` inside RTL containers:** Browsers automatically mirror these characters in RTL mode. Use `←` / `→` with `direction:ltr`.
5. **Sukoon in Level 1:** Level 1 forbids `اَلْ` because the definite article carries a sukoon.
6. **Adding new JavaScript modules requires 3 edits:**
   - Create `module.js`.
   - Add `<script src="module.js?v=...">` to `index.html`.
   - Add `module.js` to the `CORE` cache list in `sw.js`.
7. **Changing audio text without updating `audio-texts.json`:** Handled automatically by `gen-audio.py`.
8. **Typographic quotes in code:** Avoid Unicode curly apostrophes (`’`) in string constants; use ASCII quotes (`'`).
9. **Copyrighted IP adaptation:** Never translate or adapt commercial franchises (e.g. Peppa Pig, Bunny vs Monkey). Use public-domain fables (*Juha*, *Kalila wa Dimna*) or original characters (*Lulu vs Crow*).
10. **Bash heredocs with RTL Arabic:** Windows PowerShell handles RTL in heredocs inconsistently. Always use the code editing tools.
11. **Uthmani mark ordering:** Shadda precedes fatha in standard Uthmani text.
12. **Speech synthesis consonants:** Never ask a TTS engine to pronounce a bare consonant without a vowel.
13. **Subtle regex `\bال` matching:** Do not confuse mid-word `ال` (e.g. `قَالَتْ`) with the definite article `اَلْ`.
14. **Recorded parent audio priority:** Recorded clips in `window.RECORDINGS` always take precedence over generated neural clips.
15. **Offline video fallback:** The YouTube video strip embeds nothing until a tile is tapped, allowing the rest of the app to function 100% offline.
16. **Star synchronization:** Stars merge using `Math.max(local, remote)` on both client and server to guarantee a child never loses progress.
