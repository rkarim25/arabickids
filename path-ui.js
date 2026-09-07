/* ————— Hikayat · The Path UI (المَسَار) ——————————————————————————————————
   Dedicated full-page views and checkpoints for daily walks:
     - Hello screen (anchor sentence greeting)
     - Choice screen (Keep going / Do it again / Finish for today)
     - Story checkpoint (every 6 lines)
     - Sentence review flashcards
     - Road map (المَسَار)
     - Bye screen (stars celebration)
   ========================================================================= */
'use strict';

function getAnchorSentence(ref) {
  if (ref && ref.startsWith('lesson:')) {
    const clean = ref.replace('lesson:', '');
    const [setId, idxStr] = clean.split('/');
    const set = typeof SENTENCE_SETS !== 'undefined' && SENTENCE_SETS.find(s => s.id === setId);
    if (set && set.lessons) {
      const idx = parseInt(idxStr, 10) || 0;
      const l = set.lessons[idx];
      if (l) return { ar: l.ar, en: l.en };
    }
  }
  const fallback = typeof TWENTY_SENTENCES !== 'undefined' && TWENTY_SENTENCES.find(s => s.id === ref);
  if (fallback) return { ar: fallback.ar, en: fallback.en };
  return { ar: 'أَنَا هُنَا.', en: 'I am here.' };
}

/* 1. Hello Screen */
function renderPathHello(anchorRef) {
  const host = document.getElementById('pathView');
  if (!host) return;
  const sentence = getAnchorSentence(anchorRef);

  host.innerHTML = `
    <div class="path-screen">
      <div class="path-lulu">🐱</div>
      <div class="path-bubble">
        <b>${sentence.ar}</b>
        <small>${sentence.en}</small>
      </div>
      <button class="big-btn" id="startWalkBtn" style="font-size:24px;padding:18px 36px;min-height:68px">
        هَيَّا نَمْشِي · Let's walk 🚶‍♀️
      </button>
    </div>`;

  const speak = () => {
    if (typeof say === 'function') say(sentence.ar);
  };
  document.getElementById('startWalkBtn').addEventListener('click', () => {
    chimeGood();
    pathNext();
  });
  setTimeout(speak, 400);
}

/* 2. Choice Screen */
function renderPathChoice(reason) {
  const host = document.getElementById('pathView');
  if (!host) return;

  const isCap = (reason === 'cap');
  const leadAr = isCap ? 'وَقْتٌ رَائِع! هَلْ نُكْمِل؟' : 'مُمْتَاز! مَاذَا نَفْعَلُ الْآن؟';
  const leadEn = isCap ? 'Great focus! Keep going or take a break?' : 'Well done! What would you like to do next?';

  host.innerHTML = `
    <div class="path-screen">
      <div class="path-lulu">🐱</div>
      <div class="path-bubble">
        <b>${leadAr}</b>
        <small>${leadEn}</small>
      </div>

      <div class="path-choice-grid">
        <button class="path-choice-btn keep" id="pcKeep">
          <span class="pc-ic">▶️</span>
          <div class="pc-text">
            <span class="pc-ar">هَيَّا نُكْمِل</span>
            <span class="pc-en">Keep going · next step</span>
          </div>
        </button>

        <button class="path-choice-btn again" id="pcAgain">
          <span class="pc-ic">🔁</span>
          <div class="pc-text">
            <span class="pc-ar">مَرَّة أُخْرَى</span>
            <span class="pc-en">Do it again · practice</span>
          </div>
        </button>

        <button class="path-choice-btn finish" id="pcFinish">
          <span class="pc-ic">🌙</span>
          <div class="pc-text">
            <span class="pc-ar">كَفَى لِلْيَوْم</span>
            <span class="pc-en">Finish for today · save &amp; rest</span>
          </div>
        </button>
      </div>
    </div>`;

  document.getElementById('pcKeep').addEventListener('click', () => {
    if (typeof say === 'function') say('هَيَّا نُكْمِل');
    chimeGood();
    pathNext();
  });
  document.getElementById('pcAgain').addEventListener('click', () => {
    if (typeof say === 'function') say('مَرَّة أُخْرَى');
    pathAgain();
  });
  document.getElementById('pcFinish').addEventListener('click', () => {
    if (typeof say === 'function') say('كَفَى لِلْيَوْم');
    pathFinish();
  });
}

/* 3. Review Screen: Spaced Repetition for Sentences */
let reviewDeck = [];
let reviewIdx = 0;

function renderPathReview(dueCards) {
  reviewDeck = dueCards || [];
  reviewIdx = 0;
  if (!reviewDeck.length) {
    pathNext();
    return;
  }
  showCurrentReviewCard();
}

