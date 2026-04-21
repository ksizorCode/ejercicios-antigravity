# Prompt del Proyecto: Lector de Noticias RSS PWA 📰

Crea una aplicación web progresiva (PWA) con un diseño enfocado principalmente en dispositivos móviles que permita consultar noticias a través de un feed RSS.

## Requerimientos:
1. **Tecnología**: HTML5, Vanilla JavaScript y Tailwind CSS para los estilos.
2. **PWA**: Debe incluir `manifest.json` y un `service-worker` básico para permitir su instalación y funcionamiento offline básico.
3. **Diseño**:
   - Estética moderna "Glassmorphism" (transparencias, desenfoques).
   - Modo oscuro por defecto con colores vibrantes (HSL).
   - Iconos de Font Awesome.
   - Imágenes de acompañamiento usando `picsum.photos` si el feed no proporciona una.
4. **Funcionalidad**:
   - Cargar un feed RSS (ej. El País, RTVE o similar) usando la API de `rss2json` para evitar problemas de CORS.
   - Listado de noticias con título, descripción corta, imagen y enlace a la noticia completa.
   - Animaciones suaves al cargar las noticias.
5. **Estructura**:
   - Comentarios detallados en el código.
   - Archivos CSS y JS separados en `assets/`.
   - Documentación didáctica en `apuntes.md` y técnica en `readme.md`.
