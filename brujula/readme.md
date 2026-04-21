# 🧭 Brújula Imperial Retro - Proyecto PWA

Este proyecto es un ejemplo práctico de cómo utilizar los sensores de orientación de un dispositivo móvil para crear una herramienta útil con una estética premium y antigua.

## 🌟 Características
- **Precisión Real**: Utiliza `magnetómetros` para apuntar al Norte magnético.
- **PWA Ready**: Se puede instalar en el móvil y funciona sin conexión.
- **Estética Retro**: Diseño inspirado en instrumentos de navegación antiguos de latón y pergamino.
- **Responsive**: Adaptado a móviles y tablets.

## 📂 Estructura del Proyecto
```text
brujula/
├── assets/
│   ├── css/
│   │   └── style.css      # Estilos retro y animaciones
│   └── js/
│       └── app.js         # Lógica de sensores y rotación
├── _prompts/
│   └── prompt_01.md       # Historial de peticiones
├── index.html             # Estructura principal
├── manifest.json          # Configuración PWA
├── sw.js                  # Service Worker (Offline)
├── apuntes.md             # Documentación didáctica
└── readme.md              # Este archivo
```

## 🛠️ Tecnologías Usadas
- **HTML5**: Estructura semántica.
- **Tailwind CSS**: Sistema de diseño rápido.
- **Vanilla JavaScript**: Lógica de sensores sin dependencias pesadas.
- **Font Awesome**: Iconografía vintage.
- **Google Fonts**: Tipografías clásicas (Cinzel e IM Fell English).

## 🚀 Proceso de Desarrollo
1. **Investigación**: Estudio de la API de `DeviceOrientation` para compatibilidad entre iOS y Android.
2. **Diseño**: Creación de una interfaz visualmente rica usando gradientes CSS para simular oro/latón y texturas de papel antiguo.
3. **Lógica**: Implementación de la gestión de permisos (necesaria en sesiones seguras/móviles).
4. **PWA**: Configuración del `manifest` y `service worker` para permitir la instalación.

## 📝 Prompt Original
> "Brujula digital que apunta al norte formato PWA guardalo en un acarpeta llamada brulula. Dale una estética retro y antigua. La brujula ha de apuntar al norte de verdad y actualizarse"

---
Proyecto desarrollado con ❤️ y 🧭 por **Antigravity**.
