# 🌤️ Pronóstico del Tiempo Local - Clima Aura

Proyecto didáctico para consultar el clima en tiempo real utilizando geolocalización y búsqueda por ciudad.

## 📋 Resumen
Este proyecto permite al usuario conocer el estado del tiempo actual en su ubicación exacta o en cualquier ciudad del mundo. Utiliza la API gratuita de **Open-Meteo** para los datos climáticos y **Nominatim** para la geocodificación.

---

## 🌳 Estructura de Archivos
```text
pronostico-tiempo/
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos personalizados y Glassmorphism
│   └── js/
│   │   └── app.js         # Lógica de geolocalización y consumo de API
├── _prompts/
│   └── prompt_01.md        # Registro de la petición original
├── apuntes.md              # Explicación didática para alumnos
├── index.html              # Estructura principal
└── readme.md               # Documentación del proyecto
```

---

## 🛠️ Proceso de Desarrollo
1. **Planificación**: Se seleccionó una API de clima abierta (Open-Meteo) que no requiere registro para facilitar el aprendizaje.
2. **Diseño (UI)**: Implementación de una interfaz moderna tipo "Card" con efecto de cristal (Glassmorphism) usando Tailwind CSS.
3. **Funcionalidad (JS)**:
    - Uso de `navigator.geolocation` para obtener coordenadas GPS.
    - Llamadas asíncronas con `fetch` y `async/await`.
    - Geocodificación inversa para convertir nombres de ciudades en coordenadas.
4. **Refinado**: Se añadieron micro-animaciones y estados de carga para mejorar la experiencia de usuario (UX).

---

## 🚀 Tecnologías Utilizadas
- **HTML5** Semántico
- **Tailwind CSS** (Framework de utilidades)
- **Font-Awesome** (Iconografía)
- **JavaScript Vanila** (ES6+)
- **Open-Meteo API** (Datos climáticos)

---

## 📝 Prompt Original
> "pronóstico del tiempo local. Constula una RSS que nos muestre el tiempo en tu zona o permita buscar a través de un input la zona donde te encuentras. Y si no añade un botón que localice mi zona y me de el pronóstico del tiempo"
