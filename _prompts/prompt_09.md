# 📱 Prompt 09 — Vista Escritorio Android

## Fecha
2026-04-22

## Prompt original

> Botón para cambiar a una vista que simula un escritorio de teléfono móvil tipo Android con icono (el emoticono anterior) y nombre. Al hacer click en la URL se abre el proyecto. De fondo se carga una imagen aleatoria de picsum.photos.

## Lo que se implementó

- ✅ **Botón toggle** fijo en la esquina superior derecha para alternar entre Vista Hub y Vista Móvil
- ✅ **Vista Escritorio Android** completa:
  - 📶 Barra de estado superior (hora, "Antigravity OS", iconos WiFi/batería)
  - 📱 Grid 4 columnas de iconos: emoji grande + nombre del proyecto
  - 🔗 Click en cada icono → abre el proyecto directamente
  - 🖼️ Fondo aleatorio de `picsum.photos` cargado dinámicamente con seed aleatoria
  - 🔄 Botón en el dock para refrescar el wallpaper con nueva imagen aleatoria
  - ⏰ Reloj en tiempo real en la barra de estado y en el dock inferior
  - 💎 Glassmorphism en iconos, dock y barra de estado
  - ✨ Animaciones de entrada escalonadas (slideUp) por icono

## Archivos modificados

- `index.html` — Vista Android añadida + botón toggle integrado
