/**
 * 🔐 Password Shield - Motor de Generación
 * Lógica para la creación de contraseñas seguras y manejo del portapapeles.
 */

const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// Referencias del DOM
const display = document.getElementById('password-display');
const lengthSlider = document.getElementById('length-slider');
const lengthValue = document.getElementById('length-value');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const toast = document.getElementById('toast');

/**
 * Actualiza el valor de la longitud en la UI
 */
lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});

/**
 * Genera una contraseña basada en los criterios seleccionados
 */
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const useUpper = document.getElementById('uppercase').checked;
    const useLower = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    let availableChars = '';
    if (useUpper) availableChars += charSets.uppercase;
    if (useLower) availableChars += charSets.lowercase;
    if (useNumbers) availableChars += charSets.numbers;
    if (useSymbols) availableChars += charSets.symbols;

    // Validación: Al menos un grupo seleccionado
    if (availableChars === '') {
        display.textContent = "¡Selecciona una opción!";
        display.classList.add('text-red-500', 'shake');
        setTimeout(() => {
            display.classList.remove('shake');
        }, 400);
        return;
    }

    display.classList.remove('text-red-500');
    
    let generatedPassword = '';
    // Usamos Web Crypto API para mayor seguridad (si está disponible)
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        generatedPassword += availableChars.charAt(array[i] % availableChars.length);
    }

    // Mostrar y animar
    display.textContent = generatedPassword;
    display.classList.add('pass-animate');
    setTimeout(() => {
        display.classList.remove('pass-animate');
    }, 300);
}

/**
 * Copia la contraseña al portapapeles
 */
async function copyToClipboard() {
    const password = display.textContent;
    
    if (password === '••••••••••' || password === '¡Selecciona una opción!') {
        return;
    }

    try {
        await navigator.clipboard.writeText(password);
        showToast();
    } catch (err) {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar automáticamente.');
    }
}

/**
 * Muestra una notificación visual temporal
 */
function showToast() {
    toast.style.opacity = '1';
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 2000);
}

// Event Listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Generar una inicial al cargar
window.addEventListener('DOMContentLoaded', () => {
    console.log("%c🛡️ Password Shield Engine Loaded", "color: #2563eb; font-weight: bold; font-size: 16px;");
});
