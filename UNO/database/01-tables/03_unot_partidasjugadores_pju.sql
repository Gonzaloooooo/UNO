CREATE TABLE IF NOT EXISTS unot_partidasjugadores_pju(
    pk_pju_id SERIAL PRIMARY KEY,
    fk_par_pju_id_partida INTEGER REFERENCES unot_partidas_par(pk_par_id),
    fk_jug_pju_id_jugador INTEGER REFERENCES unot_jugadores_jug(pk_jug_id),
    pju_cartas JSONB,
    pju_puntuacion INTEGER --NOT NULL no puede ser
);
