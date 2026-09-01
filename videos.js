/* ————— Hikayat · 📺 وِيدْيُو — watching together ——————————————————————————
   Reza, 2026-08-31: "maybe insert youtube videos wherever relevant to learn
   words and reading."

   Worth doing — a song is how most children actually pick the alphabet up, and
   the site had no singing in it anywhere. But YouTube is not a neutral file
   host, and dropping a raw player into a three-year-old's tap path would have
   quietly undone two things the rest of the site is careful about. So:

   1. IT IS NOT A DOOR, AND IT IS NOT A DESTINATION. There is no 📺 tile on the
      home screen. A strip appears at the BOTTOM of الأَصْوَات and of القَاعِدَة —
      after the letters, after the stages — where a child has already done the
      thing the video is about. The five-door ceiling in DESIGN.md §2 is
      untouched, and so is the rule that the site's own work comes first.
   2. NOTHING PLAYS UNTIL SOMEBODY ASKS. The iframe is not in the page at all
      until the poster is tapped: no autoplay, no preloading, no third-party
      request on a screen nobody asked to watch. Tap once and you get exactly
      one video, stopped, with its own play button.
   3. youtube-nocookie.com, rel=0, modestbranding, playsinline. nocookie is
      YouTube's own privacy-enhanced host and sets nothing until playback
      starts. rel=0 no longer removes related videos — since 2018 it only
      restricts them to the same channel — which is worth being honest about:
      it narrows the exit, it does not seal it. A child can still reach YouTube
      proper through the logo. That is why the strip says "watch together" and
      why it sits where a grown-up is likely to be.
   4. IT IS THE ONE THING THAT NEEDS THE INTERNET. Everything else here works
      on a plane. So the strip checks navigator.onLine and says so plainly
      rather than showing a dead grey box that reads as broken.

   EVERY ID WAS VERIFIED against YouTube's oembed endpoint on 2026-08-31 —
   title and channel confirmed live, and both are recorded below. Hardcoded
   video ids rot: a channel deletes, an upload goes private, and the tile turns
   into a grey rectangle. `title` and `channel` are here so that when one does
   die it is obvious WHAT is missing rather than just that something is. There
   is no test for this — a test cannot reach the network — so it is a periodic
   manual check, listed in HANDOVER.md §7.

   NOT DUBBED CARTOONS. Every one of these is a teaching video in Arabic: the
   letters, the harakat, the words. Peppa Pig in Arabic is the thing Reza asked
   about twice and it is still no — but that was a copyright answer, and this
   is a different one: dubbed entertainment is listening practice at best, and
   at three to six the listening has to be attached to something being taught.
   ========================================================================= */
'use strict';

const VIDEOS = {
  letters: {
    title: 'أَنَاشِيد الحُرُوف',
    titleEn: 'Songs for the letters',
    note: 'The alphabet, sung. Best after they have met a few letters here first.',
    items: [
      { id: 'Tx_yoMRDDqc', emoji: '🎵',
        ar: 'أَلِف أَرْنَب', en: 'Alif, arnab — the alphabet song',
        channel: 'Learn with Zakaria — تعلم مع زكريا',
        title: 'ألف أرنب يجري يلعب - أنشودة حروف الهجاء' },
      { id: 'h5XUOoby-VQ', emoji: '🎶',
        ar: 'الحُرُوف بِالكَسْرَة', en: 'The letters, with kasra',
        channel: 'تعلم — Learn',
        title: 'أنشودة الحروف العربية بالكسرة للأطفال' },
      { id: 'X_ewhIrxp6E', emoji: '🔤',
        ar: 'الحُرُوف بِالحَرَكَات الثَّلَاث', en: 'Every letter, all three harakat',
        channel: 'عصافير الجنة',
        title: 'أنشودة الحروف العربية بالحركات الثلاث' },
    ],
  },

  /* This one is the reason the strip exists at all. Sukoon gates Level 2 and
     the Qaida is where it is taught; a song that runs fatha-damma-kasra-sukoon
     is the same nine-step ladder with a tune on it. */
  harakat: {
    title: 'أَنَاشِيد الحَرَكَات',
    titleEn: 'Songs for the marks',
    note: 'The same marks as the stages above — fatha, damma, kasra, sukoon.',
    items: [
      { id: '0ixWFHrGh1I', emoji: '✨',
        ar: 'الفَتْحَة وَالضَّمَّة وَالكَسْرَة وَالسُّكُون', en: 'Fatha, damma, kasra — and sukoon',
        channel: 'Moltaka Al Maarifa',
        title: 'أنشودة حركات الحروف العربية' },
      { id: 'X_ewhIrxp6E', emoji: '🔤',
        ar: 'الحُرُوف بِالحَرَكَات الثَّلَاث', en: 'Every letter, all three harakat',
        channel: 'عصافير الجنة',
        title: 'أنشودة الحروف العربية بالحركات الثلاث' },
    ],
  },

  words: {
    title: 'كَلِمَات',
    titleEn: 'Words to listen to',
    note: 'Whole words, said by people. Listening is how the words stick at this age.',
    items: [
      { id: 'dyKZDlWQh14', emoji: '🐰',
        ar: 'أَهْلًا يَا أَرْنَب', en: 'Episode 1: Hello Bunny! — Ahlan & Arnab',
        channel: 'Kids Arabic',
        title: 'أَهْلًا يَا أَرْنَب — Episode 1: Hello Bunny! | Arabic for Kids' },
      { id: 'S_UN5O38C4Q', emoji: '🐘',
        ar: 'الحَيَوَانَات', en: 'Animals — names and sounds',
        channel: 'تعلم — Learn',
        title: 'الحيوانات للاطفال - أسماء وأصوات الحيوانات' },
      { id: 'eKmenhp68G4', emoji: '🎨',
        ar: 'الأَلْوَان', en: 'Colours',
        channel: 'Learn with Om Nom — Arabic',
        title: 'تعلم الألوان بالعربية' },
      { id: 'uaqQKFLthnM', emoji: '👶',
        ar: 'لِلصِّغَار', en: 'For the littlest — animals, numbers, colours',
        channel: 'Kalam Kids',
        title: 'Arabic learning for Babies & Toddlers' },
    ],
  },
};

