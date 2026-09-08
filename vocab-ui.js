/* ————— Hikayat · Vocabulary & Spaced Repetition (SRS) UI ————————————————
   Interactive 3D flip flashcards and Leitner 5-box spaced repetition system.
   ========================================================================= */
'use strict';

const SRS_INTERVALS = {
  1: 0,                   // Box 1: Review today / immediate
  2: 2 * 24 * 3600 * 1000, // Box 2: 2 days
  3: 4 * 24 * 3600 * 1000, // Box 3: 4 days
  4: 7 * 24 * 3600 * 1000, // Box 4: 7 days
  5: 14 * 24 * 3600 * 1000, // Box 5: 14 days (Mastered!)
};

const BOX_INFO = {
  1: { label: 'جَدِيد', labelEn: 'New', emoji: '🌱', color: '#F09CB1' },
  2: { label: 'نَتَعَلَّم', labelEn: 'Learning', emoji: '🌿', color: '#7FB0D6' },
  3: { label: 'مَأْلُوف', labelEn: 'Familiar', emoji: '🌸', color: '#E8A33D' },
  4: { label: 'قَوِيّ', labelEn: 'Strong', emoji: '⭐', color: '#7BC08F' },
  5: { label: 'مُتْقَن', labelEn: 'Mastered', emoji: '🏆', color: '#5B8C7B' },
};

/* ————— State & Storage ————— */
function getSrsStorageKey() {
  const kid = (typeof currentKid === 'function' && currentKid()) || { id: 'default' };
  return `hikayat-srs-${kid.id}`;
}

