GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO db_user;

GRANT CONNECT ON DATABASE uno TO db_user;
GRANT CREATE ON SCHEMA public TO db_user;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO db_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO db_user;

GRANT USAGE, SELECT, UPDATE ON SEQUENCE unot_jugadores_jug_pk_jug_id_seq TO db_user;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE unot_partidas_par_pk_par_id_seq TO db_user;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE unot_partidasjugadores_pju_pk_pju_id_seq TO db_user;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE unot_mazos_maz_pk_maz_id_seq TO db_user;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE unot_estado_est_pk_est_id_seq TO db_user;