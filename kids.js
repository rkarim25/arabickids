/* ————— Hikayat · home, children, sounds, companion ————————————————————————
   DESIGN.md is the contract. The three rules that shape every line here:
   ear first, the picture carries the meaning, and no writing anywhere.

   Nothing in this file asks a child to read English or type anything. The only
   text a child needs is Arabic they are being taught, and every piece of it is
   one tap from its own sound.
   ========================================================================= */
'use strict';

/* ================= children ==============================================
   No accounts, no names typed in — rule 6 says a four-year-old navigates by
   picture, and a four-year-old cannot spell their own name yet. A child IS a
   face and a colour, chosen by tapping. Stars live on the device, per child,
   and can never be lost. */

const FACES = [
  { id: 'fox',    emoji: '🦊', color: '#F49E4C' },
  { id: 'cat',    emoji: '🐱', color: '#F2A5A5' },
  { id: 'panda',  emoji: '🐼', color: '#7FB0D6' },
  { id: 'frog',   emoji: '🐸', color: '#7BC08F' },
  { id: 'owl',    emoji: '🦉', color: '#A98CD0' },
  { id: 'lion',   emoji: '🦁', color: '#FFD166' },
  { id: 'bunny',  emoji: '🐰', color: '#EFB8C8' },
  { id: 'turtle', emoji: '🐢', color: '#5FA777' },
];

const KIDS_KEY = 'hikayat-kids';
const WHO_KEY = 'hikayat-who';

const readJSON = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
const writeJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode — play on */ } };

function allKids() { return readJSON(KIDS_KEY, []); }
function saveKids(list) { writeJSON(KIDS_KEY, list); }
function whoId() { return readJSON(WHO_KEY, null); }
function setWho(id) { writeJSON(WHO_KEY, id); }
function currentKid() { return allKids().find(k => k.id === whoId()) || null; }

function addKid(faceId) {
  const list = allKids();
  if (list.some(k => k.face === faceId)) return list.find(k => k.face === faceId);
  const kid = { id: 'k' + Date.now().toString(36), face: faceId, stars: {}, made: Date.now() };
  list.push(kid); saveKids(list); return kid;
}
function faceOf(kid) { return FACES.find(f => f.id === (kid && kid.face)) || FACES[0]; }

/* Stars are only ever ADDED. Rule 5: there is no score to lose. */
function addStar(key, n = 1) {
  const list = allKids(), kid = list.find(k => k.id === whoId());
  if (!kid) return 0;
  kid.stars[key] = (kid.stars[key] || 0) + n;
  saveKids(list);
  if (typeof syncSoon === 'function') syncSoon();   // quietly, a few seconds later
  return kid.stars[key];
}
function starsFor(key) { const k = currentKid(); return (k && k.stars[key]) || 0; }
function totalStars() { const k = currentKid(); return k ? Object.values(k.stars).reduce((a, b) => a + b, 0) : 0; }

/* ================= the companion =========================================
   Lulu the cat is already the children's character across the storybooks, so
   she is the guide here too rather than some new mascot. She says things out
   loud; the written line beside her is for the grown-up. */

const LULU_LINES = [
  { ar: 'مَرْحَبًا! هَيَّا نَقْرَأ', en: 'Hello! Let\'s read' },
  { ar: 'أَحْسَنْت!', en: 'Well done!' },
  { ar: 'اِسْمَعْ جَيِّدًا', en: 'Listen carefully' },
  { ar: 'مُمْتَاز!', en: 'Excellent!' },
  { ar: 'مَرَّة أُخْرَى', en: 'One more time' },
];
function luluSays(i) {
  const line = LULU_LINES[i % LULU_LINES.length];
  const b = document.getElementById('luluBubble');
  if (b) { b.innerHTML = `<b>${line.ar}</b><small>${line.en}</small>`; }
  if (typeof say === 'function') say(line.ar);
}

/* ================= router ================================================
   Four screens, never more (DESIGN.md §2). Everything is display-toggled so a
   child never waits for a page load. */

