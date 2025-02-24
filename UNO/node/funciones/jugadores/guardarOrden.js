const db = require('../db/conexion');

/**
 * Guarda el orden de los jugadores en una partida 
 * 
 * @param {*} orden - Ids de los jugadores
 * @param {*} idPartida - Id de la partida
 */
async function guardarOrden(orden, idPartida) {
    try {
        await db.none(
            'UPDATE unot_partidas_par SET par_orden = $1 WHERE pk_par_id = $2', //query para guardar el orden
            [orden, idPartida]
        );
        //console.log("Orden actualizada correctamente.");
    } catch (err) {
        console.log("Error al actualizar la orden:", err);
    }
}

module.exports = guardarOrden;
