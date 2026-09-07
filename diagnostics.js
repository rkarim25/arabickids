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

/* the 20 core sentences from PATH.md §2 */
const TWENTY_SENTENCES = [
  { id: 'lesson:me/0', ar: 'أَنَا هُنَا.', en: 'I am here' },
  { id: 'lesson:this/0', ar: 'هَذَا بَابَا.', en: 'This is Baba' },
  { id: 'lesson:this/1', ar: 'هَذِهِ لُولُو.', en: 'This is Lulu' },
  { id: 'lesson:me/1', ar: 'أُرِيدُ مَاء.', en: 'I want water' },
  { id: 'lesson:me/2', ar: 'مَاذَا تُرِيدُ؟', en: 'What do you want?' },
  { id: 'lesson:describe/1', ar: 'لُولُو صَغِيرَة.', en: 'Lulu is small' },
  { id: 'lesson:where/2', ar: 'أَيْنَ لُولُو؟', en: 'Where is Lulu?' },
  { id: 'lesson:where/0', ar: 'لُولُو فِي الْبَيْت.', en: 'Lulu is in the house' },
  { id: 'lesson:where/1', ar: 'الْكِتَاب فَوْقَ الْمَائِدَة.', en: 'The book is on the table' },
  { id: 'lesson:who/0', ar: 'مَنْ فِي الْبَيْت؟', en: 'Who is in the house?' },
  { id: 'lesson:describe/0', ar: 'الْقَمَر جَمِيل.', en: 'The moon is beautiful' },
  { id: 'lesson:have/0', ar: 'عِنْدِي كِتَاب.', en: 'I have a book' },
  { id: 'lesson:have/1', ar: 'مَا عِنْدِي مَاء.', en: 'I do not have water' },
  { id: 'lesson:ask/1', ar: 'هَلْ عِنْدَكَ مَاء؟', en: 'Do you have water?' },
  { id: 'lesson:ask/0', ar: 'كَيْفَ حَالُكَ؟', en: 'How are you?' },
  { id: 'lesson:said/0', ar: 'قَالَ بَابَا: هَيَّا.', en: 'Baba said: let\'s go' },
  { id: 'lesson:said/play', ar: 'قَالَتْ مَامَا: لَيْسَ أَنَا.', en: 'Mama said: not me' },
  { id: 'lesson:said/1', ar: 'أُحِبُّ أُمِّي.', en: 'I love my mother' },
  { id: 'q:1:1', ar: 'بِسْمِ اللَّهِ.', en: 'In the name of Allah' },
  { id: 'q:1:2', ar: 'الْحَمْدُ لِلَّهِ.', en: 'Praise be to Allah' },
];

