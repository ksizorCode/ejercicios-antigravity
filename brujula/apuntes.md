# 🧭 Apuntes de Programación: La Brújula Digital

¡Hola, aspirante a navegante del código! 🧑‍🏫✨ En este ejercicio hemos creado una aplicación que parece magia, pero es pura lógica y sensores. Vamos a desglosar cómo funciona para que lo entiendas aunque sea tu primer día programando.

## 1. ¿Cómo sabe el móvil dónde está el Norte? 🌍
Los móviles modernos tienen un sensor llamado **magnetómetro**. Es como una mini-brújula física dentro de tu teléfono que detecta el campo magnético de la Tierra.

En programación, accedemos a este sensor usando un **Evento** llamado `deviceorientation`. 

### Ejemplo de código básico:
```javascript
window.addEventListener('deviceorientation', function(datos) {
  // Los datos 'alpha' nos dicen cuánto ha girado el móvil
  console.log("Giro en grados: " + datos.alpha);
});
```

## 2. El problema de los Permisos (iPhone vs Android) 🍎🤖
No puedes simplemente "espiar" los sensores del usuario. Por seguridad, los navegadores (especialmente en iPhone) piden permiso.
- **iPhone**: Necesita que el usuario HAGA CLIC en un botón para pedir el permiso. Por eso pusimos el botón de "Calibrar".
- **Android**: Suele dar el permiso automáticamente, pero es mejor usar el evento `deviceorientationabsolute` para que el Norte sea "de verdad" y no relativo a cómo sujetas el móvil al empezar.

## 3. ¿Cómo movemos la aguja? 🎨
Usamos **CSS (Cascading Style Sheets)**. En lugar de redibujar la aguja píxel a píxel, simplemente le decimos al navegador: "Rota este elemento X grados".

```css
.aguja {
  transform: rotate(90deg); /* La aguja apuntará a la derecha */
  transition: transform 0.5s; /* Hará que el movimiento sea suave */
}
```

## 4. ¿Qué es una PWA? 📱
Las **Progressive Web Apps** son sitios web que se comportan como aplicaciones de móvil. 
- Tienen un **Manifest** (un carnet de identidad que dice cómo se llama y qué icono tiene).
- Tienen un **Service Worker** (un mayordomo que guarda los archivos para que funcionen sin internet).

---
¡Sigue practicando! La programación es como la navegación: se aprende navegando (y a veces chocando contra algún que otro bug). 🧭🚢