const VIEWS = ['home', 'shelf', 'sounds', 'sentences', 'surahs', 'qaida', 'textStory', 'printView', 'reader'];
function show(id) {
  VIEWS.forEach(v => {
    const el = document.getElementById(v);
    if (el) el.classList.toggle('hidden', v !== id);
  });
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  window.scrollTo(0, 0);
}

/* ================= home ================================================== */

function renderHome() {
  const kid = currentKid();
  const host = document.getElementById('home');
  if (!kid) return renderPicker();

  const f = faceOf(kid);
  host.innerHTML = `
    <header class="home-head">
      <button class="who-btn" id="whoBtn" style="background:${f.color}" title="Change who is reading">
        <span class="who-face">${f.emoji}</span>
      </button>
      <div class="home-title">
        <h1>حِكَايَات</h1>
        <p class="tag">Arabic for little readers</p>
      </div>
      <div class="star-count" title="Your stars">⭐ <b>${totalStars()}</b></div>
    </header>

    <div class="lulu-row">
      <div class="lulu">${typeof ICONS !== 'undefined' && ICONS.cat ? ICONS.cat : '🐱'}</div>
      <div class="lulu-bubble" id="luluBubble"><b>مَرْحَبًا! هَيَّا نَقْرَأ</b><small>Hello! Let's read</small></div>
    </div>

    <main class="doors">
      <button class="door" id="doorSounds" style="--d:#F09CB1">
        <span class="door-ic">🔊</span>
        <span class="door-ar">الأَصْوَات</span>
        <span class="door-en">Sounds &amp; the Qaida — learning to read</span>
      </button>
      <button class="door" id="doorBooks" style="--d:#7FB0D6">
        <span class="door-ic">📖</span>
        <span class="door-ar">الكُتُب</span>
        <span class="door-en">Books — with pictures, and without</span>
      </button>
      <button class="door" id="doorSent" style="--d:#E8A33D">
        <span class="door-ic">💬</span>
        <span class="door-ar">جُمَل</span>
        <span class="door-en">Sentences — listen, and hear how they work</span>
      </button>
      <button class="door" id="doorQuran" style="--d:#5B8C7B">
        <span class="door-ic">📿</span>
        <span class="door-ar">سُوَر</span>
        <span class="door-en">Surahs — real recitation, word by word</span>
      </button>
      <button class="door" id="doorPrint" style="--d:#7BC08F">
        <span class="door-ic">🖨️</span>
        <span class="door-ar">اِطْبَعْ</span>
        <span class="door-en">Print — cards and mini books to cut out</span>
      </button>
    </main>
    <footer class="site-foot">اِقْرَأْ مَعَ طِفْلِكَ كُلَّ يَوْم · Read with your child every day</footer>`;

  document.getElementById('whoBtn').addEventListener('click', renderPicker);
  document.getElementById('doorSounds').addEventListener('click', () => { openSounds(); });
  document.getElementById('doorBooks').addEventListener('click', () => { show('shelf'); });
  document.getElementById('doorSent').addEventListener('click', () => { openSentences(); });
  document.getElementById('doorQuran').addEventListener('click', () => { openSurahs(); });
  document.getElementById('doorPrint').addEventListener('click', () => { openPrint(); });
  document.querySelector('.lulu').addEventListener('click', () => luluSays(0));
  setTimeout(() => luluSays(0), 600);
}

