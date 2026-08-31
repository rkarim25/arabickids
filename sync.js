/* ————— Hikayat · sync across devices ————————————————————————————————————————
   Reza, 2026-08-31: "i also want sync features across every device."

   THE CONSTRAINT that shapes this: rule 6 says a child never types, and a
   four-year-old cannot spell their own name, let alone an email address. So
   the children are never asked to sign in. A GROWN-UP signs in once per device,
   on a screen the children have no reason to open, using the same email and
   sync code they already use on the grown-up site. After that both children's
   profiles simply follow the family from the tablet to the phone.

   STARS MERGE BY MAX, THEY DO NOT OVERWRITE. This is not a detail — it falls
   straight out of rule 5, that a child can never lose a star. If the tablet has
   been used on a car journey and the phone at home, last-write-wins would throw
   one of those sessions away. Taking the larger of the two counts cannot lose
   anything, and because stars only ever go up it is always the right answer.
   The merge happens on the server too (worker /kids), so two devices syncing at
   once still cannot clobber each other.

   Nothing about a child leaves the device except a face id and a star count.
   No name, no photo, no recording, no date of birth.
   ========================================================================= */
'use strict';

const SYNC_URL = 'https://arabic-sync.rkarim88.workers.dev';
const SESS_KEY = 'hikayat-session';
const SYNC_AT = 'hikayat-synced-at';

const session = () => readJSON(SESS_KEY, null);
const syncedAt = () => readJSON(SYNC_AT, 0);

async function signIn(email, code) {
  const r = await fetch(SYNC_URL + '/login-pw', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password: code.trim() }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'sign-in-failed');
  writeJSON(SESS_KEY, { token: j.session, email: j.email });
  return j;
}

function signOut() {
  try { localStorage.removeItem(SESS_KEY); localStorage.removeItem(SYNC_AT); } catch (e) {}
}

/* Push what is here, take back the merged truth. The server does the same
   max-merge, so the response is authoritative for every device. */
async function syncNow() {
  const s = session();
  if (!s || !s.token) return { skipped: 'not-signed-in' };
  const body = JSON.stringify({ kids: allKids(), savedAt: Date.now() });
  const r = await fetch(SYNC_URL + '/kids', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + s.token },
    body,
  });
  if (r.status === 401) { signOut(); throw new Error('session-expired'); }
  if (!r.ok) throw new Error('sync-failed-' + r.status);
  const merged = await r.json();
  if (merged && Array.isArray(merged.kids)) {
    saveKids(merged.kids);
    writeJSON(SYNC_AT, Date.now());
  }
  return merged;
}

/* Sync quietly: on load, and a few seconds after any star is won. Never blocks
   a child, never shows an error to a child — if the network is not there the
   stars are already safe on the device and will go up next time. */
let syncTimer = null;
function syncSoon() {
  if (!session()) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => { syncNow().catch(() => {}); }, 4000);
}

/* ================= the grown-ups' screen ================================= */

function renderParent() {
  const host = document.getElementById('home');
  const s = session();
  show('home');
  host.innerHTML = `
    <header class="sub-head">
      <button class="back" id="pBack2">✕</button>
      <h2>لِلْكِبَار <small>For grown-ups</small></h2>
      <span style="width:48px"></span>
    </header>
    <div class="parent-box">
      ${s ? `
        <p class="pb-on">✅ Syncing as <b>${s.email}</b></p>
        <p class="pb-note">Both children's stars are backed up and follow you to any
          device you sign in on. Last synced: ${syncedAt() ? new Date(syncedAt()).toLocaleString() : 'not yet'}.</p>
        <button class="big-btn" id="pSync">🔄 Sync now</button>
        <button class="pb-out" id="pOut">Sign out of this device</button>
      ` : `
        <p class="pb-note">Sign in once on each device and the children's stars follow
          them around. Use the same email and sync code as the grown-up Arabic site.
          <b>The children never sign in and never type anything.</b></p>
        <label class="pb-l">Email
          <input id="pEmail" type="email" autocomplete="username" inputmode="email" placeholder="you@example.com">
        </label>
        <label class="pb-l">Sync code
          <input id="pCode" type="password" autocomplete="current-password" placeholder="your sync code">
        </label>
        <button class="big-btn" id="pIn">Sign in</button>
      `}
      <p class="pb-msg" id="pMsg"></p>
      <p class="pb-priv">Only a face and a star count ever leave this device — no name,
        no photo, no recording.</p>
    </div>`;

  document.getElementById('pBack2').addEventListener('click', () => { renderHome(); show('home'); });
  const msg = (t, good) => {
    const m = document.getElementById('pMsg');
    m.textContent = t; m.className = 'pb-msg ' + (good ? 'good' : 'bad');
  };

  if (s) {
    document.getElementById('pSync').addEventListener('click', async () => {
      msg('Syncing…');
      try { await syncNow(); msg('Done — everything is up to date.', true); renderParent(); }
      catch (e) { msg(e.message === 'session-expired' ? 'Signed out — please sign in again.' : 'Could not reach the server. Stars are still safe on this device.'); }
    });
    document.getElementById('pOut').addEventListener('click', () => { signOut(); renderParent(); });
  } else {
    document.getElementById('pIn').addEventListener('click', async () => {
      const email = document.getElementById('pEmail').value;
      const code = document.getElementById('pCode').value;
      if (!email || !code) return msg('Both boxes are needed.');
      msg('Signing in…');
      try {
        await signIn(email, code);
        await syncNow();
        msg('Signed in — stars will now follow you.', true);
        renderParent();
      } catch (e) {
        msg(e.message === 'bad-code' ? 'That code is not right.'
          : e.message === 'email-not-allowed' ? 'That email is not enabled on this site.'
          : 'Could not sign in — check the connection and try again.');
      }
    });
  }
}

/* pull on load, so a device that was used elsewhere catches up before play */
window.addEventListener('DOMContentLoaded', () => {
  if (session()) syncNow().then(() => { if (currentKid()) renderHome(); }).catch(() => {});
});
