CREATE TYPE efecto AS ENUM ('normal','saltarTurno','coger4' ,'coger2');

CREATE TABLE IF NOT EXISTS unot_estado_est(
    pk_est_id SERIAL PRIMARY KEY,
    est_ultima_carta INTEGER,
    est_turno_actual INTEGER DEFAULT 0,
    est_finalizada BOOLEAN DEFAULT false,
    est_efecto efecto DEFAULT 'normal',
    est_cogerdosrep INTEGER DEFAULT 0,
    est_colorultimaCarta TEXT,
    est_invertir_orden BOOLEAN DEFAULT false,
    fk_par_est_id_partida INTEGER UNIQUE REFERENCES unot_partidas_par(pk_par_id)
);