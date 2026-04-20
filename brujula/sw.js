/**
 * 🛠️ Service Worker - Brújula Imperial
 * Permite que la aplicación funcione sin conexión a internet.
 */

const CACHE_NAME = 'brujula-imperial-v1';
const ASSETS = [
    'index.html',
    'assets/css/style.css',
    'assets/js/app.js',
    'manifest.json',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=IM+Fell+English:ital@0;1&display=swap'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Cache abierto');
                return cache.addAll(ASSETS);
            })
    );
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', event => {
    console.log('✨ Service Worker activo');
});

// Estrategia de Cache: Cache First (ideal para una utilidad como esta)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
