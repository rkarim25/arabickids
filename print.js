/* ————— Hikayat · اِطْبَعْ — things you cut out and hold ————————————————————
   DESIGN.md §6. These are deliberately NOT worksheets: rule 3 says no writing,
   so nothing here has a line to trace, a box to fill or a letter to copy.
   What prints is what a child can pick up and play with — cards to match, a
   little book to keep in a bag, a poster for the wall.

   Everything is built to survive a real printer: black text on white, no
   background floods a parent has to pay for in ink, and a cut line you can
   actually follow.
   ========================================================================= */
'use strict';

let printKind = 'cards';

function openPrint() { printKind = 'cards'; renderPrint(); show('printView'); }

function renderPrint() {
  const host = document.getElementById('printView');
  host.innerHTML = `
    <header class="page-head no-print">
      <button class="nav-back-btn" id="pBack" title="Back to Home">
        <span class="back-arr">←</span>
        <span class="back-lbl">الرَّئِيسِيَّة · Home</span>
      </button>
      <div class="page-title">
        <h1>اِطْبَعْ</h1>
        <p class="tag">Printables, Cards &amp; Mini Books</p>
      </div>
      <button class="print-go" id="pGo">🖨️ Print</button>
    </header>

    <nav class="mode-row no-print">
      <button class="mode ${printKind === 'cards' ? 'on' : ''}" data-k="cards">🃏 بِطَاقَات<small>Picture cards</small></button>
      <button class="mode ${printKind === 'book' ? 'on' : ''}" data-k="book">📕 كِتَاب صَغِير<small>Mini book</small></button>
      <button class="mode ${printKind === 'poster' ? 'on' : ''}" data-k="poster">🖼️ مُلْصَق<small>Sound poster</small></button>
    </nav>

    <div class="print-note no-print" id="pNote"></div>
    <div id="printBody" class="sheet-host"></div>`;

  document.getElementById('pBack').addEventListener('click', () => { renderHome(); show('home'); });
  document.getElementById('pGo').addEventListener('click', () => window.print());
  host.querySelectorAll('.mode').forEach(b => b.addEventListener('click', () => {
    printKind = b.dataset.k; renderPrint();
  }));

  if (printKind === 'cards') renderCards();
  else if (printKind === 'book') renderMiniBook();
  else renderPoster();
}

const NOTE = t => { const n = document.getElementById('pNote'); if (n) n.innerHTML = t; };

/* ---- 1. picture-word cards ---------------------------------------------
   Two of every card, because the game a three-year-old can actually play is
   PAIRS — turn two over, do they match. One of each only works as flashcards,
   which is the thing his father dislikes and a toddler cannot do at all. */
function renderCards() {
  NOTE(`<b>How to use these.</b> Print, cut along the grey lines, and you have a deck.
    Every card appears <b>twice</b>, so you can play <b>pairs</b> — turn two over, do they match?
    Or spread them out and say a word: <i>“أَيْنَ الْقَمَر؟”</i> — can they find it?
    <span class="tip">Tip: print on card, or stick to cereal box.</span>`);

  const deck = LETTERS.flatMap(x => [x, x]);   // pairs
  document.getElementById('printBody').innerHTML = sheets(deck, 9, (x) => `
    <div class="pcard">
      <div class="pc-pic">${LICONS[x.icon]}</div>
      <div class="pc-ar">${x.word}</div>
      <div class="pc-sub"><span class="pc-l">${x.l}</span><span class="pc-en">${x.en}</span></div>
    </div>`, 'cards-sheet');
}

/* ---- 2. the mini book ---------------------------------------------------
   A5 pages, two to an A4 sheet, cut once and staple. The classic eight-page
   single-sheet fold is prettier and gets the page order wrong in one printer
   out of three; a parent holding scissors at bedtime does not need that. */
function renderMiniBook() {
  const books = (typeof BOOKS !== 'undefined' ? BOOKS : []);
  const chosen = books[printBookIdx] || books[0];
  if (!chosen) { document.getElementById('printBody').innerHTML = '<p>No books yet.</p>'; return; }

  NOTE(`<b>How to make it.</b> Print, cut each sheet across the middle line, stack the halves in order and staple the left edge.
    You get a little ${chosen.titleEn} book to keep in a bag.
    <span class="tip">The English line is for you, not for them — read the Arabic, point at the picture.</span>
    <span class="pick-book">Book: ${books.map((b, i) =>
      `<button class="bpick ${i === printBookIdx ? 'on' : ''}" data-i="${i}">${b.title}</button>`).join('')}</span>`);

  const pages = chosen.pages.filter(p => p.type === 'cover' || p.type === 'story' || p.type === 'end');
  document.getElementById('printBody').innerHTML = sheets(pages, 2, (p, i) => `
    <div class="bpage">
      <div class="bp-art">${svgWrap(p.svg ? p.svg() : '')}</div>
      <div class="bp-text">
        <p class="bp-ar">${p.type === 'cover' ? chosen.title : p.ar ? p.ar.map(w => w.t).join(' ') : 'النِّهَايَة'}</p>
        <p class="bp-en">${p.type === 'cover' ? chosen.titleEn : p.en || 'The End'}</p>
      </div>
      <div class="bp-num">${i + 1}</div>
    </div>`, 'book-sheet');

  document.querySelectorAll('.bpick').forEach(b => b.addEventListener('click', () => {
    printBookIdx = +b.dataset.i; renderMiniBook();
  }));
}
let printBookIdx = 0;

/* ---- 3. the sound poster ----------------------------------------------- */
function renderPoster() {
  NOTE(`<b>For the wall.</b> All 28 letters with a picture that starts with each one.
    Point and say the sound — that is the whole exercise.
    <span class="tip">Prints across two A4 sheets.</span>`);
  document.getElementById('printBody').innerHTML = sheets(LETTERS, 14, (x) => `
    <div class="pos-cell">
      <span class="pos-l">${x.l}</span>
      <span class="pos-pic">${LICONS[x.icon]}</span>
      <span class="pos-w">${x.word}</span>
    </div>`, 'poster-sheet');
}

/* ---- sheet paginator ----------------------------------------------------
   Splits items into A4 pages so a browser never breaks a card across a page
   fold — the one thing that makes a printable useless. */
function sheets(items, per, cell, cls) {
  const out = [];
  for (let i = 0; i < items.length; i += per) {
    const chunk = items.slice(i, i + per);
    out.push(`<section class="sheet ${cls}">
      ${chunk.map((x, j) => cell(x, i + j)).join('')}
      <div class="sheet-foot no-screen">حِكَايَات · rkarim25.github.io/arabickids</div>
    </section>`);
  }
  return out.join('');
}
