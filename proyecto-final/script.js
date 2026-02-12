// script.js

// Referencia al contenedor donde se inyectarán las tarjetas
const contenedor = document.getElementById('contenedor-pokemon');

// Función asíncrona para obtener los primeros 20 Pokémon
async function obtenerPokemon() {
    try {
        // Hacemos la petición a la API para obtener la lista de Pokémon
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        
        // Convertimos la respuesta a JSON
        const datos = await respuesta.json();
        
        // Por cada Pokémon en la lista, obtenemos sus detalles
        datos.results.forEach(async (pokemon) => {
            await obtenerDetallesPokemon(pokemon.url);
        });

    } catch (error) {
        console.error('Error al obtener los Pokemon:', error);
        contenedor.innerHTML = '<p>Error al cargar los Pokemon. Por favor recarga la pagina.</p>';
    }
}

// Función para obtener los detalles de un Pokémon específico
async function obtenerDetallesPokemon(url) {
    try {
        // Petición para obtener los detalles completos del Pokémon
        const respuesta = await fetch(url);
        const pokemon = await respuesta.json();
        
        // Llamamos a la función que dibuja la tarjeta
        dibujarTarjetaPokemon(pokemon);

    } catch (error) {
        console.error('Error al obtener detalles del Pokemon:', error);
    }
}

// Función para crear el HTML de una tarjeta de Pokémon
function dibujarTarjetaPokemon(pokemon) {
    
    // Extraemos los tipos del Pokémon
    const tipos = pokemon.types.map(type => {
        return '<span class="tipo ' + type.type.name + '">' + type.type.name + '</span>';
    }).join('');

    // Extraemos las estadísticas principales
    const hp = pokemon.stats[0].base_stat;
    const ataque = pokemon.stats[1].base_stat;
    const defensa = pokemon.stats[2].base_stat;
    const velocidad = pokemon.stats[5].base_stat;

    // Creamos el HTML de la tarjeta
    const tarjetaHTML = '<div class="tarjeta-pokemon">' +
        '<div class="pokemon-id">#' + pokemon.id.toString().padStart(3, '0') + '</div>' +
        '<img src="' + pokemon.sprites.other['official-artwork'].front_default + '" alt="' + pokemon.name + '" class="pokemon-imagen">' +
        '<div class="pokemon-info">' +
            '<h2 class="pokemon-nombre">' + pokemon.name + '</h2>' +
            '<div class="pokemon-tipos">' + tipos + '</div>' +
            '<div class="pokemon-stats">' +
                '<div class="stat">' +
                    '<span class="stat-nombre">HP:</span>' +
                    '<span class="stat-valor">' + hp + '</span>' +
                '</div>' +
                '<div class="stat">' +
                    '<span class="stat-nombre">Ataque:</span>' +
                    '<span class="stat-valor">' + ataque + '</span>' +
                '</div>' +
                '<div class="stat">' +
                    '<span class="stat-nombre">Defensa:</span>' +
                    '<span class="stat-valor">' + defensa + '</span>' +
                '</div>' +
                '<div class="stat">' +
                    '<span class="stat-nombre">Velocidad:</span>' +
                    '<span class="stat-valor">' + velocidad + '</span>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

    // Inyectamos la tarjeta en el contenedor del DOM
    contenedor.innerHTML += tarjetaHTML;
}

// Ejecutamos la función al cargar la página
obtenerPokemon();
