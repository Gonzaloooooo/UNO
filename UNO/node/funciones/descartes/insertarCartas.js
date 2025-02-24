const db = require('../db/conexion');

async function insertarCartasEnMazo(cartasJSON, idPartida) {
    try {
        await db.query(
            'INSERT INTO unot_mazos_maz (fk_par_maz_id_partida, maz_cartas) VALUES ($1, $2)',
            [idPartida, cartasJSON]
        );
        console.log('Mazo insertado correctamente.');
    } catch (err) {
        console.error('Error al insertar mazo:', err);
    }
}

module.exports = insertarCartasEnMazo;
