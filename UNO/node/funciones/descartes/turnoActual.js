const db = require('../db/conexion')

async function turnoActual(posicion, idPartida) {
    let turno = await db.any(
        'SELECT par_orden FROM unot_partidas_par WHERE pk_par_id = $1',
        [idPartida]
    );

    let orden = turno[0].par_orden;
    return orden[posicion];
}

module.exports = turnoActual;