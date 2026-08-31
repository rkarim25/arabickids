/* Hikayat service worker — the whole site, offline.

   Children use this on a tablet in a car and on aeroplanes. Everything here is
   a handful of small text files and hand-drawn SVG, so the entire site fits in
   a cache with room to spare — there is no reason for it ever to need a signal.

   NOTE, learned the hard way on the grown-up site: cache.addAll() rejects the
   WHOLE install if even one URL 404s, so a typo'd filename here breaks offline
   completely and silently. scripts/test-shell.js checks every name in CORE
   actually exists. Add a file, add it here, run the test. */

const VERSION = 'hikayat-v1';
const CORE = [
  './',
  'index.html',
  'style.css',
  'kids.css',
  'print.css',
  'app.js',
  'letters.js',
  'book-lulu1.js',
  'book-bayt.js',
  'kids.js',
  'print.js',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  /* Google Fonts: cache-first and never block on it. If the font never
     arrives the site still reads — the fallback stack is a real one. */
  if (/fonts\.(googleapis|gstatic)\.com/.test(req.url)) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit))
    );
    return;
  }

  if (new URL(req.url).origin !== location.origin) return;

  /* Network-first for the shell so a redeploy is picked up on the next online
     load, cache as the safety net. A child offline still gets everything. */
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match('index.html')))
  );
});
