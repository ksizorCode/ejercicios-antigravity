/**
 * 🛰️ Service Worker - Password Shield
 * Permite generar contraseñas seguras sin conexión.
 */

const CACHE_NAME = 'password-shield-v1';
const ASSETS = [
    'index.html',
    'assets/css/style.css',
    'assets/js/app.js',
    'manifest.json',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@300;400;600;700&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', event => {
    console.log('🛡️ Shield activado y protegiendo');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
