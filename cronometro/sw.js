// 🛠️ Service Worker - Chronos Pro
const CACHE_NAME = 'chronos-v1';
const ASSETS = [
    './',
    './index.html',
    './assets/css/style.css',
    './assets/js/app.js',
    './manifest.json',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalar y cachear recursos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

// Estrategia: Cache First
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
