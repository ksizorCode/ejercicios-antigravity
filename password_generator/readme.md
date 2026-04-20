# 🔑 Password Shield - Generador Seguro

Una herramienta de seguridad avanzada diseñada para generar contraseñas robustas directamente en tu navegador. Sin servidores, sin rastreo, solo matemáticas seguras.

## 🛡️ Características
- **Seguridad Criptográfica**: Utiliza `window.crypto` para una aleatoriedad real.
- **Altamente Configurable**: Controla longitud y tipos de caracteres (Mayúsculas, Minúsculas, Números, Símbolos).
- **Copiado Rápido**: Botón de acceso directo al portapapeles con feedback visual.
- **PWA**: Instalable y funcional 100% offline.
- **Privacidad Total**: Todo el procesamiento ocurre localmente.

## 📂 Estructura
```text
password_generator/
├── assets/
│   ├── css/
│   │   └── style.css      # Tema Dark Security y animaciones
│   └── js/
│       └── app.js         # Motor de generación y portapapeles
├── prompts/
│   └── prompt_01.md       # Historial de peticiones
├── index.html             # Interfaz de usuario
├── manifest.json          # Configuración PWA
├── sw.js                  # Service Worker
├── apuntes.md             # Notas sobre seguridad web
└── readme.md              # Resumen del proyecto
```

## 🚀 Cómo usar
1. Abre el generador desde el Hub Central.
2. Ajusta la longitud deseada con el slider.
3. Elige los tipos de caracteres.
4. Haz clic en **Generar** y luego en el icono de **Copiar**.

---
Seguridad simplificada por **Antigravity**. ✨🔐
