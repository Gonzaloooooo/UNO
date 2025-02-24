// Importar la conexión a la base de datos
const db = require('../db/conexion');

/**
 * Obtiene la última carta jugada en una partida.
 * 
 * @param {number} idGame - ID de la partida.
 * @returns {Promise<number>} - Devuelve el ID de la última carta jugada en la partida.
 */
async function getUltimaCartaJugada(idGame) {
    try {
        // Llamada a la función almacenada en la base de datos para obtener la última carta jugada
        result = await db.func('unof_get_ultima_carta_jugada', [idGame]);
        
        // Retorna el ID de la última carta jugada
        return result[0].unof_get_ultima_carta_jugada;
    } catch (error) {
        // Captura y muestra en consola cualquier error que ocurra
        console.log("Error al obtener la última carta jugada:", error);
    }
}

// Exportar la función para su uso en otros módulos
module.exports = getUltimaCartaJugada;