function loadSrsState() {
  try {
    const raw = localStorage.getItem(getSrsStorageKey());
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveSrsState(state) {
  try {
    localStorage.setItem(getSrsStorageKey(), JSON.stringify(state));
    if (typeof syncSoon === 'function') syncSoon();
  } catch (e) {}
}

function getWordCardState(state, wordId) {
  return state[wordId] || {
    id: wordId,
    box: 1,
    reviews: 0,
    correct: 0,
    lastReview: 0,
    nextReview: 0,
  };
}

function isWordDue(cardState) {
  if (!cardState || !cardState.lastReview) return true; // Never reviewed
  return Date.now() >= (cardState.nextReview || 0);
}

function recordWordReview(wordId, passed) {
  const state = loadSrsState();
  const card = getWordCardState(state, wordId);

  card.reviews = (card.reviews || 0) + 1;
  card.lastReview = Date.now();

  if (passed) {
    card.correct = (card.correct || 0) + 1;
    card.box = Math.min(5, (card.box || 1) + 1);
  } else {
    // Drop back to Box 1 for immediate reinforcement
    card.box = 1;
  }

  card.nextReview = Date.now() + (SRS_INTERVALS[card.box] || 0);
  state[wordId] = card;
  saveSrsState(state);

  if (typeof logRecall === 'function') {
    logRecall('word:' + wordId, passed);
  }

  return card;
}


/* ————— Session State ————— */
let vocabSession = {
  active: false,
  queue: [],
  idx: 0,
  flipped: false,
  results: { correct: 0, repeat: 0 },
};

let activeVocabCat = 'all';

const VOCAB_FALLBACK_EMOJIS = {
  // Animals
  arnab: '🐰', qird: '🐵', cat2: '🐱', feel: '🐘', faar: '🐭',
  samak: '🐟', dajaj: '🍗', tayr: '🐦', ghurab: '🦅', hoot: '🐋',
  difda: '🐸', dhib: '🐺', asad: '🦁', sulahfah: '🐢', jardh: '🐀',
  // Home & Objects
  dar: '🏠', bab: '🚪', kitab: '📖', kitchen: '🍳', room: '🛋️',
  bed: '🛏️', chair: '🪑', box: '📦', hidhaa: '👟', masjid: '🕌',
  fursha: '🪥', walad: '👦', bint: '👧', maidah: '🪑', kisaa: '🧥',
  yad: '✋', ayn: '👁️',
  // Food & Drink
  mawz: '🍌', jazar: '🥕', khubz: '🍞', aseer: '🧃', maa: '💧',
  zaytoon: '🫒', thamar: '🍇', futur: '🥞', taam: '🍲',
  laban: '🥛', kaka: '🎂', teen: '🫐', burteqaal: '🍊', huboob: '🌾',
  // Nature & Sky
  qamar: '🌙', shams: '☀️', najm: '⭐', sahab: '☁️', layl: '🌃',
  samaa: '🌌', jabal: '⛰️', ard: '🌍', reeh: '💨',
  shajarah: '🌳', birkah: '🌊',
  // Core & Adjectives
  kabir: '🐘', saghir: '🐥', jameel: '🌺', ladheedh: '😋', nazheef: '✨',
  saree: '⚡', hadha: '👉', hadhihi: '👈', ayna: '🔍', madha: '❓',
  ureedu: '🙋', fee: '📥', fawqa: '⬆️', tahta: '⬇️', dhahab: '🪙'
};

const VOCAB_PALETTES = {
  animals: { bg: 'linear-gradient(145deg, #EAF4FB 0%, #D8EAF7 100%)', border: '#B8D9F2', ink: '#1F5A82' },
  home:    { bg: 'linear-gradient(145deg, #FFF6EA 0%, #FDE9D2 100%)', border: '#F6D5AC', ink: '#8A531B' },
  food:    { bg: 'linear-gradient(145deg, #EFF9F2 0%, #DCF2E3 100%)', border: '#BAE4C6', ink: '#206E3F' },
  nature:  { bg: 'linear-gradient(145deg, #F3F1FA 0%, #E2DCF4 100%)', border: '#C8BEE8', ink: '#554284' },
  core:    { bg: 'linear-gradient(145deg, #FFF0F4 0%, #FDE0E7 100%)', border: '#F7BFCE', ink: '#8C2E4B' },
};

const VOCAB_ART_MAP = {
  // Animals (15)
  arnab: 'art/icon-arnab.jpg',
  qird: 'art/icon-qird.jpg',
  qitta: 'art/icon-lulu.jpg',
  feel: 'art/icon-feel.jpg',
  faar: 'art/icon-faar.jpg',
  samak: 'art/samak.jpg',
  dajaj: 'art/icon-dajaj.jpg',
  tayr: 'art/icon-tayr.jpg',
  ghurab: 'art/icon-ghurab.jpg',
  hoot: 'art/icon-hoot.jpg',
  difda: 'art/icon-difda.jpg',
  dhib: 'art/icon-dhib.jpg',
  asad: 'art/icon-asad.jpg',
  sulahfah: 'art/icon-sulahfah.jpg',
  jardh: 'art/icon-jardh.jpg',

  // Home (17)
  bayt: 'art/icon-bayt.jpg',
  bab: 'art/icon-bab.jpg',
  kitab: 'art/icon-kitab.jpg',
  matbakh: 'art/icon-matbakh.jpg',
  ghurfa: 'art/icon-ghurfa.jpg',
  sarir: 'art/icon-sarir.jpg',
  kursi: 'art/icon-kursi.jpg',
  hidaa: 'art/icon-hidaa.jpg',
  sundooq: 'art/icon-sundooq.jpg',
  masjid: 'art/icon-masjid.jpg',
  fursha: 'art/icon-fursha.jpg',
  walad: 'art/icon-adam.jpg',
  bint: 'art/icon-bint.jpg',
  maidah: 'art/icon-maidah.jpg',
  kisaa: 'art/icon-kisaa.jpg',
  yad: 'art/icon-yad.jpg',
  ayn: 'art/icon-ayn.jpg',

  // Food (14)
  mawz: 'art/icon-mawz.jpg',
  jazar: 'art/icon-jazar.jpg',
  khubz: 'art/icon-khubz.jpg',
  aseer: 'art/icon-aseer.jpg',
  maa: 'art/icon-maa.jpg',
  zaytoon: 'art/icon-zaytoon.jpg',
  thamar: 'art/icon-thamar.jpg',
  futur: 'art/icon-futur.jpg',
  taam: 'art/icon-taam.jpg',
  laban: 'art/icon-laban.jpg',
  kaka: 'art/icon-kaka.jpg',
  teen: 'art/icon-teen.jpg',
  burteqaal: 'art/icon-burteqaal.jpg',
  huboob: 'art/icon-huboob.jpg',

  // Nature (11)
  qamar: 'art/icon-qamar.jpg',
  shams: 'art/icon-shams.jpg',
  najm: 'art/icon-najm.jpg',
  sahab: 'art/icon-sahab.jpg',
  layl: 'art/icon-layl.jpg',
  samaa: 'art/icon-samaa.jpg',
  jabal: 'art/icon-jabal.jpg',
  ard: 'art/icon-ard.jpg',
  reeh: 'art/icon-reeh.jpg',
  shajarah: 'art/icon-shajarah.jpg',
  birkah: 'art/icon-birkah.jpg',

  // Core & Concepts (15)
  kabir: 'art/icon-kabir.jpg',
  saghir: 'art/icon-saghira.jpg',
  jameel: 'art/icon-jameela.jpg',
  ladheedh: 'art/icon-ladheedh.jpg',
  nazheef: 'art/icon-nazheef.jpg',
  saree: 'art/icon-saree.jpg',
  hadha: 'art/icon-hadha.jpg',
  hadhihi: 'art/icon-hadhihi.jpg',
  ayna: 'art/icon-ayna.jpg',
  madha: 'art/icon-madha.jpg',
  ureedu: 'art/icon-ureedu.jpg',
  fee: 'art/icon-fee.jpg',
  fawqa: 'art/icon-fawqa.jpg',
  tahta: 'art/icon-tahta.jpg',
  dhahab: 'art/icon-dhahab.jpg',
};

/* ————— UI Helper ————— */
function getVocabIcon(iconKey) {
  if (typeof LICONS !== 'undefined' && LICONS[iconKey]) {
    const v = LICONS[iconKey];
    return typeof v === 'function' ? v() : v;
  }
  if (typeof ICONS !== 'undefined' && ICONS[iconKey]) {
    const v = ICONS[iconKey];
    return typeof v === 'function' ? v() : v;
  }
  if (VOCAB_FALLBACK_EMOJIS[iconKey]) {
    return `<span class="vcard-em">${VOCAB_FALLBACK_EMOJIS[iconKey]}</span>`;
  }
  return '📖';
}

function renderVocabPicture(w, isLarge = false) {
  const cat = w.cat || 'core';
  const pal = VOCAB_PALETTES[cat] || VOCAB_PALETTES.core;
  const artFile = VOCAB_ART_MAP[w.id];

  let inner = '';
  if (artFile) {
    inner = `<img src="${artFile}" class="vcard-art-img ${isLarge ? 'large' : ''}" alt="${w.en}" loading="lazy">`;
  } else {
    const iconContent = getVocabIcon(w.icon);
    inner = `<div class="vcard-art-inner ${isLarge ? 'large' : ''}">${iconContent}</div>`;
  }

  return `
    <div class="vcard-pastel-art ${isLarge ? 'is-large' : ''}" style="background:${pal.bg};border-color:${pal.border}">
      <div class="vcard-aura"></div>
      ${inner}
    </div>`;
}

/* ————— View Controller ————— */
function openVocab(category = 'all') {
  activeVocabCat = category || 'all';
  vocabSession.active = false;
  renderVocabHub();
  if (typeof show === 'function') show('vocab');
}

function renderVocabHub() {
  const host = document.getElementById('vocab');
  if (!host) return;

  const state = loadSrsState();
  const words = VOCAB_WORDS || [];

  // Categorize counts
  let dueCount = 0;
  const boxCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  words.forEach(w => {
    const cs = getWordCardState(state, w.id);
    boxCounts[cs.box] = (boxCounts[cs.box] || 0) + 1;
    if (isWordDue(cs)) dueCount++;
  });

  const filtered = activeVocabCat === 'all'
    ? words
    : words.filter(w => w.cat === activeVocabCat);

  host.innerHTML = `
    <header class="page-head">
      <button class="nav-back-btn" id="vocabBack" title="Back to Home">
        <span class="back-arr">←</span>
        <span class="back-lbl">الرَّئِيسِيَّة · Home</span>
      </button>
      <div class="page-title">
        <h1>المُفْرَدَات</h1>
        <p class="tag">Vocabulary Flashcards &amp; Daily Practice</p>
      </div>
      <div class="star-count" title="Your stars">⭐ <b>${typeof totalStars === 'function' ? totalStars() : 0}</b></div>
    </header>

    <!-- Leitner Progress Dashboard -->
    <section class="vocab-dash">
      <div class="vocab-hero">
        <div class="hero-text">
          <h2>${dueCount > 0 ? `عِنْدَكَ ${dueCount} كَلِمَات لِلتَّدْرِيب الْيَوْم! 🎯` : 'أَحْسَنْت! رَاجَعْتَ جَمِيعَ الْكَلِمَات الْيَوْم! 🌟'}</h2>
          <p>${dueCount > 0 ? `${dueCount} words ready for review today` : 'All caught up! You can review any category below.'}</p>
        </div>
        <button class="start-srs-btn ${dueCount > 0 ? 'pulse' : ''}" id="startSrsBtn">
          <span class="srs-btn-ic">🚀</span>
          <span class="srs-btn-text">
            <b>${dueCount > 0 ? 'هَيَّا نَتَمَرَّنْ' : 'تَمْرِين حُرّ'}</b>
            <small>${dueCount > 0 ? `Start Practice (${dueCount} Due)` : 'Practice All Words'}</small>
          </span>
        </button>
      </div>

      <!-- Spaced Repetition Meters -->
      <div class="srs-meters">
        <div class="meter-box" style="--bcolor:${BOX_INFO[1].color}">
          <span class="m-ic">${BOX_INFO[1].emoji}</span>
          <span class="m-val">${boxCounts[1] || 0}</span>
          <span class="m-lbl">${BOX_INFO[1].label}</span>
        </div>
        <div class="meter-box" style="--bcolor:${BOX_INFO[2].color}">
          <span class="m-ic">${BOX_INFO[2].emoji}</span>
          <span class="m-val">${boxCounts[2] || 0}</span>
          <span class="m-lbl">${BOX_INFO[2].label}</span>
        </div>
        <div class="meter-box" style="--bcolor:${BOX_INFO[3].color}">
          <span class="m-ic">${BOX_INFO[3].emoji}</span>
          <span class="m-val">${boxCounts[3] || 0}</span>
          <span class="m-lbl">${BOX_INFO[3].label}</span>
        </div>
        <div class="meter-box" style="--bcolor:${BOX_INFO[4].color}">
          <span class="m-ic">${BOX_INFO[4].emoji}</span>
          <span class="m-val">${boxCounts[4] || 0}</span>
          <span class="m-lbl">${BOX_INFO[4].label}</span>
        </div>
        <div class="meter-box" style="--bcolor:${BOX_INFO[5].color}">
          <span class="m-ic">${BOX_INFO[5].emoji}</span>
          <span class="m-val">${boxCounts[5] || 0}</span>
          <span class="m-lbl">${BOX_INFO[5].label}</span>
        </div>
      </div>
    </section>

    <!-- Category Tabs -->
    <nav class="vocab-tabs">
      ${VOCAB_CATEGORIES.map(c => `
        <button class="v-tab ${c.id === activeVocabCat ? 'active' : ''}" data-cat="${c.id}" style="--tab-c:${c.color}">
          <span class="vt-ic">${c.emoji}</span>
          <span class="vt-ar">${c.ar}</span>
          <small class="vt-en">${c.en}</small>
        </button>
      `).join('')}
    </nav>

    <!-- Word Grid -->
    <main class="vocab-grid">
      ${filtered.map(w => {
        const cs = getWordCardState(state, w.id);
        const b = BOX_INFO[cs.box] || BOX_INFO[1];
        const isDue = isWordDue(cs);
        return `
          <div class="vocab-card-tile ${isDue ? 'is-due' : ''}" data-id="${w.id}">
            <div class="vcard-badge" style="background:${b.color}">${b.emoji} ${b.label}</div>
            <div class="vcard-art">${renderVocabPicture(w, false)}</div>
            <div class="vcard-ar">${w.ar}</div>
            <div class="vcard-en">${w.en}</div>
            <button class="vcard-audio-btn" data-say="${w.ar}" title="Listen">🔊</button>
          </div>
        `;
      }).join('')}
    </main>

    <footer class="site-foot">اِقْرَأْ وَتَمَرَّنْ كُلَّ يَوْم · Practice a few words every day</footer>
  `;

  // Attach event listeners
  document.getElementById('vocabBack').addEventListener('click', () => {
    if (typeof show === 'function') show('home');
    location.hash = '#home';
  });

  document.getElementById('startSrsBtn').addEventListener('click', () => {
    startVocabSession(activeVocabCat === 'all' ? null : activeVocabCat);
  });

  host.querySelectorAll('.v-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeVocabCat = tab.dataset.cat;
      renderVocabHub();
    });
  });

  host.querySelectorAll('.vocab-card-tile').forEach(tile => {
    tile.addEventListener('click', e => {
      if (e.target.classList.contains('vcard-audio-btn')) {
        e.stopPropagation();
        if (typeof say === 'function') say(e.target.dataset.say);
        return;
      }
      const wid = tile.dataset.id;
      startSingleCardSession(wid);
    });
  });
}

