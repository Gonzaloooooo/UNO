/*
	-- Devueve la última carta jugada en una partida
	
	Parámetros de entrada
	idPartida INT --> Id de la partida

	RETURNS
	ultimaCartaJson JSONB --> Última carta jugada
*/
CREATE OR REPLACE FUNCTION unof_get_ultima_carta_jugada(idPartida INT)
RETURNS JSONB AS $$
DECLARE
	ultimaCartaJson JSONB;
BEGIN
	SELECT row_to_json(carta) FROM(
		SELECT * 
		FROM unot_cartas_car 
		WHERE pk_car_id = (	
			SELECT est_ultima_carta 
			FROM unot_estado_est 
			WHERE  fk_par_est_id_partida = idPartida
		)
	) carta INTO ultimaCartaJson;
	RETURN ultimaCartaJson;
END;
$$ LANGUAGE plpgsql;