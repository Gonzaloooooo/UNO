const guardarOrden = require('./guardarOrden'); // Importa la función para guardar el orden de los jugadores

/**
 * Determina el orden de los jugadores en una partida
 * 
 * @param {Array} ids - Lista de IDs de los jugadores
 * @param {number} idPartida - ID de la partida
 */
async function determinarOrdenJugadores(ids, idPartida) {
    const idsJugadores = ids; // Almacena los IDs de los jugadores
    
    // Genera un índice aleatorio dentro del rango de jugadores
    const indiceAleatorio = Math.floor(Math.random() * idsJugadores.length);

    // Reorganiza los jugadores comenzando desde el índice aleatorio
    const ordenJugadores = [
        ...idsJugadores.slice(indiceAleatorio), // Parte desde el índice aleatorio hasta el final
        ...idsJugadores.slice(0, indiceAleatorio), // Luego toma los primeros elementos hasta el índice aleatorio
    ];

    // Guarda el orden de los jugadores en la base de datos
    await guardarOrden(ordenJugadores, idPartida);
}   

module.exports = determinarOrdenJugadores; // Exporta la función para su uso en otros módulos