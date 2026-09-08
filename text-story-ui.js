/* ————— Hikayat · قِرَاءَة الْقِصَص — Illustrated Children's Book Reader ————————
   Every book now features rich watercolor scene illustrations on EVERY page,
   not just the cover. Children can read page-by-page with audio highlighting,
   autoplay, and seamless forward book navigation.
   ========================================================================= */
'use strict';

let tsStory = null, tsPage = 0;
let tsViewMode = 'pages'; // 'pages' (default child-friendly picture book) or 'list'
const TAUTO = { on: false, timer: null };

function openTextStory(id) {
  tsStory = TEXT_STORIES.find(s => s.id === id);
  tsPage = 0;
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
  if (!s) return;
  const host = document.getElementById('textStory');
  const lv = LEVELS[s.level - 1];
  const totalPages = s.lines.length;
  const curLine = s.lines[tsPage] || s.lines[0];

  let contentHtml = '';

  if (tsViewMode === 'pages') {
    const lineImg = typeof getStoryPageImage === 'function' ? getStoryPageImage(s, tsPage) : getStoryCover(s);
    contentHtml = `
      <div class="ts-page-card">
        <div class="ts-page-scene" id="tsPageScene">
          <img id="tsPageImg" src="${lineImg}" alt="${s.title}" loading="lazy" onerror="this.src='${getStoryCover(s)}'">
        </div>
        <div class="ts-textbar">
          <p class="ts-ar-lead" id="tsLineAr">
            ${curLine.ar.split(/\s+/).filter(Boolean)
              .map((w, j) => `<span class="tw-w" data-l="${tsPage}" data-w="${j}">${w}</span>`).join(' ')}
          </p>
          <p class="ts-en-lead" id="tsLineEn">${curLine.en}</p>
          <div class="ts-audio-row">
            <button class="ts-play-btn" id="tsPlayLine">🔊 <span>اِسْمَعْ · Listen</span></button>
            <button class="round" id="tsSlowLine" title="Slowly">🐢</button>
          </div>
        </div>
      </div>

      <div class="sent-nav-bar" style="margin-top:20px;">
        <button class="sent-btn-nav" id="tsPrevPage" ${tsPage === 0 ? 'disabled' : ''} aria-label="Previous Page">
          <span class="sn-en">← Previous</span>
          <span class="sn-ar">السَّابِق</span>
        </button>
        <button class="sent-btn-nav primary" id="tsNextPage" aria-label="Next Page">
          <span class="sn-ar">${tsPage === totalPages - 1 ? '🎉 النِّهَايَة' : 'الصَّفْحَة التَّالِيَة'}</span>
          <span class="sn-en">${tsPage === totalPages - 1 ? 'Finish Book →' : 'Next Page →'}</span>
        </button>
      </div>`;
  } else {
    // List view: all lines with illustrated thumbnail for every single page
    contentHtml = `
      <div class="ts-list-wrap" id="tsPage">
        ${s.lines.map((l, i) => {
          const thumbImg = typeof getStoryPageImage === 'function' ? getStoryPageImage(s, i) : getStoryCover(s);
          return `
          <div class="ts-line-card ${i === tsPage ? 'lit' : ''}" data-i="${i}">
            <div class="ts-line-thumb">
              <img src="${thumbImg}" alt="${s.title}" loading="lazy" onerror="this.src='${getStoryCover(s)}'">
            </div>
            <div class="ts-line-body">
              <p class="ts-ar">${l.ar.split(/\s+/).filter(Boolean)
                .map((w, j) => `<span class="tw-w" data-l="${i}" data-w="${j}">${w}</span>`).join(' ')}</p>
              <p class="ts-en" data-i="${i}">${l.en}</p>
            </div>
          </div>`;
        }).join('')}
      </div>
      <div class="lesson-nav" style="margin-top:24px;">
        <button class="round big" id="tsDone" aria-label="Finished">🏁</button>
      </div>`;
  }

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
      <div class="ts-page-pill">${tsViewMode === 'pages' ? `صفحة ${tsPage + 1} من ${totalPages}` : `${totalPages} صَفَحَات`}</div>
      <button class="round ${TAUTO.on ? 'on' : ''}" id="tsAuto" title="Read the whole story">${TAUTO.on ? '⏸' : '▶️'}</button>
      <button class="round sm" id="tsMode" title="${LISTEN_LABEL[listenMode()].en}">${listenMode() === 'ar' ? '🇸🇦' : listenMode() === 'en' ? '🌍' : '🔁'}</button>
      <button class="round sm" id="tsViewToggle" title="Toggle Page or List view">${tsViewMode === 'pages' ? '📜' : '📖'}</button>
    </div>

    ${contentHtml}`;

  document.getElementById('tsBack').addEventListener('click', () => { stopTextAuto(); show('shelf'); });
  document.getElementById('tsAuto').addEventListener('click', () => TAUTO.on ? stopTextAuto() : startTextAuto());
  document.getElementById('tsMode').addEventListener('click', () => {
    cycleListen();
    const was = TAUTO.on;
    stopTextAuto(); renderTextStory();
    if (was) startTextAuto();
  });
  document.getElementById('tsViewToggle').addEventListener('click', () => {
    tsViewMode = (tsViewMode === 'pages' ? 'list' : 'pages');
    renderTextStory();
  });

  if (tsViewMode === 'pages') {
    const speakPage = (slow = false) => {
      if (slow) saySlow(curLine.ar);
      else say(curLine.ar);
    };
    document.getElementById('tsPlayLine').addEventListener('click', () => speakPage(false));
    document.getElementById('tsSlowLine').addEventListener('click', () => speakPage(true));
    document.getElementById('tsLineEn').addEventListener('click', () => sayEn(curLine.en));
    document.getElementById('tsPageScene').addEventListener('click', () => speakPage(false));

    document.getElementById('tsPrevPage').addEventListener('click', () => {
      if (tsPage > 0) { tsPage--; renderTextStory(); }
    });
    document.getElementById('tsNextPage').addEventListener('click', () => {
      if (tsPage < totalPages - 1) {
        tsPage++; renderTextStory();
      } else {
        finishTextStory();
      }
    });

    if (!TAUTO.on) {
      setTimeout(() => speakPage(false), 350);
    }
  } else {
    const doneBtn = document.getElementById('tsDone');
    if (doneBtn) doneBtn.addEventListener('click', finishTextStory);

    host.querySelectorAll('.ts-line-card').forEach(card => {
      card.addEventListener('click', () => {
        const i = +card.dataset.i;
        tsPage = i;
        litLine(i);
        say(s.lines[i].ar);
      });
    });
    host.querySelectorAll('.ts-en').forEach((el, i) =>
      el.addEventListener('click', ev => { ev.stopPropagation(); sayEn(s.lines[i].en); }));
  }

  /* tap individual words in either mode */
  host.querySelectorAll('.tw-w').forEach(el => el.addEventListener('click', ev => {
    ev.stopPropagation();
    const line = s.lines[+el.dataset.l];
    const words = line.ar.split(/\s+/).filter(Boolean);
    const word = words[+el.dataset.w];
    el.classList.add('said'); setTimeout(() => el.classList.remove('said'), 800);
    saySlow(word);
  }));
}

function litLine(i) {
  document.querySelectorAll('.ts-line-card').forEach(el => el.classList.remove('lit'));
  const el = document.querySelector(`.ts-line-card[data-i="${i}"]`);
  if (el) { el.classList.add('lit'); el.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
}

function startTextAuto() {
  TAUTO.on = true;
  const b = document.getElementById('tsAuto');
  if (b) { b.textContent = '⏸'; b.classList.add('on'); }

  const step = () => {
    if (!TAUTO.on) return;
    if (tsPage >= tsStory.lines.length) { stopTextAuto(); finishTextStory(); return; }

    /* Checkpoint pause every 6 lines when the Path is active */
    if (typeof pathActive === 'function' && pathActive() && tsPage > 0 && tsPage % 6 === 0) {
      stopTextAuto();
      if (typeof showStoryCheckpoint === 'function') {
        showStoryCheckpoint(
          () => { startTextAuto(); },
          () => { tsPage = Math.max(0, tsPage - 6); startTextAuto(); },
          () => {
            if (typeof pathStopDone === 'function') pathStopDone('story:' + tsStory.id);
          }
        );
      }
      return;
    }

    const l = tsStory.lines[tsPage];
    renderTextStory();

    const meaningThenOn = () => {
      if (!TAUTO.on) return;
      if (!sayEnglishToo()) {
        tsPage++;
        TAUTO.timer = setTimeout(step, 1400);
        return;
      }
      sayEn(l.en);
      TAUTO.timer = setTimeout(() => { tsPage++; step(); }, 3200);
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
  if (typeof pathStopDone === 'function' && pathStopDone('story:' + tsStory.id)) {
    return;
  }

  const stories = (typeof TEXT_STORIES !== 'undefined' ? TEXT_STORIES : []);
  const curIdx = stories.findIndex(x => x.id === tsStory.id);
  const nextStory = curIdx >= 0 && curIdx < stories.length - 1 ? stories[curIdx + 1] : null;

  const host = document.getElementById('textStory');
  host.innerHTML = `<div class="set-done">
    <div class="sd-star">🌟</div>
    <h2>قَرَأْتَهَا!</h2>
    <p class="hint-en">You read ${tsStory.titleEn} (${tsStory.title})</p>
    ${nextStory ? `
      <button class="big-btn pulse" id="tsNextStory" style="margin-bottom:12px;background:linear-gradient(135deg, var(--coral), #E05370);color:#fff">
        📖 القِصَّة التَّالِيَة · Next Story: ${nextStory.titleEn} →
      </button>
    ` : ''}
    <button class="big-btn" id="tsAgain">🔁 مَرَّة أُخْرَى · Read it again</button>
    <button class="big-btn" id="tsShelf">📚 الرَّفّ · Book Shelf</button>
  </div>`;
  if (nextStory) {
    document.getElementById('tsNextStory').addEventListener('click', () => {
      openTextStory(nextStory.id);
    });
  }
  document.getElementById('tsAgain').addEventListener('click', () => { tsPage = 0; renderTextStory(); });
  document.getElementById('tsShelf').addEventListener('click', () => show('shelf'));
}