/* Who is reading? Tap a face. That is the whole sign-in. */
function renderPicker() {
  const host = document.getElementById('home');
  const taken = allKids();
  show('home');
  host.innerHTML = `
    <div class="picker">
      <h1 class="pick-h">مَنْ يَقْرَأُ الْيَوْم؟</h1>
      <p class="pick-en">Who is reading today? — tap your face</p>
      <div class="faces">
        ${FACES.map(f => {
          const kid = taken.find(k => k.face === f.id);
          const n = kid ? Object.values(kid.stars).reduce((a, b) => a + b, 0) : 0;
          return `<button class="face-btn ${kid ? 'has' : ''}" data-f="${f.id}" style="background:${f.color}">
            <span class="fe">${f.emoji}</span>
            ${kid ? `<span class="fs">⭐ ${n}</span>` : ''}
          </button>`;
        }).join('')}
      </div>
      <p class="pick-note">Each face keeps its own stars.
        <button class="grownup" id="grownupBtn">⚙ For grown-ups</button></p>
    </div>`;
  const gb = document.getElementById('grownupBtn');
  if (gb) gb.addEventListener('click', ev => { ev.stopPropagation(); renderParent(); });
  host.querySelectorAll('.face-btn').forEach(b => b.addEventListener('click', () => {
    const kid = addKid(b.dataset.f);
    setWho(kid.id);
    if (typeof chimeGood === 'function') chimeGood();
    renderHome();
  }));
}

/* ================= Level 0 — الأَصْوَات ==================================
   Two ways in, both starting with a noise:
     • مَعَ الحُرُوف — meet the letters: tap a letter, hear its name, its sound
       and a word that starts with it. The four written forms are SHOWN, never
       copied — a child sees that a letter changes clothes, which is the thing
       that actually confuses them later.
     • اِسْمَعْ وَاخْتَرْ — listen and choose: a sound plays, three pictures
       wait. Never fails, never ends, only adds stars. */

let soundsMode = 'letters';
let quiz = null;

function openSounds() { soundsMode = 'letters'; renderSounds(); show('sounds'); }

function renderSounds() {
  const host = document.getElementById('sounds');
  host.innerHTML = `
    <header class="sub-head">
      <button class="back" id="sBack">✕</button>
      <h2>الأَصْوَات <small>Sounds</small></h2>
      <div class="star-count">⭐ <b>${totalStars()}</b></div>
    </header>
    <nav class="mode-row">
      <button class="mode" id="toQaida">📗 القَاعِدَة<small>Learn to read — all 9 steps</small></button>
      <button class="mode ${soundsMode === 'letters' ? 'on' : ''}" data-m="letters">🔤 الحُرُوف<small>Meet the letters</small></button>
      <button class="mode ${soundsMode === 'quiz' ? 'on' : ''}" data-m="quiz">👂 اِسْمَعْ وَاخْتَرْ<small>Listen &amp; find</small></button>
      <button class="mode ${soundsMode === 'haraka' ? 'on' : ''}" data-m="haraka">✨ الحَرَكَات<small>One letter, three sounds</small></button>
    </nav>
    <div id="soundsBody"></div>`;
  document.getElementById('sBack').addEventListener('click', () => { renderHome(); show('home'); });
  const toQ = document.getElementById('toQaida');
  if (toQ) toQ.addEventListener('click', openQaida);
  host.querySelectorAll('.mode[data-m]').forEach(b => b.addEventListener('click', () => {
    soundsMode = b.dataset.m; renderSounds();
  }));
  if (soundsMode === 'letters') renderLetterGrid();
  else if (soundsMode === 'quiz') startQuiz();
  else renderHaraka();

  /* The songs go UNDERNEATH, after the child has met the letters — never
     instead of them. See videos.js for why this is a strip and not a door.
     Not on the listening game: that screen is a task with a right answer on
     it, and a video sitting below would be an offer to stop. */
  if (soundsMode !== 'quiz' && typeof videoStrip === 'function')
    videoStrip('sounds', soundsMode === 'haraka' ? ['harakat', 'letters'] : ['letters', 'words']);
}

