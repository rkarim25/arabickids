/* ————— Hikayat · القَاعِدَة — learning to read, the whole ladder ——————————————
   Reza: "can you introduce a reading section which covers all the qaida… all
   the qaida books that is", and then: "is all the qaidas there to help her
   learn how to read". The honest answer at the time was no — the site had the
   28 letters and three harakat on six letters, which is the first two pages.

   Worse, the reading ladder was quietly leaning on a Qaida that did not exist:
   sukoon gates Level 2 books, shadda gates Level 3, and sun-letter اَلْ gates
   Level 4, and NONE of them was taught anywhere on the site. A child could be
   blocked at a band by a mark nobody had ever shown them.

   Nine stages now, generated in scripts/gen-qaida.js so a mis-typed haraka
   cannot slip in by hand:

     ١ الحُرُوف        the 28, alone
     ٢ أَشْكَال الحَرْف  the four shapes, and the six that never join forward
     ٣ الحَرَكَات       every letter x fatha, kasra, damma
     ٤ التَّنْوِين       the doubled marks
     ٥ المُدُود         the long vowels — hold the sound
     ٦ السُّكُون        the stop            (this is what Level 2 needs)
     ٧ الشَّدَّة         say it twice        (Level 3)
     ٨ اللَّام           sun lam and moon lam (Level 4)
     ٩ كَلِمَات         real Qur'anic words, REAL RECITER

   The last stage is the point: everything before it is scaffolding, and it ends
   with Alafasy rather than a machine.

   AUDIO. Every cell is a REAL syllable — بَ, بًا, بَا, أَبْ, أَبَّ — which the
   speech engine says correctly. A bare consonant is what it cannot say, and
   trying to make it was what produced the stuttering letters earlier. Cells are
   keyed on their EXACT text: norm() strips tashkeel, so بَ / بِ / بُ would have
   shared one clip and the stage would have taught nothing.
   ========================================================================= */
'use strict';

let QAIDA = null;
let qStage = null;
const QAUTO = { on: false, timer: null, i: 0 };

function loadQaida() {
  if (QAIDA) return Promise.resolve(QAIDA);
  return fetch('data/qaida.json').then(r => r.json()).then(j => (QAIDA = j));
}

/* a Qaida cell plays by its exact text, never through normAr() */
function sayCell(c) {
  const t = (c && (c.say || c.show)) || '';
  const stem = MANIFEST && MANIFEST['q:' + t.trim()];
  if (stem) playFile('audio/' + stem + '.mp3');
  else say(t);                     // fallback: better than silence
}

function openQaida() {
  stopQAuto();
  show('qaida');
  document.getElementById('qaida').innerHTML = '<p class="hint">…</p>';
  loadQaida().then(renderStageList).catch(() => {
    document.getElementById('qaida').innerHTML =
      '<p class="hint">لَمْ نَجِدِ القَاعِدَة<span class="hint-en">The reading ladder could not be loaded.</span></p>';
  });
}

const qStars = st => starsFor('qaida:' + st.id);

function renderStageList() {
  const host = document.getElementById('qaida');
  host.innerHTML = `
    <header class="sub-head">
      <button class="back" id="qdBack">✕</button>
      <h2>القَاعِدَة <small>Learning to read, step by step</small></h2>
      <div class="star-count">⭐ <b>${totalStars()}</b></div>
    </header>
    <p class="hint">مِنَ الحَرْف إِلَى القُرْآن
      <span class="hint-en">From a single letter to real words. Work down the list — each step uses the one before.</span></p>
    <div class="stage-list">
      ${QAIDA.stages.map(st => `
        <button class="stage-card" data-id="${st.id}">
          <span class="sg-n">${['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'][st.n] || st.n}</span>
          <span class="sg-main">
            <span class="sg-ar">${st.title}</span>
            <span class="sg-en">${st.titleEn}</span>
            <span class="sg-teach">${st.teaches}</span>
          </span>
          ${qStars(st) ? `<span class="sg-done">⭐ ${qStars(st)}</span>` : ''}
        </button>`).join('')}
    </div>`;
  document.getElementById('qdBack').addEventListener('click', () => { renderHome(); show('home'); });
  host.querySelectorAll('.stage-card').forEach(b => b.addEventListener('click', () => {
    qStage = QAIDA.stages.find(s => s.id === b.dataset.id);
    renderStage();
  }));
}

