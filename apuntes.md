# 📚 Apuntes: Cargando Datos con JSON y Fetch 🚀

¡Hola futuro programador! 👋 Hoy vamos a aprender algo súper potente: cómo hacer que nuestra página web lea información de un archivo externo. 

Imagina que tu página es un camarero y el archivo **JSON** es la carta del restaurante. El camarero no se sabe la carta de memoria (eso sería el código estático), sino que va a buscarla a la cocina cuando la necesita. ¡Eso es lo que hemos hecho hoy! 🥘

## 1. ¿Qué es un JSON? 🤔
JSON significa *JavaScript Object Notation*. Es simplemente una forma de organizar datos para que tanto los humanos como las máquinas los entiendan fácilmente.

Se ve así:
```json
{
  "nombre": "Mi Proyecto",
  "emoji": "🌟",
  "descripcion": "Una app increíble"
}
```
Es como una lista de "etiqueta" y "valor". ¡Muy sencillo! 🏷️

## 2. El comando `fetch()` 📡
Para ir a buscar ese archivo JSON, usamos una herramienta de JavaScript llamada `fetch()`. Es como hacer una llamada por teléfono a un servidor para pedirle algo.

```javascript
const respuesta = await fetch('archivo.json');
```

## 3. ¿Qué es `async` y `await`? ⏳
Como ir a buscar un archivo puede tardar un poquito (milésimas de segundo), no queremos que la web se congele. Por eso usamos:
- **async**: Le dice al navegador "esta función va a hacer cosas que tardan".
- **await**: Le dice "espera un momento a que termine esta tarea antes de seguir con la siguiente".

Es como esperar a que hierva el agua antes de echar la pasta. 🍝

## 4. Dibujando en la pantalla (DOM) 🎨
Una vez tenemos los datos, usamos un bucle `forEach` para recorrer la lista y crear tarjetas visuales para cada proyecto. ¡Magia! ✨

---
¡Sigue practicando y te convertirás en un maestro del código! 🧙‍♂️💻
