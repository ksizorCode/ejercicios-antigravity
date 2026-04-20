/**
 * 🖖 PPTLS Space Edition - Lógica Galáctica
 * Gestión de jugadas, reglas de juego y ranking local.
 */

// Configuración de reglas: Cada clave gana a los valores de su array
const RULES = {
    piedra: { beats: ['tijera', 'lagarto'], emoji: '🪨', label: 'La Piedra' },
    papel: { beats: ['piedra', 'spock'], emoji: '📄', label: 'El Papel' },
    tijera: { beats: ['papel', 'lagarto'], emoji: '✂️', label: 'La Tijera' },
    lagarto: { beats: ['spock', 'papel'], emoji: '🦎', label: 'El Lagarto' },
    spock: { beats: ['tijera', 'piedra'], emoji: '🖖', label: 'Spock' }
};

const OPTIONS = Object.keys(RULES);

// Estado del juego
let playerScore = 0;
let cpuScore = 0;
let ranking = JSON.parse(localStorage.getItem('pptls-ranking')) || [];

// Referencias al DOM
const playerChoiceDisplay = document.getElementById('player-choice-display');
const cpuChoiceDisplay = document.getElementById('cpu-choice-display');
const resultMessage = document.getElementById('result-message');
const playerScoreEl = document.getElementById('player-score');
const cpuScoreEl = document.getElementById('cpu-score');
const rankingList = document.getElementById('ranking-list');

/**
 * Ejecuta una jugada
 * @param {string} playerChoice 
 */
function play(playerChoice) {
    // 1. Aleatorio de la CPU
    const cpuChoice = OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
    
    // 2. Animación de "preparación"
    resetDisplay();
    
    // Pequeño delay para la emoción
    setTimeout(() => {
        showChoices(playerChoice, cpuChoice);
        const result = getResult(playerChoice, cpuChoice);
        handleResult(result, playerChoice, cpuChoice);
    }, 100);
}

/**
 * Determina el resultado
 * @returns 'win' | 'lose' | 'draw'
 */
function getResult(player, cpu) {
    if (player === cpu) return 'draw';
    return RULES[player].beats.includes(cpu) ? 'win' : 'lose';
}

/**
 * Maneja las consecuencias del resultado
 */
function handleResult(result, player, cpu) {
    if (result === 'win') {
        playerScore++;
        resultMessage.textContent = `🪐 ¡VICTORIA! ${RULES[player].label} vence a ${RULES[cpu].label}`;
        resultMessage.className = "text-center font-['Orbitron'] text-2xl font-bold mb-4 text-[#00ffff] animate-bounce";
        playerChoiceDisplay.classList.add('win-glow');
        cpuChoiceDisplay.classList.add('lose-shake');
    } else if (result === 'lose') {
        cpuScore++;
        resultMessage.textContent = `💀 DERROTA... ${RULES[cpu].label} vence a ${RULES[player].label}`;
        resultMessage.className = "text-center font-['Orbitron'] text-2xl font-bold mb-4 text-[#ff00ff]";
        cpuChoiceDisplay.classList.add('win-glow');
        playerChoiceDisplay.classList.add('lose-shake');
    } else {
        resultMessage.textContent = "🤝 EMPATE EN LA GALAXIA";
        resultMessage.className = "text-center font-['Orbitron'] text-2xl font-bold mb-4 text-white/50";
    }

    updateScores();
    saveToRanking();
}

/**
 * Muestra las elecciones con animación
 */
function showChoices(player, cpu) {
    playerChoiceDisplay.textContent = RULES[player].emoji;
    cpuChoiceDisplay.textContent = RULES[cpu].emoji;
    
    playerChoiceDisplay.classList.remove('scale-0');
    playerChoiceDisplay.classList.add('choice-pop');
    
    cpuChoiceDisplay.classList.remove('scale-0');
    cpuChoiceDisplay.classList.add('choice-pop');
}

/**
 * Resetea el display para la siguiente jugada
 */
function resetDisplay() {
    playerChoiceDisplay.classList.add('scale-0');
    playerChoiceDisplay.classList.remove('choice-pop', 'win-glow', 'lose-shake');
    cpuChoiceDisplay.classList.add('scale-0');
    cpuChoiceDisplay.classList.remove('choice-pop', 'win-glow', 'lose-shake');
    resultMessage.textContent = "";
}

/**
 * Actualiza el marcador en pantalla
 */
function updateScores() {
    playerScoreEl.textContent = playerScore;
    cpuScoreEl.textContent = cpuScore;
}

/**
 * Guarda y gestiona el ranking en LocalStorage
 */
function saveToRanking() {
    if (playerScore > 0) {
        const today = new Date().toLocaleDateString();
        const scoreEntry = { date: today, score: playerScore };
        
        // Solo guardamos si es una de las mejores puntuaciones o la primera vez
        ranking.push(scoreEntry);
        ranking.sort((a, b) => b.score - a.score);
        ranking = ranking.slice(0, 5); // Top 5
        
        localStorage.setItem('pptls-ranking', JSON.stringify(ranking));
        renderRanking();
    }
}

/**
 * Dibuja la tabla de ranking
 */
function renderRanking() {
    rankingList.innerHTML = ranking.map((entry, index) => `
        <tr class="border-b border-white/5 group">
            <td class="py-3 font-bold text-[#ff00ff]">#${index + 1}</td>
            <td class="py-3 opacity-70">${entry.date}</td>
            <td class="py-3 text-right font-['Orbitron'] text-[#00ffff]">${entry.score}</td>
        </tr>
    `).join('') || '<tr><td colspan="3" class="py-4 text-center opacity-30">Sin registros espaciales</td></tr>';
}

/**
 * Resetea el juego por completo
 */
function resetGame() {
    if (confirm("¿Estás seguro de reiniciar la galaxia? Perderás tu racha actual.")) {
        playerScore = 0;
        cpuScore = 0;
        updateScores();
        resetDisplay();
        alert("Agujero negro detectado... Marcador reseteado.");
    }
}

// Inicializar ranking al cargar
renderRanking();

console.log("%c🖖 PPTLS Space Engine Ready", "color: #00ffff; font-weight: bold; font-size: 16px;");
