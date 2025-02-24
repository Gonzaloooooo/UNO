const db = require('../db/conexion'); // Importa la conexión a la base de datos

/**
 * Llama a una función en SQL que actualiza el estado de una partida
 * @param {Object} datos - Estado nuevo en formato JSON
 */
async function updateEstado(datos) {
    try {
        // Llamar a la función almacenada en PostgreSQL pasando el JSON directamente
        await db.func('actualizar_estado_partida', [JSON.stringify(datos)]);
    } catch (error) {
        console.error("Error al actualizar el estado de la partida:", error);
    }
};

module.exports = updateEstado; // Exporta la función para su uso en otros módulos
