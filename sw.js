const CACHE_NAME = 'notes-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './bg.jpg',
  './icon.png'
];

// Install Service Worker and cache core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Cache-first approach for instantaneous offline rendering
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});