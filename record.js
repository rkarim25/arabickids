/* ————— Hikayat · 🎙 the recording booth ———————————————————————————————————
   Reza, 2026-08-31: real letter audio is "your voice or a set you hold rights
   to." That has been an open gap for weeks and it was never going to close by
   searching harder, because the thing being searched for does not exist.
   Commons has one 31-second clip of the alphabet sung through; Lingua Libre
   has alif and not baa; every complete Qaida recording on the internet is
   somebody's copyrighted product. There is no free, complete, 28-letter set,
   and waiting for one to appear is not a plan.

   So this closes it from the other end. Reza already HOLDS the rights to one
   voice, and it happens to be the best possible voice for his own children to
   learn from. Three minutes in the kitchen and the site has real human audio.

   WHY A REAL VOICE MATTERS HERE and not everywhere. The neural voice is very
   good at words and sentences. It is worst at exactly this one job: a lone
   letter. A speech engine cannot say a bare consonant at all (trap 7 — the
   clips are letter+fatha for that reason), it will not hold ffff or ssss the
   way an adult naturally does when teaching, and it has no idea that ح and ه
   are the two a child confuses most and need a little extra care. A parent
   does all three without being asked.

   HOW IT OBEYS THE RULES.
   · Rule 1 stays intact: a recording is a FILE, played back. This is not
     speechSynthesis creeping in through the side door — that stays banned.
   · Rule 3, no writing, is untouched: this screen lives behind ⚙ For
     grown-ups, where every adult-facing thing on this site already lives. No
     child sees it, and nothing here asks anybody to type Arabic.
   · The five-door ceiling is untouched. This is not a sixth door.

   WHERE THE SOUND GOES. IndexedDB on this device, keyed by the SAME key the
   audio manifest uses, so playback is a one-line lookup in audio.js and a
   recording simply wins over its generated clip. Nothing is uploaded: the rule
   on this site is that only a face id and a star count ever leave the device,
   and a recording of a parent's voice is not going to be what breaks it.

   WHICH MEANS IT IS PER-DEVICE, and the screen says so plainly rather than
   letting him discover it. ⬇ Save all downloads every clip plus an index.json,
   so the set can be committed to audio/rec/ and shipped to every device at
   once. That is the durable home; IndexedDB is the workbench.
   ========================================================================= */
'use strict';

/* ---------- the store ----------
   Keyed on the manifest key, so `snd:ب` here overrides `snd:ب` there. Getting
   that wrong would fail SILENTLY — the clip would record fine and simply never
   play — so keys are built by the same helpers audio.js uses, never by hand.
   window.RECORDINGS is a plain Map of key -> objectURL that audio.js reads
   synchronously at play time; the async part all happens once, at startup. */
const REC_DB = 'hikayat-rec', REC_STORE = 'clips';
window.RECORDINGS = window.RECORDINGS || new Map();

