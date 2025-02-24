CREATE TABLE IF NOT EXISTS unot_partidas_par(
    pk_par_id SERIAL PRIMARY KEY,
    par_fechainicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    par_fechafinal TIMESTAMP,
    par_orden INTEGER []
);



