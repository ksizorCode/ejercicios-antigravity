# 🔐 Apuntes: Seguridad y Aleatoriedad en la Web

¡Hola de nuevo! 🧑‍🏫 Hoy vamos a hablar de algo muy serio: la seguridad de tus datos y cómo los ordenadores crean cosas "al azar".

## 1. El mito de lo Aleatorio 🎲
Los ordenadores son máquinas lógicas. Por defecto, no saben ser aleatorios. Lo que hacen es usar fórmulas matemáticas que parecen aleatorias (esto se llama **Pseudo-aleatoriedad**).

En este proyecto hemos usado la **Web Crypto API**:
```javascript
window.crypto.getRandomValues(array);
```
Esta función es mucho más segura que `Math.random()`, porque utiliza "entropía" del sistema (como movimientos del ratón o ruidos del procesador) para generar números que son casi imposibles de predecir. ¡Grado militar! 🛡️✨

## 2. Portapapeles (Clipboard API) 📋
Para el botón de "Copiar", hemos usado la API moderna del navegador. Antes era muy difícil hacer esto, pero ahora es una sola línea:

```javascript
await navigator.clipboard.writeText(texto);
```
Es importante saber que esto solo funciona en sitios **Seguros (HTTPS)** y siempre debe ser activado por un clic del usuario. ¡No queremos que una web nos cambie el portapapeles sin permiso! 🚫

## 3. Interfaces Dinámicas con Inputs 🎚️
Aprender a escuchar los cambios del usuario es clave. El "Slider" de longitud usa un evento llamado `input`:

```javascript
slider.addEventListener('input', (e) => {
    texto.textContent = e.target.value;
});
```
Esto hace que la interfaz se sienta "viva" y responda al instante.

---
¡Recuerda! Una buena contraseña es tu primera línea de defensa. ¡Usa siempre símbolos y números! 🔑🛡️✨
