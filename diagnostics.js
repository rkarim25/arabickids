/* ————— Hikayat · how each child is doing ——————————————————————————————————
   Reza, 2026-09-06: "i also want diagnostics on how the kid is doing. it
   needs to be built around testing. i want the site to be highly focused on
   activating recall so everything needs to be test based."

   This is version 1, and it is honest about what it can see. Today the site
   records four kinds of test result:
     - the vocab flashcards (per word: reviews, correct, box)     → recall
     - the surah check (per ayah: correct taps, 2 = understood)  → recall
     - stars on sentence sets, text stories, Qaida stages          → done
     - the total star count                                        → done
   Picture-book games and listen-and-find do NOT yet record right/wrong, so
   they cannot appear here. The path (PATH.md §3) adds a recall log
   `hikayat-recall-<kid>` — every answer, every stop — and this panel reads
   it as soon as it exists. Until then, what you see is what was measured.

   Nothing here is shown to a child. Rule 5 as amended: test everything,
   punish nothing — the child sees stars, the grown-up sees the numbers.
   ========================================================================= */
'use strict';

function diagFor(kid) {
  const stars = kid.stars || {};
  const keys = Object.keys(stars);
  const count = pre => keys.filter(k => k.startsWith(pre)).length;

  /* ayat: q:<ref> counts correct taps; 2 on separate visits = understood */
  const ayahKeys = keys.filter(k => /^q:\d+:\d+$/.test(k));
  /* surah-ui.js declares SURAHS as null until the surah door is opened */
  const ayatTotal = (typeof SURAHS !== 'undefined' && SURAHS && SURAHS.surahs)
    ? SURAHS.surahs.reduce((n, s) => n + s.ayat.length, 0) : 51;
  const ayatUnderstood = ayahKeys.filter(k => stars[k] >= 2).length;
  const ayatNearly = ayahKeys.filter(k => stars[k] === 1).map(k => k.slice(2));

  /* words: the vocab SRS state, per child */
  let srs = {};
  try { srs = JSON.parse(localStorage.getItem('hikayat-srs-' + kid.id) || '{}'); } catch (e) {}
  const cards = Object.values(srs);
  const reviews = cards.reduce((n, c) => n + (c.reviews || 0), 0);
  const correct = cards.reduce((n, c) => n + (c.correct || 0), 0);
  const boxes = [0, 0, 0, 0, 0, 0];
  cards.forEach(c => { boxes[Math.min(5, c.box || 1)]++; });
  const shaky = cards.filter(c => (c.reviews || 0) >= 2 && (c.box || 1) === 1).map(c => c.id);
  const wordName = id => {
    const w = (typeof VOCAB_WORDS !== 'undefined' ? VOCAB_WORDS : []).find(x => x.id === id);
    return w ? w.ar : id;
  };

  /* the recall log the path will write: [{k, ok, t}] */
  let recall = [];
  try { recall = JSON.parse(localStorage.getItem('hikayat-recall-' + kid.id) || '[]'); } catch (e) {}
  const week = Date.now() - 7 * 864e5;
  const recent = recall.filter(r => r.t >= week);
  const recentOk = recent.filter(r => r.ok).length;

  const storiesTotal = typeof TEXT_STORIES !== 'undefined' ? TEXT_STORIES.length : 0;
  const setsTotal = typeof SENTENCE_SETS !== 'undefined' ? SENTENCE_SETS.length : 0;

  return {
    total: Object.values(stars).reduce((a, b) => a + b, 0),
    ayat: { understood: ayatUnderstood, tried: ayahKeys.length, total: ayatTotal, nearly: ayatNearly },
    words: { seen: cards.length, reviews, correct, boxes, shaky: shaky.map(wordName) },
    sentences: { sets: count('sent:'), total: setsTotal },
    stories: { heard: count('ts:'), total: storiesTotal },
    qaida: { stages: count('qaida:'), total: 9 },
    recall: { week: recent.length, weekOk: recentOk, all: recall.length },
  };
}

function renderDiagnostics() {
  if (typeof allKids !== 'function') return '';
  const kids = allKids();
  if (!kids.length) return '';
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const pct = (a, b) => b ? Math.round(100 * a / b) + '%' : '—';
  const face = k => (typeof faceOf === 'function' && faceOf(k)) || { emoji: '🙂', color: '#eee' };

  return `
    <details class="pb-diag" open>
      <summary>📊 How each child is doing <small>from what the site has actually tested</small></summary>
      ${kids.map(k => {
        const d = diagFor(k), f = face(k);
        const rows = [
          ['Recall this week', d.recall.week ? `${d.recall.weekOk} right of ${d.recall.week} (${pct(d.recall.weekOk, d.recall.week)})` : 'no path stops yet — the path is not built'],
          ['Ayat understood', `${d.ayat.understood} of ${d.ayat.total}` + (d.ayat.nearly.length ? ` · one tap away: ${esc(d.ayat.nearly.join(', '))}` : '') + (d.ayat.tried ? '' : ' · not tried yet')],
          ['Words', d.words.seen
            ? `${d.words.seen} met · ${d.words.correct} right of ${d.words.reviews} reviews (${pct(d.words.correct, d.words.reviews)}) · boxes ${d.words.boxes.slice(1).join(' / ')}`
            : 'no flashcards yet'],
          ['Shaky words', d.words.shaky.length ? esc(d.words.shaky.join(' · ')) : 'none yet'],
          ['Sentence sets finished', `${d.sentences.sets} of ${d.sentences.total}`],
          ['Stories heard to the end', `${d.stories.heard} of ${d.stories.total}`],
          ['Qaida stages finished', `${d.qaida.stages} of ${d.qaida.total}`],
          ['Stars', String(d.total)],
        ];
        return `
        <div class="diag-kid">
          <div class="diag-face" style="background:${f.color}">${f.emoji}</div>
          <table class="diag-table">${rows.map(([a, b]) => `<tr><th>${a}</th><td>${b}</td></tr>`).join('')}</table>
        </div>`;
      }).join('')}
      <p class="pb-b-foot">Not measured yet: picture-book games and listen-and-find do not record right/wrong.
        The path adds a recall log for every stop (PATH.md §3). Nothing on this panel is ever shown to a child.</p>
    </details>`;
}

if (typeof module !== 'undefined' && module.exports) module.exports = { diagFor };
