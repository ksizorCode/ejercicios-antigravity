/**
 * 📊 Listado de Proyectos - Antigravity Hub
 * Definimos los proyectos en un archivo JS para evitar problemas de CORS 
 * al abrir el index.html directamente desde el sistema de archivos.
 */

const LISTADO_PROYECTOS = [
    {
        "titulo": "Cronómetro Moderno",
        "descripcion": "Un cronómetro de alta precisión con estética 'glassmorphism' y funciones PWA.",
        "ruta": "cronometro/index.html",
        "emoji": "⏱️",
        "tags": ["PWA", "Glassmorphism", "JS"]
    },
    {
        "titulo": "Brújula Imperial",
        "descripcion": "Brújula retro de latón y pergamino que apunta al Norte real mediante sensores.",
        "ruta": "brujula/index.html",
        "emoji": "🧭",
        "tags": ["PWA", "Retro", "Sensores"]
    },
    {
        "titulo": "PPTLS Space Edition",
        "descripcion": "El mítico juego de Piedra, Papel, Tijera, Lagarto, Spock con estética neón.",
        "ruta": "pptls/index.html",
        "emoji": "🖖",
        "tags": ["PWA", "Juego", "Animaciones"]
    },
    {
        "titulo": "Password Shield",
        "descripcion": "Generador de contraseñas ultra seguro con configuración personalizada.",
        "ruta": "password_generator/index.html",
        "emoji": "🔑",
        "tags": ["PWA", "Seguridad", "JS"]
    }
];