function renderStage() {
  const st = qStage;
  const host = document.getElementById('qaida');

  let body = '';
  if (st.real) {
    body = `<div class="q-real">${st.real.map((w, i) =>
      `<button class="q-word" data-i="${i}"><span>${w.show}</span><small>${w.ref}</small></button>`).join('')}</div>`;
  } else if (st.pairs) {
    body = `
      <p class="q-sub">اللَّام الشَّمْسِيَّة <span class="hint-en">the l disappears and doubles the next letter</span></p>
      <div class="q-grid">${st.pairs.map((p, i) =>
        `<button class="q-cell sun" data-k="p${i}">${p.sun.show}</button>`).join('')}</div>
      <p class="q-sub">اللَّام القَمَرِيَّة <span class="hint-en">you can hear the l</span></p>
      <div class="q-grid">${st.moon.map((c, i) =>
        `<button class="q-cell moon" data-k="m${i}">${c.show}</button>`).join('')}</div>`;
  } else if (st.rows) {
    body = `<div class="q-rows">${st.rows.map((row, r) =>
      `<div class="q-row">${row.map((c, i) =>
        `<button class="q-cell" data-k="r${r}-${i}">${c.show}</button>`).join('')}</div>`).join('')}</div>`;
  } else {
    body = `<div class="q-grid ${st.wide ? 'wide' : ''}">${st.cells.map((c, i) =>
      `<button class="q-cell ${st.wide ? 'w' : ''}" data-k="c${i}">${c.show}</button>`).join('')}</div>`;
  }

  host.innerHTML = `
    <header class="sub-head">
      <button class="back" id="qdBack">✕</button>
      <h2>${st.title} <small>${st.titleEn}</small></h2>
      <button class="round" id="qdAuto" title="Read them all">▶️</button>
    </header>
    <p class="q-teach">${st.teaches}</p>
    ${body}`;

  document.getElementById('qdBack').addEventListener('click', () => { stopQAuto(); renderStageList(); });
  document.getElementById('qdAuto').addEventListener('click', () => QAUTO.on ? stopQAuto() : startQAuto());

  host.querySelectorAll('.q-cell').forEach(b => b.addEventListener('click', () => {
    b.classList.add('said'); setTimeout(() => b.classList.remove('said'), 700);
    sayCell(cellByKey(b.dataset.k));
    bumpStage();
  }));
  host.querySelectorAll('.q-word').forEach(b => b.addEventListener('click', () => {
    const w = st.real[+b.dataset.i];
    b.classList.add('said'); setTimeout(() => b.classList.remove('said'), 900);
    playFile(w.audio);                 // the real reciter, not the engine
    bumpStage();
  }));
}

function cellByKey(k) {
  const st = qStage;
  if (k[0] === 'c') return st.cells[+k.slice(1)];
  if (k[0] === 'p') return st.pairs[+k.slice(1)].sun;
  if (k[0] === 'm') return st.moon[+k.slice(1)];
  const [r, i] = k.slice(1).split('-').map(Number);
  return st.rows[r][i];
}

/* practising a stage is worth a star, but only now and then — a star for every
   single tap would make the number meaningless */
let tapCount = 0;
function bumpStage() {
  if (++tapCount % 10) return;
  addStar('qaida:' + qStage.id);
  const el = document.querySelector('.star-count b');
  if (el) el.textContent = totalStars();
}

/* ---- read them all, in order, hands free ---- */
function stopQAuto() {
  QAUTO.on = false; clearTimeout(QAUTO.timer); QAUTO.timer = null; QAUTO.i = 0;
  const b = document.getElementById('qdAuto');
  if (b) { b.textContent = '▶️'; b.classList.remove('on'); }
  document.querySelectorAll('.q-cell.lit, .q-word.lit').forEach(x => x.classList.remove('lit'));
}
function startQAuto() {
  QAUTO.on = true; QAUTO.i = 0;
  const b = document.getElementById('qdAuto');
  if (b) { b.textContent = '⏸'; b.classList.add('on'); }
  const items = [...document.querySelectorAll('.q-cell, .q-word')];
  const step = () => {
    if (!QAUTO.on || QAUTO.i >= items.length) return stopQAuto();
    const el = items[QAUTO.i++];
    document.querySelectorAll('.lit').forEach(x => x.classList.remove('lit'));
    el.classList.add('lit');
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    el.click();
    QAUTO.timer = setTimeout(step, 1700);
  };
  step();
}
