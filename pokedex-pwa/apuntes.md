# 📓 Apuntes: ¡Hazte con todos con PokéAPI! ⚡

¡Bienvenido al mundo de las APIs! Hoy vamos a usar una de las más divertidas del mundo: la **PokéAPI**.

## 1. ¿Qué es una API de terceros? 🌐
Imagina que quieres saber el peso de un Pikachu. En lugar de pesarlo tú mismo, le preguntas a una enciclopedia gigante que vive en internet. Eso es la PokeAPI: un servidor que tiene toda la información de Pokémon y nos la da gratis si sabemos cómo pedírsela.

## 2. Peticiones encadenadas 🔗
A veces, para obtener toda la información de un Pokémon, tenemos que hacer dos llamadas:
1.  **Llamada 1**: Dame la lista de los primeros 20 Pokémon.
2.  **Llamada 2**: Por cada uno de esos, dame su detalle (imagen, tipo, etc.).

En JavaScript, esto lo manejamos con `fetch` y `async/await`.

### Ejemplo de código:
```javascript
async function getPokemonData(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  console.log(data.sprites.front_default); // ¡Aquí está la foto!
}
```

## 3. Filtrado en tiempo real 🔍
Aprenderemos a usar el evento `input` en una caja de texto para que, mientras el usuario escribe "Cha...", la app ya esté buscando a "Charmander".

¡Prepárate para convertirte en un Maestro Programador Pokémon! 🔴⚪🔵
