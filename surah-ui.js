/* ————— Hikayat · سُوَر — Al-Fatiha and the ten shortest ————————————————————
   Reza, 2026-08-31: "i want the short surahs to be taught as well… i want the
   ayats to be broken down in aditory fashion and taught the meaning. they
   should listen to real audio… they should be able to memorise and understand
   it completely purely from listening to the audio and repeating in the mind.
   there should be feedback loop on how well they udnerstand it."

   FOUR THINGS THAT ARE DIFFERENT HERE, and each is deliberate.

   1. THE AUDIO IS A REAL RECITER. Everywhere else on this site the voice is
      neural TTS. Not here. Every ayah and almost every word is Mishary Rashid
      Alafasy, stored locally. Synthesised Qur'an would teach wrong madd, wrong
      waqf and a wrong feel, and the child would have to unlearn it later.

   2. NOTHING IS FUNNY. Reza said so himself — "while it cannot me made funny" —
      and he is right. The silly elephant belongs three doors away.

   3. IT IS BUILT TO WORK WITH EYES SHUT. "purely from listening to the audio
      and repeating in the mind." Every step plays on arrival, every control is
      one big target, and the checking questions are spoken and answered by ear.

   4. THE FEEDBACK LOOP IS COUNTED, NOT SCORED. An ayah becomes "understood"
      after it has been answered correctly TWICE, on separate visits — once is
      a guess between three options. The count only ever rises (rule 5), so a
      bad morning cannot take an ayah away, and the number is honest because
      getting it wrong simply does not move it.
   ========================================================================= */
'use strict';

let SURAHS = null;
let surah = null, ayahIdx = 0, sStep = 0, checkState = null;

function loadSurahs() {
  if (SURAHS) return Promise.resolve(SURAHS);
  return fetch('data/surahs.json').then(r => r.json()).then(j => (SURAHS = j));
}

/* ---- the understanding record: a count per ayah, and it only goes up ---- */
const UKEY = a => 'q:' + a.ref;
const understood = a => starsFor(UKEY(a)) >= 2;
function surahProgress(s) {
  return { done: s.ayat.filter(understood).length, total: s.ayat.length };
}

function openSurahs() {
  stopAuto();
  show('surahs');
  document.getElementById('surahs').innerHTML = '<p class="hint">…</p>';
  loadSurahs().then(renderSurahList).catch(() => {
    document.getElementById('surahs').innerHTML =
      '<p class="hint">لَمْ نَجِدِ السُّوَر<span class="hint-en">The surahs could not be loaded.</span></p>';
  });
}

function renderSurahList() {
  const host = document.getElementById('surahs');
  host.innerHTML = `
    <header class="sub-head">
      <button class="back" id="qBack">✕</button>
      <h2>سُوَر <small>Surahs — listen, understand, remember</small></h2>
      <div class="star-count">⭐ <b>${totalStars()}</b></div>
    </header>
    <p class="hint">اِسْتَمِعْ وَافْهَمْ
      <span class="hint-en">Real recitation by ${SURAHS.reciter}. Close your eyes and listen.</span></p>
    <div class="surah-list">
      ${SURAHS.surahs.map(s => {
        const p = surahProgress(s);
        const pct = Math.round(100 * p.done / p.total);
        return `<button class="surah-card" data-id="${s.id}">
          <span class="sc-n">${s.n}</span>
          <span class="sc-main">
            <span class="sc-ar">${s.name}</span>
            <span class="sc-en">${s.nameEn}</span>
          </span>
          <span class="sc-prog">
            <span class="sc-bar"><i style="width:${pct}%"></i></span>
            <small>${p.done} / ${p.total} آيَات</small>
          </span>
        </button>`;
      }).join('')}
    </div>`;
  document.getElementById('qBack').addEventListener('click', () => { renderHome(); show('home'); });
  host.querySelectorAll('.surah-card').forEach(b => b.addEventListener('click', () => {
    surah = SURAHS.surahs.find(s => s.id === b.dataset.id);
    ayahIdx = 0; sStep = 0; renderAyah();
  }));
}

