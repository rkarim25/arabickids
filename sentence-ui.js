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

let sentSet = null;      // the set being worked through
let sentIdx = 0;         // which lesson within it
let sentStep = 0;        // which of the five steps

function openSentences() { sentSet = null; renderSentenceHome(); show('sentences'); }

/* ---------- choosing a set ---------- */
function renderSentenceHome() {
  const host = document.getElementById('sentences');
  host.innerHTML = `
    <header class="sub-head">
      <button class="back" id="jBack">✕</button>
      <h2>جُمَل <small>Sentences</small></h2>
      <div class="star-count">⭐ <b>${totalStars()}</b></div>
    </header>
    <p class="hint">اِخْتَرْ وَاسْتَمِعْ
      <span class="hint-en">Pick a set. Everything talks — nothing to read.</span></p>
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
  document.getElementById('jBack').addEventListener('click', () => { renderHome(); show('home'); });
  host.querySelectorAll('.set-card').forEach(b => b.addEventListener('click', () => {
    sentSet = SENTENCE_SETS.find(s => s.id === b.dataset.s);
    sentIdx = 0; sentStep = 0;
    renderLesson();
  }));
}

/* ---------- one sentence, five steps ---------- */
const STEPS = [
  { ic: '🔊', ar: 'اِسْتَمِعْ',        en: 'Listen' },
  { ic: '💭', ar: 'مَا مَعْنَاهَا؟',   en: 'What does it mean?' },
  { ic: '✨', ar: 'كَيْفَ تَعْمَل؟',   en: 'How it works' },
  { ic: '🎤', ar: 'قُلْهَا أَنْتَ',    en: 'Now you say it' },
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
    <header class="sub-head">
      <button class="back" id="jBack">✕</button>
      <h2>${sentSet.title} <small>${sentIdx + 1} / ${sentSet.lessons.length}</small></h2>
      <div class="star-count">⭐ <b>${totalStars()}</b></div>
    </header>

    <div class="sent-card">
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
  /* the meaning is on the card now, not hidden behind step 2 — Reza, looking at
     a lesson: "where is the english here?" It was two taps away, which on an
     ear-first site may as well be nowhere. */
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

  /* ---- 6. SAY ANYTHING — the frame, and permission to use an English word ----
     Reza's idea, and the most useful thing here: "if you dont know the word for
     pen just say urid pen… this should remove some barriers to speaking more."
     The English slots are not a fallback hidden away in small print, they are
     shown in the same list as the Arabic ones and spoken aloud, because the
     point is that using one is ALLOWED and normal, not a failure. */
  if (sentStep === 5 && L.frame) {
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
  if (L.joke && (stepsFor(L)[sStep] || {}).en === 'The joke') {
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
