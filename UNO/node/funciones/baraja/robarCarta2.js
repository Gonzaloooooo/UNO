// Importa las funciones necesarias para obtener cartas y actualizar la mano del jugador
const obtenerCartas = require('../baraja/obtenerCartas.js');
const actualizarManoJugador = require('../jugadores/actualizarManoJugador.js');

/**
 * Función para robar una carta en una partida y asignarla al jugador correspondiente.
 * 
 * @param {number} idJugador - ID del jugador que va a robar la carta.
 * @param {number} idPartida - ID de la partida en la que se encuentra el jugador.
 * @returns {Promise<void>} - No retorna nada, pero actualiza la mano del jugador en la base de datos.
 */
async function robarCarta2(idJugador, idPartida) {
    // Obtiene una carta del mazo de la partida
    let mas1 = await obtenerCartas(1, idPartida);

    // Itera sobre las cartas obtenidas (aunque en este caso solo es una)
    for (const carta of mas1) {
        // Agrega la carta a la mano del jugador en la base de datos
        await actualizarManoJugador(idJugador, idPartida, carta);
    }
}

// Exporta la función para que pueda ser utilizada en otros módulos
module.exports = robarCarta2;