/* ---- the five steps on one ayah ---- */
const kidEn = a => (typeof AYAH_KID !== 'undefined' && AYAH_KID[a.ref]) || a.en;
const kidWord = w => (typeof qword === 'function' && qword(w.ar)) || w.say || w.en;

const QSTEPS = [
  { ic: '🔊', ar: 'اِسْمَعْ',       en: 'Listen' },
  { ic: '🧩', ar: 'كَلِمَة كَلِمَة', en: 'Word by word' },
  { ic: '💭', ar: 'الْمَعْنَى',      en: 'The meaning' },
  { ic: '✨', ar: 'كَيْفَ تَعْمَل',  en: 'How it works', noteOnly: true },
  { ic: '✅', ar: 'اِخْتَبِرْ',      en: 'Check', },
];
const qStepsFor = a => QSTEPS.filter(s => !s.noteOnly || AYAH_NOTES[a.ref]);

function playAyah(a, rate) { playFile('audio/quran/' + a.audio, rate); }

/* The ayah as tappable words. The word list and a plain split on spaces do not
   always agree — a couple of ayat came out of the source with a ragged split —
   so the words are only made tappable when the two line up exactly. Otherwise
   the whole line stays tappable and nothing is mislabelled. */
function ayahWordsHTML(a) {
  const parts = a.ar.split(/\s+/).filter(Boolean);
  if (parts.length !== a.words.length) return a.ar;
  return parts.map((p, i) => `<span class="aw" data-i="${i}">${p}</span>`).join(' ');
}

/* ---- autoplay ------------------------------------------------------------
   Reza: "allow auto play for surahs rather than always click." For memorising
   by ear this matters more than any button: it plays the ayah, waits, plays it
   AGAIN (twice is what makes it stick), then moves on by itself and stops at
   the end of the surah. */
const AUTO = { on: false, timer: null, pass: 0 };
function toggleAuto() { AUTO.on ? stopAuto() : startAuto(); }
function startAuto() { AUTO.on = true; AUTO.pass = 0; renderAyah(); }
function stopAuto() {
  AUTO.on = false; AUTO.pass = 0;
  clearTimeout(AUTO.timer); AUTO.timer = null;
  const b = document.getElementById('qAuto');
  if (b) { b.textContent = '▶️'; b.classList.remove('on'); }
}
function autoPlayThis() {
  const a = surah.ayat[ayahIdx];
  AUTO.pass = 0;
  const run = () => {
    if (!AUTO.on) return;
    playAyah(a);
    AUTO.pass++;
    const el = document.querySelector('.ayah-ar');
    if (el) { el.classList.add('lit'); setTimeout(() => el.classList.remove('lit'), 1200); }
    AUTO.timer = setTimeout(() => {
      if (!AUTO.on) return;
      if (AUTO.pass < 2) return run();                 // hear it twice
      if (ayahIdx < surah.ayat.length - 1) { ayahIdx++; sStep = 0; renderAyah(); }
      else stopAuto();
    }, 5200);
  };
  setTimeout(run, 500);
}