function renderLetterGrid() {
  document.getElementById('soundsBody').innerHTML = `
    <p class="hint">اِلْمَسْ حَرْفًا لِتَسْمَعَهُ <span class="hint-en">Tap any letter to hear it</span></p>
    <div class="letter-grid">
      ${LETTERS.map((x, i) => `
        <button class="letter-card" data-i="${i}" style="--lc:${i % 2 ? '#7FB0D6' : '#F09CB1'}">
          <span class="lc-glyph">${x.l}</span>
          <span class="lc-pic">${LICONS[x.icon]}</span>
          <span class="lc-word">${x.word}</span>
        </button>`).join('')}
    </div>`;
  document.querySelectorAll('.letter-card').forEach(c =>
    c.addEventListener('click', () => openLetter(+c.dataset.i)));
  LETTERS.slice(0, 4).forEach(x => preload(x.word));
}

function openLetter(i) {
  const x = LETTERS[i];
  const body = document.getElementById('soundsBody');
  body.innerHTML = `
    <div class="letter-page">
      <button class="back small" id="lBack">↩</button>
      <div class="lp-top">
        <button class="lp-glyph" id="lpGlyph" title="Hear the letter">${x.l}</button>
        <div class="lp-name"><b>${x.name}</b></div>
      </div>

      <button class="lp-word" id="lpWord">
        <span class="lp-pic">${LICONS[x.icon]}</span>
        <span class="lp-ar">${x.word}</span>
        <span class="lp-en">${x.en}</span>
      </button>
      ${x.quran ? `<p class="lp-quran">✦ ${x.quran}</p>` : ''}

      <div class="lp-forms">
        <p class="forms-h">الحَرْف يُغَيِّرُ شَكْلَه <span class="hint-en">The same letter, four ways it dresses — just look, no writing</span></p>
        <div class="forms-row">
          ${['وَحْدَه', 'أَوَّل', 'وَسَط', 'آخِر'].map((lab, k) => `
            <div class="form-box"><span class="fb-g">${x.forms[k]}</span><small>${lab}</small></div>`).join('')}
        </div>
        ${!x.joins ? `<p class="lp-note">🚫 هَذَا الحَرْف لَا يَتَّصِلُ بِمَا بَعْدَه <span class="hint-en">This one never joins to the next letter — that is why it looks the same twice</span></p>` : ''}
      </div>

      <div class="lp-nav">
        <button id="lPrev" class="round" aria-label="Previous letter">→</button>
        <button id="lNext" class="round" aria-label="Next letter">←</button>
      </div>
    </div>`;

  /* The BIG GLYPH says the SOUND (فَ / fff), not the name. Reza, 2026-08-31:
     "take fiy from the picture. it makes the noise fff." A pre-reader needs the
     noise the letter makes; the name is what it is called, which is a separate
     and later fact. The name is still one tap away, on the name itself. */
  const hearSound = () => sayLetter(x.l);
  const hearName = () => sayLetterName(x.l, x.name);
  const hearWord = () => say(x.word);
  document.getElementById('lpGlyph').addEventListener('click', hearSound);
  document.querySelector('.lp-name').addEventListener('click', hearName);
  document.getElementById('lpWord').addEventListener('click', hearWord);
  document.getElementById('lBack').addEventListener('click', renderLetterGrid);
  document.getElementById('lPrev').addEventListener('click', () => openLetter((i + 27) % 28));
  document.getElementById('lNext').addEventListener('click', () => openLetter((i + 1) % 28));
  document.querySelectorAll('.form-box').forEach(b => b.addEventListener('click', hearSound));
  // ear first: sound, then the word it starts — the page introduces itself
  setTimeout(hearSound, 300);
  setTimeout(hearWord, 1500);
  preload(x.word);
}

