/* ————— Hikayat · the sentence screen ————————————————————————————————————————
   Picture-free by design (see sentences.js). Everything is a sound.

   Five steps on ONE sentence, the parent site's shape made small enough for a
   child, and each step is a button that SPEAKS rather than a paragraph that has
   to be read:

     🔊  hear it            the Arabic, slowly. Tap any single word too.
     💭  what it means      the English, spoken.
     ✨  how it works       the explanation, spoken. This is the "more
                            explanation" Reza asked for, and it is the part a
                            picture could never have carried.
     🎤  now you say it     self-marked. No microphone: mic recognition failed
                            him repeatedly on the grown-up site, and a
                            four-year-old mumbling at a tablet that says "I
                            didn't get it" is the fastest way to end a session.
     🔁  change one word    the same pattern with one thing swapped, which is
                            where the pattern actually becomes theirs.

   Nothing is ever marked wrong. Stars only go up. (DESIGN.md rule 5.)
   ========================================================================= */
'use strict';

/* ————— Leitner 5-box Spaced Repetition for Sentences ————— */
const SENT_SRS_INTERVALS = {
  1: 0,                   // Box 1: Review today / immediate
  2: 2 * 24 * 3600 * 1000, // Box 2: 2 days
  3: 4 * 24 * 3600 * 1000, // Box 3: 4 days
  4: 7 * 24 * 3600 * 1000, // Box 4: 7 days
  5: 14 * 24 * 3600 * 1000, // Box 5: 14 days (Mastered!)
};

const SENT_BOX_INFO = {
  1: { label: 'جَدِيد', labelEn: 'New', emoji: '🌱', color: '#F09CB1' },
  2: { label: 'نَتَعَلَّم', labelEn: 'Learning', emoji: '🌿', color: '#7FB0D6' },
  3: { label: 'مَأْلُوف', labelEn: 'Familiar', emoji: '🌸', color: '#E8A33D' },
  4: { label: 'قَوِيّ', labelEn: 'Strong', emoji: '⭐', color: '#7BC08F' },
  5: { label: 'مُتْقَن', labelEn: 'Mastered', emoji: '🏆', color: '#5B8C7B' },
};

function getSentSrsKey() {
  const kid = (typeof currentKid === 'function' && currentKid()) || { id: 'default' };
  return `hikayat-sent-srs-${kid.id}`;
}

