/* ————— Hikayat · The Path (المَسَار) Engine ——————————————————————————————
   Owns per-child state on the path:
     - station, step within it, quranAt pointer
     - Leitner spaced-repetition card state for the twenty core sentences
     - daily 5-stop plan (Hello -> Again -> New Step -> Qur'an -> Bye)
     - 5-minute hard cap timer
     - lifecycle hooks: startWalk, pathNext, pathAgain, pathFinish, pathStopDone
   ========================================================================= */
'use strict';

let PATH_DATA = null;
let pathWalkState = {
  active: false,
  kidId: null,
  stopIdx: 0,
  timer: null,
  stopStartedAt: 0,
};

const PATH_CAP_MS = 5 * 60 * 1000; // 5 minutes hard cap

function loadPathData() {
  if (PATH_DATA) return Promise.resolve(PATH_DATA);
  return fetch('data/path.json')
    .then(r => r.json())
    .then(d => { PATH_DATA = d; return d; })
    .catch(err => {
      console.warn('Could not fetch data/path.json, using fallback', err);
      return null;
    });
}

function getPathStorageKey(kidId) {
  const id = kidId || (typeof currentKid === 'function' && currentKid() && currentKid().id) || 'default';
  return `hikayat-path-${id}`;
}

function loadPathState(kidId) {
  try {
    const raw = localStorage.getItem(getPathStorageKey(kidId));
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    station: 's01',
    step: 0,
    quranAt: 0,
    cards: {},
    heard: {},
    walks: [],
    today: null,
  };
}

function savePathState(state, kidId) {
  try {
    localStorage.setItem(getPathStorageKey(kidId), JSON.stringify(state));
    if (typeof syncSoon === 'function') syncSoon();
  } catch (e) {}
}

function pathActive() {
  return Boolean(pathWalkState.active);
}

function currentStation(state, pathData) {
  if (!pathData || !pathData.stations) return null;
  return pathData.stations.find(s => s.id === state.station) || pathData.stations[0];
}

/* Today string YYYY-MM-DD */
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* Build or resume today's 5-stop plan */
function ensureTodayPlan(state, station) {
  const today = todayKey();
  if (state.today && state.today.day === today && Array.isArray(state.today.plan) && state.today.plan.length) {
    return state.today;
  }

  // Check if child has due sentence cards
  const due = getDueCards(state);
  const plan = ['hello'];
  if (due.length > 0) {
    plan.push('review');
  }
  plan.push('step');
  plan.push('quran');
  plan.push('bye');

  state.today = {
    day: today,
    plan,
    at: 0,
    startedAt: Date.now(),
  };
  savePathState(state);
  return state.today;
}

/* Spaced Repetition on the 20 Core Sentences */
const CARD_INTERVALS = {
  1: 0,
  2: 2 * 864e5,
  3: 4 * 864e5,
  4: 7 * 864e5,
  5: 14 * 864e5,
};

function getDueCards(state) {
  const now = Date.now();
  const allCards = Object.entries(state.cards || {}).map(([id, c]) => ({ id, ...c }));
  const due = allCards.filter(c => !c.nextReview || now >= c.nextReview);
  // Sort oldest reviewed first, cap at 3
  due.sort((a, b) => (a.nextReview || 0) - (b.nextReview || 0));
  return due.slice(0, 3);
}

function recordCardReview(state, cardId, passed) {
  state.cards = state.cards || {};
  const c = state.cards[cardId] || { box: 1, reviews: 0, correct: 0 };
  c.reviews = (c.reviews || 0) + 1;
  c.lastReview = Date.now();
  if (passed) {
    c.correct = (c.correct || 0) + 1;
    c.box = Math.min(5, (c.box || 1) + 1);
  } else {
    c.box = 1;
  }
  c.nextReview = Date.now() + (CARD_INTERVALS[c.box] || 0);
  state.cards[cardId] = c;
  savePathState(state);
}

/* Start the Walk */
function startWalk() {
  const kid = (typeof currentKid === 'function' && currentKid()) || { id: 'default' };
  pathWalkState.kidId = kid.id;
  pathWalkState.active = true;

  loadPathData().then(data => {
    if (!data) return;
    const state = loadPathState(kid.id);
    const station = currentStation(state, data);
    ensureTodayPlan(state, station);
    location.hash = '#walk';
    show('pathView');
    openCurrentStop();
  });
}

function openCurrentStop() {
  clearTimeout(pathWalkState.timer);
  const state = loadPathState(pathWalkState.kidId);
  const plan = state.today.plan;
  const idx = state.today.at || 0;

  if (idx >= plan.length) {
    pathFinish();
    return;
  }

  const stop = plan[idx];
  pathWalkState.stopIdx = idx;
  pathWalkState.stopStartedAt = Date.now();

  // 5-minute cap timer for non-bye screens
  if (stop !== 'bye' && stop !== 'hello') {
    pathWalkState.timer = setTimeout(() => {
      onCapReached();
    }, PATH_CAP_MS);
  }

  const station = currentStation(state, PATH_DATA);
  const anchorRef = (station.anchors && station.anchors[0]) || 'lesson:me/0';

  if (stop === 'hello') {
    renderPathHello(anchorRef);
  } else if (stop === 'review') {
    const due = getDueCards(state);
    renderPathReview(due);
  } else if (stop === 'step') {
    const stepObj = station.steps[state.step % station.steps.length];
    openStep(stepObj);
  } else if (stop === 'quran') {
    const quranList = station.quran || ['1:1'];
    const qRef = quranList[state.quranAt % quranList.length];
    openAyahRef(qRef);
  } else if (stop === 'bye') {
    renderPathBye();
  }
}