let recDbP = null;
function recDB() {
  if (recDbP) return recDbP;
  recDbP = new Promise((res, rej) => {
    const r = indexedDB.open(REC_DB, 1);
    r.onupgradeneeded = () => {
      if (!r.result.objectStoreNames.contains(REC_STORE)) r.result.createObjectStore(REC_STORE);
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  return recDbP;
}
function recTx(mode, fn) {
  return recDB().then(db => new Promise((res, rej) => {
    const tx = db.transaction(REC_STORE, mode);
    const rq = fn(tx.objectStore(REC_STORE));
    tx.oncomplete = () => res(rq && rq.result);
    tx.onerror = () => rej(tx.error);
  }));
}
function revokeRec(key) {
  const u = window.RECORDINGS.get(key);
  if (u) { try { URL.revokeObjectURL(u); } catch (e) {} }
}
const recPut = (key, blob, mime) =>
  recTx('readwrite', s => s.put({ blob, mime, at: Date.now() }, key))
    .then(() => { revokeRec(key); window.RECORDINGS.set(key, URL.createObjectURL(blob)); });
const recDel = key =>
  recTx('readwrite', s => s.delete(key))
    .then(() => { revokeRec(key); window.RECORDINGS.delete(key); });
const recAll = () => recTx('readonly', s => s.getAll()).then(v => v || []);
const recKeys = () => recTx('readonly', s => s.getAllKeys()).then(v => v || []);

/* Load every recording into memory ONCE. They are a second of speech each, so
   the whole set is smaller than one page of this site, and doing it up front is
   what lets playback stay synchronous — a tap must never wait on a database. */
function recWarm() {
  if (!window.indexedDB) return Promise.resolve();
  return Promise.all([recKeys(), recAll()]).then(([keys, vals]) => {
    keys.forEach((k, i) => {
      const v = vals[i];
      if (v && v.blob) window.RECORDINGS.set(k, URL.createObjectURL(v.blob));
    });
  }).catch(() => {});
}
recWarm();

/* ---------- what there is to record ----------
   Three passes, and the one that matters is offered on its own. A parent with
   three minutes should spend them on the 28 things the machine is worst at,
   not be handed 84 in one sitting and give up at number nine. */
function recWordKey(w) { return (typeof normAr === 'function') ? normAr(w) : w; }

function recPasses() {
  const L = (typeof LETTERS !== 'undefined') ? LETTERS : [];
  return [
    {
      id: 'snd', icon: '🔊', title: 'The sounds', sub: '28 · what each letter SAYS',
      note: 'Say the sound, not the name. Hold the ones you can: ffff, ssss, mmmm.',
      items: L.map(x => ({ key: 'snd:' + x.l, glyph: x.l, say: x.l + 'َ', hint: 'the sound it makes' })),
    },
    {
      id: 'nam', icon: '🏷', title: 'The names', sub: '28 · what each letter is CALLED',
      note: 'Just the name, once, unhurried.',
      items: L.map(x => ({ key: 'nam:' + x.l, glyph: x.l, say: x.name, hint: x.name })),
    },
    {
      id: 'wrd', icon: '🖼', title: 'The picture words', sub: '28 · the word on each card',
      note: 'Say it the way you would say it to them, not the way you would read it aloud.',
      items: L.map(x => ({ key: recWordKey(x.word), glyph: x.word, say: x.word, hint: x.en })),
    },
  ];
}

/* ---------- recording ---------- */
let mediaStream = null, recorder = null, recChunks = [], recMime = '';

function pickMime() {
  const want = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
  for (const m of want) if (window.MediaRecorder && MediaRecorder.isTypeSupported(m)) return m;
  return '';   // let the browser choose — Safari does not answer isTypeSupported honestly
}
async function micOn() {
  if (mediaStream) return mediaStream;
  mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
  });
  return mediaStream;
}
function micOff() {
  if (mediaStream) { mediaStream.getTracks().forEach(t => t.stop()); mediaStream = null; }
}
function startRec(onStop) {
  recChunks = [];
  recMime = pickMime();
  recorder = new MediaRecorder(mediaStream, recMime ? { mimeType: recMime } : undefined);
  recorder.ondataavailable = e => { if (e.data && e.data.size) recChunks.push(e.data); };
  recorder.onstop = () => {
    const type = (recorder && recorder.mimeType) || recMime || 'audio/webm';
    onStop(new Blob(recChunks, { type }), type);
    recorder = null;
  };
  recorder.start();
}
function stopRec() { if (recorder && recorder.state !== 'inactive') recorder.stop(); }

/* ---------- the screen ----------
   One card at a time, big buttons, and it moves on by itself once a clip is
   kept. A grid of 28 small record buttons would be quicker to build and nobody
   would ever finish it. */
let bPass = null, bIdx = 0, bBusy = false;

function renderBooth(passId) {
  const host = document.getElementById('home');
  const passes = recPasses();
  show('home');

  if (!passId) {
    const done = p => p.items.filter(i => window.RECORDINGS.has(i.key)).length;
    host.innerHTML = `
      <header class="sub-head">
        <button class="back" id="rbBack">✕</button>
        <h2>سَجِّلْ صَوْتَك <small>Record your voice</small></h2>
        <span style="width:48px"></span>
      </header>
      <div class="parent-box">
        <p class="pb-note">The machine voice is good at words and poor at single
          letters. Yours is better, and they already know it. Three minutes does
          the whole first pass.</p>
        ${passes.map(p => {
          const d = done(p), pc = Math.round(d / Math.max(1, p.items.length) * 100);
          return `<button class="rec-pass" data-p="${p.id}">
            <span class="rp-ic">${p.icon}</span>
            <span class="rp-txt"><b>${p.title}</b><small>${p.sub}</small></span>
            <span class="rp-n${d === p.items.length ? ' full' : ''}">${d}/${p.items.length}</span>
            <span class="rp-bar"><i style="width:${pc}%"></i></span>
          </button>`;
        }).join('')}
        <button class="big-btn" id="rbSave">⬇ Save all to files</button>
        <button class="pb-out" id="rbWipe">Delete every recording on this device</button>
        <p class="pb-priv">Recordings stay on <b>this device</b> and are never uploaded.
          Save them to files and they can be added to the site for good, on every device.</p>
        <p class="pb-msg" id="rbMsg"></p>
      </div>`;
    document.getElementById('rbBack').addEventListener('click', () => { micOff(); renderParent(); });
    host.querySelectorAll('.rec-pass').forEach(b =>
      b.addEventListener('click', () => renderBooth(b.dataset.p)));
    document.getElementById('rbSave').addEventListener('click', saveAllRecordings);
    document.getElementById('rbWipe').addEventListener('click', wipeAllRecordings);
    return;
  }

  bPass = passes.find(p => p.id === passId) || passes[0];
  const first = bPass.items.findIndex(i => !window.RECORDINGS.has(i.key));
  bIdx = first < 0 ? 0 : first;
  paintRecCard();
}

function paintRecCard() {
  const host = document.getElementById('home');
  const it = bPass.items[bIdx];
  const have = window.RECORDINGS.has(it.key);
  const done = bPass.items.filter(i => window.RECORDINGS.has(i.key)).length;
  host.innerHTML = `
    <header class="sub-head">
      <button class="back" id="rcBack">✕</button>
      <h2>${bPass.icon} ${bPass.title} <small>${done}/${bPass.items.length} recorded</small></h2>
      <span style="width:48px"></span>
    </header>
    <div class="rec-card">
      <div class="rc-glyph">${it.glyph}</div>
      <p class="rc-hint">Say: <b>${it.hint}</b></p>
      <p class="rc-note">${bPass.note}</p>
      <button class="rc-rec${have ? ' has' : ''}" id="rcRec">
        <span class="rc-dot">●</span><small id="rcLbl">${have ? 'Hold to record again' : 'Hold to record'}</small>
      </button>
      <div class="rc-row">
        <button class="rc-sm" id="rcPrev">←</button>
        <button class="rc-sm${have ? '' : ' off'}" id="rcPlay">▶ Play</button>
        <button class="rc-sm${have ? '' : ' off'}" id="rcDel">🗑</button>
        <button class="rc-sm" id="rcNext">→</button>
      </div>
      <p class="rc-cmp">Hear what it replaces:
        <button class="rc-link" id="rcOrig">▶ the machine voice</button></p>
      <p class="pb-msg" id="rcMsg"></p>
    </div>`;

  const msg = (t, good) => {
    const m = document.getElementById('rcMsg');
    if (m) { m.textContent = t || ''; m.className = 'pb-msg ' + (good ? 'good' : 'bad'); }
  };
  const playMine = () => {
    const u = window.RECORDINGS.get(it.key);
    if (u) { const a = new Audio(u); a.play().catch(() => {}); }
  };

  document.getElementById('rcBack').addEventListener('click', () => { micOff(); renderBooth(); });
  document.getElementById('rcPrev').addEventListener('click', () => {
    bIdx = (bIdx - 1 + bPass.items.length) % bPass.items.length; paintRecCard();
  });
  document.getElementById('rcNext').addEventListener('click', () => {
    bIdx = (bIdx + 1) % bPass.items.length; paintRecCard();
  });
  document.getElementById('rcPlay').addEventListener('click', playMine);
  document.getElementById('rcDel').addEventListener('click', () => recDel(it.key).then(paintRecCard));

  /* This plays the GENERATED clip even when a recording exists, so a parent can
     hear what they are replacing and judge whether they actually improved on
     it. That is the only place on the site that deliberately bypasses a
     recording, and it is why playKeyRaw exists in audio.js. */
  document.getElementById('rcOrig').addEventListener('click', () => {
    if (typeof playKeyRaw === 'function') playKeyRaw(it.key, it.say);
    else if (typeof say === 'function') say(it.say);
  });

  /* Press and hold. Tap-to-start / tap-to-stop records the sound of the second
     tap; holding cannot, and it is also what a phone already trains you to do. */
  const btn = document.getElementById('rcRec');
  const lbl = document.getElementById('rcLbl');
  let holding = false;

  const begin = async ev => {
    ev.preventDefault();
    if (bBusy || holding) return;
    try { await micOn(); }
    catch (e) { return msg('The browser would not give this page the microphone.'); }
    holding = true; bBusy = true;
    btn.classList.add('live');
    lbl.textContent = 'Recording… let go when done';
    msg('');
    startRec((blob, mime) => {
      bBusy = false;
      if (!blob || blob.size < 900) {
        msg('That was too short to keep — hold it a little longer.');
        return;
      }
      recPut(it.key, blob, mime).then(() => {
        playMine();
        /* forward automatically: the point is to get through 28 of them */
        setTimeout(() => {
          if (bIdx < bPass.items.length - 1) bIdx++;
          paintRecCard();
        }, 800);
      }).catch(() => msg('Could not save that clip on this device.'));
    });
  };
  const end = ev => {
    ev.preventDefault();
    if (!holding) return;
    holding = false;
    btn.classList.remove('live');
    lbl.textContent = 'Hold to record';
    setTimeout(stopRec, 220);    // do not clip the tail of a held ssss
  };
  btn.addEventListener('pointerdown', begin);
  btn.addEventListener('pointerup', end);
  btn.addEventListener('pointercancel', end);
  btn.addEventListener('pointerleave', end);
}

/* ---------- getting them off the device ----------
   Filenames are the manifest key, sanitised; index.json carries the real key
   beside each one — so the set can be dropped into audio/rec/ and wired in
   without anybody having to guess which file was which letter. */
function recExtFor(mime) {
  if (/mp4|m4a|aac/.test(mime || '')) return 'm4a';
  if (/ogg/.test(mime || '')) return 'ogg';
  return 'webm';
}
function recSafeName(k) {
  return k.replace(/:/g, '_')
    .replace(/[^A-Za-z0-9_-]/g, c => '-' + c.codePointAt(0).toString(16));
}
function recDownload(url, name) {
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => { try { URL.revokeObjectURL(url); } catch (e) {} }, 30000);
}
async function saveAllRecordings() {
  const m = document.getElementById('rbMsg');
  const set = (t, good) => { if (m) { m.textContent = t; m.className = 'pb-msg ' + (good ? 'good' : 'bad'); } };
  const [keys, vals] = await Promise.all([recKeys(), recAll()]);
  if (!keys.length) return set('Nothing recorded on this device yet.');
  const index = [];
  for (let i = 0; i < keys.length; i++) {
    const v = vals[i];
    if (!v || !v.blob) continue;
    const file = recSafeName(keys[i]) + '.' + recExtFor(v.mime);
    index.push({ key: keys[i], file, mime: v.mime || '', bytes: v.blob.size });
    recDownload(URL.createObjectURL(v.blob), file);
    await new Promise(r => setTimeout(r, 150));   // browsers throttle a burst of downloads
  }
  recDownload(
    URL.createObjectURL(new Blob([JSON.stringify(index, null, 2)], { type: 'application/json' })),
    'index.json');
  set(`Saved ${index.length} clips and index.json. Put them in audio/rec/ and they ship to every device.`, true);
}
async function wipeAllRecordings() {
  if (!confirm('Delete every recording stored on this device? Files you already saved are not affected.')) return;
  for (const k of await recKeys()) await recDel(k);
  renderBooth();
}
