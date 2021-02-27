var CACHE_NAME = 'xPense-v1.0';
var urlsToCache = [
  '/',
  '/history',
  '/settings',
  '/favicon.ico',
  "/css/bootstrap.min.css",
  "/css/sweetalert2-material.min.css",
  "/css/xpense.css",
  "/lib/bootstrap.bundle.min.js",
  "/lib/turbo.es5-umd.min.js",
  "/lib/sweetalert2.min.js",
  "/lib/download.min.js",
  "/lib/indexeddb-export-import.min.js",
  "/lib/dexie.min.js",
  "/lib/vue.global.prod.js",
  "/js/helpers.js",
  "/js/storage.js",
  "/js/index.js",
  "/js/history.js",
  "/js/settings.js",
  "/js/turbo.js"
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});