const db = require('../db/conexion');

// Función para calcular el siguiente turno
async function saltarTurno(partidaId) {
    try {
        // Obtener datos de la partida desde la base de datos
        const res = await db.query(`
            SELECT 
                est_turno_actual, 
                est_sentido_inverso, 
                par_orden, 
                COUNT(*) AS num_jugadores 
            FROM unot_estado_est
            JOIN unot_partidas_par ON unot_estado_est.fk_par_est_id_partida = unot_partidas_par.pk_par_id
            WHERE fk_par_est_id_partida = $1
            GROUP BY est_turno_actual, est_sentido_inverso, est_saltar_turno, par_orden
        `, [partidaId]);

        if (res.rows.length === 0) {
            throw new Error('No se encontró información para la partida proporcionada.');
        }

        const { est_turno_actual, est_sentido_inverso, par_orden, num_jugadores } = res.rows[0];

        // Calcular el incremento
        let incremento;
        /*if (est_saltar_turno) {
            incremento = 2; // Saltar turno
        } else*/ if (est_sentido_inverso) {
            incremento = -1; // Sentido inverso
        } else {
            incremento = 1; // Turno normal
        }

        // Calcular la nueva posición con ajuste circular en el orden de jugadores
        let nuevaPosicion = (parseInt(est_turno_actual) + incremento) % num_jugadores;
        if (nuevaPosicion < 0) {
            nuevaPosicion += num_jugadores;
        }

        // Ajustar la nueva posición en el orden de jugadores
        // const nuevaPosicionEnOrden = par_orden[nuevaPosicion];

        // Actualizar el turno actual en la base de datos
        /*await db.query(`
            UPDATE unot_estado_est
            SET est_turno_actual = $1, est_saltar_turno = FALSE
            WHERE fk_par_est_id_partida = $2
        `, [nuevaPosicionEnOrden, partidaId]);*/

        //console.log(`El siguiente turno es del jugador en la posición: ${nuevaPosicionEnOrden}`);
        return nuevaPosicion;
    } catch (error) {
        console.error('Error calculando el siguiente turno:', error.message);
        throw error;
    }
}

module.exports = saltarTurno;
