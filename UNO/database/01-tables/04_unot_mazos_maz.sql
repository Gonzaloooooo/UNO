CREATE TABLE IF NOT EXISTS unot_mazos_maz(
    pk_maz_id SERIAL PRIMARY KEY,
    maz_cartas JSONB,
    maz_cartas_descartes JSONB,
    fk_par_maz_id_partida INTEGER UNIQUE REFERENCES unot_partidas_par(pk_par_id)
);