function onCapReached() {
  if (!pathWalkState.active) return;
  chimeGood();
  if (typeof say === 'function') say('هَيَّا نُكْمِل');
  renderPathChoice('cap');
}

/* Dispatching Steps to existing screens */
function openStep(step) {
  if (!step) return;
  if (step.type === 'story') {
    if (typeof openTextStory === 'function') openTextStory(step.ref);
  } else if (step.type === 'book') {
    const b = (typeof BOOKS !== 'undefined' && BOOKS.find(x => x.id === step.ref)) || (typeof BOOKS !== 'undefined' && BOOKS[0]);
    if (typeof openReader === 'function') openReader(b);
  } else if (step.type === 'sentences') {
    const set = typeof SENTENCE_SETS !== 'undefined' && SENTENCE_SETS.find(s => s.id === step.ref);
    if (set && typeof renderLesson === 'function') {
      sentSet = set; sentIdx = 0; sentStep = 0;
      renderLesson();
      show('sentences');
    }
  } else if (step.type === 'lesson') {
    const [setId, iStr] = step.ref.split('/');
    const set = typeof SENTENCE_SETS !== 'undefined' && SENTENCE_SETS.find(s => s.id === setId);
    if (set && typeof renderLesson === 'function') {
      sentSet = set; sentIdx = parseInt(iStr, 10) || 0; sentStep = 0;
      renderLesson();
      show('sentences');
    }
  } else if (step.type === 'play') {
    const clean = step.ref.replace(/^lesson:/, '');
    const [setId, iStr] = clean.split('/');
    const set = typeof SENTENCE_SETS !== 'undefined' && SENTENCE_SETS.find(s => s.id === setId);
    if (set && typeof renderLesson === 'function') {
      sentSet = set; sentIdx = parseInt(iStr, 10) || 0; sentStep = 4;
      renderLesson();
      show('sentences');
    }
  } else if (step.type === 'vocab') {
    if (typeof openVocab === 'function') openVocab(step.ref.split(','));
  } else if (step.type === 'qaida') {
    if (typeof openQaida === 'function') openQaida();
  } else if (step.type === 'video') {
    if (typeof openVideoModal === 'function') openVideoModal(step.ref);
  }
}

function openAyahRef(ref) {
  const [sNum, aNum] = ref.split(':').map(Number);
  if (typeof loadSurahs === 'function') {
    loadSurahs().then(() => {
      surah = SURAHS.surahs.find(s => s.n === sNum);
      if (surah) {
        ayahIdx = (aNum - 1);
        sStep = 0;
        renderAyah();
        show('surahs');
      }
    });
  }
}

/* Hook called by any activity upon completion.
   Returns TRUE if path handled it, FALSE if independent session. */
function pathStopDone(key) {
  if (!pathWalkState.active) return false;
  clearTimeout(pathWalkState.timer);

  const state = loadPathState(pathWalkState.kidId);
  const curStop = (state.today && state.today.plan && state.today.plan[state.today.at]) || 'step';

  // Advance step or quran index
  if (curStop === 'step') {
    const station = currentStation(state, PATH_DATA);
    state.step = (state.step || 0) + 1;
    // Enter core sentence into cards deck if it was a lesson step
    if (key && key.startsWith('sentences:')) {
      const setId = key.replace('sentences:', '');
      const set = typeof SENTENCE_SETS !== 'undefined' && SENTENCE_SETS.find(s => s.id === setId);
      if (set) {
        set.lessons.forEach((_, i) => {
          const cardKey = `lesson:${setId}/${i}`;
          if (!state.cards[cardKey]) {
            state.cards[cardKey] = { box: 1, reviews: 0, correct: 0, lastReview: Date.now() };
          }
        });
      }
    }
  } else if (curStop === 'quran') {
    state.quranAt = (state.quranAt || 0) + 1;
  }

  savePathState(state);
  show('pathView');
  renderPathChoice('done');
  return true;
}

function pathNext() {
  clearTimeout(pathWalkState.timer);
  const state = loadPathState(pathWalkState.kidId);
  state.today.at = (state.today.at || 0) + 1;
  savePathState(state);

  if (state.today.at >= state.today.plan.length) {
    pathFinish();
  } else {
    show('pathView');
    openCurrentStop();
  }
}

function pathAgain() {
  clearTimeout(pathWalkState.timer);
  show('pathView');
  openCurrentStop();
}

function pathFinish() {
  clearTimeout(pathWalkState.timer);
  pathWalkState.active = false;
  const state = loadPathState(pathWalkState.kidId);
  state.walks = state.walks || [];
  state.walks.push({
    day: todayKey(),
    stops: state.today ? state.today.at : 0,
    stars: typeof totalStars === 'function' ? totalStars() : 0,
    t: Date.now(),
  });
  if (state.walks.length > 30) state.walks = state.walks.slice(-30);
  savePathState(state);

  location.hash = '#home';
  if (typeof renderHome === 'function') renderHome();
  show('home');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadPathData, loadPathState, savePathState, startWalk,
    pathActive, pathStopDone, pathNext, pathAgain, pathFinish, getDueCards, recordCardReview,
  };
}