function renderAyah() {
  const a = surah.ayat[ayahIdx];
  const host = document.getElementById('surahs');
  const p = surahProgress(surah);

  host.innerHTML = `
    <header class="sub-head">
      <button class="back" id="qBack">✕</button>
      <h2>${surah.name} <small>${a.ref}${understood(a) ? ' · ✅ فَهِمْتُهَا' : ''}</small></h2>
      <div class="star-count">${p.done}/${p.total}</div>
    </header>

    <div class="ayah-card">
      <p class="ayah-ar" id="ayahAr">${ayahWordsHTML(a)}</p>
      <p class="ayah-en" id="ayahEn">${kidEn(a)}</p>
      <div class="ayah-play">
        <button class="sent-play" id="qPlay">🔊 <span>اِسْمَعْ</span></button>
        <button class="round" id="qSlow" title="Slowly">🐢</button>
        <button class="round ${AUTO.on ? 'on' : ''}" id="qAuto" title="Play the whole surah">${AUTO.on ? '⏸' : '▶️'}</button>
      </div>
      <p class="ayah-tap">اِلْمَسْ أَيَّ كَلِمَة<span class="hint-en">Tap any word to hear the reciter say just that word</span></p>
    </div>

    <div class="steps">
      ${qStepsFor(a).map((s, i) => `
        <button class="step ${i === sStep ? 'on' : ''}" data-i="${i}">
          <span class="st-ic">${s.ic}</span><span class="st-ar">${s.ar}</span><span class="st-en">${s.en}</span>
        </button>`).join('')}
    </div>

    <div class="step-body" id="qBody"></div>

    <div class="lesson-nav">
      <button class="round" id="qPrev" ${ayahIdx === 0 ? 'disabled' : ''} aria-label="Back">→</button>
      <button class="round big" id="qNext" aria-label="Next">${ayahIdx === surah.ayat.length - 1 ? '🏁' : '←'}</button>
    </div>`;

  document.getElementById('qBack').addEventListener('click', () => { stopAuto(); renderSurahList(); });
  document.getElementById('qPlay').addEventListener('click', () => playAyah(a));
  document.getElementById('qSlow').addEventListener('click', () => playAyah(a, 0.6));
  document.getElementById('ayahEn').addEventListener('click', () => sayEn(kidEn(a)));
  /* TAP A WORD IN THE AYAH ITSELF — Reza asked for this directly. It is the same
     real word-by-word recitation the 🧩 step uses, but right here on the line,
     so a child can poke at whichever word they did not catch. */
  host.querySelectorAll('.aw').forEach(el => el.addEventListener('click', ev => {
    ev.stopPropagation();
    const w = a.words[+el.dataset.i];
    if (!w) return;
    el.classList.add('said'); setTimeout(() => el.classList.remove('said'), 900);
    if (w.audio) { playFile('audio/quran/' + w.audio); setTimeout(() => sayEn(kidWord(w)), 1300); }
    else sayEn(kidWord(w));
  }));
  document.getElementById('qAuto').addEventListener('click', toggleAuto);
  host.querySelectorAll('.step').forEach(b => b.addEventListener('click', () => {
    sStep = +b.dataset.i;
    host.querySelectorAll('.step').forEach(x => x.classList.toggle('on', x === b));
    renderQStep();
  }));
  document.getElementById('qPrev').addEventListener('click', () => {
    if (ayahIdx > 0) { ayahIdx--; sStep = 0; renderAyah(); }
  });
  document.getElementById('qNext').addEventListener('click', () => {
    if (ayahIdx < surah.ayat.length - 1) { ayahIdx++; sStep = 0; renderAyah(); }
    else renderSurahList();
  });

  renderQStep();
  if (AUTO.on) autoPlayThis(); else setTimeout(() => playAyah(a), 400);
}

