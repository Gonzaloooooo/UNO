// Importar la conexión a la base de datos
const db = require('../db/conexion');

/**
 * Obtiene el estado de una partida específica.
 * 
 * @param {number} idPartida - ID de la partida.
 * @returns {Promise<object[]>} - Devuelve un objeto con el estado de la partida.
 */
async function cogerEstados(idPartida) {
    try {
        // Consulta a la base de datos para obtener el estado de la partida con el ID proporcionado
        let estado = await db.any(
            'SELECT * FROM unot_estado_est WHERE fk_par_est_id_partida = $1',
            [idPartida]
        );

        // Retorna el estado de la partida
        return estado;
    } catch (err) {
        // Captura y muestra en consola cualquier error que ocurra
        console.log("Error al traer la tabla estado de la base de datos:", err);
    }
}

// Exportar la función para su uso en otros módulos
module.exports = cogerEstados;
