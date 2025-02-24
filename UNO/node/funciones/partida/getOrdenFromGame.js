const db = require('../db/conexion'); // Importa la conexión a la base de datos

/**
 * Obtiene el orden de los jugadores en una partida específica
 * @param {number} idGame - ID de la partida
 * @returns {Promise<string>} - Devuelve el orden de los jugadores como una cadena
 */
async function getOrdenFromGame(idGame) {
    // Consulta la base de datos para obtener el orden de los jugadores de la partida
    const response = await db.any(`SELECT par_orden FROM unot_partidas_par WHERE pk_par_id = ${idGame}`);
    
    // Retorna el orden de los jugadores
    return response[0].par_orden;
}

module.exports = getOrdenFromGame; // Exporta la función para su uso en otros módulos
