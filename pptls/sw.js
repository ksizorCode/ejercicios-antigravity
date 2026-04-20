/**
 * 🛰️ Service Worker - PPTLS Space Edition
 * Gestión de cache para juego offline.
 */

const CACHE_NAME = 'pptls-space-v1';
const ASSETS = [
    'index.html',
    'assets/css/style.css',
    'assets/js/app.js',
    'manifest.json',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@400;600&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', event => {
    console.log('🛸 Motor de hiperespacio activado');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
