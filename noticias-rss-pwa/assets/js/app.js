/**
 * 🧠 NewsReader App Logic
 * Backend: RSS to JSON via API
 * Frontend: Vanilla JS + Tailwind
 */

// Configuración de Feeds RSS (Fuentes de noticias)
const RSS_FEEDS = {
    general: 'https://elpais.com/rss/elpais/portada.xml',
    tech: 'https://feeds.bbci.co.uk/mundo/tecnologia/rss.xml',
    sports: 'https://as.com/rss/tags/ultimas_noticias.xml'
};

// API de proxy para convertir XML a JSON y evitar CORS
const PROXY_API = 'https://api.rss2json.com/v1/api.json?rss_url=';

// Elementos del DOM
const newsContainer = document.getElementById('news-container');
const loader = document.getElementById('loader');
const refreshBtn = document.getElementById('refresh-btn');
const tabs = document.querySelectorAll('.category-tab');

let currentFeed = 'general';

/**
 * ⚡ Inicialización de la App
 */
document.addEventListener('DOMContentLoaded', () => {
    loadNews(currentFeed);
    registerServiceWorker();
    setupEventListeners();
});

/**
 * 🛠️ Configuración de Eventos
 */
function setupEventListeners() {
    // Cambio de pestañas/categorías
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // UI Update
            tabs.forEach(t => {
                t.classList.remove('active', 'bg-sky-500', 'text-white');
                t.classList.add('text-slate-400');
            });
            tab.classList.add('active');
            tab.classList.remove('text-slate-400');

            // Data Update
            const feedKey = tab.getAttribute('data-feed');
            if (feedKey !== currentFeed) {
                currentFeed = feedKey;
                loadNews(currentFeed);
            }
        });
    });

    // Botón Refresh
    refreshBtn.addEventListener('click', () => {
        const icon = refreshBtn.querySelector('i');
        icon.classList.add('animate-spin');
        loadNews(currentFeed).finally(() => {
            setTimeout(() => icon.classList.remove('animate-spin'), 600);
        });
    });
}

/**
 * 📡 Obtener noticias de la API
 */
async function loadNews(category) {
    showLoader(true);
    newsContainer.innerHTML = ''; // Limpiar noticias anteriores

    try {
        const response = await fetch(`${PROXY_API}${encodeURIComponent(RSS_FEEDS[category])}`);
        const data = await response.json();

        if (data.status === 'ok') {
            renderNews(data.items);
        } else {
            showError("No se pudieron cargar las noticias. Intenta más tarde.");
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        showError("Error de conexión. Verifica tu internet 🌐");
    } finally {
        showLoader(false);
    }
}

/**
 * 🖼️ Renderizar las noticias en el DOM
 */
function renderNews(items) {
    if (items.length === 0) {
        showError("No hay noticias disponibles en este momento 📭");
        return;
    }

    items.forEach((item, index) => {
        // Extraer imagen si existe en el feed, si no usar Picsum aleatorio
        const thumbnail = item.thumbnail || item.enclosure.link || `https://picsum.photos/seed/${index + 50}/600/400`;
        
        const card = document.createElement('article');
        card.className = 'news-card rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex flex-col fade-in';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="relative h-56 overflow-hidden">
                <img src="${thumbnail}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                <div class="absolute inset-0 image-overlay flex items-end p-4">
                    <span class="bg-sky-500/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md text-white">
                        ${item.pubDate.split(' ')[0]}
                    </span>
                </div>
            </div>
            <div class="p-5 flex-grow flex flex-col gap-3">
                <h3 class="text-lg font-bold leading-tight text-white line-clamp-2">
                    ${item.title}
                </h3>
                <p class="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    ${item.description.replace(/<[^>]*>?/gm, '')}
                </p>
                <div class="mt-auto pt-4 flex items-center justify-between">
                    <span class="text-[10px] text-slate-500 font-medium italic">
                        Por: ${item.author || 'Redacción'}
                    </span>
                    <a href="${item.link}" target="_blank" class="flex items-center gap-2 text-sky-400 font-bold text-xs hover:text-sky-300 transition-colors">
                        LEER MÁS <i class="fas fa-arrow-right text-[10px]"></i>
                    </a>
                </div>
            </div>
        `;
        
        newsContainer.appendChild(card);
    });
}

/**
 * 🔄 Helpers de UI
 */
function showLoader(show) {
    loader.classList.toggle('hidden', !show);
}

function showError(msg) {
    newsContainer.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-10 text-center gap-4">
            <i class="fas fa-exclamation-triangle text-amber-500 text-4xl"></i>
            <p class="text-slate-300 font-medium">${msg}</p>
            <button onclick="loadNews(currentFeed)" class="mt-2 px-6 py-2 bg-slate-800 rounded-full text-xs font-bold hover:bg-slate-700">Reintentar</button>
        </div>
    `;
}

/**
 * 📱 Registro de PWA Service Worker
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('✅ Service Worker registrado con éxito', reg))
            .catch(err => console.warn('❌ Error al registrar Service Worker', err));
    }
}