/* ---------- the strip ----------
   Appended to a screen, never a screen of its own. Returns quietly if the host
   is not there, so a caller never has to guard. */
function videoStrip(hostId, topics) {
  const host = document.getElementById(hostId);
  if (!host) return;
  const sets = (Array.isArray(topics) ? topics : [topics]).map(t => VIDEOS[t]).filter(Boolean);
  if (!sets.length) return;

  const wrap = document.createElement('div');
  wrap.className = 'vid-strip';
  wrap.innerHTML = sets.map(set => `
    <div class="vs-set">
      <div class="vs-head">
        <span class="vs-ic">📺</span>
        <span class="vs-t">${set.title}</span>
        <span class="vs-en">${set.titleEn} · watch together</span>
      </div>
      <p class="vs-note">${set.note}</p>
      <div class="vs-row">
        ${set.items.map(v => `
          <button class="vid-card" data-v="${v.id}" data-t="${esc(v.ar)}">
            <span class="vc-em">${v.emoji}</span>
            <span class="vc-play">▶</span>
            <span class="vc-ar">${v.ar}</span>
            <span class="vc-en">${v.en}</span>
            <span class="vc-ch">${v.channel}</span>
          </button>`).join('')}
      </div>
    </div>`).join('') + `<div class="vs-player" id="vsPlayer" hidden></div>`;
  host.appendChild(wrap);

  wrap.querySelectorAll('.vid-card').forEach(c =>
    c.addEventListener('click', () => openVideo(c.dataset.v, c.dataset.t)));
}
function esc(s) { return String(s).replace(/"/g, '&quot;'); }

/* One player, built on demand, replaced on the next tap. Two iframes both
   loaded and one of them audible is the single worst thing that can happen on
   an ear-first site. */
function openVideo(id, label) {
  const p = document.getElementById('vsPlayer');
  if (!p) return;

  /* whatever the site was saying, stop saying it */
  try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
  document.querySelectorAll('audio').forEach(a => { try { a.pause(); } catch (e) {} });

  if (navigator.onLine === false) {
    p.hidden = false;
    p.innerHTML = `<p class="vs-off">📴 هَذَا يَحْتَاجُ الإِنْتَرْنِت
      <small>Videos are the one part of this site that needs the internet.
      Everything else works offline.</small></p>`;
    p.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
    '?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3';
  p.hidden = false;
  p.innerHTML = `
    <div class="vs-frame">
      <iframe src="${src}" title="${label || 'video'}" loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>
    <button class="vs-close" id="vsClose">✕ أَغْلِق <small>Close the video</small></button>`;
  const c = document.getElementById('vsClose');
  if (c) c.addEventListener('click', closeVideo);
  p.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* Removing the iframe is what actually stops the sound. Hiding it does not. */
function closeVideo() {
  const p = document.getElementById('vsPlayer');
  if (!p) return;
  p.innerHTML = '';
  p.hidden = true;
}

if (typeof module !== 'undefined' && module.exports) module.exports = { VIDEOS };