function renderQStep() {
  const a = surah.ayat[ayahIdx];
  const body = document.getElementById('qBody');
  const steps = qStepsFor(a);
  const kind = (steps[sStep] || steps[0]).en;

  if (kind === 'Listen') {
    body.innerHTML = `<div class="sb">
      <p class="sb-lead">اِسْتَمِعْ ثُمَّ رَدِّدْ فِي عَقْلِك
        <span class="hint-en">Listen, then say it again inside your head. That is how it is memorised.</span></p>
      <button class="sb-big" id="qAgain">🔊<small>Once more</small></button>
      <button class="sb-big" id="qAgainSlow">🐢<small>Slowly</small></button>
    </div>`;
    document.getElementById('qAgain').addEventListener('click', () => playAyah(a));
    document.getElementById('qAgainSlow').addEventListener('click', () => playAyah(a, 0.6));
    return;
  }

  if (kind === 'Word by word') {
    body.innerHTML = `<div class="sb">
      <p class="sb-lead">اِلْمَسْ كُلَّ كَلِمَة
        <span class="hint-en">Tap each word: the reciter says it, then you hear what it means.</span></p>
      <div class="qwords">
        ${a.words.map((w, i) => `<button class="qword" data-i="${i}">
          <span class="qw-ar">${w.ar}</span><span class="qw-en">${kidWord(w)}</span>
        </button>`).join('')}
      </div>
    </div>`;
    body.querySelectorAll('.qword').forEach(b => b.addEventListener('click', () => {
      const w = a.words[+b.dataset.i];
      b.classList.add('said'); setTimeout(() => b.classList.remove('said'), 900);
      if (w.audio) { playFile('audio/quran/' + w.audio); setTimeout(() => sayEn(kidWord(w)), 1300); }
      else sayEn(kidWord(w));
    }));
    return;
  }

  if (kind === 'The meaning') {
    body.innerHTML = `<div class="sb">
      <button class="sb-big" id="qMean">💭<small>Tap to hear the meaning</small></button>
      <p class="sb-en" id="qMeanT">${kidEn(a)}</p>
    </div>`;
    const go = () => sayEn(kidEn(a));
    document.getElementById('qMean').addEventListener('click', go);
    document.getElementById('qMeanT').addEventListener('click', go);
    setTimeout(go, 250);
    return;
  }

  if (kind === 'How it works') {
    const note = AYAH_NOTES[a.ref];
    const prompts = AYAH_PROMPTS[a.ref] || [];
    body.innerHTML = `<div class="sb">
      <button class="sb-big" id="qWhy">✨<small>Tap to hear how it works</small></button>
      <p class="sb-en why" id="qWhyT">${note}</p>
      ${prompts.length ? `<div class="qprompts">${prompts.map((t, i) =>
        `<button class="qprompt" data-i="${i}">🤔 ${t}</button>`).join('')}</div>` : ''}
    </div>`;
    const go = () => sayEn(note);
    document.getElementById('qWhy').addEventListener('click', go);
    document.getElementById('qWhyT').addEventListener('click', go);
    body.querySelectorAll('.qprompt').forEach(b => b.addEventListener('click', () => {
      sayEn(prompts[+b.dataset.i]);
      setTimeout(() => playAyah(a, 0.6), 2200);   // then hear it again, slowly, to answer
    }));
    setTimeout(go, 250);
    return;
  }

  /* ---- the check: the feedback loop ----
     Hear the ayah, choose what it means, from three. The distractors are other
     ayat the child has actually met, so the choice is about meaning and not
     about which option is longest. */
  const pool = SURAHS.surahs.flatMap(s => s.ayat).filter(x => x.ref !== a.ref && kidEn(x));
  const picks = [];
  const seed = (ayahIdx * 7 + surah.n * 13);
  for (let i = 0; picks.length < 2 && i < pool.length; i++) {
    const c = pool[(seed + i * 17) % pool.length];
    if (!picks.includes(c)) picks.push(c);
  }
  const opts = [a, ...picks].sort((x, y) => (x.ref + seed).localeCompare(y.ref + seed));
  checkState = { answered: false };

  body.innerHTML = `<div class="sb">
    <p class="sb-lead">مَاذَا تَعْنِي هَذِهِ الْآيَة؟
      <span class="hint-en">Listen again, then choose what it means. Tap a choice to hear it.</span></p>
    <button class="sb-big" id="qcPlay">🔊<small>Hear the ayah</small></button>
    <div class="vary">
      ${opts.map((o, i) => `<button class="vary-row qopt" data-i="${i}">
        <span class="v-en" style="direction:ltr;text-align:left;font-size:15px">${kidEn(o)}</span>
      </button>`).join('')}
    </div>
    <p class="qc-tally">${starsFor(UKEY(a))} ✓ ${understood(a) ? '— فَهِمْتُهَا! understood' : '— two right and it is yours'}</p>
  </div>`;

  document.getElementById('qcPlay').addEventListener('click', () => playAyah(a));
  body.querySelectorAll('.qopt').forEach(b => b.addEventListener('click', () => {
    const chosen = opts[+b.dataset.i];
    sayEn(kidEn(chosen));
    if (checkState.answered) return;
    if (chosen.ref === a.ref) {
      checkState.answered = true;
      b.classList.add('correct');
      chimeGood();
      addStar(UKEY(a));
      addStar('surah:' + surah.id);
      setTimeout(() => renderQStep(), 1400);
    } else {
      b.classList.add('wrong');
      chimeBad();
      setTimeout(() => { b.classList.remove('wrong'); playAyah(a); }, 900);
    }
  }));
  setTimeout(() => playAyah(a), 350);
}
