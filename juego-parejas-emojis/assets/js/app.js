/**
 * 🍦 Emoji Match Game Logic
 */

const emojis = ['🍦', '🍭', '🧸', '🌈', '🎨', '🐶', '🍕', '🚗'];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;
let isBusy = false;

const board = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');
const winScreen = document.getElementById('win-screen');

/**
 * 🚀 Inicio
 */
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    restartBtn.addEventListener('click', initGame);
});

function initGame() {
    // Reiniciar variables
    board.innerHTML = '';
    flippedCards = [];
    matchedCount = 0;
    moves = 0;
    timer = 0;
    isBusy = false;
    clearInterval(timerInterval);
    
    movesDisplay.innerText = '0';
    timerDisplay.innerText = '00:00';
    winScreen.classList.add('hidden');

    // Barajar
    cards = shuffle(cards);

    // Crear tablero
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${emoji}</div>
            </div>
        `;
        card.addEventListener('click', () => handleCardClick(card, emoji));
        board.appendChild(card);
    });

    startTimer();
}

/**
 * 🔀 Algoritmo de barajado (Fisher-Yates)
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * 🖱️ Manejo de clics
 */
function handleCardClick(card, emoji) {
    if (isBusy || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push({ card, emoji });

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

/**
 * 🔍 Comprobar pareja
 */
function checkMatch() {
    isBusy = true;
    moves++;
    movesDisplay.innerText = moves;

    const [card1, card2] = flippedCards;

    if (card1.emoji === card2.emoji) {
        // ¡Pareja encontrada!
        card1.card.classList.add('matched');
        card2.card.classList.add('matched');
        matchedCount += 2;
        flippedCards = [];
        isBusy = false;

        if (matchedCount === cards.length) {
            handleWin();
        }
    } else {
        // Fallo
        setTimeout(() => {
            card1.card.classList.remove('flipped');
            card2.card.classList.remove('flipped');
            flippedCards = [];
            isBusy = false;
        }, 1000);
    }
}

/**
 * ⏱️ Temporizador
 */
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        const mins = Math.floor(timer / 60).toString().padStart(2, '0');
        const secs = (timer % 60).toString().padStart(2, '0');
        timerDisplay.innerText = `${mins}:${secs}`;
    }, 1000);
}

/**
 * 🏆 Victoria
 */
function handleWin() {
    clearInterval(timerInterval);
    document.getElementById('final-moves').innerText = moves;
    document.getElementById('final-time').innerText = timerDisplay.innerText;
    
    setTimeout(() => {
        winScreen.classList.remove('hidden');
    }, 500);
}

// PWA Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}
