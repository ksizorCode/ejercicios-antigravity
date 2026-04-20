# 🎮 Apuntes: Lógica de Juegos y Datos en la Web

¡Hola! 🧑‍🏫 Hoy vamos a aprender cómo un juego toma decisiones y cómo recuerda tus puntuaciones incluso si cierras la ventana. 🚀✨

## 1. La Matrix de Decisiones (Objetos en JS) 🧠
En el juego Piedra-Papel-Tijera-Lagarto-Spock, cada opción gana a otras dos. En lugar de escribir cientos de líneas con `if`, usamos un **Objeto** que funciona como un "diccionario" de reglas.

```javascript
const REGLAS = {
    piedra: ['tijera', 'lagarto'], // La piedra gana a estos dos
    lagarto: ['spock', 'papel']    // El lagarto gana a estos dos
};
```
Esto hace que el código sea fácil de leer y escalar. ¡Podríamos añadir 10 opciones más sin romper nada! 📈

## 2. Animaciones CSS: El Toque "WOW" 🎨
Para que un juego se sienta vivo, usamos **Keyframes**. Es como decirle al navegador: "En el 0% quiero que el objeto sea invisible, y en el 100% que sea grande y brillante".

```css
@keyframes popIn {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
```
Aplicar esto a las manos cuando aparecen hace que el juego sea mucho más divertido. 🕹️✨

## 3. ¿Cómo recordamos tu Ranking? (LocalStorage) 💾
El navegador tiene una pequeña "mochila" donde podemos guardar datos llamada `localStorage`. 

- **Guardar**: `localStorage.setItem('puntos', '10');`
- **Leer**: `localStorage.getItem('puntos');`

¡Ojo! Solo guarda texto, así que para guardar listas (como nuestro ranking), usamos `JSON.stringify` para convertir la lista en texto y `JSON.parse` para volver a convertirla en lista al leerla. 🧙‍♂️📜

## 4. El Secreto de las PWA 📱
Gracias al `manifest.json` y al `sw.js` (Service Worker), tu móvil cree que esta web es una aplicación real. El Service Worker actúa como un "caché inteligente" que guarda los archivos para que el juego cargue instantáneamente.

---
¡Sigue explorando! La programación es el arte de crear mundos con solo palabras. 🌌💻
