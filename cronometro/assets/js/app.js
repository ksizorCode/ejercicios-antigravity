/* 
   🕒 Chronos Pro - Core Logic
   Desarrollado por: Antigravity 🚀
*/

// 💾 Variables de estado
let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let isRunning = false;

// 🎯 Referencias al DOM
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const playIcon = document.getElementById('playIcon');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('lapsContainer');
const lapsList = document.getElementById('lapsList');

// 🧪 Función para formatear el tiempo (MM:SS:CC)
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');
    let formattedHH = hh.toString().padStart(2, '0');

    // Devolvemos HTML para poder estilizar las centésimas de forma diferente
    return `${formattedHH}:${formattedMM}:${formattedSS}<span class="text-2xl text-indigo-400 font-normal">.${formattedMS}</span>`;
}

// 🚀 Función de impresión en pantalla
function print(txt) {
    display.innerHTML = txt;
}

// 🎬 Iniciar / Detener
function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton('STOP');
}

function stop() {
    clearInterval(timerInterval);
    showButton('START');
}

// 🔄 Cambiar estado visual de botones
function showButton(buttonKey) {
    if (buttonKey === 'STOP') {
        playIcon.classList.replace('fa-play', 'fa-pause');
        playIcon.classList.remove('ml-1');
        startStopBtn.classList.add('running');
        lapBtn.disabled = false;
        isRunning = true;
    } else {
        playIcon.classList.replace('fa-pause', 'fa-play');
        playIcon.classList.add('ml-1');
        startStopBtn.classList.remove('running');
        isRunning = false;
    }
}

// 🚩 Añadir vuelta (Lap)
function addLap() {
    const lapTime = elapsedTime;
    const lapNumber = laps.length + 1;
    laps.push(lapTime);

    // Cálculos de diferencia
    const previousLapTime = laps[laps.length - 2] || 0;
    const lapDuration = lapTime - previousLapTime;

    // Mostrar contenedor si es la primera vuelta
    if (laps.length === 1) {
        lapsContainer.classList.remove('opacity-0', 'translate-y-4');
    }

    // Crear el elemento de la vuelta
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item flex justify-between items-center bg-white/5 border border-white/5 px-4 py-3 rounded-2xl mb-2 text-sm';
    lapItem.innerHTML = `
        <span class="font-bold text-indigo-400">#${lapNumber.toString().padStart(2, '0')}</span>
        <span class="font-['JetBrains_Mono']">+${timeOnlyString(lapDuration)}</span>
        <span class="font-['JetBrains_Mono'] text-slate-300">${timeOnlyString(lapTime)}</span>
    `;

    lapsList.prepend(lapItem);
}

// Formateador simple para las vueltas (sin spans)
function timeOnlyString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
    let mm = Math.floor((diffInHrs - hh) * 60);
    let ss = Math.floor(((diffInHrs - hh) * 60 - mm) * 60);
    let ms = Math.floor((((diffInHrs - hh) * 60 - mm) * 60 - ss) * 100);
    
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

// 🧹 Resetear todo
function reset() {
    clearInterval(timerInterval);
    print('00:00:00<span class="text-2xl text-indigo-400">.00</span>');
    elapsedTime = 0;
    laps = [];
    lapsList.innerHTML = '';
    lapsContainer.classList.add('opacity-0', 'translate-y-4');
    showButton('START');
    lapBtn.disabled = true;
}

// 👂 Event Listeners
startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        start();
    } else {
        stop();
    }
});

lapBtn.addEventListener('click', addLap);
resetBtn.addEventListener('click', reset);

// ✨ Inicialización con un log amigable
console.log('%c⏱️ Chronos Pro iniciado - ¡A por el récord!', 'color: #6366f1; font-weight: bold; font-size: 14px;');