function logRecall(key, ok) {
  if (typeof currentKid !== 'function') return;
  const kid = currentKid();
  if (!kid) return;
  const storageKey = 'hikayat-recall-' + kid.id;
  let recall = [];
  try { recall = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch (e) {}
  recall.push({ k: String(key), ok: Boolean(ok), t: Date.now() });
  if (recall.length > 2000) recall = recall.slice(-2000);
  try { localStorage.setItem(storageKey, JSON.stringify(recall)); } catch (e) {}
}

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

  /* the recall log: [{k, ok, t}] */
  let recall = [];
  try { recall = JSON.parse(localStorage.getItem('hikayat-recall-' + kid.id) || '[]'); } catch (e) {}
  const week = Date.now() - 7 * 864e5;
  const recent = recall.filter(r => r.t >= week);
  const recentOk = recent.filter(r => r.ok).length;

  /* Diagnostics v2: 20-sentence accuracy matrix */
  const sentenceAcc = TWENTY_SENTENCES.map(s => {
    const attempts = recall.filter(r => r.k === s.id || r.k === 'cloze:' + s.id);
    const okCount = attempts.filter(r => r.ok).length;
    return {
      ...s,
      attempts: attempts.length,
      correct: okCount,
      pct: attempts.length ? Math.round((100 * okCount) / attempts.length) : null,
    };
  });

  /* Diagnostics v2: weak three items (tested at least twice, sorted by lowest accuracy) */
  const itemStats = new Map();
  recall.forEach(r => {
    if (!itemStats.has(r.k)) itemStats.set(r.k, { total: 0, ok: 0 });
    const stat = itemStats.get(r.k);
    stat.total++;
    if (r.ok) stat.ok++;
  });
  const weakThree = [];
  for (const [k, stat] of itemStats.entries()) {
    if (stat.total >= 2) {
      weakThree.push({
        k,
        total: stat.total,
        ok: stat.ok,
        pct: Math.round((100 * stat.ok) / stat.total),
      });
    }
  }
  weakThree.sort((a, b) => a.pct - b.pct || b.total - a.total);

  /* Diagnostics v2: 14-day consistency dots */
  const todayMs = new Date().setHours(0, 0, 0, 0);
  const days14 = [];
  for (let i = 13; i >= 0; i--) {
    const dayStart = todayMs - i * 864e5;
    const dayEnd = dayStart + 864e5;
    const dayItems = recall.filter(r => r.t >= dayStart && r.t < dayEnd);
    const dayOk = dayItems.filter(r => r.ok).length;
    days14.push({
      date: new Date(dayStart),
      count: dayItems.length,
      ok: dayOk,
      pct: dayItems.length ? Math.round((100 * dayOk) / dayItems.length) : null,
    });
  }

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
    sentenceAcc,
    weakThree: weakThree.slice(0, 3),
    days14,
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
      <summary>📊 How each child is doing <small>Diagnostics v2 · tested recall</small></summary>
      ${kids.map(k => {
        const d = diagFor(k), f = face(k);
        const rows = [
          ['Recall this week', d.recall.week ? `${d.recall.weekOk} right of ${d.recall.week} (${pct(d.recall.weekOk, d.recall.week)})` : 'no test activity this week'],
          ['Ayat understood', `${d.ayat.understood} of ${d.ayat.total}` + (d.ayat.nearly.length ? ` · one tap away: ${esc(d.ayat.nearly.join(', '))}` : '') + (d.ayat.tried ? '' : ' · not tried yet')],
          ['Words', d.words.seen
            ? `${d.words.seen} met · ${d.words.correct} right of ${d.words.reviews} reviews (${pct(d.words.correct, d.words.reviews)}) · boxes ${d.words.boxes.slice(1).join(' / ')}`
            : 'no flashcards yet'],
          ['Shaky words', d.words.shaky.length ? esc(d.words.shaky.join(' · ')) : 'none yet'],
          ['Sentence sets finished', `${d.sentences.sets} of ${d.sentences.total}`],
          ['Stories heard to the end', `${d.stories.heard} of ${d.stories.total}`],
          ['Qaida stages finished', `${d.qaida.stages} of ${d.qaida.total}`],
          ['Total stars', String(d.total)],
        ];

        /* format 14-day activity dots */
        const dotsHtml = d.days14.map(day => {
          let bg = '#e0e0e0', title = `${day.date.toLocaleDateString()}: No activity`;
          if (day.count > 0) {
            if (day.pct >= 75) bg = '#7BC08F';
            else if (day.pct >= 50) bg = '#E8A33D';
            else bg = '#F09CB1';
            title = `${day.date.toLocaleDateString()}: ${day.ok}/${day.count} (${day.pct}%)`;
          }
          return `<span class="diag-day-dot" style="background:${bg}" title="${title}"></span>`;
        }).join('');

        /* format 20 core sentence rows that have been attempted */
        const testedSentences = d.sentenceAcc.filter(s => s.attempts > 0);
        const sentenceRows = testedSentences.length
          ? testedSentences.map(s =>
              `<tr><td><b>${esc(s.ar)}</b> <small>${esc(s.en)}</small></td><td>${s.correct}/${s.attempts} (${s.pct}%)</td></tr>`
            ).join('')
          : '<tr><td colspan="2"><small>No core sentences tested yet</small></td></tr>';

        /* weak 3 items */
        const weakHtml = d.weakThree.length
          ? d.weakThree.map(w => `<span class="diag-weak-chip">${esc(w.k)}: ${w.ok}/${w.total} (${w.pct}%)</span>`).join(' ')
          : '<span>None yet — all tested items strong!</span>';

        return `
        <div class="diag-kid">
          <div class="diag-face" style="background:${f.color}">${f.emoji}</div>
          <table class="diag-table">${rows.map(([a, b]) => `<tr><th>${a}</th><td>${b}</td></tr>`).join('')}</table>
          
          <div class="diag-sub-sec">
            <h4>14-Day Consistency &amp; Accuracy</h4>
            <div class="diag-dots-row">${dotsHtml}</div>
          </div>

          <div class="diag-sub-sec">
            <h4>Weak Items Needing Practice</h4>
            <div class="diag-weak-row">${weakHtml}</div>
          </div>

          <div class="diag-sub-sec">
            <h4>Core 20 Sentences Accuracy</h4>
            <table class="diag-sub-table">
              <thead><tr><th>Sentence</th><th>Accuracy</th></tr></thead>
              <tbody>${sentenceRows}</tbody>
            </table>
          </div>
        </div>`;
      }).join('')}
      <p class="pb-b-foot">Diagnostics v2 actively measures recall from sentence cloze challenges, picture book games, sound quizzes, flashcards, and ayah checks.</p>
    </details>`;
}

if (typeof module !== 'undefined' && module.exports) module.exports = { diagFor, logRecall, TWENTY_SENTENCES };

