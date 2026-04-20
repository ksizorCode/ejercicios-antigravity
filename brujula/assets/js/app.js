/**
 * 🧭 Brújula Imperial - Lógica de Sensores
 * Este script maneja la orientación del dispositivo para apuntar al Norte.
 */

const compassNeedle = document.getElementById('compass-needle');
const startBtn = document.getElementById('start-compass');
const statusText = document.querySelector('footer');

let isCompassActive = false;

/**
 * Inicializa la brújula y solicita permisos si es necesario (iOS)
 */
async function initCompass() {
    console.log("🧭 Iniciando brújula...");

    // Verificar si el navegador soporta eventos de orientación
    if (!window.DeviceOrientationEvent) {
        alert("Tu navegador no soporta la brújula digital 😢");
        return;
    }

    // Caso especial para iOS 13+ que requiere permiso explícito
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission === 'granted') {
                activateCompass();
            } else {
                alert("Permiso denegado. No podemos encontrar el Norte sin tu permiso 🧭");
            }
        } catch (error) {
            console.error("Error al solicitar permisos:", error);
        }
    } else {
        // En Android y navegadores antiguos no hace falta permiso explícito
        activateCompass();
    }
}

/**
 * Registra los listeners de los sensores
 */
function activateCompass() {
    if (isCompassActive) return;

    // Intentar usar 'deviceorientationabsolute' para Android (Norte magnético real)
    if ('ondeviceorientationabsolute' in window) {
        window.addEventListener('deviceorientationabsolute', handleOrientation);
    } else {
        // Fallback a 'deviceorientation' (común en iOS)
        window.addEventListener('deviceorientation', handleOrientation);
    }

    isCompassActive = true;
    startBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Brújula Activa';
    startBtn.classList.remove('bg-[#3d2b1f]');
    startBtn.classList.add('bg-green-800');
    statusText.textContent = "¡Brújula calibrada! Apunta hacia el horizonte.";
}

/**
 * Maneja los datos del sensor y rota la aguja
 * @param {DeviceOrientationEvent} event 
 */
function handleOrientation(event) {
    let heading = 0;

    // 1. Prioridad para iOS: webkitCompassHeading
    if (event.webkitCompassHeading) {
        heading = event.webkitCompassHeading;
    } 
    // 2. Prioridad para Android: alpha (cuando absolute es true)
    else if (event.alpha !== null) {
        // En Android, alpha suele ser el giro sobre el eje Z (0 a 360)
        // Si es absolute, alpha 0 es el Norte.
        heading = 360 - event.alpha;
    }

    // Aplicar rotación a la aguja
    // Usamos rotación negativa para que la aguja se mantenga apuntando al Norte
    // mientras el disco o el móvil gira.
    rotateNeedle(heading);
}

/**
 * Rota suavemente la aguja de la brújula
 * @param {number} deg 
 */
function rotateNeedle(deg) {
    // Aplicamos la rotación
    // Nota: El CSS tiene transiciones para que el movimiento no sea brusco
    compassNeedle.style.transform = `rotate(${-deg}deg)`;
}

// Evento de clic para iniciar (necesario por seguridad del navegador)
startBtn.addEventListener('click', () => {
    initCompass();
});

// Mensaje de bienvenida en consola 📜
console.log("%c🧭 Brújula Imperial Cargada", "color: #b5a642; font-size: 20px; font-weight: bold;");
