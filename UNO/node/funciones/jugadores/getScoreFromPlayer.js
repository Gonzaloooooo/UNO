const db = require('../db/conexion'); // Importa la conexión a la base de datos

/**
 * Obtiene la puntuación de un jugador en una partida específica
 * @param {number} idPlayer - ID del jugador
 * @param {number} idGame - ID de la partida
 * @returns {Promise<number|null>} - Devuelve la puntuación del jugador o null si no se encuentra
 */
async function getScoreFromPlayer(idPlayer, idGame) {
    // Consulta la base de datos para obtener la puntuación del jugador en la partida
    const res = await db.query(`SELECT pju_puntuacion FROM unot_partidasjugadores_pju 
                                WHERE fk_jug_pju_id_jugador = ${idPlayer} 
                                AND fk_par_pju_id_partida = ${idGame}`);
    
    // Si se encontró un resultado, devuelve la puntuación del jugador
    if (res.length != 0) {
        console.log(res[0].pju_puntuacion);
        return res[0].pju_puntuacion;
    } else {
        return null; // Retorna null si no se encontró la puntuación
    }
}

module.exports = getScoreFromPlayer; // Exporta la función para su uso en otros módulos