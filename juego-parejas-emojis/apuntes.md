# 📓 Apuntes: Lógica de Juegos y Memoria 🍦

¡Hola! Hoy vamos a crear nuestro primer juego. Los juegos son geniales para aprender programación porque tienen reglas lógicas muy claras.

## 1. El algoritmo de "Barajado" (Shuffle) 🔀
Para que el juego sea diferente cada vez, necesitamos desordenar las cartas. Usamos un algoritmo llamado **Fisher-Yates**, que es como meter todas las cartas en una bolsa y sacarlas una a una al azar.

## 2. El Estado del Juego 🚦
Necesitamos que el programa recuerde cosas:
- ¿Cuántas cartas hay boca arriba?
- ¿La primera carta coincide con la segunda?
- ¿Ya hemos ganado?

Esto lo guardamos en variables de "estado".

## 3. Temporizadores (`setTimeout`) ⏱️
Cuando el usuario falla una pareja, no queremos esconder las cartas al instante, porque no le daríamos tiempo a verlas. Usamos `setTimeout` para esperar un segundo antes de darles la vuelta.

### Ejemplo de código:
```javascript
if (carta1 !== carta2) {
  setTimeout(() => {
    // Escondemos las cartas después de 1 segundo
    girarCarta(carta1);
    girarCarta(carta2);
  }, 1000);
}
```

¡A jugar y a programar! 🎈✨🚀
