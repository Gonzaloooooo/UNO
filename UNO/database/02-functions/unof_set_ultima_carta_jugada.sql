/*
	-- Coloca una carta como la última que ha sido jugada en una partida

	Parámetros de entrada
	idCarta INT --> ID de la carta que se va a colocar
	idPartida INT --> ID de la partida

	Returns
	resultado INT --> Será 0 si la operación ha sido existosa o -1 si ha ocurrido algún error 
*/
CREATE OR REPLACE FUNCTION unof_set_ultima_carta_jugada(idCarta INT, idPartida INT)
RETURNS INT AS $$
DECLARE
	resultado INT;
BEGIN
	BEGIN
		UPDATE unot_estado_est
		SET est_ultima_carta = idCarta
		WHERE fk_par_est_id_partida = idPartida;
		resultado = 0;
	EXCEPTION
		WHEN OTHERS THEN
			RAISE NOTICE 'Error: %', ERRCODE;
			resultado = -1;
	END;
	RETURN resultado;
END;
$$ LANGUAGE plpgsql;