function showCurrentReviewCard() {
  const host = document.getElementById('pathView');
  if (!host) return;

  if (reviewIdx >= reviewDeck.length) {
    pathNext();
    return;
  }

  const card = reviewDeck[reviewIdx];
  const sentence = getAnchorSentence(card.id);
  let revealed = false;

  host.innerHTML = `
    <div class="path-screen">
      <div class="sub-head" style="width:100%;margin-bottom:12px">
        <span class="band-chip" style="background:#E8A33D;color:#fff">
          مُرَاجَعَة ${reviewIdx + 1} مِنْ ${reviewDeck.length} · Review
        </span>
      </div>

      <div class="sent-card" id="revCard" style="cursor:pointer;width:100%;max-width:480px;min-height:220px">
        <p class="sent-ar" style="font-size:36px;margin:20px 0">${sentence.ar}</p>
        <button class="sent-play" id="revSpeak">🔊 <span>اِسْمَعْ</span></button>
        <div id="revBack" style="display:none;margin-top:16px;border-top:1px solid #E7D8BC;padding-top:12px">
          <p class="sent-en" style="font-size:20px;color:var(--ink)">${sentence.en}</p>
        </div>
      </div>

      <div id="revAction" style="margin-top:20px;display:none;gap:12px">
        <button class="big-btn" id="revAgainBtn" style="background:#E8A33D;box-shadow:0 6px 0 #B2751E">
          🔁 مَرَّة أُخْرَى · Again
        </button>
        <button class="big-btn" id="revSaidBtn" style="background:var(--teal);box-shadow:0 6px 0 #1F7A6F">
          ⭐ قُلْتُهَا! · I said it!
        </button>
      </div>

      <p class="hint" id="revHint" style="margin-top:16px">
        اِسْتَمِعْ ثُمَّ قُلْهَا أَنْت! اِلْمَسِ الْبِطَاقَة لِتَرَى الْمَعْنَى
        <span class="hint-en">Listen, then say it! Tap card to reveal meaning.</span>
      </p>
    </div>`;

  const speak = () => { if (typeof say === 'function') say(sentence.ar); };
  document.getElementById('revSpeak').addEventListener('click', e => { e.stopPropagation(); speak(); });
  document.getElementById('revCard').addEventListener('click', () => {
    if (!revealed) {
      revealed = true;
      document.getElementById('revBack').style.display = 'block';
      document.getElementById('revAction').style.display = 'flex';
      document.getElementById('revHint').style.display = 'none';
      if (typeof sayEn === 'function') sayEn(sentence.en);
    } else {
      speak();
    }
  });

  document.getElementById('revSaidBtn').addEventListener('click', () => {
    const state = loadPathState();
    recordCardReview(state, card.id, true);
    addStar('path:review');
    chimeGood();
    reviewIdx++;
    showCurrentReviewCard();
  });

  document.getElementById('revAgainBtn').addEventListener('click', () => {
    const state = loadPathState();
    recordCardReview(state, card.id, false);
    chimeBad();
    reviewIdx++;
    showCurrentReviewCard();
  });

  setTimeout(speak, 350);
}

/* 4. Bye Screen */
function renderPathBye() {
  const host = document.getElementById('pathView');
  if (!host) return;

  host.innerHTML = `
    <div class="path-screen">
      <div class="path-lulu">🌙✨</div>
      <div class="path-bubble">
        <b>مَعَ السَّلَامَة! أَحْسَنْتَ الْيَوْم</b>
        <small>Goodbye! You did wonderful learning today!</small>
      </div>
      <div class="star-count" style="font-size:32px;margin-bottom:24px">
        ⭐ <b>${typeof totalStars === 'function' ? totalStars() : ''}</b>
      </div>
      <button class="big-btn" id="byeHomeBtn" style="font-size:22px;padding:16px 32px">
        الرَّئِيسِيَّة · Home 🏠
      </button>
    </div>`;

  document.getElementById('byeHomeBtn').addEventListener('click', () => {
    pathFinish();
  });
  if (typeof say === 'function') say('مَعَ السَّلَامَة');
}

/* 5. Checkpoint Modal inside long stories (every 6 lines) */
function showStoryCheckpoint(onKeep, onAgain, onLeave) {
  const overlay = document.createElement('div');
  overlay.className = 'checkpoint-overlay';
  overlay.innerHTML = `
    <div class="checkpoint-card">
      <div style="font-size:54px;margin-bottom:8px">🐱</div>
      <h3 class="cp-head">نُكْمِل؟</h3>
      <p class="cp-sub">Shall we keep going or do something else?</p>

      <div class="path-choice-grid">
        <button class="path-choice-btn keep" id="cpKeep">
          <span class="pc-ic">▶️</span>
          <div class="pc-text">
            <span class="pc-ar">نُكْمِل!</span>
            <span class="pc-en">Keep going · next lines</span>
          </div>
        </button>

        <button class="path-choice-btn again" id="cpAgain">
          <span class="pc-ic">🔁</span>
          <div class="pc-text">
            <span class="pc-ar">مَرَّة أُخْرَى</span>
            <span class="pc-en">This bit again</span>
          </div>
        </button>

        <button class="path-choice-btn finish" id="cpLeave">
          <span class="pc-ic">✨</span>
          <div class="pc-text">
            <span class="pc-ar">شَيْء آخَر</span>
            <span class="pc-en">Something else</span>
          </div>
        </button>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  const close = () => {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  };

  overlay.querySelector('#cpKeep').addEventListener('click', () => {
    close();
    if (typeof say === 'function') say('نُكْمِل');
    if (onKeep) onKeep();
  });

  overlay.querySelector('#cpAgain').addEventListener('click', () => {
    close();
    if (typeof say === 'function') say('مَرَّة أُخْرَى');
    if (onAgain) onAgain();
  });

  overlay.querySelector('#cpLeave').addEventListener('click', () => {
    close();
    if (typeof say === 'function') say('شَيْء آخَر');
    if (onLeave) onLeave();
  });

  if (typeof say === 'function') say('نُكْمِل');
}
