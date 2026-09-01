/* ————— Hikayat · reading a story with no pictures ————————————————————————
   The reader for stories-text.js. It is deliberately plainer than the picture
   reader: no scene, no page-turn animation, nothing moving. On this shelf the
   words are the only thing on the page, and anything else competing with them
   is working against the point.

   What replaces the illustration:
     · every LINE plays, and every WORD in it is its own tap;
     · the meaning sits under the Arabic with a gap, spoken on tap;
     · ▶️ reads the whole story aloud, line by line, highlighting as it goes —
       the same autoplay the surahs got, because a child who wants to follow
       along rather than work should be able to;
     · finishing earns a star, and the story can be read again forever.

   Lives inside 📖 الكُتُب as a second shelf rather than a new door: the site is
   at its five-door ceiling (DESIGN.md §2) and a sixth would be the beginning of
   the sprawl that rule exists to prevent.
   ========================================================================= */
'use strict';

let tsStory = null, tsLine = 0;
const TAUTO = { on: false, timer: null };

function openTextStory(id) {
  tsStory = TEXT_STORIES.find(s => s.id === id);
  tsLine = 0;
  stopTextAuto();
  renderTextStory();
  show('textStory');
}

function stopTextAuto() {
  TAUTO.on = false;
  clearTimeout(TAUTO.timer); TAUTO.timer = null;
  const b = document.getElementById('tsAuto');
  if (b) { b.textContent = '▶️'; b.classList.remove('on'); }
}

function renderTextStory() {
  const s = tsStory;
  const host = document.getElementById('textStory');
  const lv = LEVELS[s.level - 1];

  host.innerHTML = `
    <header class="page-head">
      <button class="nav-back-btn" id="tsBack" title="Back to Shelf">
        <span class="back-arr">←</span>
        <span class="back-lbl">الكُتُب · Books</span>
      </button>
      <div class="page-title">
        <h1>${s.title}</h1>
        <p class="tag">${s.titleEn}</p>
      </div>
      <div class="star-count">⭐ <b>${totalStars()}</b></div>
    </header>

    <div class="ts-bar">
      <span class="band-chip" style="background:${lv.color};color:${lv.ink}">
        المستوى ${AR_NUM[s.level]} · ${lv.nameEn}</span>
      <button class="round" id="tsAuto" title="Read the whole story">▶️</button>
      <button class="round sm" id="tsMode" title="${LISTEN_LABEL[listenMode()].en}">${listenMode() === 'ar' ? '🇸🇦' : listenMode() === 'en' ? '🌍' : '🔁'}</button>
    </div>

    <div class="ts-page" id="tsPage">
      ${s.lines.map((l, i) => `
        <div class="ts-line" data-i="${i}">
          <p class="ts-ar">${l.ar.split(/\s+/).filter(Boolean)
            .map((w, j) => `<span class="tw-w" data-l="${i}" data-w="${j}">${w}</span>`).join(' ')}</p>
          <p class="ts-en" data-i="${i}">${l.en}</p>
        </div>`).join('')}
    </div>

    <div class="lesson-nav">
      <button class="round big" id="tsDone" aria-label="Finished">🏁</button>
    </div>`;

  document.getElementById('tsBack').addEventListener('click', () => { stopTextAuto(); show('shelf'); });
  document.getElementById('tsAuto').addEventListener('click', () => TAUTO.on ? stopTextAuto() : startTextAuto());
  document.getElementById('tsMode').addEventListener('click', () => {
    cycleListen();
    const was = TAUTO.on;
    stopTextAuto(); renderTextStory();
    if (was) startTextAuto();
  });
  document.getElementById('tsDone').addEventListener('click', finishTextStory);

  /* a whole line */
  host.querySelectorAll('.ts-ar').forEach((el, i) =>
    el.addEventListener('click', () => { litLine(i); say(s.lines[i].ar); }));
  /* one word inside it — the tap that matters when there is no picture */
  host.querySelectorAll('.tw-w').forEach(el => el.addEventListener('click', ev => {
    ev.stopPropagation();
    const line = s.lines[+el.dataset.l];
    const word = line.ar.split(/\s+/).filter(Boolean)[+el.dataset.w];
    el.classList.add('said'); setTimeout(() => el.classList.remove('said'), 800);
    saySlow(word);
  }));
  /* the meaning */
  host.querySelectorAll('.ts-en').forEach((el, i) =>
    el.addEventListener('click', () => sayEn(s.lines[i].en)));
}

function litLine(i) {
  document.querySelectorAll('.ts-line').forEach(el => el.classList.remove('lit'));
  const el = document.querySelector(`.ts-line[data-i="${i}"]`);
  if (el) { el.classList.add('lit'); el.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
}

/* Read the whole thing: Arabic, then its meaning, then the next line — unless
   the 🌍 button says otherwise. Reza asked for Arabic only and English only
   (2026-08-31); the setting is shared with the surah reader and lives in
   audio.js, because a family that wants Arabic only wants it everywhere. */
function startTextAuto() {
  TAUTO.on = true; tsLine = 0;
  const b = document.getElementById('tsAuto');
  if (b) { b.textContent = '⏸'; b.classList.add('on'); }
  const step = () => {
    if (!TAUTO.on) return;
    if (tsLine >= tsStory.lines.length) { stopTextAuto(); finishTextStory(); return; }
    const l = tsStory.lines[tsLine];
    litLine(tsLine);
    const meaningThenOn = () => {
      if (!TAUTO.on) return;
      if (!sayEnglishToo()) { tsLine++; return step(); }
      sayEn(l.en);
      TAUTO.timer = setTimeout(() => { tsLine++; step(); }, 3200);
    };
    if (sayArabicToo()) {
      say(l.ar);
      TAUTO.timer = setTimeout(meaningThenOn, 3200);
    } else meaningThenOn();
  };
  step();
}

function finishTextStory() {
  stopTextAuto();
  addStar('ts:' + tsStory.id);
  chimeGood();
  say('مُمْتَاز');
  const host = document.getElementById('textStory');
  host.innerHTML = `<div class="set-done">
    <div class="sd-star">🌟</div>
    <h2>قَرَأْتَهَا!</h2>
    <p class="hint-en">You read ${tsStory.titleEn} — with no pictures at all.</p>
    <button class="big-btn" id="tsAgain">🔁 مَرَّة أُخْرَى · Read it again</button>
    <button class="big-btn" id="tsShelf">📖 قِصَّة أُخْرَى · Another story</button>
  </div>`;
  document.getElementById('tsAgain').addEventListener('click', () => { tsLine = 0; renderTextStory(); });
  document.getElementById('tsShelf').addEventListener('click', () => show('shelf'));
}