/* ————— Spaced Repetition Session Mode ————— */
function startVocabSession(category = null) {
  const state = loadSrsState();
  const all = VOCAB_WORDS || [];
  let list = category ? all.filter(w => w.cat === category) : all;

  // Filter due cards first, then add un-mastered cards
  let due = list.filter(w => isWordDue(getWordCardState(state, w.id)));
  if (due.length === 0) {
    due = list; // Practice all if none due
  }

  // Shuffle slightly
  const queue = [...due].sort(() => Math.random() - 0.5);

  vocabSession = {
    active: true,
    queue,
    idx: 0,
    flipped: false,
    results: { correct: 0, repeat: 0 },
  };

  renderFlashcardSession();
}

function startSingleCardSession(wordId) {
  const all = VOCAB_WORDS || [];
  const list = (activeVocabCat && activeVocabCat !== 'all')
    ? all.filter(w => w.cat === activeVocabCat)
    : all;
  const targetIdx = list.findIndex(w => w.id === wordId);

  vocabSession = {
    active: true,
    queue: list,
    idx: targetIdx >= 0 ? targetIdx : 0,
    flipped: false,
    results: { correct: 0, repeat: 0 },
  };

  renderFlashcardSession();
}

function renderFlashcardSession() {
  const host = document.getElementById('vocab');
  if (!host) return;

  const q = vocabSession.queue;
  const idx = vocabSession.idx;

  if (idx >= q.length) {
    renderSessionDone();
    return;
  }

  const word = q[idx];
  const state = loadSrsState();
  const cs = getWordCardState(state, word.id);
  const box = BOX_INFO[cs.box] || BOX_INFO[1];

  host.innerHTML = `
    <header class="page-head">
      <button class="nav-back-btn" id="srsExitBtn" title="Back to Vocabulary Shelf">
        <span class="back-arr">←</span>
        <span class="back-lbl">المُفْرَدَات · Vocab Shelf</span>
      </button>
      <div class="page-title">
        <h1>تَمْرِينُ الْبِطَاقَات</h1>
        <p class="tag">Flashcard ${idx + 1} of ${q.length}</p>
      </div>
      <div class="star-count" title="Your stars">⭐ <b>${typeof totalStars === 'function' ? totalStars() : 0}</b></div>
    </header>

    <!-- Top Continuous Word Navigation -->
    <div class="sent-nav-bar" style="direction:ltr;max-width:540px;margin:0 auto 12px">
      <button class="sent-nav-btn prev-btn" id="wordNavPrev" ${idx === 0 ? 'disabled' : ''} aria-label="Previous Word">
        <span class="nav-arr">←</span>
        <span class="sent-nav-txt"><b>السَّابِقَة</b><small>Previous</small></span>
      </button>
      <div class="sent-nav-mid">
        <span class="sent-num-pill">كَلِمَة ${idx + 1} مِنْ ${q.length}</span>
        <span class="sent-set-pill">${word.en}</span>
      </div>
      <button class="sent-nav-btn next-btn" id="wordNavNext" ${idx >= q.length - 1 ? 'disabled' : ''} aria-label="Next Word">
        <span class="sent-nav-txt"><b>الكَلِمَة التَّالِيَة</b><small>Next Word →</small></span>
        <span class="nav-arr">→</span>
      </button>
    </div>

    <!-- Session Progress -->
    <div class="srs-prog-bar">
      <div class="srs-prog-fill" style="width:${((idx) / q.length) * 100}%"></div>
    </div>

    <!-- 3D Flashcard Container -->
    <div class="flashcard-stage">
      <div class="flashcard ${vocabSession.flipped ? 'flipped' : ''}" id="mainFlashcard">
        <!-- Front Side -->
        <div class="card-face card-front">
          <div class="card-top-bar">
            <span class="srs-badge" style="background:${box.color}">${box.emoji} ${box.label}</span>
            <button class="sound-icon-btn" id="frontSoundBtn" title="Hear sound">🔊</button>
          </div>
          <div class="card-art-large">${renderVocabPicture(word, true)}</div>
          <div class="card-hint">اِنْقُر لِقَلْبِ الْبِطَاقَة · Tap card to flip ↺</div>
        </div>

        <!-- Back Side -->
        <div class="card-face card-back">
          <div class="card-top-bar">
            <span class="srs-badge" style="background:${box.color}">${box.emoji} ${box.label}</span>
            <button class="sound-icon-btn" id="backSoundBtn" title="Hear word">🔊</button>
          </div>
          <div class="card-word-ar">${word.ar}</div>
          <div class="card-word-en">${word.en}</div>
          ${word.exAr ? `
            <div class="card-example" id="exAudioBtn">
              <span class="ex-ar">${word.exAr}</span>
              <small class="ex-en">${word.exEn || ''}</small>
              <span class="ex-ic">🔊</span>
            </div>
          ` : ''}
          <div class="card-hint-back">اِنْقُر لِلْعَوْدَة · Tap to flip back ↺</div>
        </div>
      </div>
    </div>

    <!-- Action Response Buttons -->
    <div class="srs-action-row">
      <button class="srs-act-btn btn-repeat" id="btnRepeat">
        <span class="act-emoji">🌱</span>
        <span class="act-main">مَرَّة أُخْرَى</span>
        <small class="act-sub">Practice Again</small>
      </button>

      <button class="srs-act-btn btn-flip" id="btnFlip">
        <span class="act-emoji">🔄</span>
        <span class="act-main">اِقْلِبْ</span>
        <small class="act-sub">Flip Card</small>
      </button>

      <button class="srs-act-btn btn-pass" id="btnPass">
        <span class="act-emoji">⭐</span>
        <span class="act-main">أَعْرِفُهَا!</span>
        <small class="act-sub">I Know This!</small>
      </button>
    </div>
  `;

  // Auto-play front sound on initial card show
  if (!vocabSession.flipped && typeof say === 'function') {
    setTimeout(() => say(word.ar), 300);
  }

  // Card Flip Handler
  const cardEl = document.getElementById('mainFlashcard');
  const toggleFlip = () => {
    vocabSession.flipped = !vocabSession.flipped;
    cardEl.classList.toggle('flipped', vocabSession.flipped);
    if (vocabSession.flipped && typeof say === 'function') {
      say(word.ar);
    }
  };

  cardEl.addEventListener('click', toggleFlip);
  document.getElementById('btnFlip').addEventListener('click', toggleFlip);

  document.getElementById('frontSoundBtn').addEventListener('click', e => {
    e.stopPropagation();
    if (typeof say === 'function') say(word.ar);
  });

  document.getElementById('backSoundBtn').addEventListener('click', e => {
    e.stopPropagation();
    if (typeof say === 'function') say(word.ar);
  });

  const exBtn = document.getElementById('exAudioBtn');
  if (exBtn) {
    exBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (typeof say === 'function') say(word.exAr);
    });
  }

  // Word Next/Prev Navigation
  const prevWordBtn = document.getElementById('wordNavPrev');
  if (prevWordBtn) {
    prevWordBtn.addEventListener('click', () => {
      if (vocabSession.idx > 0) {
        vocabSession.idx--;
        vocabSession.flipped = false;
        renderFlashcardSession();
      }
    });
  }

  const nextWordBtn = document.getElementById('wordNavNext');
  if (nextWordBtn) {
    nextWordBtn.addEventListener('click', () => {
      if (vocabSession.idx < q.length - 1) {
        vocabSession.idx++;
        vocabSession.flipped = false;
        renderFlashcardSession();
      } else {
        renderSessionDone();
      }
    });
  }

  // Back button
  document.getElementById('srsExitBtn').addEventListener('click', () => {
    vocabSession.active = false;
    renderVocabHub();
  });

  // Pass (I Know This!)
  document.getElementById('btnPass').addEventListener('click', () => {
    recordWordReview(word.id, true);
    vocabSession.results.correct++;
    if (typeof chimeGood === 'function') chimeGood();
    vocabSession.idx++;
    vocabSession.flipped = false;
    renderFlashcardSession();
  });

  // Repeat (Practice Again)
  document.getElementById('btnRepeat').addEventListener('click', () => {
    recordWordReview(word.id, false);
    vocabSession.results.repeat++;
    // Push card back to the end of today's queue for immediate re-test
    vocabSession.queue.push(word);
    vocabSession.idx++;
    vocabSession.flipped = false;
    renderFlashcardSession();
  });
}

