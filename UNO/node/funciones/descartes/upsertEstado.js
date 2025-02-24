const db = require('./conexion');

async function upsertEstados(idUltimaCarta, turnoActual, finalizada, efecto, cogerDosRep, orden, numUltimaCarta, colorUltimaCarta, idPartida) {
    try {
        await db.none(
            `INSERT INTO unot_estados_est (est_ultima_carta, est_turno_actual, est_finalizada, est_efecto, est_cogerdosrep, est_orden, est_numultimaCarta, est_colorultimaCarta, fk_par_est_id_partida)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (fk_par_est_id_partida)
            DO UPDATE SET
                est_ultima_carta = EXCLUDED.est_ultima_carta,
                est_turno_actual = EXCLUDED.est_turno_actual,
                est_finalizada = EXCLUDED.est_finalizada,
                est_efecto = EXCLUDED.est_efecto,
                est_cogerdosrep = EXCLUDED.est_cogerdosrep,
                est_numultimaCarta = EXCLUDED.est_numultimaCarta,
                est_colorultimaCarta = EXCLUDED.est_colorultimaCarta;`
            ,
            [idUltimaCarta, turnoActual, finalizada, efecto, cogerDosRep, orden, numUltimaCarta, colorUltimaCarta, idPartida]
        );
        console.log("Estado insertado o actualizado correctamente.");
    } catch (err) {
        console.log("Error al insertar o actualizar el estado:", err);
    }
}

/*
Codigo que va en el main cuando se inserta por primera vez en la tabla estados
insertarEstados(ultimaCarta, turno, false, "normal", 0, orden, numUltimaCarta, colorUltimaCarta, idPartida)
*/