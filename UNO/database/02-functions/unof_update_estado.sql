/*
    -- Actualiza el estado de una partida

    Parámetro de entrada
    p_datos JSONB --> Datos con los que se va a actualizar el estado de la partida
*/
CREATE OR REPLACE FUNCTION actualizar_estado_partida(p_datos jsonb)
RETURNS void AS $$
BEGIN
    UPDATE unot_estado_est
    SET 
        est_ultima_carta = COALESCE((p_datos->>'est_ultima_carta')::INTEGER, est_ultima_carta),
        est_turno_actual = COALESCE((p_datos->>'est_turno_actual')::INTEGER, est_turno_actual),
        est_finalizada = COALESCE((p_datos->>'est_finalizada')::BOOLEAN, est_finalizada),
        est_efecto = COALESCE((p_datos->>'est_efecto')::text::efecto, est_efecto),
        est_cogerdosrep = COALESCE((p_datos->>'est_cogerdosrep')::INTEGER, est_cogerdosrep),
        est_colorultimaCarta = COALESCE(p_datos->>'est_colorultimaCarta', est_colorultimaCarta),
        est_invertir_orden = COALESCE((p_datos->>'est_invertir_orden')::BOOLEAN, est_invertir_orden)
    WHERE fk_par_est_id_partida = (p_datos->>'fk_par_est_id_partida')::INTEGER;
END;
$$ LANGUAGE plpgsql;