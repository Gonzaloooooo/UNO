const db = require('../db/conexion');

async function robarCarta(idPlayer, idGame) {
    try {
        // Obtener el mazo de la partida
        const mazoQuery = `
            SELECT maz_cartas
            FROM unot_mazos_maz
            WHERE fk_par_maz_id_partida = $1;
        `;
        const mazoResult = await db.query(mazoQuery, [idGame]);

        // Verificar si se encontró el mazo
        if (!mazoResult.rows.length) {
            throw new Error("No se encontró el mazo de la partida.");
        }

        const mazo = mazoResult.rows[0].maz_cartas || [];

        // Verificar si el mazo tiene cartas
        if (!Array.isArray(mazo) || mazo.length === 0) {
            throw new Error("No hay cartas disponibles en el mazo.");
        }

        // Robar la primera carta del mazo
        const cartaRobada = mazo.shift(); // ✅ Ahora eliminamos la carta del array

        // Actualizar el mazo en la base de datos
        const updateMazoQuery = `
            UPDATE unot_mazos_maz
            SET maz_cartas = $1
            WHERE fk_par_maz_id_partida = $2;
        `;
        await db.query(updateMazoQuery, [mazo, idGame]);

        // Obtener las cartas actuales del jugador
        const jugadorQuery = `
            SELECT pju_cartas
            FROM unot_partidasjugadores_pju
            WHERE fk_jug_pju_id_jugador = $1 AND fk_par_pju_id_partida = $2;
        `;
        const jugadorResult = await db.query(jugadorQuery, [idPlayer, idGame]);

        // Verificar si se encontró al jugador
        if (!jugadorResult.rows.length) {
            throw new Error("No se encontró al jugador en la partida.");
        }

        const cartasJugador = jugadorResult.rows[0].pju_cartas || [];

        // Añadir la carta robada al jugador
        const nuevasCartasJugador = [...cartasJugador, cartaRobada];
        const updateJugadorQuery = `
            UPDATE unot_partidasjugadores_pju
            SET pju_cartas = $1
            WHERE fk_jug_pju_id_jugador = $2 AND fk_par_pju_id_partida = $3;
        `;
        await db.query(updateJugadorQuery, [nuevasCartasJugador, idPlayer, idGame]);

        return cartaRobada; // Devuelve la carta robada
    } catch (error) {
        console.error("Error en robarCarta:", error);
        throw error;
    }
}

module.exports = robarCarta;