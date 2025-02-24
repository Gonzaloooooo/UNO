const db = require('../db/conexion');
/**
 * Llama a una función que crea una partida en la base de datos y devuelve el id
 * @param {*} idjug1 
 * @param {*} idjug2 
 * @param {*} idjug3 
 * @param {*} idjug4 
 * @returns Devuelve el id de la partida
 */
async function insertarPartida(idjug1, idjug2, idjug3 = null, idjug4 = null) {
    // Ejecuta la función almacenada en la base de datos con los IDs de los jugadores
    const idPartida = await db.func('unof_ingresarpartida', [idjug1, idjug2, idjug3, idjug4]);

    // Devuelve el ID de la partida creada
    return idPartida[0].unof_ingresarpartida;
}

// Exportar la función para su uso en otros módulos
module.exports = insertarPartida;