function loadSentSrsState() {
  try {
    const raw = localStorage.getItem(getSentSrsKey());
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveSentSrsState(state) {
  try {
    localStorage.setItem(getSentSrsKey(), JSON.stringify(state));
    if (typeof syncSoon === 'function') syncSoon();
  } catch (e) {}
}

function getLessonKey(set, idx) {
  return `${set.id}/${idx}`;
}

function getSentCardState(state, key) {
  return state[key] || {
    key,
    box: 1,
    reviews: 0,
    correct: 0,
    lastReview: 0,
    nextReview: 0,
  };
}

function isSentDue(cs) {
  if (!cs || !cs.lastReview) return true;
  return Date.now() >= (cs.nextReview || 0);
}

function recordSentReview(key, passed) {
  const state = loadSentSrsState();
  const card = getSentCardState(state, key);
  card.reviews = (card.reviews || 0) + 1;
  card.lastReview = Date.now();
  if (passed) {
    card.correct = (card.correct || 0) + 1;
    card.box = Math.min(5, (card.box || 1) + 1);
  } else {
    card.box = 1;
  }
  card.nextReview = Date.now() + (SENT_SRS_INTERVALS[card.box] || 0);
  state[key] = card;
  saveSentSrsState(state);
  if (typeof logRecall === 'function') logRecall('sent:' + key, passed);
}

/* Map sentence theme or pic to authentic story watercolor illustrations */
function getSentenceArt(L, set) {
  const p = L.pic || '';
  if (p === 'mama-adam' || p === 'dar-cozy') {
    return `<div class="sent-art-wrap"><img src="art/ayna-mama/cover.jpg" alt="Mama & Adam" class="sent-art-img"/></div>`;
  }
  if (p === 'adam-lulu') {
    return `<div class="sent-art-wrap"><img src="art/yawm-maryam/cover.jpg" alt="Adam & Lulu" class="sent-art-img"/></div>`;
  }
  if (p === 'toy-mine' || p === 'kitab-boy' || p === 'ball-girl') {
    return `<div class="sent-art-wrap"><img src="art/lulu-jaia/cover.jpg" alt="Story" class="sent-art-img"/></div>`;
  }
  if (p === 'feel-kabir' || p === 'faar-saghir' || p === 'kitab-kabir') {
    return `<div class="sent-art-wrap"><img src="art/feel-dar/cover.jpg" alt="Elephant & House" class="sent-art-img"/></div>`;
  }
  if (p === 'alhamd-dua' || p === 'bismillah-meal' || p === 'boy-dua') {
    return `<div class="sent-art-wrap"><img src="art/shams-qamar/cover.jpg" alt="Sun & Moon" class="sent-art-img"/></div>`;
  }
  if (set && (set.id === 'this' || set.id === 'me')) {
    return `<div class="sent-art-wrap"><img src="art/lulu-jaia/cover.jpg" alt="Lulu" class="sent-art-img"/></div>`;
  }
  if (set && (set.id === 'where' || set.id === 'who')) {
    return `<div class="sent-art-wrap"><img src="art/ayna-mama/cover.jpg" alt="Where is Mama" class="sent-art-img"/></div>`;
  }
  if (set && set.id === 'describe') {
    return `<div class="sent-art-wrap"><img src="art/shams-qamar/cover.jpg" alt="Sun & Moon" class="sent-art-img"/></div>`;
  }
  if (set && (set.id === 'funny' || set.id === 'funny3')) {
    return `<div class="sent-art-wrap"><img src="art/feel-dar/cover.jpg" alt="Elephant in house" class="sent-art-img"/></div>`;
  }
  if (set && (set.id === 'ask' || set.id === 'said' || set.id === 'have')) {
    return `<div class="sent-art-wrap"><img src="art/man-qala/cover.jpg" alt="Who said meow" class="sent-art-img"/></div>`;
  }
  return `<div class="sent-art-wrap"><img src="art/yawm-maryam/cover.jpg" alt="Scene" class="sent-art-img"/></div>`;
}

let sentSet = null;      // the set being worked through
let sentIdx = 0;         // which lesson within it
let sentStep = 0;        // which of the five steps
let sentSrsSession = { active: false, deck: [], at: 0 };

function openSentences() { sentSet = null; sentSrsSession.active = false; renderSentenceHome(); show('sentences'); }

/* ---------- choosing a set & Leitner SRS Hub ---------- */
function renderSentenceHome() {
  const host = document.getElementById('sentences');
  const state = loadSentSrsState();
  const allLessons = typeof ALL_LESSONS !== 'undefined' ? ALL_LESSONS : [];

  let dueCount = 0;
  const boxCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  SENTENCE_SETS.forEach(s => {
    s.lessons.forEach((l, idx) => {
      const k = getLessonKey(s, idx);
      const cs = getSentCardState(state, k);
      boxCounts[cs.box] = (boxCounts[cs.box] || 0) + 1;
      if (isSentDue(cs)) dueCount++;
    });
  });

  host.innerHTML = `
    <header class="page-head">
      <button class="nav-back-btn" id="jBack" title="Back to Home">
        <span class="back-arr">←</span>
        <span class="back-lbl">الرَّئِيسِيَّة · Home</span>
      </button>
      <div class="page-title">
        <h1>جُمَل</h1>
        <p class="tag">Sentences — Spaced Repetition &amp; Practice</p>
      </div>
      <div class="star-count">⭐ <b>${totalStars()}</b></div>
    </header>

    <!-- Sentences Leitner Dashboard -->
    <section class="vocab-dash" style="margin-bottom:20px">
      <div class="vocab-hero">
        <div class="hero-text">
          <h2>${dueCount > 0 ? `عِنْدَكَ ${dueCount} جُمَل لِلْمُرَاجَعَة الْيَوْم! 💬` : 'أَحْسَنْت! أَتْمَمْتَ جَمِيعَ الْجُمَل الْيَوْم! 🌟'}</h2>
          <p>${dueCount > 0 ? `${dueCount} sentences ready for spaced repetition review` : 'All caught up! Choose any set below to practice.'}</p>
        </div>
        <button class="start-srs-btn ${dueCount > 0 ? 'pulse' : ''}" id="startSentSrsBtn">
          <span class="srs-btn-ic">🚀</span>
          <span class="srs-btn-text">
            <b>${dueCount > 0 ? 'هَيَّا نَتَمَرَّنْ' : 'تَمْرِين حُرّ'}</b>
            <small>${dueCount > 0 ? `Review (${dueCount} Due)` : 'Practice All'}</small>
          </span>
        </button>
      </div>

      <div class="srs-meters">
        ${[1, 2, 3, 4, 5].map(b => `
          <div class="meter-box" style="--bcolor:${SENT_BOX_INFO[b].color}">
            <span class="m-ic">${SENT_BOX_INFO[b].emoji}</span>
            <span class="m-val">${boxCounts[b] || 0}</span>
            <span class="m-lbl">${SENT_BOX_INFO[b].label}</span>
          </div>
        `).join('')}
      </div>
    </section>

    <p class="hint">اِخْتَرْ مَجْمُوعَة لِلتَّدْرِيب
      <span class="hint-en">Or choose a set below. Everything talks — nothing to read.</span></p>
    <div class="set-list">
      ${SENTENCE_SETS.map(s => {
        const done = starsFor('sent:' + s.id);
        return `<button class="set-card" data-s="${s.id}" style="--band:${LEVELS[s.level - 1].color}">
          <span class="set-ar">${s.title}</span>
          <span class="set-en">${s.titleEn}</span>
          <span class="set-meta">${s.lessons.length} جُمَل ${done ? ' · ⭐ ' + done : ''}</span>
        </button>`;
      }).join('')}
    </div>`;

  document.getElementById('jBack').addEventListener('click', () => { location.hash = '#home'; renderHome(); show('home'); });
  document.getElementById('startSentSrsBtn').addEventListener('click', startSentSrsQueue);
  host.querySelectorAll('.set-card').forEach(b => b.addEventListener('click', () => {
    sentSet = SENTENCE_SETS.find(s => s.id === b.dataset.s);
    sentIdx = 0; sentStep = 0;
    renderLesson();
  }));
}

/* ---------- Sentences Daily SRS Practice Mode ---------- */
function startSentSrsQueue() {
  const state = loadSentSrsState();
  const queue = [];
  SENTENCE_SETS.forEach(s => {
    s.lessons.forEach((l, idx) => {
      const k = getLessonKey(s, idx);
      const cs = getSentCardState(state, k);
      if (isSentDue(cs)) queue.push({ key: k, lesson: l, set: s, cs });
    });
  });

  // If none due, practice a random batch of 5
  if (!queue.length) {
    SENTENCE_SETS.forEach(s => {
      s.lessons.forEach((l, idx) => {
        const k = getLessonKey(s, idx);
        queue.push({ key: k, lesson: l, set: s, cs: getSentCardState(state, k) });
      });
    });
  }

  queue.sort((a, b) => (a.cs.lastReview || 0) - (b.cs.lastReview || 0));
  sentSrsSession = {
    active: true,
    deck: queue.slice(0, 10),
    at: 0,
  };
  renderSentSrsCard();
}

function renderSentSrsCard() {
  const host = document.getElementById('sentences');
  if (sentSrsSession.at >= sentSrsSession.deck.length) {
    // Session complete
    host.innerHTML = `
      <div class="set-done">
        <div class="sd-star">🌟</div>
        <h2>مُمْتَاز!</h2>
        <p class="hint-en">You completed today's sentence review!</p>
        <button class="big-btn" id="srsDoneBack">↩ عَوْدَة · Back to Sentences</button>
      </div>`;
    addStar('sent:srs', 2);
    chimeGood();
    say('مُمْتَاز');
    document.getElementById('srsDoneBack').addEventListener('click', openSentences);
    return;
  }

  const item = sentSrsSession.deck[sentSrsSession.at];
  const L = item.lesson;
  const cs = item.cs;
  const bInfo = SENT_BOX_INFO[cs.box] || SENT_BOX_INFO[1];
  let revealed = false;

  host.innerHTML = `
    <header class="page-head">
      <button class="nav-back-btn" id="srsExitBtn" title="Exit Practice">
        <span class="back-arr">←</span>
        <span class="back-lbl">جُمَل · Back</span>
      </button>
      <div class="page-title">
        <h1>تَدْرِيب الْجُمَل</h1>
        <p class="tag">${sentSrsSession.at + 1} of ${sentSrsSession.deck.length} · ${bInfo.emoji} ${bInfo.label}</p>
      </div>
      <div class="star-count">⭐ <b>${totalStars()}</b></div>
    </header>

    <div class="sent-card" id="srsFlipCard" style="cursor:pointer;max-width:540px;margin:0 auto 16px">
      ${getSentenceArt(L, item.set)}
      <p class="sent-ar" style="font-size:38px;margin:16px 0">${L.ar}</p>
      <button class="sent-play" id="srsCardHear">🔊 <span>اِسْمَعْ</span></button>
      <div id="srsBackSection" style="display:none;margin-top:16px;border-top:2px dashed #E7D8BC;padding-top:14px">
        <p class="sent-en" style="font-size:22px;color:var(--ink);font-weight:700">${L.en}</p>
        <p style="font-size:14px;color:var(--muted);margin-top:6px">${L.why}</p>
      </div>
    </div>

    <div id="srsActionRow" style="display:none;justify-content:center;gap:12px;margin-top:16px">
      <button class="big-btn" id="srsAgainBtn" style="background:#E8A33D;box-shadow:0 6px 0 #B2751E">
        🔁 مَرَّة أُخْرَى · Again
      </button>
      <button class="big-btn" id="srsSaidBtn" style="background:var(--teal);box-shadow:0 6px 0 #1F7A6F">
        ⭐ قُلْتُهَا! · I said it!
      </button>
    </div>

    <p class="hint" id="srsHintText">
      اِسْتَمِعْ ثُمَّ قُلِ الْجُمْلَة! اِلْمَسِ الْبِطَاقَة لِتَرَى الْمَعْنَى
      <span class="hint-en">Listen and say it! Tap card to reveal meaning.</span>
    </p>`;

  document.getElementById('srsExitBtn').addEventListener('click', openSentences);
  document.getElementById('srsCardHear').addEventListener('click', e => {
    e.stopPropagation();
    say(L.ar);
  });
  document.getElementById('srsFlipCard').addEventListener('click', () => {
    if (!revealed) {
      revealed = true;
      document.getElementById('srsBackSection').style.display = 'block';
      document.getElementById('srsActionRow').style.display = 'flex';
      document.getElementById('srsHintText').style.display = 'none';
      sayEn(L.en);
    } else {
      say(L.ar);
    }
  });

  document.getElementById('srsSaidBtn').addEventListener('click', () => {
    recordSentReview(item.key, true);
    addStar('sent:' + item.set.id);
    chimeGood();
    sentSrsSession.at++;
    renderSentSrsCard();
  });

  document.getElementById('srsAgainBtn').addEventListener('click', () => {
    recordSentReview(item.key, false);
    chimeBad();
    sentSrsSession.at++;
    renderSentSrsCard();
  });

  setTimeout(() => say(L.ar), 350);
}

const STEPS = [
  { ic: '🔊', ar: 'اِسْتَمِعْ',        en: 'Listen' },
  { ic: '💭', ar: 'مَا مَعْنَاهَا؟',   en: 'What does it mean?' },
  { ic: '✨', ar: 'كَيْفَ تَعْمَل؟',   en: 'How it works' },
  { ic: '🎤', ar: 'قُلْهَا أَنْتَ',    en: 'Now you say it' },
  { ic: '🧩', ar: 'اِخْتَبِرْ نَفْسَك', en: 'Challenge' },
  { ic: '🔁', ar: 'غَيِّرْ كَلِمَة',   en: 'Change one word' },
  { ic: '🗝️', ar: 'قُلْ أَيَّ شَيْء',  en: 'Say ANYTHING', frameOnly: true },
  { ic: '😂', ar: 'النُّكْتَة',        en: 'The joke', jokeOnly: true },
];

/* the last step only exists where the lesson has a frame to drill */
const stepsFor = L => STEPS.filter(s => (!s.frameOnly || L.frame) && (!s.jokeOnly || L.joke));

function renderLesson() {
  const L = sentSet.lessons[sentIdx];
  const host = document.getElementById('sentences');
  const words = L.ar.split(/\s+/);

  host.innerHTML = `
    <header class="page-head">
      <button class="nav-back-btn" id="jBack" title="Back to Sets">
        <span class="back-arr">←</span>
        <span class="back-lbl">جُمَل · All Sets</span>
      </button>
      <div class="page-title">
        <h1>${sentSet.title}</h1>
        <p class="tag">Lesson ${sentIdx + 1} of ${sentSet.lessons.length}</p>
      </div>
      <div class="star-count">⭐ <b>${totalStars()}</b></div>
    </header>

    <div class="sent-card">
      ${getSentenceArt(L, sentSet)}
      <p class="sent-ar" id="sentAr">
        ${words.map((w, i) => `<span class="sw" data-i="${i}">${w}</span>`).join(' ')}
      </p>
      <p class="sent-en" id="sentEn">${L.en}</p>
      <button class="sent-play" id="sentPlay">🔊 <span>اِسْمَعْ</span></button>
      <p class="sent-tap">اِلْمَسْ أَيَّ كَلِمَة<span class="hint-en">Tap any single word to hear just that word</span></p>
    </div>

    <div class="steps" id="steps">
      ${stepsFor(L).map((s, i) => `
        <button class="step ${i === sentStep ? 'on' : ''}" data-i="${i}">
          <span class="st-ic">${s.ic}</span>
          <span class="st-ar">${s.ar}</span>
          <span class="st-en">${s.en}</span>
        </button>`).join('')}
    </div>

    <div class="step-body" id="stepBody"></div>

    <div class="lesson-nav">
      <button class="round" id="jPrev" ${sentIdx === 0 ? 'disabled' : ''} aria-label="Back">→</button>
      <button class="round big" id="jNext" aria-label="Next">${sentIdx === sentSet.lessons.length - 1 ? '🏁' : '←'}</button>
    </div>`;

  document.getElementById('jBack').addEventListener('click', renderSentenceHome);
  document.getElementById('sentPlay').addEventListener('click', () => say(L.ar));
  document.getElementById('sentEn').addEventListener('click', () => sayEn(L.en));
  host.querySelectorAll('.sw').forEach(el => el.addEventListener('click', ev => {
    ev.stopPropagation();
    saySlow(words[+el.dataset.i]);
    el.classList.add('said');
    setTimeout(() => el.classList.remove('said'), 700);
  }));
  host.querySelectorAll('.step').forEach(b => b.addEventListener('click', () => {
    sentStep = +b.dataset.i;
    host.querySelectorAll('.step').forEach(x => x.classList.toggle('on', x === b));
    renderStep();
  }));
  document.getElementById('jPrev').addEventListener('click', () => {
    if (sentIdx > 0) { sentIdx--; sentStep = 0; renderLesson(); }
  });
  document.getElementById('jNext').addEventListener('click', () => {
    if (sentIdx < sentSet.lessons.length - 1) { sentIdx++; sentStep = 0; renderLesson(); }
    else finishSet();
  });

  renderStep();
  setTimeout(() => say(L.ar), 350);       // ear first: it says itself
}

function renderStep() {
  const L = sentSet.lessons[sentIdx];
  const body = document.getElementById('stepBody');

  if (sentStep === 0) {
    body.innerHTML = `<div class="sb">
      <button class="sb-big" id="sbSlow">🐢 مَرَّة أُخْرَى<small>Again, slowly</small></button>
    </div>`;
    document.getElementById('sbSlow').addEventListener('click', () => saySlow(L.ar));
    return;
  }

  if (sentStep === 1) {
    body.innerHTML = `<div class="sb">
      <button class="sb-big" id="sbMean">💭<small>Tap to hear what it means</small></button>
      <p class="sb-en" id="sbEn">${L.en}</p>
    </div>`;
    const go = () => sayEn(L.en);
    document.getElementById('sbMean').addEventListener('click', go);
    document.getElementById('sbEn').addEventListener('click', go);
    setTimeout(go, 250);
    return;
  }

  if (sentStep === 2) {
    body.innerHTML = `<div class="sb">
      <button class="sb-big" id="sbWhy">✨<small>Tap to hear how it works</small></button>
      <p class="sb-en why" id="sbWhyT">${L.why}</p>
    </div>`;
    const go = () => sayEn(L.why);
    document.getElementById('sbWhy').addEventListener('click', go);
    document.getElementById('sbWhyT').addEventListener('click', go);
    setTimeout(go, 250);
    return;
  }

  if (sentStep === 3) {
    /* Self-marked on purpose — see the header. The child hears it, says it, and
       taps the star themselves. There is no way to fail. */
    body.innerHTML = `<div class="sb">
      <button class="sb-big" id="sbHear">🔊<small>Hear it once more</small></button>
      <button class="sb-star" id="sbStar">⭐ قُلْتُهَا!<small>I said it!</small></button>
    </div>`;
    document.getElementById('sbHear').addEventListener('click', () => say(L.ar));
    document.getElementById('sbStar').addEventListener('click', () => {
      addStar('sent:' + sentSet.id);
      chimeGood();
      say('أَحْسَنْت');
      document.querySelector('.star-count b').textContent = totalStars();
      document.getElementById('sbStar').classList.add('got');
    });
    setTimeout(() => sayEn('Now you say it.'), 250);
    return;
  }

  /* ---- 5. CHALLENGE — Cloze retrieval for sentence recall ---- */
  if ((stepsFor(L)[sentStep] || {}).en === 'Challenge') {
    const words = L.ar.split(/\s+/).filter(Boolean);
    const targetIdx = words.length - 1;
    const correctWord = words[targetIdx];
    const maskedWords = words.map((w, i) => i === targetIdx ? '____' : w).join(' ');

    const otherWords = sentSet.lessons
      .flatMap(l => l.ar.split(/\s+/))
      .filter(w => w && w !== correctWord);
    const pool = [...new Set(otherWords)].filter(w => w !== correctWord);
    const d1 = pool[0] || 'مَاء';
    const d2 = pool[1] || 'لُولُو';
    const opts = [correctWord, d1, d2].sort(() => Math.random() - 0.5);
    let attempted = false;

    body.innerHTML = `<div class="sb">
      <p class="sb-lead">مَا هِيَ الْكَلِمَةُ النَّاقِصَة؟
        <span class="hint-en">Which word is missing? Tap to choose.</span></p>
      <div class="cloze-box">
        <p class="cloze-line">${maskedWords}</p>
        <button class="sb-big" id="clozeHear">🔊<small>Hear the full sentence</small></button>
        <div class="cloze-opts">
          ${opts.map(opt => `<button class="cloze-opt" data-word="${opt}">${opt}</button>`).join('')}
        </div>
      </div>
    </div>`;

    document.getElementById('clozeHear').addEventListener('click', () => say(L.ar));
    body.querySelectorAll('.cloze-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.dataset.word;
        const isOk = (selected === correctWord);
        if (!attempted) {
          attempted = true;
          if (typeof logRecall === 'function') {
            logRecall('lesson:' + sentSet.id + '/' + sentIdx, isOk);
          }
        }
        if (isOk) {
          btn.classList.add('correct');
          chimeGood();
          addStar('sent:' + sentSet.id);
          say(correctWord);
          setTimeout(() => say('مُمْتَاز'), 800);
          document.querySelector('.star-count b').textContent = totalStars();
        } else {
          btn.classList.add('wrong');
          chimeBad();
          say(selected);
          setTimeout(() => { btn.classList.remove('wrong'); say(L.ar); }, 1000);
        }
      });
    });
    setTimeout(() => say(L.ar), 300);
    return;
  }


  /* ---- 6. SAY ANYTHING — the frame, and permission to use an English word ----
     Reza's idea, and the most useful thing here: "if you dont know the word for
     pen just say urid pen… this should remove some barriers to speaking more."
     The English slots are not a fallback hidden away in small print, they are
     shown in the same list as the Arabic ones and spoken aloud, because the
     point is that using one is ALLOWED and normal, not a failure. */
  if (L.frame && (stepsFor(L)[sentStep] || {}).en === 'Say ANYTHING') {
    const F = L.frame;
    body.innerHTML = `<div class="sb">
      <p class="frame-pat">${F.pattern}</p>
      <p class="frame-say">${F.say}</p>
      <button class="sb-big" id="fWhy">🗝️<small>Tap to hear the trick</small></button>
      <p class="sb-en why" id="fBridge">${F.bridge}</p>
      <div class="vary">
        ${F.slots.map((v, i) => `<button class="vary-row ${v.english ? 'mix' : ''}" data-i="${i}">
          <span class="v-ar">${v.ar || v.en}</span>
          <span class="v-en">${v.ar ? v.en : 'English word — and that is fine!'}</span>
        </button>`).join('')}
      </div>
    </div>`;
    const bridge = () => sayEn(F.bridge);
    document.getElementById('fWhy').addEventListener('click', bridge);
    document.getElementById('fBridge').addEventListener('click', bridge);
    body.querySelectorAll('.vary-row').forEach(b => b.addEventListener('click', () => {
      const v = F.slots[+b.dataset.i];
      b.classList.add('said');
      setTimeout(() => b.classList.remove('said'), 800);
      if (v.ar) { say(v.ar); setTimeout(() => sayEn(v.en), 1600); }
      else sayEn(v.en);            // the mixed one is read as it is actually said
      addStar('sent:' + sentSet.id);
      document.querySelector('.star-count b').textContent = totalStars();
    }));
    setTimeout(bridge, 250);
    return;
  }

  /* ---- the joke ----
     The pause is the whole thing. A punchline delivered instantly is not a
     punchline, so the setup plays, then its meaning, and the answer stays
     hidden behind a button until the child asks for it. */
  if (L.joke && (stepsFor(L)[sentStep] || {}).en === 'The joke') {
    const J = L.joke;
    body.innerHTML = `<div class="sb">
      <p class="joke-setup" id="jSetup">${J.setup.ar}</p>
      <p class="sb-en" id="jSetupEn">${J.setup.en}</p>
      <button class="sb-big" id="jHear">🔊<small>Hear the question</small></button>
      <button class="sb-star" id="jReveal">😂 مَا هُوَ؟<small>Tap for the answer</small></button>
      <div id="jPunch"></div>
    </div>`;
    const hear = () => { say(J.setup.ar); setTimeout(() => sayEn(J.setup.en), 2200); };
    document.getElementById('jHear').addEventListener('click', hear);
    document.getElementById('jSetup').addEventListener('click', () => say(J.setup.ar));
    document.getElementById('jSetupEn').addEventListener('click', () => sayEn(J.setup.en));
    document.getElementById('jReveal').addEventListener('click', () => {
      const host = document.getElementById('jPunch');
      if (host.dataset.done) { say(J.punch.ar); return; }
      host.dataset.done = '1';
      host.innerHTML = `<p class="joke-punch">${J.punch.ar}</p><p class="sb-en">${J.punch.en}</p>`;
      chimeGood();
      say(J.punch.ar);
      setTimeout(() => sayEn(J.punch.en), 1800);
      addStar('sent:' + sentSet.id);
      document.querySelector('.star-count b').textContent = totalStars();
    });
    setTimeout(hear, 300);
    return;
  }

  /* change one word */
  body.innerHTML = `<div class="sb">
    <p class="sb-lead">نَفْسُ الْجُمْلَة… كَلِمَة وَاحِدَة تَغَيَّرَتْ
      <span class="hint-en">Same sentence, one word swapped. Tap each one.</span></p>
    <div class="vary">
      ${L.vary.map((v, i) => `<button class="vary-row" data-i="${i}">
        <span class="v-ar">${v.ar}</span><span class="v-en">${v.en}</span>
      </button>`).join('')}
    </div>
  </div>`;
  body.querySelectorAll('.vary-row').forEach(b => b.addEventListener('click', () => {
    const v = L.vary[+b.dataset.i];
    say(v.ar);
    b.classList.add('said');
    setTimeout(() => b.classList.remove('said'), 800);
    setTimeout(() => sayEn(v.en), 1500);
  }));
  setTimeout(() => sayEn('Change one word.'), 250);
}

function finishSet() {
  addStar('sent:' + sentSet.id, 2);
  chimeGood();
  if (typeof pathStopDone === 'function' && pathStopDone('sentences:' + sentSet.id)) {
    return;
  }
  const host = document.getElementById('sentences');

  host.innerHTML = `<div class="set-done">
    <div class="sd-star">🌟</div>
    <h2>مُمْتَاز!</h2>
    <p class="hint-en">You finished ${sentSet.titleEn}</p>
    <button class="big-btn" id="sdBack">↩ جُمَل أُخْرَى · More sentences</button>
  </div>`;
  say('مُمْتَاز');
  document.getElementById('sdBack').addEventListener('click', renderSentenceHome);
}
