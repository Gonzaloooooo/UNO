const db = require('../db/conexion');

/**
 * Actualiza la fecha de finalización de un partida en la base de datos
 * @param {int} idPartida - ID de la partida
 * @param {Date} current - Fecha de finalización de la partida
 */
async function setEndDateForGame(idPartida, current){
    db.query(`UPDATE unot_partidas_par SET par_fechafinal = $1 WHERE pk_par_id = $2`, [current, idPartida]);
}

module.exports = setEndDateForGame;