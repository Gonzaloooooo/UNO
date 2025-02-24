const db = require('../db/conexion');

/**
 * Actualiza la mano del jugador con una nueva carta.
 * @param {number} jugadorId - ID del jugador en la tabla estado.
 * @param {Object} carta - Carta en formato JSON que se añadirá a la mano.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la actualización está completa.
 */
async function actualizarManoJugador (jugadorId, partidaId, carta) {
    try {
        //console.log(`Buscando al jugador con ID: ${jugadorId}`);
        
        // Verificar si el jugador existe
        const jugador = await db.oneOrNone(
            'SELECT pju_cartas FROM unot_partidasjugadores_pju WHERE fk_jug_pju_id_jugador = $1 AND fk_par_pju_id_partida = $2',
            [jugadorId, partidaId]
        );

        if (!jugador) {
            throw new Error(`El jugador con ID ${jugadorId} no existe en la base de datos.`);
        }

        //console.log(`Mano actual antes de actualizar: ${jugador.pju_cartas}`);

        // Obtener la mano actual
        let manoActual = jugador.pju_cartas || [];
        if (typeof manoActual === 'string') {
            manoActual = JSON.parse(manoActual); // Convertir a JSON si es necesario
        }

        //console.log(`Añadiendo carta: ${JSON.stringify(carta)} a la mano actual.`);
        manoActual.push(carta);

        // Actualizar la base de datos
        await db.none(
            `UPDATE unot_partidasjugadores_pju
             SET pju_cartas = $1
             WHERE fk_jug_pju_id_jugador = $2 AND
             fk_par_pju_id_partida = $3`,
            [JSON.stringify(manoActual), jugadorId, partidaId]
        );

        //console.log(`Mano del jugador ${jugadorId} actualizada con éxito.`);
    } catch (error) {
        console.error('Error al actualizar la mano del jugador:', error.message);
        throw error;
    }
};

module.exports = actualizarManoJugador;