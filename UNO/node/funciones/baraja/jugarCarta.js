const db = require('../db/conexion'); // Importa la conexión a la base de datos

/**
 * Elimina una carta de la mano de un jugador y la añade al mazo de descartes
 * 
 * @param {number} posicionCarta - Posición de la carta en el array
 * @param {number} jugadorId - Id del jugador
 * @param {number} partidaId - Id de la partida
 * @returns {Object} - La carta jugada en formato JSON 
 */
async function jugarCarta(posicionCarta, jugadorId, partidaId) {
    try {
        // Obtener las cartas del jugador en la partida
        const resJugador = await db.any(`
            SELECT pju_cartas, fk_par_pju_id_partida
            FROM unot_partidasjugadores_pju
            WHERE fk_jug_pju_id_jugador = $1 AND fk_par_pju_id_partida = $2`, 
            [jugadorId, partidaId]);

        if (resJugador.length === 0) {
            throw new Error('No se encontraron cartas para el jugador proporcionado.');
        }

        let cartas = resJugador[0].pju_cartas;

        // Validar la posición de la carta dentro de la mano del jugador
        if (posicionCarta < 0 || posicionCarta >= cartas.length) {
            console.log('nº de cartas: ', cartas.length);
            throw new Error('La posición de la carta no es válida.');
        }

        // Obtener y eliminar la carta jugada de la mano del jugador
        const cartaJugada = cartas.splice(posicionCarta, 1)[0];

        // Actualizar la mano del jugador en la base de datos
        await db.any(`
            UPDATE unot_partidasjugadores_pju
            SET pju_cartas = $1
            WHERE fk_jug_pju_id_jugador = $2
        `, [JSON.stringify(cartas), jugadorId]);

        // Obtener el mazo de descartes de la partida
        const resMazo = await db.any(`
            SELECT maz_cartas_descartes
            FROM unot_mazos_maz
            WHERE fk_par_maz_id_partida = $1
        `, [partidaId]);

        if (resMazo.length === 0) {
            throw new Error('No se encontró un mazo de descartes para la partida proporcionada.');
        }

        let mazoDescartes = resMazo[0].maz_cartas_descartes;

        // Añadir la carta jugada al mazo de descartes
        if (!Array.isArray(mazoDescartes)) {
            let item = { ...mazoDescartes };
            mazoDescartes = [item];
            mazoDescartes.push(cartaJugada);
        } else {
            mazoDescartes.push(cartaJugada);
        }

        // Actualizar el mazo de descartes en la base de datos
        await db.any(`
            UPDATE unot_mazos_maz
            SET maz_cartas_descartes = $1
            WHERE fk_par_maz_id_partida = $2
        `, [JSON.stringify(mazoDescartes), partidaId]);

        return cartaJugada; // Devuelve la carta jugada
    } catch (error) {
        console.error('Error jugando la carta:', error.message);
        throw error;
    }
}

module.exports = jugarCarta; // Exporta la función para su uso en otros módulos
