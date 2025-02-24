// Importar la conexión a la base de datos
const db = require('../db/conexion');

/**
 * Función para obtener las cartas de un jugador en una partida específica.
 *
 * @param {number} idJugador - ID del jugador.
 * @param {number} idPartida - ID de la partida.
 * @returns {Promise<Array>} - Devuelve un array con las cartas del jugador.
 */
async function verCartasJugador(idJugador, idPartida) {
    let cartas;
    try {
        // Consulta para obtener las cartas del jugador en la partida dada
        cartas = await db.any(
            'SELECT pju_cartas FROM unot_partidasjugadores_pju WHERE fk_jug_pju_id_jugador = $1 AND fk_par_pju_id_partida = $2',
            [idJugador, idPartida]
        );    
    } catch (err) {
        // En caso de error, lo muestra en la consola
        console.log("Error al obtener las cartas del jugador:", err);
    }

    // Devuelve las cartas del jugador
    return cartas[0].pju_cartas;
}

// Exportar la función para su uso en otros módulos
module.exports = verCartasJugador;