function renderSessionDone() {
  const host = document.getElementById('vocab');
  if (!host) return;

  const res = vocabSession.results;
  const starsEarned = Math.max(1, Math.ceil(res.correct / 2));
  if (typeof addStar === 'function') addStar('vocab_mastery', starsEarned);

  host.innerHTML = `
    <header class="page-head">
      <button class="nav-back-btn" id="srsDoneBack">
        <span class="back-arr">←</span>
        <span class="back-lbl">المُفْرَدَات · Vocab Shelf</span>
      </button>
      <div class="page-title">
        <h1>مُمْتَاز! 🌟</h1>
        <p class="tag">Session Complete!</p>
      </div>
      <div class="star-count">⭐ <b>${typeof totalStars === 'function' ? totalStars() : 0}</b></div>
    </header>

    <div class="session-done-card">
      <div class="done-confetti">🎉 🏆 🌟</div>
      <h2>أَحْسَنْتَ صُنْعًا!</h2>
      <p class="done-en">You completed today's practice session!</p>

      <div class="done-stats-row">
        <div class="dstat">
          <span class="ds-val">${res.correct}</span>
          <span class="ds-lbl">عَرَفْتَهَا ⭐</span>
        </div>
        <div class="dstat">
          <span class="ds-val">+${starsEarned}</span>
          <span class="ds-lbl">نُجُوم جَدِيدَة 🌟</span>
        </div>
      </div>

      <div class="done-actions">
        <button class="big-btn pulse" id="doneMoreBtn" style="margin-bottom:12px;background:linear-gradient(135deg, var(--coral), #E05370);color:#fff">
          🚀 اسْتَمِرّ · Continue Practicing All Words
        </button>
        <button class="big-btn" id="doneReturnBtn">الْعَوْدَة إِلَى الْمُفْرَدَات · Return to Words</button>
      </div>
    </div>
  `;

  if (typeof say === 'function') say('مُمْتَاز! أَحْسَنْت');

  document.getElementById('doneMoreBtn').addEventListener('click', () => {
    startVocabSession(null);
  });
  document.getElementById('srsDoneBack').addEventListener('click', () => {
    vocabSession.active = false;
    renderVocabHub();
  });
  document.getElementById('doneReturnBtn').addEventListener('click', () => {
    vocabSession.active = false;
    renderVocabHub();
  });
}
