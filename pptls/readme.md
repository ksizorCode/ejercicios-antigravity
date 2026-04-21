# 🖖 PPTLS Space Edition - Proyecto PWA

Una versión galáctica y moderna del juego "Piedra, Papel, Tijera, Lagarto, Spock", diseñada para ofrecer una experiencia visual impactante (WOW) y funcionalidades de aplicación nativa.

## 🚀 Características
- **Lógica Completa**: Implementación fiel de las 10 reglas del juego.
- **Modo PWA**: Instalable, con pantalla de inicio propia y funcionamiento offline.
- **Animaciones Neón**: Desarrolladas con CSS puro y Tailwind para alto rendimiento.
- **Ranking Persistente**: Guarda tus 5 mejores puntuaciones localmente.
- **Responsive Design**: Jugable desde cualquier dispositivo.

## 📂 Estructura del Proyecto
```text
pptls/
├── assets/
│   ├── css/
│   │   └── style.css      # Animaciones, fondos y efectos neón
│   └── js/
│       └── app.js         # Motor del juego y gestión de ranking
├── _prompts/
│   └── prompt_01.md       # Registro de peticiones
├── index.html             # Esqueleto y UI
├── manifest.json          # Metadatos PWA
├── sw.js                  # Service Worker (Caché offline)
├── apuntes.md             # Material educativo adicional
└── readme.md              # Este archivo resumen
```

## 🛠️ Tecnologías
- **HTML5 & CSS3**: Animaciones complejas y diseño responsivo.
- **JavaScript Moderno**: Uso de objetos para mapear reglas y `localStorage`.
- **Tailwind CSS**: Estructura de diseño y sistema de colores.
- **Font Awesome & Google Fonts**: Tipografía futurista e iconografía.

## 📝 Capturas y Proceso
1. **Modelado de Reglas**: Se creó un objeto de configuración para gestionar las victorias de forma escalable.
2. **Capas de Animación**: Se añadieron efectos de entrada (`popIn`), victoria (`win-glow`) y derrota (`shake`).
3. **PWA Compliance**: Configuración del Service Worker para garantizar la carga instantánea.

---
Creado por el equipo de **Antigravity** 🌌🎮✨.
