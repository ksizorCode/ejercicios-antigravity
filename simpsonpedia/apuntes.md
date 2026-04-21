# 📓 Apuntes: Simpsonpedia y las PWAs 📱🍩

¡Bienvenidos a la Simpsonpedia! En este proyecto hemos transformado una simple web en una **Aplicación Web Progresiva (PWA)** profesional.

## 1. ¿Qué es una PWA? 🤔
Es como si una página web y una app de móvil tuvieran un hijo. 🧬 
- Se puede **instalar** en la pantalla de inicio.
- Funciona **sin internet** (gracias al Service Worker).
- Es súper rápida.

## 2. Los Componentes Mágicos ✨
1.  **Manifest (`manifest.json`)**: Es el carné de identidad de la app. Dice cómo se llama, qué iconos tiene y qué colores usa.
2.  **Service Worker (`sw.js`)**: Es un "empleado invisible" que guarda los archivos (caché) para que la app cargue aunque no haya Wi-Fi. ⚡

## 3. Web Speech API 🔊
¿Has probado el botón de escuchar? Usamos la tecnología del navegador para hacer que los personajes "hablen".
```javascript
const utterance = new SpeechSynthesisUtterance(texto);
window.speechSynthesis.speak(utterance);
```

¡Ahora puedes llevar Springfield en tu bolsillo! 🍩🏗️✨🚀
