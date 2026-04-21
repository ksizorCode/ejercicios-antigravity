# 📚 Apuntes: Lector de Noticias RSS y PWAs

¡Hola futuro desarrollador! 👋 Hoy vamos a aprender cómo crear una aplicación que lee noticias de internet y se puede instalar en tu móvil como una app real.

## 1. ¿Qué es un RSS? 📰
RSS significa *Really Simple Syndication*. Es un formato de archivo que usan las webs de noticias para "repartir" su contenido de forma automática. Imagina que es como una lista de correo, pero en lugar de emails, los periódicos publican sus noticias ahí para que otros programas las lean.

## 2. ¿Qué es una PWA? 📱
PWA significa **Progressive Web App**. Es una página web que, gracias a un poco de "magia" (llamada Service Workers y Manifest), tu móvil detecta que puede comportarse como una aplicación instalable. ¡No necesitas subirla a la Play Store o App Store!

## 3. ¿Cómo funciona nuestra app? 🛠️

Para este proyecto usamos tres pilares:
1.  **HTML**: El esqueleto de nuestra app.
2.  **CSS (con Tailwind)**: El maquillaje. Usamos un estilo llamado *Glassmorphism* que hace que todo parezca de cristal.
3.  **JavaScript**: El cerebro. Se encarga de ir a internet, pedir las noticias y dibujarlas en la pantalla.

### Ejemplo de código simple (Petición de datos):
```javascript
// Así pedimos datos a una dirección de internet
fetch('https://mi-api-de-noticias.com')
  .then(respuesta => respuesta.json()) // Lo convertimos a algo que JS entienda
  .then(datos => {
    console.log(datos); // Aquí ya tenemos las noticias
  });
```

## 4. El problema del CORS 🛑
A veces, los navegadores no te dejan leer datos de otra web por seguridad. Para solucionar esto, usamos un "puente" o intermediario (`rss2json`) que nos ayuda a traer las noticias sin problemas.

¡Espero que disfrutes creando esta app! 🚀✨