/* ---- listen & find — the actual reading skill at this age --------------- */
function startQuiz() {
  quiz = { round: 0, streak: 0 };
  nextQuiz();
}
function nextQuiz() {
  const body = document.getElementById('soundsBody');
  const answer = LETTERS[Math.floor(Math.random() * LETTERS.length)];
  const pool = LETTERS.filter(x => x.l !== answer.l).sort(() => Math.random() - 0.5).slice(0, 2);
  const opts = [answer, ...pool].sort(() => Math.random() - 0.5);

  body.innerHTML = `
    <div class="quiz">
      <p class="hint">أَيُّ صُورَةٍ تَبْدَأُ بِهَذَا الصَّوْت؟
        <span class="hint-en">Which picture starts with this sound?</span></p>
      <button class="big-speaker" id="qSay">🔊<span class="qs-glyph">${answer.l}</span></button>
      <div class="quiz-cards">
        ${opts.map(o => `<button class="quiz-card" data-l="${o.l}">
          <span class="qc-pic">${LICONS[o.icon]}</span>
          <span class="qc-word">${o.word}</span></button>`).join('')}
      </div>
      <div class="streak">${'⭐'.repeat(Math.min(quiz.streak, 10))}</div>
    </div>`;

  /* the question is "which picture starts with this NOISE" — so play the noise,
     then the word it lives in, not the letter's name */
  const speak = () => { sayLetter(answer.l); setTimeout(() => say(answer.word), 1200); };
  document.getElementById('qSay').addEventListener('click', speak);
  setTimeout(speak, 400);

  body.querySelectorAll('.quiz-card').forEach(c => c.addEventListener('click', () => {
    if (c.dataset.l === answer.l) {
      c.classList.add('correct');
      chimeGood();
      quiz.streak++;
      addStar('sounds');
      say('أَحْسَنْت');
      setTimeout(nextQuiz, 1100);
    } else {
      /* Rule 5: never blocked, never scored down. The sound simply comes back. */
      c.classList.add('wrong');
      chimeBad();
      setTimeout(() => { c.classList.remove('wrong'); speak(); }, 600);
    }
  }));
}

/* ---- the harakat: one letter, three noises ------------------------------
   THE BUG THAT MADE THIS SCREEN WORTHLESS (2026-08-31). Reza: "the letters
   arent matched up properly. alif sounds like ba" and "the sounds are really
   bad and not clear."

   These cells called say('بَ'). say() runs its argument through normAr(), and
   normAr STRIPS TASHKEEL — so بَ, بِ and بُ all became the key 'ب'. Worse, 'ب'
   on its own is not in the manifest at all, so every one of the eighteen cells
   fell through to the browser's speechSynthesis. Live synthesis is banned by
   rule 1 precisely because it is inconsistent and unclear, which is exactly
   what he heard; and since all three cells produced the same request, "one
   letter, three sounds" was demonstrating that a letter makes ONE sound.

   This is trap 2 in HANDOVER, and the Qaida module already solved it: cells are
   keyed 'q:<exact text>' so a haraka survives. The clips exist — all 469 of
   them — this screen was simply not asking for them. Never route a syllable
   that carries a haraka through normAr(). */
function renderHaraka() {
  const base = ['ب', 'ت', 'م', 'ن', 'س', 'ل'];
  document.getElementById('soundsBody').innerHTML = `
    <p class="hint">نَفْسُ الحَرْف… ثَلَاثَةُ أَصْوَات
      <span class="hint-en">The same letter makes three different noises. Tap each one.</span></p>
    <div class="haraka-wrap">
      ${base.map(b => `
        <div class="haraka-row">
          ${HARAKAT.map(h => `
            <button class="haraka-cell" data-say="${b}${h.mark}">
              <span class="hc-g">${b}${h.mark}</span>
              <small>${h.en} · ${h.says}</small>
            </button>`).join('')}
        </div>`).join('')}
    </div>`;
  document.querySelectorAll('.haraka-cell').forEach(c => c.addEventListener('click', () => {
    /* the EXACT text, not the normalised one — see the note above */
    playKey('q:' + c.dataset.say, c.dataset.say);
    c.classList.remove('said'); void c.offsetWidth; c.classList.add('said');
  }));
}

/* ================= boot ================================================== */
window.addEventListener('DOMContentLoaded', () => {
  if (currentKid()) { renderHome(); show('home'); } else { renderPicker(); }
  const hb = document.getElementById('shelfHome');
  if (hb) hb.addEventListener('click', () => { renderHome(); show('home'); });
});
