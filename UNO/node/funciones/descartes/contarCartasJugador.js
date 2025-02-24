async function contarCartasJugador(idJugador, idPartida) {
    let cartas;
    try {
        cartas = await db.any(
            'SELECT pju_cartas FROM unot_partidasjugadores_pju WHERE fk_jug_pju_id_jugador = $1 AND fk_par_pju_id_partida = $2',
            [idJugador, idPartida]
        );
        
        // Si pju_cartas es un arreglo almacenado como JSONB, puedes parsearlo y contar los elementos
        if (cartas.length > 0 && cartas[0].pju_cartas) {
            const cartasArray = JSON.parse(cartas[0].pju_cartas);
            return cartasArray.length;
        }
        return 0;
    } catch (err) {
        console.log("Error al traer las cartas del jugador", err);
    }
}