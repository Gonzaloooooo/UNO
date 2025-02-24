CREATE TABLE IF NOT EXISTS unot_jugadores_jug(
    pk_jug_id SERIAL PRIMARY KEY,
	jug_apodo TEXT UNIQUE
);