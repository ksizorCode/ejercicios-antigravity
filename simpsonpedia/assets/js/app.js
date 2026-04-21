/**
 * 🍩 Simpsonpedia - Application Logic
 */

const API_URL = 'https://thesimpsonsquoteapi.glitch.me/quotes';
const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let allCharacters = [];

// Fallback images for common characters in case API links are broken
const imgFallbacks = {
    "Homer Simpson": "https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png",
    "Marge Simpson": "https://upload.wikimedia.org/wikipedia/en/0/0b/Marge_Simpson.png",
    "Bart Simpson": "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png",
    "Lisa Simpson": "https://upload.wikimedia.org/wikipedia/en/e/ec/Lisa_Simpson.png",
    "Maggie Simpson": "https://upload.wikimedia.org/wikipedia/en/9/9d/Maggie_Simpson.png",
    "Ned Flanders": "https://upload.wikimedia.org/wikipedia/en/8/84/Ned_Flanders.png",
    "Milhouse Van Houten": "https://upload.wikimedia.org/wikipedia/en/1/11/Milhouse_Van_Houten.png",
    "Moe Szyslak": "https://upload.wikimedia.org/wikipedia/en/8/80/Moe_Szyslak.png",
    "Krusty the Clown": "https://upload.wikimedia.org/wikipedia/en/5/5a/Krusty_the_Clown.png",
    "Mr. Burns": "https://upload.wikimedia.org/wikipedia/en/5/56/Mr_Burns.png"
};

const grid = document.getElementById('character-grid');
const loading = document.getElementById('loading');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');
const searchInput = document.getElementById('search-input');
const refreshBtn = document.getElementById('refresh-btn');
const paginationContainer = document.getElementById('pagination-container');

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalQuote = document.getElementById('modal-quote');
const closeModal = document.getElementById('close-modal');
const speakBtn = document.getElementById('speak-btn');

/**
 * 📡 Fetch characters from API
 */
async function fetchCharacters(isRefresh = false) {
    if (isRefresh) {
        allCharacters = [];
        currentPage = 1;
    }

    grid.innerHTML = '';
    loading.classList.remove('hidden');
    paginationContainer.classList.add('hidden');

    try {
        const response = await fetch(`${API_URL}?count=40`);
        if (!response.ok) throw new Error("Error de red");
        const data = await response.json();

        // Normalize images
        allCharacters = data.map(item => {
            let cleanImg = item.image.split('?')[0];
            return {
                ...item,
                image: cleanImg
            };
        });

        // Unique by name
        allCharacters = Array.from(new Set(allCharacters.map(a => a.character)))
            .map(name => allCharacters.find(a => a.character === name));

    } catch (error) {
        console.error("Fallo al cargar de la API:", error);
        allCharacters = Object.keys(imgFallbacks).map(name => ({
            character: name,
            quote: "¡D'oh! Hubo un error de conexión pero aquí estoy.",
            image: imgFallbacks[name]
        }));
    } finally {
        loading.classList.add('hidden');
        paginationContainer.classList.remove('hidden');
        renderCharacters();
    }
}

/**
 * 🖼️ Render character grid
 */
function renderCharacters() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allCharacters.filter(c => c.character.toLowerCase().includes(searchTerm));

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageItems = filtered.slice(startIndex, endIndex);

    grid.innerHTML = '';

    if (pageItems.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center p-12 bg-white border-4 border-black">
                <p class="simpson-font text-3xl">¡Rayos! No hay nadie con ese nombre.</p>
                <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/D%27oh.png" class="mx-auto mt-4 h-32">
            </div>`;
    }

    pageItems.forEach((char) => {
        const card = document.createElement('div');
        card.className = 'card-yellow p-4 flex flex-col items-center cursor-pointer group shadow-lg';

        card.innerHTML = `
            <div class="h-48 w-full bg-white rounded-lg border-2 border-black/10 flex items-center justify-center mb-4 overflow-hidden p-2 relative">
                <img src="${char.image}" alt="${char.character}" 
                     class="char-img group-hover:scale-110 transition-transform duration-300"
                     onerror="handleImageError(this, '${char.character}')">
            </div>
            <h3 class="simpson-font text-2xl text-center border-t-4 border-black pt-2 w-full truncate">${char.character}</h3>
        `;
        card.addEventListener('click', () => showDetails(char));
        grid.appendChild(card);
    });

    pageInfo.innerText = `Página ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = endIndex >= filtered.length;
}

/**
 * ⚠️ Handle image load errors
 */
function handleImageError(img, name) {
    if (imgFallbacks[name]) {
        img.src = imgFallbacks[name];
    } else {
        img.src = "https://upload.wikimedia.org/wikipedia/en/b/bd/D%27oh.png";
    }
    img.onerror = null;
}

/**
 * 📜 Show character modal
 */
function showDetails(char) {
    modalImg.src = char.image;
    modalImg.onerror = () => handleImageError(modalImg, char.character);
    modalImg.alt = char.character;
    modalName.innerText = char.character;
    modalQuote.innerText = `"${char.quote}"`;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    speakBtn.onclick = () => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(char.quote);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    };
}

// Events
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    window.speechSynthesis.cancel();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal.click();
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    renderCharacters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderCharacters();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

searchInput.addEventListener('input', () => {
    currentPage = 1;
    renderCharacters();
});

refreshBtn.addEventListener('click', () => fetchCharacters(true));

// Init
document.addEventListener('DOMContentLoaded', fetchCharacters);
