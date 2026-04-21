/**
 * ⚡ PokéDex Pro Logic
 * Fetching from PokeAPI with detailed expansion
 */

const POKE_API = 'https://pokeapi.co/api/v2/pokemon';
const container = document.getElementById('pokemon-container');
const loadMoreBtn = document.getElementById('load-more');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');

let offset = 0;
const limit = 20;

/**
 * 🚀 Inicialización
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchPokemons();
    setupEvents();
});

function setupEvents() {
    loadMoreBtn.addEventListener('click', fetchPokemons);
    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        filterPokemons(term);
    });

    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    document.getElementById('modal-overlay').addEventListener('click', () => modal.classList.add('hidden'));
}

/**
 * 📡 Obtener lista básica de Pokémon
 */
async function fetchPokemons() {
    try {
        const res = await fetch(`${POKE_API}?offset=${offset}&limit=${limit}`);
        const data = await res.json();
        
        // Obtenemos el detalle de cada pokemon en paralelo
        const promises = data.results.map(p => fetch(p.url).then(r => r.json()));
        const details = await Promise.all(promises);
        
        renderPokemons(details);
        offset += limit;
    } catch (err) {
        console.error("Error fetching pokemons:", err);
    }
}

/**
 * 🖼️ Dibujar en el DOM
 */
function renderPokemons(pokemons) {
    // Si es la primera carga y no hay búsqueda, quitamos los skeletons
    if (offset === 0) container.innerHTML = '';

    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'pokemon-card rounded-[2rem] p-6 flex flex-col items-center gap-4 cursor-pointer fade-in';
        card.setAttribute('data-name', pokemon.name);
        
        // Imagen oficial (Dream World o Home)
        const imgSrc = pokemon.sprites.other['official-artwork'].front_default;
        const mainType = pokemon.types[0].type.name;

        card.innerHTML = `
            <div class="relative w-32 h-32 flex items-center justify-center">
                <div class="absolute inset-0 bg-white/5 rounded-full blur-2xl"></div>
                <img src="${imgSrc}" alt="${pokemon.name}" class="w-full h-full object-contain relative z-10 transition-transform hover:scale-125">
            </div>
            <div class="text-center">
                <span class="text-[10px] font-bold text-slate-500 tracking-widest">#${pokemon.id.toString().padStart(3, '0')}</span>
                <h3 class="text-lg font-bold capitalize text-white">${pokemon.name}</h3>
            </div>
            <div class="flex gap-2">
                ${pokemon.types.map(t => `<span class="type-badge bg-${t.type.name}">${t.type.name}</span>`).join('')}
            </div>
        `;

        card.addEventListener('click', () => showDetail(pokemon));
        container.appendChild(card);
    });
}

/**
 * 🔍 Filtrar localmente (en los ya cargados)
 */
function filterPokemons(term) {
    const cards = document.querySelectorAll('.pokemon-card');
    cards.forEach(card => {
        const name = card.getAttribute('data-name');
        card.style.display = name.includes(term) ? 'flex' : 'none';
    });
}

/**
 * 📜 Mostrar detalle en Modal
 */
function showDetail(pokemon) {
    const stats = pokemon.stats.map(s => `
        <div class="mb-4">
            <div class="flex justify-between text-xs font-bold mb-1 px-1">
                <span class="uppercase text-slate-400 font-['Orbitron']">${s.stat.name}</span>
                <span class="text-white">${s.base_stat}</span>
            </div>
            <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-red-500 h-full transition-all duration-1000" style="width: 0%" data-width="${(s.base_stat/255)*100}%"></div>
            </div>
        </div>
    `).join('');

    modalContent.innerHTML = `
        <div class="relative h-48 bg-gradient-to-b from-red-600/20 to-transparent flex items-center justify-center pt-8">
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" class="w-40 h-40 object-contain drop-shadow-2xl">
        </div>
        <div class="p-8">
            <div class="text-center mb-8">
                <span class="text-xs font-black text-red-500 tracking-[0.3em] font-['Orbitron']">#${pokemon.id.toString().padStart(3, '0')}</span>
                <h2 class="text-4xl font-black capitalize text-white mt-2">${pokemon.name}</h2>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="bg-white/5 p-4 rounded-3xl text-center">
                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Altura</p>
                    <p class="text-xl font-bold text-white">${pokemon.height / 10} m</p>
                </div>
                <div class="bg-white/5 p-4 rounded-3xl text-center">
                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Peso</p>
                    <p class="text-xl font-bold text-white">${pokemon.weight / 10} kg</p>
                </div>
            </div>

            <div class="space-y-2">
                ${stats}
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    
    // Animación de barras
    setTimeout(() => {
        modalContent.querySelectorAll('[data-width]').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }, 100);
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}
